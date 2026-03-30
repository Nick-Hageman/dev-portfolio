"use client";

import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import ProjectModal from "./ProjectModal";
import { PROJECTS } from "@/lib/constants";
import type { PinnedRepo } from "@/app/page";

type ProjectMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

type ProjectLink =
  | {
      type: "external";
      label: string;
      url: string;
    }
  | {
      type: "modal";
      label: string;
      content: string; // markdown
    };

type Project = {
  title: string;
  description: string;
  tags: string[];
  url: string;
  stars?: number;
  media?: ProjectMedia[];
  links?: ProjectLink[];
};

function MediaCarousel({ title, media }: { title: string; media: ProjectMedia[] }) {
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c === 0 ? media.length - 1 : c - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c === media.length - 1 ? 0 : c + 1));
  };

  const item = media[current];

  return (
    // padding-bottom 56.25% = 16:9 aspect ratio — identical on every card
    <div
      style={{ width: "100%", aspectRatio: "16 / 9", position: "relative" }}
      className="overflow-hidden bg-black"
    >
      {item.type === "image" ? (
        <img
          key={current}
          src={item.src}
          alt={`${title} screenshot ${current + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <video
          key={item.src}
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}

      {media.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: "14px",
              lineHeight: 1,
            }}
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: "14px",
              lineHeight: 1,
            }}
          >
            →
          </button>

          {/* Dot indicators */}
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "5px",
              zIndex: 10,
            }}
          >
            {media.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrent(i);
                }}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const media = project.media ?? [];
  const [modalContent, setModalContent] = useState<string | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded-sm border border-border bg-bg-elevated">
        {/* Media Carousel — uniform 16:9 across all cards */}
        {media.length > 0 && (
          <MediaCarousel title={project.title} media={media} />
        )}

        <div className="p-6">
        {/* Header — original layout preserved */}
        <div className="flex items-start justify-between gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-lg font-semibold text-text-primary hover:text-white transition-colors flex items-center gap-2"
          >
            {project.icon && (
              <img
                src={project.icon.src}
                width={project.icon.width ?? 20}
                height={project.icon.height ?? 20}
                style={{ objectFit: "contain" }}
              />
            )}
            {project.title}
          </a>

          {project.stars != null && project.stars > 0 && (
            <span className="shrink-0 font-mono text-xs text-text-muted">
              &#9733; {project.stars}
            </span>
          )}
        </div>

        {/* Link Tags — original spacing */}
        {project.links && project.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.map((link) =>
              link.type === "external" ? (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-text-muted transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={() => setModalContent(link.content)}
                  className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-text-muted transition-colors hover:text-white"
                >
                  {link.label}
                </button>
              )
            )}
          </div>
        )}

        {/* Description — original spacing */}
        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        {/* Tech Tags — original spacing */}
        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-border px-2 py-0.5 font-mono text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        </div>
      </div>
      {modalContent && (
        <ProjectModal
          content={modalContent}
          onClose={() => setModalContent(null)}
        />
      )}
    </>
  );
}

export default function Projects() {
  const projects: Project[] = PROJECTS.map((p: any) => ({ ...p, stars: 0 }));

  return (
    <SectionWrapper id="projects">
      <h2 className="font-sans text-3xl font-bold tracking-tight text-text-primary">
        Projects
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}