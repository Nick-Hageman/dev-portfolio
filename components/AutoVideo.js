'use client'

import { useEffect, useRef, useState } from 'react'

// How far outside the viewport a lazy video starts fetching.
const PRELOAD_MARGIN = '300px'
// How much of the video must be visible before it plays.
const PLAY_THRESHOLD = 0.25

// React doesn't reliably render the `muted` attribute, and browsers block
// autoplay without it, so set it on the element directly.
//
// With `playInView`, nothing is downloaded until the video is near the viewport,
// and it only plays while visible. Videos inside a closed <details> aren't laid
// out, so they never count as visible and never load.
export default function AutoVideo({ src, poster, playInView = false, className = '', style, ...rest }) {
  const ref = useRef(null)
  const visible = useRef(!playInView)
  const [near, setNear] = useState(!playInView)

  // Play once the element has a source and is on screen. Don't wait for data
  // first: Safari won't fetch any until play() is called, so waiting deadlocks.
  const tryPlay = () => {
    const v = ref.current
    if (!v || !v.getAttribute('src') || !visible.current || !v.paused) return
    v.play().catch(() => {})
  }

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    if (!playInView) {
      tryPlay()
      return
    }
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          loader.disconnect()
        }
      },
      { rootMargin: PRELOAD_MARGIN }
    )
    const player = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
        if (entry.isIntersecting) tryPlay()
        else v.pause()
      },
      { threshold: PLAY_THRESHOLD }
    )
    loader.observe(v)
    player.observe(v)
    return () => {
      loader.disconnect()
      player.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playInView])

  // The src is attached after the first render for lazy videos; start it if it's already visible.
  useEffect(() => {
    if (near) tryPlay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near])

  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      poster={poster}
      loop
      muted
      playsInline
      preload={near ? 'auto' : 'none'}
      className={className}
      style={style}
      {...rest}
    />
  )
}
