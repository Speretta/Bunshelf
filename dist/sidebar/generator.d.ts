import type { SidebarItem } from "../utils/types.js";
export declare function generateSidebar(docsDir: string, locale: string, configSidebar?: SidebarItem[]): Promise<SidebarItem[]>;
export declare function flattenSidebar(items: SidebarItem[]): Array<{
    label: string;
    href: string;
}>;
//# sourceMappingURL=generator.d.ts.map