import Link from 'next/link'
import { site } from '@/data/site'

const icon = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const linkClass =
  'flex items-center justify-center md:w-auto w-9 h-11 rounded-md text-[#777268] md:text-inherit hover:text-[#111] md:hover:underline underline-offset-[5px]'

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 h-[74px] z-30 flex items-center justify-between bg-[#faf9f6] border-b border-gray-200 text-[#111] text-xl px-3 md:px-[max(0px,calc((100%-1152px)/2))]">
      <Link className="font-fraunces" href="/">
        {site.domain}
      </Link>
      <nav aria-label="Main navigation" className="font-mono flex items-center md:gap-[30px] text-[11px] sm:text-sm">
        <a href="/#projects" aria-label="Projects" title="Projects" className={linkClass}>
          <span className="hidden md:inline">projects</span>
          <svg {...icon} className="md:hidden">
            <path d="M11.414 10l-7.383 7.418a2.091 2.091 0 0 0 0 2.967a2.11 2.11 0 0 0 2.976 0l7.407 -7.385" />
            <path d="M18.121 15.293l2.586 -2.586a1 1 0 0 0 0 -1.414l-7.586 -7.586a1 1 0 0 0 -1.414 0l-2.586 2.586a1 1 0 0 0 0 1.414l7.586 7.586a1 1 0 0 0 1.414 0" />
          </svg>
        </a>
        <a href="/#about" aria-label="Contact" title="Contact" className={linkClass}>
          <span className="hidden md:inline">contact</span>
          <svg {...icon} className="md:hidden">
            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
            <path d="M3 7l9 6l9 -6" />
          </svg>
        </a>
      </nav>
    </header>
  )
}
