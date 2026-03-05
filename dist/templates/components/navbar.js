import { icons, themeIcons } from "./icons.js";
export function renderNavbar(options) {
    const { title, homeUrl, i18n } = options;
    const searchPlaceholder = i18n.search?.placeholder || "Search...";
    return `
  <nav class="navbar">
    <a href="${homeUrl}" class="navbar-brand">
      <img src="/assets/images/logo.webp" alt="${title}" class="navbar-logo">
      <span class="navbar-brand-text">${title}</span>
    </a>
    <div class="navbar-actions">
      <div class="search-container">
        <div class="search-input-wrapper">
          ${icons.search}
          <input type="text" class="search-input" placeholder="${searchPlaceholder}" id="search-input" autocomplete="off">
          <div class="search-shortcut"><kbd>Ctrl</kbd><span>+</span><kbd>K</kbd></div>
        </div>
        <div class="search-results-container" id="search-results"></div>
      </div>
      {{THEME_TOGGLE}}
    </div>
  </nav>`;
}
export function renderNavbarWithThemes(options) {
    const { title, homeUrl, themes, currentTheme = "light", i18n } = options;
    const currentIcon = themeIcons[currentTheme] || icons.sun;
    const themeLabels = i18n.theme || {};
    const themeOptions = themes
        .map((t) => {
        const icon = themeIcons[t.name] || icons.sun;
        const label = themeLabels[t.name] || t.label;
        return `
        <button class="theme-option${t.name === currentTheme ? " active" : ""}" data-theme="${t.name}">
          <span class="theme-option-icon">${icon}</span>
          <span class="theme-option-label">${label}</span>
        </button>`;
    })
        .join("");
    const themeToggle = `
    <div class="theme-toggle">
      <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle theme" data-theme="${currentTheme}">
        <span class="theme-icon-main">${currentIcon}</span>
      </button>
      <div class="theme-dropdown" id="theme-dropdown">
        ${themeOptions}
      </div>
    </div>`;
    const navbar = renderNavbar({ title, homeUrl, i18n });
    return navbar.replace("{{THEME_TOGGLE}}", themeToggle);
}
//# sourceMappingURL=navbar.js.map