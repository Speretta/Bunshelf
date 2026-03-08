import type { SidebarItem, DocConfig } from "./types.js";

export function getLocalePrefix(
  locale: string,
  config: DocConfig
): string {
  const prefix = config.locales[locale]?.localePrefix;
  return prefix !== undefined ? prefix : locale;
}

export function getHomeUrl(
  locale: string,
  base: string,
  config: DocConfig,
  sidebar: SidebarItem[] | undefined
): string {
  const isDefaultLocale = config.defaultLocale === locale;
  const prefix = isDefaultLocale ? "" : `/${getLocalePrefix(locale, config)}`;
  const indexPage = config.locales[locale]?.indexPage;
  
  if (indexPage) {
    return `${base}${prefix}${indexPage}`;
  }

  const firstPage = sidebar?.[0]?.items?.[0]?.href;
  
  if (firstPage) {
    return `${base}${firstPage}`;
  }

  return `${base}${prefix}/intro`;
}

export function getIndexRedirectUrl(
  defaultLocale: string,
  base: string,
  config: DocConfig,
  sidebar: SidebarItem[] | undefined
): string {
  const isDefaultLocale = config.defaultLocale === defaultLocale;
  const prefix = isDefaultLocale ? "" : `/${getLocalePrefix(defaultLocale, config)}`;
  const indexPage = config.locales[defaultLocale]?.indexPage;
  
  if (indexPage) {
    return `${base}${prefix}${indexPage}`;
  }

  const firstPage = sidebar?.[0]?.items?.[0]?.href;
  
  if (firstPage) {
    return `${base}${firstPage}`;
  }

  return `${base}${prefix}/intro`;
}

export function getThemeInitScript(): string {
  return `<script>
    (function() {
      var theme = localStorage.getItem('theme');
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>`;
}
