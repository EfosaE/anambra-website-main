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


/**
 * Creates a pre-transformed Cloudinary URL to prevent Next.js server timeouts.
 * @param {string} originalUrl The original Cloudinary URL.
 * @param {number} width The target width for the image.
 * @returns {string} The new URL with Cloudinary transformation parameters.
 */
export const getTransformedCloudinaryUrl = (originalUrl:string, width:number): string => {
  // Find the position of '/upload/' in the URL
  const uploadIndex = originalUrl.indexOf('/upload/');
  if (uploadIndex === -1) {
    // If the URL format is unexpected, return the original
    return originalUrl;
  }

  const baseUrl = originalUrl.slice(0, uploadIndex);
  const versionAndPath = originalUrl.slice(uploadIndex + ('/upload/').length);

  // Construct the new URL with transformation parameters
  // w_auto tells Cloudinary to choose the best width up to the provided value
  // f_auto and q_auto are best practices for automatic format and quality
  const transformations = `w_${width},c_limit,f_auto,q_auto`;

  return `${baseUrl}/upload/${transformations}/${versionAndPath}`;
};