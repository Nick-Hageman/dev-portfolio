'use client'

import { useRef, useState } from 'react'

const SWIPE_THRESHOLD = 40
const RESULT_ICON = { success: '✅', fail: '❌' }

// Steps through experiments one at a time. Only the current slide is mounted,
// so only its video is ever downloaded.
export default function ExperimentCarousel({ slides }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(null)
  const count = slides.length
  if (count === 0) return null
  const go = (delta) => setCurrent((c) => (c + delta + count) % count)
  const slide = slides[current]

  return (
    <div className="experiments" role="region" aria-roledescription="carousel" aria-label="Experiments">
      <div className="experiments-header">
        <div className="experiments-label">
          <span aria-hidden="true">🧪</span> Experiments
          <span className="experiments-count">
            {current + 1} / {count}
          </span>
        </div>
        <div className="experiments-nav">
          <button type="button" onClick={() => go(-1)} aria-label="Previous experiment">
            ←
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next experiment">
            →
          </button>
        </div>
      </div>

      <div className="experiments-tabs" role="tablist" aria-label="Choose an experiment">
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === current}
            onClick={() => setCurrent(i)}
            className={i === current ? 'is-active' : ''}
          >
            <span className="experiments-tab-num">{i + 1}</span>
            {s.title}
            {RESULT_ICON[s.result] && <span aria-label={s.result}>{RESULT_ICON[s.result]}</span>}
          </button>
        ))}
      </div>

      <div
        className="experiments-slide"
        role="tabpanel"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1)
          touchStartX.current = null
        }}
      >
        <div key={current}>{slide.content}</div>
      </div>
    </div>
  )
}
