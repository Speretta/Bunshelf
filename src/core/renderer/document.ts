import { parseMarkdown } from "../../markdown/parser.js";
import { UNTITLED } from "../constants/defaults.js";
import { parseFrontmatter } from "../../utils/frontmatter.js";

export interface ParsedDocument {
  meta: {
    title: string;
    description?: string;
  };
  html: string;
}

export function parseDocument(content: string): ParsedDocument {
  const { meta, body } = parseFrontmatter(content);

  const html = parseMarkdown(body);

  return { 
    meta: {
      title: meta.title || UNTITLED,
      description: meta.description,
    }, 
    html 
  };
}
