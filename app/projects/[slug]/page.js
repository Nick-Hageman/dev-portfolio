import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import projects from '@/data/projects.json'
import Report from '@/components/Report'

// Only projects marked `"page": true` in data/projects.json get a report page;
// any other slug 404s. Each report lives in content/reports/<slug>.md.
const pageProjects = projects.filter((p) => p.page)
export const dynamicParams = false

const REPORTS_DIR = path.join(process.cwd(), 'content', 'reports')

function readReport(slug) {
  const file = path.join(REPORTS_DIR, `${slug}.md`)
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null
}

export function generateStaticParams() {
  return pageProjects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const project = pageProjects.find((p) => p.slug === params.slug)
  return project ? { title: `${project.title} — Report`, description: project.description } : {}
}

export default function ProjectPage({ params }) {
  const project = pageProjects.find((p) => p.slug === params.slug)
  if (!project) notFound()
  const report = readReport(project.slug)

  return (
    <main className="pt-[74px] bg-[#faf9f6]">
      <article className="max-w-4xl mx-auto bg-white px-5 sm:px-10 pt-10 pb-24 min-h-screen border-x border-gray-200">
        <Link href="/#projects" className="font-mono text-sm hover:underline underline-offset-4">
          ← back to projects
        </Link>

        <h2 className="mt-8 text-3xl font-bold font-fraunces mb-6">Report</h2>
        {report ? (
          <Report content={report} />
        ) : (
          <p className="text-gray-600">
            No report yet. Add one at <code className="font-mono">content/reports/{project.slug}.md</code>.
          </p>
        )}
      </article>
    </main>
  )
}
