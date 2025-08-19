// utils/markdown.ts
import { marked, type Tokens } from "marked";

import DOMPurify from "isomorphic-dompurify";



const renderer = {
  link(this: any, { href, title, text }: Tokens.Link) {
    return `<a href="${href}" title="${
      title ?? ""
    }" class="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">${text}</a>`;
  },
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

export function parseRichContent(content: string | any[]): string {
  if (!content) return "";

  // Case 1: Strapi Rich Text (blocks)
  if (Array.isArray(content)) {
    return parseRichText(content);
  }

  // Case 2: Plain string (Markdown / bullets)
  if (typeof content === "string") {
    const lines = content.split("\n").map((line) => line.trim());

    const bulletCount = lines.filter((line) => line.startsWith("-")).length;
    const totalLines = lines.filter((line) => line.length > 0).length;

    const bulletRatio = totalLines > 0 ? bulletCount / totalLines : 0;

    // If mostly bullets or all bullets, treat it as a list
    if (bulletRatio >= 0.6) {
      return toBulletedHTMLList(content);
    }

    // Fallback to markdown parser
    return parseMarkdown(content);
  }

  // Anything else
  return "";
}

/**
 * Creates a pre-transformed Cloudinary URL to prevent Next.js server timeouts.
 * @param {string} originalUrl The original Cloudinary URL.
 * @param {number} width The target width for the image.
 * @returns {string} The new URL with Cloudinary transformation parameters.
 */
export const getTransformedCloudinaryUrl = (
  originalUrl: string,
  width: number
): string => {
  // Find the position of '/upload/' in the URL
  const uploadIndex = originalUrl.indexOf("/upload/");
  if (uploadIndex === -1) {
    // If the URL format is unexpected, return the original
    return originalUrl;
  }

  const baseUrl = originalUrl.slice(0, uploadIndex);
  const versionAndPath = originalUrl.slice(uploadIndex + "/upload/".length);

  // Construct the new URL with transformation parameters
  // w_auto tells Cloudinary to choose the best width up to the provided value
  // f_auto and q_auto are best practices for automatic format and quality
  const transformations = `w_${width},c_limit,f_auto,q_auto`;

  return `${baseUrl}/upload/${transformations}/${versionAndPath}`;
};

/**
 * Convert Strapi Rich Text (blocks) into an HTML string.
 */
export function parseRichText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block: any) => {
      switch (block.type) {
        case "paragraph": {
          const inner = block.children?.map(renderChild).join("") || "";
          return `<p>${inner}</p>`;
        }

        case "heading": {
          const level = block.level ?? 2; // default to h2 if not provided
          const inner = block.children?.map(renderChild).join("") || "";
          return `<h${level}>${inner}</h${level}>`;
        }

        case "list": {
          const items =
            block.children
              ?.map((item: any) => {
                const inner = item.children?.map(renderChild).join("") || "";
                return `<li>${inner}</li>`;
              })
              .join("") || "";
          return `<ul style="list-style-type: disc; padding-left: 1.5rem;">${items}</ul>`;
        }

        default:
          return "";
      }
    })
    .join("\n");
}

/**
 * Render inline child nodes (text, bold, italic, link).
 */
function renderChild(child: any): string {
  if (!child) return "";

  if (child.type === "text") {
    let text = child.text || "";

    if (child.bold) {
      text = `<strong>${text}</strong>`;
    }
    if (child.italic) {
      text = `<em>${text}</em>`;
    }

    return text;
  }

  if (child.type === "link") {
    const linkInner = (child.children || [])
      .map((c: any) => renderChild(c))
      .join("");
    return `<a href="${child.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">${linkInner}</a>`;
  }

  return "";
}


export function safeParseRichContent(content: string | any[]): string {
  return DOMPurify.sanitize(parseRichContent(content));
}
