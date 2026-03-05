import type { Theme } from "../../utils/types.js";
import { icons, themeIcons } from "./icons.js";

export function renderThemeToggle(themes: Theme[]): string {
  const currentTheme = themes[0]?.name || "light";
  const currentIcon = themeIcons[currentTheme] || icons.sun;

  const themeOptions = themes
    .map((t) => {
      const icon = themeIcons[t.name] || icons.sun;
      return `
        <button class="theme-option" data-theme="${t.name}">
          <span class="theme-option-icon">${icon}</span>
          <span class="theme-option-label">${t.label}</span>
        </button>`;
    })
    .join("");

  return `
  <div class="theme-toggle">
    <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle theme" data-theme="${currentTheme}">
      <span class="theme-icon-main">${currentIcon}</span>
    </button>
    <div class="theme-dropdown" id="theme-dropdown">
      ${themeOptions}
    </div>
  </div>`;
}

export function renderThemeOptions(themes: Theme[]): string {
  return themes
    .map((t) => {
      const icon = themeIcons[t.name] || icons.sun;
      return `
        <button class="theme-option" data-theme="${t.name}">
          <span class="theme-option-icon">${icon}</span>
          <span class="theme-option-label">${t.label}</span>
        </button>`;
    })
    .join("");
}
