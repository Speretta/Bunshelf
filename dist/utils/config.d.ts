import type { DocConfig } from "./types.js";
export declare function validateConfig(config: Partial<DocConfig>): DocConfig;
export declare function loadConfig(docsDir: string): Promise<DocConfig>;
export declare function getDocsDir(): string;
//# sourceMappingURL=config.d.ts.map