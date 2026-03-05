import { renderHead } from "../../templates/head.js";
import { renderNavbarWithThemes, renderSidebarPanel, renderSidebarToggle, renderFooter, renderPageNav, renderMobileBottomBar, } from "../../templates/index.js";
import { renderSidebar } from "./sidebar.js";
import { renderLocaleLinks } from "./locale-links.js";
import { flattenSidebar } from "../../sidebar/generator.js";
import { getTranslations } from "../../i18n/index.js";
export function renderPage(options) {
    const { locale, title, description, content, sidebar, currentSlug, config, searchIndex, themes, prevPage = null, nextPage = null, } = options;
    const base = config.base || "";
    const i18n = getTranslations(locale);
    const sidebarHtml = renderSidebar(sidebar, currentSlug, locale, base);
    const localeLinks = renderLocaleLinks(config.locales, locale, currentSlug, base);
    const homeUrl = locale === "en" ? base + "/" : base + `/${locale}`;
    const currentHref = locale === "en" ? `/${currentSlug}` : `/${locale}/${currentSlug}`;
    const flatPages = flattenSidebar(sidebar);
    const currentIndex = flatPages.findIndex((p) => p.href === currentHref || p.href === `/${currentSlug}`);
    const prev = prevPage ?? (currentIndex > 0 ? (flatPages[currentIndex - 1] ?? null) : null);
    const next = nextPage ?? (currentIndex < flatPages.length - 1 ? (flatPages[currentIndex + 1] ?? null) : null);
    const prevWithBase = prev ? { ...prev, href: base + prev.href } : null;
    const nextWithBase = next ? { ...next, href: base + next.href } : null;
    return `<!DOCTYPE html>
<html lang="${locale}">
${renderHead({ title, siteTitle: config.title, description, logo: config.logo, base })}
<body>
  ${renderNavbarWithThemes({ title: config.title, homeUrl, themes, i18n, logo: config.logo ? base + config.logo : undefined })}

  <div class="layout">
    ${renderSidebarPanel({ localeLinks, sidebarHtml })}
    <main class="main-content">
      <div class="content-wrapper">
        <article class="doc-content">
          ${content}
        </article>
        ${renderPageNav({ prevPage: prevWithBase, nextPage: nextWithBase, i18n })}
      </div>
    </main>
  </div>

  ${renderFooter(i18n)}
  ${renderSidebarToggle()}
  ${renderMobileBottomBar({ prevPage: prevWithBase, nextPage: nextWithBase, i18n })}

  <script>
    window.SEARCH_INDEX = ${JSON.stringify(searchIndex)};
    window.LOCALE = "${locale}";
    window.I18N = ${JSON.stringify(i18n)};
    window.PREV_PAGE = ${prevWithBase ? JSON.stringify(prevWithBase) : "null"};
    window.NEXT_PAGE = ${nextWithBase ? JSON.stringify(nextWithBase) : "null"};
    window.BASE = "${base}";
  </script>
</body>
</html>`;
}
//# sourceMappingURL=page.js.map