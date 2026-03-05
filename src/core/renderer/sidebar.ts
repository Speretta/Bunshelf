import type { SidebarItem } from "../../utils/types.js";

export function renderSidebar(items: SidebarItem[], currentSlug: string, locale: string = "en"): string {
  const currentHref = locale === "en" ? `/${currentSlug}` : `/${locale}/${currentSlug}`;
  
  return items
    .map((item) => {
      if (item.items && item.items.length > 0) {
        const hasActive = item.items.some(
          (sub) => sub.href === currentHref || sub.href === `/${currentSlug}`
        );

        const categoryItems = item.items
          .map((sub) => {
            const isActive = sub.href === currentHref || sub.href === `/${currentSlug}`;
            return `<a href="${sub.href}" class="sidebar-link preload ${isActive ? "active" : ""}">${sub.label}</a>`;
          })
          .join("");

        return `
          <div class="sidebar-category ${hasActive ? "" : "collapsed"}">
            <div class="sidebar-category-header preload">
              <span>${item.label}</span>
              <svg class="sidebar-category-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div class="sidebar-category-items">
              ${categoryItems}
            </div>
          </div>
        `;
      }

      const isActive = item.href === currentHref || item.href === `/${currentSlug}`;
      return `<a href="${item.href}" class="sidebar-link preload ${isActive ? "active" : ""}">${item.label}</a>`;
    })
    .join("");
}
