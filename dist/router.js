export function parseRoute(url, config) {
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
export function isAssetRequest(url) {
    const path = new URL(url, "http://localhost").pathname;
    return (path.startsWith("/assets/") ||
        path.startsWith("/fonts/") ||
        path.endsWith(".css") ||
        path.endsWith(".js") ||
        path.endsWith(".png") ||
        path.endsWith(".jpg") ||
        path.endsWith(".svg") ||
        path.endsWith(".ico"));
}
export function isSearchRequest(url) {
    const path = new URL(url, "http://localhost").pathname;
    return path === "/api/search" || path.startsWith("/api/search?");
}
//# sourceMappingURL=router.js.map