import CurveDivider from './CurveDivider'
import { site } from '@/data/site'

export default function Footer() {
  return (
    <footer className="bg-[#faf9f6]">
      <div className="relative max-w-6xl mx-3 md:mx-auto">
        <CurveDivider variant="upLeft" />
        <div className="h-6 bg-white border-x border-gray-200" />
        <div className="absolute bottom-3 left-5 md:left-[max(20px,calc((100%-1024px)/2))] text-sm text-gray-800">
          © {new Date().getFullYear()} {site.name}
        </div>
      </div>
    </footer>
  )
}
