import { getPageNavTranslations } from "../../i18n/accessors.js";
export function renderPageNav(options) {
    const { prevPage, nextPage, i18n } = options;
    const { previous: prevLabel, next: nextLabel } = getPageNavTranslations(i18n);
    const prevHtml = prevPage
        ? `<a href="${prevPage.href}" class="page-nav-link prev">
        <span class="page-nav-label">← ${prevLabel}</span>
        <span class="page-nav-title">${prevPage.label}</span>
      </a>`
        : '<div></div>';
    const nextHtml = nextPage
        ? `<a href="${nextPage.href}" class="page-nav-link next">
        <span class="page-nav-label">${nextLabel} →</span>
        <span class="page-nav-title">${nextPage.label}</span>
      </a>`
        : '<div></div>';
    return `
  <nav class="page-nav">
    ${prevHtml}
    ${nextHtml}
  </nav>`;
}
//# sourceMappingURL=page-nav.js.map