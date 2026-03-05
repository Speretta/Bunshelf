export declare function sanitizeSlug(slug: string): string | null;
export declare function sanitizeLocale(locale: string, allowedLocales: string[]): string | null;
export declare function sanitizePath(path: string): string | null;
export declare function isValidPath(baseDir: string, targetPath: string): boolean;
export declare function sanitizeInput(input: string, maxLength?: number): string;
export declare function sanitizeHtmlAttribute(value: string): string;
export declare function stripTags(html: string): string;
export declare function sanitizeForLog(input: string): string;
//# sourceMappingURL=sanitize.d.ts.map