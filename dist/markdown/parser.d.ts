import MarkdownIt from "markdown-it";
declare const supportedLanguages: string[];
declare const languageAliases: Record<string, string>;
declare const md: MarkdownIt;
export declare function parseMarkdown(content: string): string;
export { md, supportedLanguages, languageAliases };
//# sourceMappingURL=parser.d.ts.map