export function renderLocaleLinks(locales, currentLocale, currentSlug) {
    const buttons = locales
        .map((locale) => {
        const isActive = locale === currentLocale;
        const href = locale === "en" ? `/${currentSlug}` : `/${locale}/${currentSlug}`;
        return `<a href="${href}" class="locale-segment${isActive ? " active" : ""}" data-locale="${locale}">${locale.toUpperCase()}</a>`;
    })
        .join("");
    return `<div class="locale-switcher" data-current-locale="${currentLocale}">${buttons}</div>`;
}
//# sourceMappingURL=locale-links.js.map