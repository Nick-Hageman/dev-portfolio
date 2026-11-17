'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import AutoVideo from './AutoVideo'

const MEDIA_CLASS = 'absolute top-0 left-0 w-full h-full object-cover'
const SWIPE_THRESHOLD = 40

// On devices with a mouse, arrows fade in on hover; on touch devices they're always shown.
const ARROW_CLASS =
  'absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/55 text-white text-sm hover:bg-black/75 transition [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-visible:opacity-100'

export default function MediaCarousel({ media, href, title }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(null)
  const count = media.length
  const go = (delta) => setCurrent((c) => (c + delta + count) % count)

  if (count === 0) return <div className="h-48 sm:h-56 bg-gray-900 shrink-0" />
  const item = media[current]

  return (
    <div
      className="relative h-48 sm:h-56 overflow-hidden bg-gray-900 shrink-0"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null || count < 2) return
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1)
        touchStartX.current = null
      }}
    >
      {item.type === 'video' ? (
        <AutoVideo key={item.src} src={item.src} poster={item.poster} playInView className={MEDIA_CLASS} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={item.src} alt={`${title} screenshot ${current + 1}`} src={item.src} loading="lazy" decoding="async" className={MEDIA_CLASS} />
      )}

      {/* Clicking the media itself opens the project page, for projects that have one. */}
      {href && <Link href={href} className="absolute inset-0" tabIndex={-1} aria-label={`Open ${title}`} />}

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous media" className={`${ARROW_CLASS} left-2`}>
            ←
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next media" className={`${ARROW_CLASS} right-2`}>
            →
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-2 py-1 rounded-full bg-black/35">
            {media.map((m, i) => (
              <button
                key={m.src}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Show media ${i + 1} of ${count}`}
                aria-current={i === current}
                className={`w-1.5 h-1.5 rounded-full transition ${i === current ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
