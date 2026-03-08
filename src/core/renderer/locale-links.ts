import { getLocalePrefix } from "../../utils/navigation.js";
import type { DocConfig } from "../../utils/types.js";

export function renderLocaleLinks(
  config: DocConfig,
  currentLocale: string,
  currentSlug: string,
  base: string = ""
): string {
  const buttons = Object.keys(config.locales)
    .map((locale) => {
      const isActive = locale === currentLocale;
      const isDefaultLocale = config.defaultLocale === locale;
      const prefix = isDefaultLocale ? "" : `/${getLocalePrefix(locale, config)}`;
      const href = `${base}${prefix}/${currentSlug}`;
      return `<a href="${href}" class="locale-segment${isActive ? " active" : ""}" data-locale="${locale}">${locale.toUpperCase()}</a>`;
    })
    .join("");

  return `<div class="locale-switcher" data-current-locale="${currentLocale}">${buttons}</div>`;
}
