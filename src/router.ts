import type { RouteParams, DocConfig } from "./utils/types.js";

export function parseRoute(url: string, config: DocConfig): RouteParams | null {
  const path = new URL(url, "http://localhost").pathname;
  const segments = path.split("/").filter(Boolean);
  
  if (segments.length === 0) {
    return {
      locale: config.defaultLocale,
      path: [],
      slug: "index",
    };
  }
  
  const firstSegment = segments[0];
  if (!firstSegment) {
    return {
      locale: config.defaultLocale,
      path: [],
      slug: "index",
    };
  }
  
  const isLocale = config.locales.includes(firstSegment);
  
  if (isLocale) {
    const locale = firstSegment;
    const remaining = segments.slice(1);
    
    if (remaining.length === 0) {
      return { locale, path: [], slug: "index" };
    }
    
    return {
      locale,
      path: remaining,
      slug: remaining.join("/"),
    };
  }
  
  return {
    locale: config.defaultLocale,
    path: segments,
    slug: segments.join("/"),
  };
}

export function getDocPath(params: RouteParams, docsDir: string): string {
  const { locale, slug } = params;
  
  const candidates = [
    `${docsDir}/${locale}/${slug}.md`,
    `${docsDir}/${locale}/${slug}/index.md`,
    `${docsDir}/${locale}/${slug}.mdx`,
    `${docsDir}/${locale}/${slug}/index.mdx`,
  ];
  
  return candidates.join(":");
}

export function buildUrl(locale: string, path: string[]): string {
  if (path.length === 0 || (path.length === 1 && path[0] === "index")) {
    return locale === "en" ? "/" : `/${locale}`;
  }
  
  const slug = path.join("/");
  return locale === "en" ? `/${slug}` : `/${locale}/${slug}`;
}

export function isAssetRequest(url: string): boolean {
  const path = new URL(url, "http://localhost").pathname;
  return (
    path.startsWith("/assets/") ||
    path.startsWith("/fonts/") ||
    path.endsWith(".css") ||
    path.endsWith(".js") ||
    path.endsWith(".png") ||
    path.endsWith(".jpg") ||
    path.endsWith(".svg") ||
    path.endsWith(".ico")
  );
}

export function isSearchRequest(url: string): boolean {
  const path = new URL(url, "http://localhost").pathname;
  return path === "/api/search" || path.startsWith("/api/search?");
}
