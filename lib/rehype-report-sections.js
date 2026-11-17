// Rehype plugin: wraps each <h3> and everything after it (up to the next h1–h3
// or <details>) in <section class="report-step">, so a heading, its text and its
// media render as one card. Only applies to the top level and directly inside
// <details>, so hand-built HTML layouts (e.g. .modal-split) are left alone.
const BOUNDARIES = new Set(['h1', 'h2', 'details'])

function group(children) {
  const out = []
  let section = null
  for (const child of children) {
    const tag = child.type === 'element' ? child.tagName : null
    if (tag === 'h3') {
      section = { type: 'element', tagName: 'section', properties: { className: ['report-step'] }, children: [] }
      out.push(section)
    } else if (BOUNDARIES.has(tag)) {
      section = null
    }
    if (section) section.children.push(child)
    else out.push(child)
  }
  return out
}

function walk(node) {
  for (const child of node.children || []) {
    if (child.type === 'element' && child.tagName === 'details') {
      child.children = group(child.children)
      walk(child)
    }
  }
}

export default function rehypeReportSections() {
  return (tree) => {
    tree.children = group(tree.children)
    walk(tree)
  }
}
