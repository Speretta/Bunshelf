import { icons } from "./icons.js";
import { getPageNavTranslations, getMenuLabel } from "../../i18n/accessors.js";
export function renderMobileBottomBar(options) {
    const { prevPage, nextPage, i18n } = options;
    const { previous: prevLabel, next: nextLabel } = getPageNavTranslations(i18n);
    const menuLabel = getMenuLabel(i18n);
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
//# sourceMappingURL=mobile-bottom-bar.js.map