import { icons, themeIcons } from "./icons.js";
function renderThemeOption(theme, isActive = false) {
    const icon = themeIcons[theme.name] || icons.sun;
    return `
    <button class="theme-option${isActive ? " active" : ""}" data-theme="${theme.name}">
      <span class="theme-option-icon">${icon}</span>
      <span class="theme-option-label">${theme.label}</span>
    </button>`;
}
export function renderThemeOptions(themes, activeTheme) {
    return themes
        .map((t) => renderThemeOption(t, t.name === activeTheme))
        .join("");
}
export function renderThemeToggle(themes, currentTheme) {
    const activeTheme = currentTheme || themes[0]?.name || "light";
    const currentIcon = themeIcons[activeTheme] || icons.sun;
    return `
  <div class="theme-toggle">
    <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle theme" data-theme="${activeTheme}">
      <span class="theme-icon-main">${currentIcon}</span>
    </button>
    <div class="theme-dropdown" id="theme-dropdown">
      ${renderThemeOptions(themes, activeTheme)}
    </div>
  </div>`;
}
//# sourceMappingURL=theme-toggle.js.map