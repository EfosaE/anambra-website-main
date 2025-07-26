// utils/markdown.ts
import { marked, type Tokens } from "marked";

const renderer = {
  link(this: any, { href, title, text }: Tokens.Link) {
    return `<a href="${href}" title="${title ?? ''}" class="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">${text}</a>`;
  }
};

marked.use({ renderer });

export function parseMarkdown(markdown: string): string {
  return marked.parse(markdown) as string;
}

// Simple and reliable HTML converter
export function toBulletedHTMLList(rawString: string): string {
  const items = rawString
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => `<li>${line.slice(1).trim()}</li>`)
    .join("\n");

  return `<ul style="list-style-type: disc; padding-left: 1.5rem;">\n${items}\n</ul>`;
}

export function parseRichContent(content: string): string {
  const lines = content.split("\n").map((line) => line.trim());

  const bulletCount = lines.filter((line) => line.startsWith("-")).length;
  const totalLines = lines.filter((line) => line.length > 0).length;

  const bulletRatio = bulletCount / totalLines;

  // If mostly bullets or all bullets, treat it as a list
  if (bulletRatio >= 0.6) {
    return toBulletedHTMLList(content);
  }

  // Fallback to markdown parser
  return parseMarkdown(content);
}
