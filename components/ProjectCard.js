import Link from 'next/link'
import { resolveVideo } from '@/lib/media'
import MediaCarousel from './MediaCarousel'

const PILL_CLASS = 'py-1 px-2 bg-gray-100 rounded-md hover:underline underline-offset-4'

export default function ProjectCard({ project, span }) {
  const { slug, title, description, tags, media, links, icon, page, url } = project
  // Only projects with `"page": true` get a details page. The rest link out to
  // their URL (GitHub, PDF, etc.) if they have one.
  const href = page ? `/projects/${slug}` : null
  const externalUrl = url && url !== '#' ? url : null
  const externalLinks = links.filter((l) => l.type === 'external')
  const webMedia = media.map((m) => (m.type === 'video' ? { ...m, ...resolveVideo(m.src) } : m))

  const heading = (
    <>
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon.src} alt="" loading="lazy" decoding="async" className="h-6 w-auto shrink-0" />
      )}
      {title}
    </>
  )
  const headingClass = 'inline-flex items-center gap-2'

  return (
    <article
      className={`group flex flex-col rounded-lg overflow-hidden bg-white border border-black/20 shadow-lg font-inter ${
        span === 3 ? 'sm:col-span-3' : 'sm:col-span-2'
      }`}
    >
      <MediaCarousel media={webMedia} href={href} title={title} />

      <div className="flex flex-col flex-1 gap-3 p-4 border-t border-black/10">
        <h2 className="text-xl font-semibold tracking-tight leading-tight">
          {href ? (
            <Link href={href} className={`${headingClass} hover:underline underline-offset-4`}>
              {heading}
            </Link>
          ) : externalUrl ? (
            <a href={externalUrl} target="_blank" rel="noreferrer" className={`${headingClass} hover:underline underline-offset-4`}>
              {heading}
            </a>
          ) : (
            <span className={headingClass}>{heading}</span>
          )}
        </h2>

        {(href || externalLinks.length > 0) && (
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {href && (
              <Link href={href} className="py-1 px-2 bg-gray-900 text-white rounded-md hover:underline underline-offset-4">
                Report →
              </Link>
            )}
            {externalLinks.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className={PILL_CLASS}>
                {l.label} ↗
              </a>
            ))}
          </div>
        )}

        <p className="font-mono text-[13px] leading-relaxed text-gray-700">{description}</p>

        {tags.length > 0 && (
          <div className="mt-auto pt-1 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
