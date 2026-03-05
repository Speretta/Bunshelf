import type { SidebarItem, SearchResult, DocConfig } from "../../utils/types.js";
import { renderHead } from "../../templates/head.js";
import {
  renderNavbarWithThemes,
  renderSidebarPanel,
  renderSidebarToggle,
  renderFooter,
  renderPageNav,
  renderMobileBottomBar,
} from "../../templates/index.js";
import { renderSidebar } from "./sidebar.js";
import { renderLocaleLinks } from "./locale-links.js";
import { flattenSidebar } from "../../sidebar/generator.js";
import type { Theme } from "../../utils/types.js";
import { getTranslations, type TranslationStrings } from "../../i18n/index.js";

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
  prevPage?: { href: string; label: string } | null;
  nextPage?: { href: string; label: string } | null;
}

export function renderPage(options: PageRenderOptions): string {
  const {
    locale,
    title,
    description,
    content,
    sidebar,
    currentSlug,
    config,
    searchIndex,
    themes,
    prevPage = null,
    nextPage = null,
  } = options;

  const i18n: TranslationStrings = getTranslations(locale);
  
  const sidebarHtml = renderSidebar(sidebar, currentSlug, locale);
  const localeLinks = renderLocaleLinks(config.locales, locale, currentSlug);

  const homeUrl = locale === "en" ? "/" : `/${locale}`;

  const currentHref = locale === "en" ? `/${currentSlug}` : `/${locale}/${currentSlug}`;
  const flatPages = flattenSidebar(sidebar);
  const currentIndex = flatPages.findIndex(
    (p) => p.href === currentHref || p.href === `/${currentSlug}`
  );
  const prev = prevPage ?? (currentIndex > 0 ? (flatPages[currentIndex - 1] ?? null) : null);
  const next = nextPage ?? (currentIndex < flatPages.length - 1 ? (flatPages[currentIndex + 1] ?? null) : null);

  return `<!DOCTYPE html>
<html lang="${locale}">
${renderHead({ title, siteTitle: config.title, description, logo: config.logo })}
<body>
  ${renderNavbarWithThemes({ title: config.title, homeUrl, themes, i18n, logo: config.logo })}

  <div class="layout">
    ${renderSidebarPanel({ localeLinks, sidebarHtml })}
    <main class="main-content">
      <div class="content-wrapper">
        <article class="doc-content">
          ${content}
        </article>
        ${renderPageNav({ prevPage: prev, nextPage: next, i18n })}
      </div>
    </main>
  </div>

  ${renderFooter(i18n)}
  ${renderSidebarToggle()}
  ${renderMobileBottomBar({ prevPage: prev, nextPage: next, i18n })}

  <script>
    window.SEARCH_INDEX = ${JSON.stringify(searchIndex)};
    window.LOCALE = "${locale}";
    window.I18N = ${JSON.stringify(i18n)};
    window.PREV_PAGE = ${prev ? JSON.stringify(prev) : "null"};
    window.NEXT_PAGE = ${next ? JSON.stringify(next) : "null"};
  </script>
</body>
</html>`;
}
