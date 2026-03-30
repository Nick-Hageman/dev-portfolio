"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** True when a paragraph's only meaningful child is an <img> so we can skip
 *  the wrapping <p> and avoid the invalid <p>→<figure> hydration error. */
function isSingleImage(children: React.ReactNode): boolean {
  const arr = Array.isArray(children) ? children : [children];
  const real = arr.filter((c) => !(typeof c === "string" && c.trim() === ""));
  if (real.length !== 1) return false;
  const child = real[0] as any;
  return child?.type === "img" || child?.props?.src !== undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// Accordion
// ─────────────────────────────────────────────────────────────────────────────
function Accordion({
  summary,
  children,
}: {
  summary: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`modal-accordion${open ? " modal-accordion--open" : ""}`}>
      <button
        className="modal-accordion-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{summary}</span>
        <span className="modal-accordion-chevron">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="modal-accordion-body">{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Modal
// ─────────────────────────────────────────────────────────────────────────────
export default function ProjectModal({
  content,
  onClose,
}: {
  content: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = orig; };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const components: Components = {
    h1: ({ children }) => <h1 className="modal-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="modal-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="modal-h3">{children}</h3>,

    // Skip <p> wrapper when the only child is an image to prevent
    // invalid <p>→<figure> nesting and the resulting hydration error.
    p: ({ children }) =>
      isSingleImage(children) ? <>{children}</> : <p className="modal-p">{children}</p>,

    img: ({ src, alt }) => (
      <figure className="modal-figure">
        <img src={src} alt={alt ?? ""} className="modal-img" />
        {alt && <figcaption className="modal-figcaption">{alt}</figcaption>}
      </figure>
    ),

    strong: ({ children }) => <strong className="modal-strong">{children}</strong>,
    em:     ({ children }) => <em className="modal-em">{children}</em>,
    ul:     ({ children }) => <ul className="modal-ul">{children}</ul>,
    ol:     ({ children }) => <ol className="modal-ol">{children}</ol>,
    li:     ({ children }) => <li className="modal-li">{children}</li>,

    blockquote: ({ children }) => (
      <blockquote className="modal-blockquote">{children}</blockquote>
    ),
    hr: () => <hr className="modal-hr" />,
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="modal-link">
        {children}
      </a>
    ),

    // Suppress the outer <pre> ReactMarkdown adds — our code renderer
    // already wraps everything in its own styled <div><pre>.
    pre: ({ children }) => <>{children}</>,

    code({ children, className }) {
      const isBlock = Boolean(className);
      if (isBlock) {
        const lang = className?.replace("language-", "") ?? "";
        return (
          <div className="modal-code-block">
            {lang && <span className="modal-code-lang">{lang}</span>}
            <pre><code className={className}>{children}</code></pre>
          </div>
        );
      }
      return <code className="modal-code-inline">{children}</code>;
    },

    table:   ({ children }) => (
      <div className="modal-table-wrapper">
        <table className="modal-table">{children}</table>
      </div>
    ),
    th: ({ children }) => <th className="modal-th">{children}</th>,
    td: ({ children }) => <td className="modal-td">{children}</td>,

    // ── Accordion via <details><summary>…</summary>…</details> ─────────────
    // rehype-raw renders these as real DOM nodes so children come through as
    // rendered React elements. We find the summary by its node tagName.
    details: ({ children, node: _node, ...rest }) => {
      const kids = Array.isArray(children) ? children : [children];

      // The summary element arrives as a React element whose underlying
      // hast node has tagName "summary".
      const summaryEl = kids.find((c: any) => {
        return (
          c?.props?.node?.tagName === "summary" ||
          c?.type === "summary" ||
          (typeof c === "object" && c !== null && (c as any).key?.includes("summary"))
        );
      }) as any;

      const summaryContent = summaryEl?.props?.children ?? "Details";
      const bodyKids = kids.filter((c: any) => c !== summaryEl);

      return <Accordion summary={summaryContent}>{bodyKids}</Accordion>;
    },
    summary: () => null, // rendered inside <details> above

    // ── Layout divs — drop the internal `node` prop so it never lands on DOM
    div: ({ className, children, node: _node, ...rest }) => (
      <div className={className ?? ""} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    ),
  };

  if (typeof document === "undefined") return null;

  // fix for pointer?
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  return createPortal(
    <>
      <style>{MODAL_CSS}</style>
      <div
        className="modal-overlay"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-panel">
          <div className="modal-header">
            <div className="modal-header-label">
              <span className="modal-header-dot" />
              Project Report
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
          <div className="modal-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={components}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>,
    portalRoot
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const MODAL_CSS = `
  /* cursor:default ensures the pointer is never hidden by the blur layer */
  * {
    cursor: none !important;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    padding: 32px 16px;
    box-sizing: border-box;
    cursor: auto;
    animation: modal-fade-in 0.18s ease;
  }
  @keyframes modal-fade-in { from{opacity:0} to{opacity:1} }

  .modal-panel {
    position: relative;
    width: 100%;
    max-width: 1000px;
    height: calc(100vh - 64px);
    max-height: 920px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.09);
    background: #111214;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.04),
      0 32px 80px rgba(0,0,0,0.7),
      0 8px 24px rgba(0,0,0,0.5);
    cursor: default;
    animation: modal-slide-in 0.22s cubic-bezier(0.16,1,0.3,1);
    pointer-events: auto;
  }
  @keyframes modal-slide-in {
    from { opacity:0; transform:translateY(18px) scale(0.98) }
    to   { opacity:1; transform:translateY(0)    scale(1)    }
  }

  .modal-header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.02);
    border-radius: 10px 10px 0 0;
  }
  .modal-header-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: ui-monospace,'Cascadia Code','Fira Code',monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }
  .modal-header-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.2);
  }
  .modal-close-btn {
    display: flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.08);
    background: transparent; color: rgba(255,255,255,0.4);
    cursor: pointer; font-size: 14px;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }
  .modal-close-btn:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.85);
  }

  .modal-body {
    flex: 1 1 0;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 48px 56px 64px;
    scroll-behavior: smooth;
  }
  .modal-body::-webkit-scrollbar { width: 5px }
  .modal-body::-webkit-scrollbar-track { background: transparent }
  .modal-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 99px }
  .modal-body::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22) }

  /* ── Typography ─────────────────────────────────────────────────────────── */
  .modal-h1 {
    font-family: ui-sans-serif,system-ui,sans-serif;
    font-size: 2.1rem; font-weight: 700;
    letter-spacing: -0.03em; line-height: 1.2;
    color: #f5f5f5; margin: 0 0 12px;
  }
  .modal-h2 {
    font-family: ui-sans-serif,system-ui,sans-serif;
    font-size: 1.25rem; font-weight: 600;
    letter-spacing: -0.02em; color: #e8e8e8;
    margin: 52px 0 16px; padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .modal-h3 {
    font-family: ui-sans-serif,system-ui,sans-serif;
    font-size: 1.05rem; font-weight: 600;
    color: #d4d4d4; margin: 10px 0 10px;
  }
  .modal-p {
    font-size: 0.925rem; line-height: 1.85;
    color: rgba(255,255,255,0.62); margin: 0 0 18px;
  }
  .modal-strong { font-weight: 600; color: rgba(255,255,255,0.85) }
  .modal-em     { font-style: italic; color: rgba(255,255,255,0.55) }

  .modal-ul, .modal-ol {
    margin: 6px 0 20px; padding-left: 22px;
    color: rgba(255,255,255,0.62);
    font-size: 0.925rem; line-height: 1.8;
  }
  .modal-ul { list-style-type: disc }
  .modal-ol { list-style-type: decimal }
  .modal-li { margin-bottom: 6px; padding-left: 4px }
  .modal-li > .modal-p { margin: 0 }
  .modal-li::marker { color: rgba(255,255,255,0.25) }

  .modal-blockquote {
    border-left: 2px solid rgba(255,255,255,0.18);
    margin: 28px 0; padding: 14px 20px;
    background: rgba(255,255,255,0.03);
    border-radius: 0 6px 6px 0;
    font-size: 0.925rem; line-height: 1.75;
    color: rgba(255,255,255,0.48); font-style: italic;
  }
  .modal-blockquote .modal-p { margin: 0; color: inherit }

  .modal-hr { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 44px 0 }

  /* ── Code ───────────────────────────────────────────────────────────────── */
  .modal-code-inline {
    font-family: ui-monospace,'Cascadia Code','Fira Code',monospace;
    font-size: 0.82em;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px; padding: 1px 6px; color: #c9d1d9;
  }
  .modal-code-block {
    margin: 24px 0; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    background: #0d0d0f; overflow: hidden;
  }
  .modal-code-lang {
    display: block; padding: 7px 16px;
    font-family: ui-monospace,monospace;
    font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.03);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .modal-code-block pre {
    margin: 0; padding: 18px 20px; overflow-x: auto;
    font-family: ui-monospace,'Cascadia Code','Fira Code',monospace;
    font-size: 0.82rem; line-height: 1.7; color: #c9d1d9;
  }
  .modal-code-block pre::-webkit-scrollbar { height: 4px }
  .modal-code-block pre::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px }

  /* ── Images ─────────────────────────────────────────────────────────────── */
  .modal-figure { display: block; margin: 28px 0 }
  .modal-img {
    width: 90%; height: auto; display: block;
    border-radius: 7px; border: 1px solid rgba(255,255,255,0.08); object-fit: cover;
  }
  .modal-figcaption { margin-top: 8px; font-size: 0.78rem; text-align: center; color: rgba(255,255,255,0.3); font-style: italic }

  /* ── Layout helpers ─────────────────────────────────────────────────────── */

  /* Side-by-side images  ── use in markdown:
       <div class="modal-image-row">

       ![Caption A](a.png)
       ![Caption B](b.png)

       </div>                                                                  */
  .modal-image-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
    gap: 14px; margin: 28px 0;
  }
  .modal-image-row .modal-figure { margin: 0 }

  /* Text-left / image-right split  ── use in markdown:
       <div class="modal-split">
       <div class="modal-split-text">

       Your text…

       </div>
       <div class="modal-split-media">

       ![alt](img.png)

       </div>
       </div>                                                                  */
.modal-split {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr; /* 👈 slightly favor text */
  gap: 32px;
  align-items: center; /* 👈 aligns image + text vertically */
  margin: 16px 0;
}
  .modal-split-text { font-size: 0.925rem; line-height: 1.8; color: rgba(255,255,255,0.62) }
  .modal-split-text .modal-p { margin: 0 0 14px }
  .modal-split-text .modal-ul,
  .modal-split-text .modal-ol { margin: 0 0 14px }
  .modal-split-media .modal-figure { margin: 0 }

.modal-split-media {
    display: flex;
    align-items: center;     /* vertical alignment */
    justify-content: center; /* horizontal centering */
}

.modal-split-media .modal-img {
  width: 100%;
  max-width: 420px;   /* 👈 key: prevents it from blowing up */
  max-height: 260px;
  height: auto;
  object-fit: contain; /* 👈 avoids weird cropping */
}

  /* Callout box  ── use in markdown:
       <div class="modal-callout">⚠️ Your note here.</div>                    */
  .modal-callout {
    display: flex; gap: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 8px; padding: 16px 20px; margin: 24px 0;
    font-size: 0.9rem; line-height: 1.7; color: rgba(255,255,255,0.55);
  }

  /* ── Table ──────────────────────────────────────────────────────────────── */
  .modal-table-wrapper {
    overflow-x: auto; margin: 24px 0;
    border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);
  }
  .modal-table { width: 100%; border-collapse: collapse; font-size: 0.875rem }
  .modal-th {
    padding: 10px 16px; text-align: left;
    font-weight: 600; font-size: 0.78rem;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.03);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    white-space: nowrap;
  }
  .modal-td {
    padding: 10px 16px; color: rgba(255,255,255,0.6);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    vertical-align: top;
  }
  .modal-table tr:last-child .modal-td { border-bottom: none }

  /* ── Links ──────────────────────────────────────────────────────────────── */
  .modal-link {
    color: rgba(255,255,255,0.75);
    text-decoration: underline; text-underline-offset: 3px;
    text-decoration-color: rgba(255,255,255,0.25);
    transition: color 0.15s, text-decoration-color 0.15s;
  }
  .modal-link:hover { color: #fff; text-decoration-color: rgba(255,255,255,0.6) }

  /* ── Accordion ──────────────────────────────────────────────────────────── */
  .modal-accordion {
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px; margin: 10px 0; overflow: hidden;
    background: rgba(255,255,255,0.02);
    transition: border-color 0.15s;
  }
  .modal-accordion--open { border-color: rgba(255,255,255,0.14) }
  .modal-accordion-trigger {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: 14px 18px; background: transparent; border: none;
    cursor: pointer;
    font-family: ui-sans-serif,system-ui,sans-serif;
    font-size: 0.9rem; font-weight: 600;
    color: rgba(255,255,255,0.75); text-align: left;
    transition: background 0.15s, color 0.15s;
  }
  .modal-accordion-trigger:hover { background: rgba(255,255,255,0.04); color: #fff }
  .modal-accordion-chevron { font-size: 9px; color: rgba(255,255,255,0.3); flex-shrink: 0; margin-left: 12px }
  .modal-accordion-body {
    padding: 6px 22px 22px;
    border-top: 1px solid rgba(255,255,255,0.06);
    animation: accordion-open 0.18s ease;
  }
  @keyframes accordion-open {
    from { opacity: 0; transform: translateY(-6px) }
    to   { opacity: 1; transform: translateY(0) }
  }

  /* ── Responsive ─────────────────────────────────────────────────────────── */
  @media (max-width: 700px) {
    .modal-body     { padding: 32px 24px 48px }
    .modal-h1       { font-size: 1.5rem }
    .modal-split    { grid-template-columns: 1fr }
    .modal-image-row{ grid-template-columns: 1fr }
  }
`;