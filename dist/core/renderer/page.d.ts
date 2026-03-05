import type { SidebarItem, SearchResult, DocConfig } from "../../utils/types.js";
import type { Theme } from "../../utils/types.js";
export interface PageRenderOptions {
    locale: string;
    title: string;
    description: string;
    content: string;
    sidebar: SidebarItem[];
    currentSlug: string;
    config: DocConfig;
    searchIndex: SearchResult[];
    themes: Theme[];
    prevPage?: {
        href: string;
        label: string;
    } | null;
    nextPage?: {
        href: string;
        label: string;
    } | null;
}
export declare function renderPage(options: PageRenderOptions): string;
//# sourceMappingURL=page.d.ts.map