import fs from 'fs'
import path from 'path'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

// scripts/optimize-media.mjs writes a poster frame next to every video
// (/x/clip.mp4 -> /x/clip.poster.webp). Attach it at build time when it exists,
// so the frame shows instantly and reserves the right space before the video loads.
export function resolveVideo(src) {
  if (!src || !src.startsWith('/')) return { src, poster: undefined }
  const poster = src.replace(/\.[^./]+$/, '.poster.webp')
  return { src, poster: fs.existsSync(path.join(PUBLIC_DIR, poster)) ? poster : undefined }
}
