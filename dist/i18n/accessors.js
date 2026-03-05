export function getSearchTranslations(i18n) {
    const search = i18n.search;
    return {
        placeholder: search?.placeholder || "Search...",
        noResults: search?.noResults || "No results found",
        results: search?.results || "Results",
    };
}
export function getThemeTranslations(i18n) {
    const theme = i18n.theme;
    return {
        light: theme?.light || "Light",
        dark: theme?.dark || "Dark",
        hacker: theme?.hacker || "Hacker",
        ...(theme || {}),
    };
}
export function getPageNavTranslations(i18n) {
    const pageNav = i18n.pageNav;
    return {
        previous: pageNav?.previous || "Previous",
        next: pageNav?.next || "Next",
    };
}
export function getFooterTranslations(i18n) {
    const footer = i18n.footer;
    return {
        poweredBy: footer?.poweredBy || "Powered by",
    };
}
export function getNotFoundTranslations(i18n) {
    const notFound = i18n["404"];
    return {
        title: notFound?.title || "Page Not Found",
        message: notFound?.message || "The page you're looking for doesn't exist.",
        home: notFound?.home || "Go Home",
    };
}
export function getCalloutsTranslations(i18n) {
    const callouts = i18n.callouts;
    return {
        note: callouts?.note || "Note",
        tip: callouts?.tip || "Pro Tip",
        info: callouts?.info || "Info",
        warning: callouts?.warning || "Warning",
        error: callouts?.error || "Error",
        danger: callouts?.danger || "Danger",
    };
}
export function getCodeTranslations(i18n) {
    const code = i18n.code;
    return {
        copy: code?.copy || "Copy code",
        copied: code?.copied || "Copied!",
    };
}
export function getMenuLabel(i18n) {
    return i18n.menu || "Menu";
}
//# sourceMappingURL=accessors.js.map