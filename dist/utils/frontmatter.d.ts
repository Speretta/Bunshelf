import type { PageMeta } from "./types.js";
export interface ParsedFrontmatter {
    meta: PageMeta;
    body: string;
}
export declare function parseFrontmatter(content: string): ParsedFrontmatter;
export declare function extractTitle(content: string): string | null;
export declare function stripFrontmatter(content: string): string;
//# sourceMappingURL=frontmatter.d.ts.map