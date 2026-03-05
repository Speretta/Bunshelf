import Fuse from "fuse.js";
import type { SearchResult } from "../utils/types.js";
export declare function buildSearchIndex(docsDir: string, locales: string[]): Promise<SearchResult[]>;
export declare function createFuseInstance(items: SearchResult[]): Fuse<SearchResult>;
//# sourceMappingURL=indexer.d.ts.map