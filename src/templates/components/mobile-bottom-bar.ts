import { icons } from "./icons.js";
import type { TranslationStrings } from "../../i18n/index.js";

export function renderMobileBottomBar(options: {
  prevPage: { href: string; label: string } | null;
  nextPage: { href: string; label: string } | null;
  i18n: TranslationStrings;
}): string {
  const { prevPage, nextPage, i18n } = options;
  const pageNavLabels = (i18n.pageNav as TranslationStrings) || {};
  const prevLabel = (pageNavLabels.previous as string) || "Prev";
  const nextLabel = (pageNavLabels.next as string) || "Next";
  const menuLabel = "Menu";
  
  const prevHtml = prevPage
    ? `<a href="${prevPage.href}" class="nav-btn" data-nav="prev">
        ${icons.chevronLeft}
        <span>${prevLabel}</span>
      </a>`
    : `<button class="nav-btn" disabled data-nav="prev">
        ${icons.chevronLeft}
        <span>${prevLabel}</span>
      </button>`;

  const nextHtml = nextPage
    ? `<a href="${nextPage.href}" class="nav-btn" data-nav="next">
        ${icons.chevronRight}
        <span>${nextLabel}</span>
      </a>`
    : `<button class="nav-btn" disabled data-nav="next">
        ${icons.chevronRight}
        <span>${nextLabel}</span>
      </button>`;

  return `
  <div class="mobile-bottom-bar">
    ${prevHtml}
    <button class="nav-btn sidebar-toggle-btn" id="mobile-sidebar-toggle" aria-label="${menuLabel}">
      ${icons.menu}
      <span>${menuLabel}</span>
    </button>
    ${nextHtml}
  </div>`;
}
