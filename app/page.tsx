import fs from "fs";
import path from "path";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Social from "@/components/Social";
import Footer from "@/components/Footer";
import { SITE, SOCIAL, CLIENTS, TALKS } from "@/lib/constants";

const VIDEO_EXTS = new Set([".mp4", ".webm"]);
const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function getHeroSources() {
  const dir = path.join(process.cwd(), "public", "hero-content");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return VIDEO_EXTS.has(ext) || IMAGE_EXTS.has(ext);
    })
    .sort()
    .map((f) => {
      const ext = path.extname(f).toLowerCase();
      return {
        type: VIDEO_EXTS.has(ext) ? ("video" as const) : ("image" as const),
        src: `/hero-content/${f}`,
      };
    });
}

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  topics: string[];
}

export default async function Home() {
  const heroSources = getHeroSources();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://nickhageman.com/#person",
        name: SITE.name,
        url: "https://nickhageman.com",
        jobTitle: "AI Coordinator",
        worksFor: {
          "@type": "Organization",
          name: "Ethereum Foundation",
          url: "https://ethereum.org",
        },
        description: SITE.bio,
        image: "https://nickhageman.com/profile.png",
        email: SITE.email,
        sameAs: [
          SOCIAL.linkedin.url,
          SOCIAL.github.url,
        ]
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero sources={heroSources} />
        <About />
        <Projects />
        <Social />
      </main>
      <Footer />
    </>
  );
}
