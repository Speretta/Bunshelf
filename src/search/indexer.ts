import Fuse from "fuse.js";
import type { SearchResult, DocConfig } from "../utils/types.js";
import { getMarkdownFiles, getSlugFromPath, readTextFile, exists } from "../utils/fs.js";
import { join } from "node:path";
import { parseMarkdown } from "../markdown/parser.js";
import { extractTitle, stripFrontmatter } from "../utils/frontmatter.js";
import { getLocalePrefix } from "../utils/navigation.js";

export async function buildSearchIndex(
  docsDir: string,
  locales: string[],
  config: DocConfig
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  
  for (const locale of locales) {
    const localeDir = join(docsDir, locale);
    const prefix = getLocalePrefix(locale, config);
    
    if (!(await exists(localeDir))) continue;
    
    const files = await getMarkdownFiles(localeDir);
    
    for (const file of files) {
      const content = await readTextFile(file);
      const plainContent = stripFrontmatter(content);
      const html = parseMarkdown(plainContent);
      const fullText = stripHtml(html);
      const excerpt = fullText.slice(0, 200);
      
      const slug = getSlugFromPath(localeDir, file);
      const title = extractTitle(content) || slug;
      
      results.push({
        title,
        href: `/${prefix}/${slug}`,
        excerpt,
        content: fullText,
        locale,
      });
    }
  }
  
  return results;
}

export function createFuseInstance(items: SearchResult[]): Fuse<SearchResult> {
  return new Fuse(items, {
    keys: ["title", "content"],
    threshold: 0.3,
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
    findAllMatches: true,
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
