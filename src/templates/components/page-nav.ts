import type { TranslationStrings } from "../../i18n/index.js";

export function renderPageNav(options: {
  prevPage: { href: string; label: string } | null;
  nextPage: { href: string; label: string } | null;
  i18n: TranslationStrings;
}): string {
  const { prevPage, nextPage, i18n } = options;
  const pageNavLabels = (i18n.pageNav as TranslationStrings) || {};
  const prevLabel = (pageNavLabels.previous as string) || "Previous";
  const nextLabel = (pageNavLabels.next as string) || "Next";
  
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
