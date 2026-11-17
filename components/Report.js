import { Children, isValidElement } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { resolveVideo } from '@/lib/media'
import rehypeReportSections from '@/lib/rehype-report-sections'
import AutoVideo from './AutoVideo'
import ExperimentCarousel from './ExperimentCarousel'
import TweetEmbeds from './TweetEmbeds'

const hasClass = (className, name) => (className || '').split(/\s+/).includes(name)

/* eslint-disable no-unused-vars */
const components = {
  // Every report video lazy-loads, plays only while visible, and uses its web copy and poster when available.
  video: ({ node, src, autoPlay, muted, loop, playsInline, ...rest }) => {
    const media = resolveVideo(src)
    return <AutoVideo src={media.src} poster={media.poster} playInView {...rest} />
  },
  img: ({ node, ...rest }) => <img loading="lazy" decoding="async" alt="" {...rest} />, // eslint-disable-line @next/next/no-img-element, jsx-a11y/alt-text
  a: ({ node, ...rest }) => <a target="_blank" rel="noopener noreferrer" {...rest} />,
  // React won't run scripts from Markdown; embeds are handled by <TweetEmbeds />.
  script: () => null,
  // <div class="experiments"> containing <div class="experiment" data-title="…" data-result="success|fail">
  // becomes a carousel with one slide per experiment.
  div: ({ node, className, children, ...rest }) => {
    if (hasClass(className, 'experiments')) {
      const slides = Children.toArray(children)
        .filter((c) => isValidElement(c) && hasClass(c.props.className, 'experiment'))
        .map((c) => ({ title: c.props['data-title'] ?? '', result: c.props['data-result'] ?? null, content: c.props.children }))
      return <ExperimentCarousel slides={slides} />
    }
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  },
}
/* eslint-enable no-unused-vars */

export default function Report({ content }) {
  return (
    <div className="report">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeReportSections]} components={components}>
        {content}
      </ReactMarkdown>
      {content.includes('twitter-tweet') && <TweetEmbeds />}
    </div>
  )
}
