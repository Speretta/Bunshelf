import type { SidebarItem } from "./types.js";

export function getHomeUrl(
  locale: string,
  base: string,
  homePage: string | undefined,
  sidebar: SidebarItem[] | undefined
): string {
  if (homePage) {
    return locale === "en"
      ? `${base}${homePage}`
      : `${base}/${locale}${homePage}`;
  }

  const firstPage = sidebar?.[0]?.items?.[0]?.href;
  
  if (firstPage) {
    return `${base}${firstPage}`;
  }

  return locale === "en" ? `${base}/intro` : `${base}/${locale}/intro`;
}

export function getIndexRedirectUrl(
  defaultLocale: string,
  base: string,
  homePage: string | undefined,
  sidebar: SidebarItem[] | undefined
): string {
  if (homePage) {
    return defaultLocale === "en"
      ? `${base}${homePage}`
      : `${base}/${defaultLocale}${homePage}`;
  }

  const firstPage = sidebar?.[0]?.items?.[0]?.href;
  
  if (firstPage) {
    return `${base}${firstPage}`;
  }

  return defaultLocale === "en" ? `${base}/intro` : `${base}/${defaultLocale}/intro`;
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
