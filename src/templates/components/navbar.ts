import type { Theme } from "../../utils/types.js";
import { icons, themeIcons } from "./icons.js";
import type { TranslationStrings } from "../../i18n/index.js";
import { getSearchTranslations, getThemeTranslations } from "../../i18n/accessors.js";
import { renderThemeOptions } from "./theme-toggle.js";
import { DEFAULT_LOGO } from "../../core/constants/defaults.js";

export function renderNavbar(options: {
  title: string;
  homeUrl: string;
  i18n: TranslationStrings;
  logo?: string;
}): string {
  const { title, homeUrl, i18n, logo = DEFAULT_LOGO } = options;
  const { placeholder: searchPlaceholder } = getSearchTranslations(i18n);
  
  return `
  <nav class="navbar">
    <a href="${homeUrl}" class="navbar-brand">
      <img src="${logo}" alt="${title}" class="navbar-logo">
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

export function renderNavbarWithThemes(options: {
  title: string;
  homeUrl: string;
  themes: Theme[];
  currentTheme?: string;
  i18n: TranslationStrings;
  logo?: string;
}): string {
  const { title, homeUrl, themes, currentTheme = "light", i18n, logo = DEFAULT_LOGO } = options;
  
  const currentIcon = themeIcons[currentTheme] || icons.sun;
  const themeLabels = getThemeTranslations(i18n);
  
  const themedLabels = themes.map(t => ({
    ...t,
    label: themeLabels[t.name] || t.label,
  }));
  
  const themeOptions = renderThemeOptions(themedLabels, currentTheme);

  const themeToggle = `
    <div class="theme-toggle">
      <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle theme" data-theme="${currentTheme}">
        <span class="theme-icon-main">${currentIcon}</span>
      </button>
      <div class="theme-dropdown" id="theme-dropdown">
        ${themeOptions}
      </div>
    </div>`;

  const navbar = renderNavbar({ title, homeUrl, i18n, logo });
  return navbar.replace("{{THEME_TOGGLE}}", themeToggle);
}
