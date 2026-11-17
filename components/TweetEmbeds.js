'use client'

import { useEffect } from 'react'

const WIDGETS_SRC = 'https://platform.x.com/widgets.js'

// <script> tags inside report Markdown are never executed by React, so this
// loads X's widgets.js once and turns every <blockquote class="twitter-tweet">
// on the page into an embedded post.
export default function TweetEmbeds() {
  useEffect(() => {
    const render = () => window.twttr?.widgets?.load()
    if (window.twttr?.widgets) {
      render()
      return
    }
    let script = document.querySelector(`script[src="${WIDGETS_SRC}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = WIDGETS_SRC
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', render)
    return () => script.removeEventListener('load', render)
  }, [])

  return null
}
