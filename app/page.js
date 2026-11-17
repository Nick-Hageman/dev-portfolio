import AutoVideo from '@/components/AutoVideo'
import CurveDivider from '@/components/CurveDivider'
import ProjectCard from '@/components/ProjectCard'
import SocialIcon from '@/components/SocialIcon'
import { site } from '@/data/site'
import projects from '@/data/projects.json'
import { resolveVideo } from '@/lib/media'

const BG = '#faf9f6'
// Paths are relative to /public.
const BANNER_VIDEO = '/LOGOS/portfolio.mp4'
const AVATAR = '/LOGOS/pfp.webp'

export default function Home() {
  return (
    <main className="pt-[74px]" style={{ background: BG }}>
      <div className="portfolio-banner px-5 py-16 sm:py-24 text-white relative isolate overflow-hidden max-w-6xl mx-auto">
        <div className="max-w-5xl mx-auto pt-8 sm:pt-12">
          <h1 className="font-bold text-[clamp(1.875rem,9.5vw,2.75rem)] leading-[1.05] sm:text-6xl font-fraunces">{site.name}</h1>
          <h2 className="mt-4 text-sm sm:text-xl leading-relaxed font-mono">
            <span className="block sm:inline">{site.tagline[0]}</span>
            <span className="hidden sm:inline"> • </span>
            <span className="block sm:inline">{site.tagline[1]}</span>
          </h2>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 -z-10" />
        <AutoVideo
          src={BANNER_VIDEO}
          poster={resolveVideo(BANNER_VIDEO).poster}
          disablePictureInPicture
          className="absolute top-0 left-0 w-full h-full object-cover -z-20"
        />
      </div>
      <CurveDivider variant="inverseDownLeft" color={BG} className="-mt-6 sm:-mt-12" />
      <CurveDivider variant="upRight" />

      <div className="px-5 py-16 max-w-6xl mx-auto bg-white relative" id="about">
        <div className="absolute -top-48 right-12 hidden md:block">
          <div className="w-80 h-80 rounded-full overflow-hidden border-[18px] border-white relative z-10 bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={AVATAR} alt="Me!" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold font-fraunces">Hey there!</h1>
          <div className="mt-5 text-lg leading-relaxed sm:text-xl sm:leading-normal text-gray-800">
            <p>
              I&apos;m <span className="font-fraunces font-semibold">Nick</span>, a software engineer based in {' '}
              <span className="text-yellow-600 font-semibold"> San Diego 🌴</span>
            </p>
            <div className="mt-4 flex flex-col gap-2 border-l-2 border-gray-200 pl-4 ml-1">
              <div className="relative">
                <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">Now</span>
                <div>{site.now}</div>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-gray-300" />
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Previously</span>
                <div>{site.previously}</div>
              </div>
            </div>
            <div className="mt-4">
              <p>Some notable things I&apos;ve done:</p>
              <ul className="mt-4 gap-3 sm:gap-2 flex flex-col">
                {site.highlights.map((h) => (
                  <li key={h.text}>
                    {h.emoji}
                    <span className="sm:mr-4" />{' '}
                    {h.link ? (
                      <>
                        {h.text.split(h.link.label)[0]}
                        <a href={h.link.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                          {h.link.label}
                        </a>
                        {h.text.split(h.link.label)[1]}
                      </>
                    ) : (
                      h.text
                    )}
                    {h.redacted && (
                      <>
                        {' '}
                        <span className="bg-black text-black px-1 select-none">REDACTED</span>.
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-row gap-4 mt-6 font-fraunces text-lg flex-wrap">
              {site.contacts.map((c) => (
                <a
                  key={c.href}
                  className="inline-flex items-center gap-2 py-1 px-3 bg-gray-100 rounded-lg hover:underline underline-offset-4"
                  href={c.href}
                  {...(c.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
                >
                  <SocialIcon name={c.icon} className="shrink-0" />
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CurveDivider variant="downRight" />
      <CurveDivider variant="upLeft" />

      <div className="px-5 pb-16 pt-8 max-w-6xl mx-auto bg-white" id="projects">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold font-inter tracking-tight">Projects</h1>
          <div className="mt-2 text-2xl text-gray-800">A collection of some school & hobby projects</div>
          <div className="mt-8 grid sm:grid-cols-5 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} span={i % 4 === 0 || i % 4 === 3 ? 3 : 2} />
            ))}
          </div>
        </div>
      </div>
      <CurveDivider variant="downRight" />
    </main>
  )
}
