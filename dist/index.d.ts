export { parseDocument, type ParsedDocument } from "./core/renderer/document.js";
export { renderPage, type PageRenderOptions } from "./core/renderer/page.js";
export { renderSidebar } from "./core/renderer/sidebar.js";
export { renderLocaleLinks } from "./core/renderer/locale-links.js";
export { generateSidebar, flattenSidebar } from "./sidebar/generator.js";
export { buildSearchIndex } from "./search/indexer.js";
export { loadConfig } from "./utils/config.js";
export { loadTranslations, getTranslations, type TranslationStrings } from "./i18n/index.js";
export { themes } from "./themes/registry.js";
export { renderHead } from "./templates/head.js";
export type { DocConfig, SidebarItem, PageMeta, SearchResult, Theme } from "./utils/types.js";
//# sourceMappingURL=index.d.ts.map