export declare function exists(path: string): Promise<boolean>;
export declare function readTextFile(path: string): Promise<string>;
export declare function readJsonFile<T>(path: string): Promise<T | null>;
export declare function writeTextFile(path: string, content: string): Promise<void>;
export declare function walkDir(dir: string, callback: (path: string) => Promise<void> | void): Promise<void>;
export declare function getMarkdownFiles(dir: string): Promise<string[]>;
export declare function getSlugFromPath(basePath: string, filePath: string): string;
export declare function ensureDir(path: string): Promise<boolean>;
export declare function getParentDir(path: string): string;
//# sourceMappingURL=fs.d.ts.map