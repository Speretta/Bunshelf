import { icons } from "./icons.js";
export function renderSidebarPanel(options) {
    const { localeLinks, sidebarHtml } = options;
    return `
    <aside class="sidebar" id="sidebar">
      ${localeLinks}
      <nav class="sidebar-nav">
        ${sidebarHtml}
      </nav>
    </aside>`;
}
export function renderSidebarToggle() {
    return `
  <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">
    ${icons.menu}
  </button>`;
}
//# sourceMappingURL=sidebar.js.map