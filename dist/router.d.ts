import type { RouteParams, DocConfig } from "./utils/types.js";
export declare function parseRoute(url: string, config: DocConfig): RouteParams | null;
export declare function getDocPath(params: RouteParams, docsDir: string): string;
export declare function buildUrl(locale: string, path: string[]): string;
export declare function isAssetRequest(url: string): boolean;
export declare function isSearchRequest(url: string): boolean;
//# sourceMappingURL=router.d.ts.map