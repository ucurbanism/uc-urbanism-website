import { marked } from 'marked';

/** Markdown (paragraphs, inline links) -> HTML. Used for editor-managed prose. */
export function md(src: string | undefined): string {
  return src ? (marked.parse(src, { async: false }) as string) : '';
}

/** Inline markdown (links/emphasis only, no wrapping <p>). */
export function mdInline(src: string | undefined): string {
  return src ? (marked.parseInline(src, { async: false }) as string) : '';
}

/** Multi-line text field -> one string per non-empty line (rendered as one <p> each). */
export function lines(src: string | undefined): string[] {
  return (src ?? '').split(/\r?\n/).filter((l) => l.trim().length > 0);
}
