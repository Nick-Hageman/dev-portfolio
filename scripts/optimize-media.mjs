#!/usr/bin/env node
// Optimizes every media file the site references, for fast static hosting.
//
//   node scripts/optimize-media.mjs            # convert new/changed referenced media
//   node scripts/optimize-media.mjs --prune    # also move unreferenced files out of public/
//   node scripts/optimize-media.mjs --dry-run  # show what would happen
//
// Videos (.mov/.mp4/.m4v/.webm) -> H.264 .mp4: longest side <= 1280px, <= 30 fps, no audio,
//   2 s keyframes, and "faststart" (index at the front, so playback starts before the download
//   finishes). Also writes <name>.poster.webp, which the site shows until the video loads.
// Images (.png/.jpg/.jpeg) -> .webp, at most 1600px wide.
// References in content/, data/, app/, components/ are rewritten to the new file names.
// Originals are never deleted: they're moved to ../thijs-media-originals/ (outside the site).
//
// Requires ffmpeg and cwebp (`brew install ffmpeg webp`).

import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const PUBLIC = path.join(ROOT, 'public')
const ARCHIVE = path.resolve(ROOT, '..', 'thijs-media-originals')
const MANIFEST = path.join(ROOT, 'scripts', 'media-manifest.json')
const SOURCE_DIRS = ['content', 'data', 'app', 'components']

const VIDEO = new Set(['.mov', '.mp4', '.m4v', '.webm'])
const IMAGE = new Set(['.png', '.jpg', '.jpeg'])
const MAX_VIDEO_SIDE = 1280
const MAX_IMAGE_WIDTH = 1600
const POSTER_WIDTH = 960
// Files that belong in public/ even though nothing references them by path.
const KEEP = [/^\.nojekyll$/, /^favicon\./, /^CNAME$/, /^robots\.txt$/]

const args = new Set(process.argv.slice(2))
const DRY = args.has('--dry-run')
const PRUNE = args.has('--prune')

const REF_RE = /(["'(])\/([^"'()\s?#]+\.(?:png|jpe?g|gif|webp|avif|svg|mp4|mov|m4v|webm|pdf|ico))/gi

function listFiles(dir, filter = () => true, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) listFiles(p, filter, out)
    else if (filter(p)) out.push(p)
  }
  return out
}

const sourceFiles = SOURCE_DIRS.flatMap((d) => listFiles(path.join(ROOT, d), (p) => /\.(md|mdx|json|js|jsx|ts|tsx|css)$/.test(p)))

function collectRefs() {
  const refs = new Set()
  for (const f of sourceFiles) for (const m of fs.readFileSync(f, 'utf8').matchAll(REF_RE)) refs.add(m[2])
  return refs
}

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {}
const stamp = (rel) => {
  const s = fs.statSync(path.join(PUBLIC, rel))
  return { size: s.size, mtimeMs: Math.round(s.mtimeMs) }
}
const isOptimized = (rel) => {
  const m = manifest[rel]
  if (!m || !fs.existsSync(path.join(PUBLIC, rel))) return false
  const s = stamp(rel)
  return m.size === s.size && m.mtimeMs === s.mtimeMs
}

const run = (cmd, argv) => execFileSync(cmd, argv, { stdio: ['ignore', 'ignore', 'pipe'] })
const mb = (bytes) => `${(bytes / 1e6).toFixed(1)}MB`

function archive(rel) {
  const dest = path.join(ARCHIVE, rel)
  if (DRY) return console.log(`  archive  ${rel}`)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.renameSync(path.join(PUBLIC, rel), dest)
}

// Pick an output name that doesn't clobber a different referenced file.
function outputName(rel, ext, refs) {
  const base = rel.slice(0, -path.extname(rel).length)
  let out = `${base}${ext}`
  if (out !== rel && (refs.has(out) || fs.existsSync(path.join(PUBLIC, out)))) out = `${base}-web${ext}`
  return out
}

function sourceFps(file) {
  const rate = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=avg_frame_rate',
    '-of', 'csv=p=0', file], { encoding: 'utf8' }).trim()
  const [num, den] = rate.split('/').map(Number)
  return den ? num / den : num || 0
}

function optimizeVideo(rel, refs) {
  const out = outputName(rel, '.mp4', refs)
  const src = path.join(PUBLIC, rel)
  const tmp = path.join(PUBLIC, `${out}.tmp.mp4`)
  const poster = out.replace(/\.mp4$/, '.poster.webp')
  console.log(`video  ${rel} (${mb(fs.statSync(src).size)}) -> ${out}`)
  if (DRY) return out
  const scale = `scale='if(gt(iw,ih),min(${MAX_VIDEO_SIDE},iw),-2)':'if(gt(iw,ih),-2,min(${MAX_VIDEO_SIDE},ih))':flags=lanczos`
  const filters = sourceFps(src) > 30.5 ? `${scale},fps=30` : scale
  run('ffmpeg', ['-nostdin', '-loglevel', 'error', '-y', '-i', src, '-an', '-vf', filters,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-g', '60', '-keyint_min', '30', '-movflags', '+faststart', tmp])
  const frame = path.join(PUBLIC, `${out}.poster.png`)
  run('ffmpeg', ['-nostdin', '-loglevel', 'error', '-y', '-ss', '0.3', '-i', tmp, '-frames:v', '1', frame])
  run('cwebp', ['-quiet', '-q', '70', '-resize', String(POSTER_WIDTH), '0', frame, '-o', path.join(PUBLIC, poster)])
  fs.rmSync(frame)
  archive(rel)
  fs.renameSync(tmp, path.join(PUBLIC, out))
  console.log(`       -> ${mb(fs.statSync(path.join(PUBLIC, out)).size)}`)
  manifest[poster] = stamp(poster)
  return out
}

function imageWidth(file) {
  const m = execFileSync('sips', ['-g', 'pixelWidth', file], { encoding: 'utf8' }).match(/pixelWidth: (\d+)/)
  return m ? Number(m[1]) : 0
}

function optimizeImage(rel, refs) {
  const out = outputName(rel, '.webp', refs)
  const src = path.join(PUBLIC, rel)
  console.log(`image  ${rel} (${mb(fs.statSync(src).size)}) -> ${out}`)
  if (DRY) return out
  const resize = imageWidth(src) > MAX_IMAGE_WIDTH ? ['-resize', String(MAX_IMAGE_WIDTH), '0'] : []
  run('cwebp', ['-quiet', '-q', '80', '-alpha_q', '90', '-metadata', 'none', ...resize, src, '-o', path.join(PUBLIC, out)])
  archive(rel)
  console.log(`       -> ${mb(fs.statSync(path.join(PUBLIC, out)).size)}`)
  return out
}

function rewriteRefs(renames) {
  if (renames.size === 0) return
  for (const f of sourceFiles) {
    const text = fs.readFileSync(f, 'utf8')
    const next = text.replace(REF_RE, (all, quote, rel) => (renames.has(rel) ? `${quote}/${renames.get(rel)}` : all))
    if (next !== text) {
      console.log(`update ${path.relative(ROOT, f)}`)
      if (!DRY) fs.writeFileSync(f, next)
    }
  }
}

// ---------------------------------------------------------------- main

const refs = collectRefs()
const renames = new Map()
let failures = 0

for (const rel of [...refs].sort()) {
  const ext = path.extname(rel).toLowerCase()
  if (!fs.existsSync(path.join(PUBLIC, rel))) {
    console.warn(`MISSING ${rel}`)
    continue
  }
  if (isOptimized(rel) || !(VIDEO.has(ext) || IMAGE.has(ext))) continue
  try {
    const out = VIDEO.has(ext) ? optimizeVideo(rel, refs) : optimizeImage(rel, refs)
    if (!DRY) manifest[out] = stamp(out)
    if (out !== rel) renames.set(rel, out)
  } catch (err) {
    failures++
    console.error(`FAILED ${rel}: ${String(err.stderr || err.message).trim()}`)
  }
}

rewriteRefs(renames)

if (PRUNE) {
  const live = collectRefs()
  for (const r of [...live]) if (/\.mp4$/i.test(r)) live.add(r.replace(/\.mp4$/i, '.poster.webp'))
  for (const file of listFiles(PUBLIC)) {
    const rel = path.relative(PUBLIC, file)
    if (live.has(rel) || KEEP.some((re) => re.test(rel))) continue
    archive(rel)
    delete manifest[rel]
  }
  // Remove directories left empty.
  const prune = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) if (e.isDirectory()) prune(path.join(dir, e.name))
    if (dir !== PUBLIC && fs.readdirSync(dir).length === 0 && !DRY) fs.rmdirSync(dir)
  }
  prune(PUBLIC)
}

for (const rel of Object.keys(manifest)) if (!fs.existsSync(path.join(PUBLIC, rel))) delete manifest[rel]
const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]))
if (!DRY) fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 1) + '\n')

const total = listFiles(PUBLIC).reduce((n, f) => n + fs.statSync(f).size, 0)
console.log(`\npublic/ is now ${mb(total)}${failures ? ` (${failures} failed)` : ''}. Originals: ${ARCHIVE}`)
process.exitCode = failures ? 1 : 0
