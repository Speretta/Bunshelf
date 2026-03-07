function getNestedString(i18n, key, fallback) {
    const value = i18n[key];
    return typeof value === "string" ? value : fallback;
}
function getNestedObject(i18n, key) {
    const value = i18n[key];
    return typeof value === "object" && value !== null ? value : undefined;
}
export function getSearchTranslations(i18n) {
    const search = getNestedObject(i18n, "search");
    return {
        placeholder: search ? getNestedString(search, "placeholder", "Search...") : "Search...",
        noResults: search ? getNestedString(search, "noResults", "No results found") : "No results found",
        results: search ? getNestedString(search, "results", "Results") : "Results",
    };
}
export function getThemeTranslations(i18n) {
    const theme = getNestedObject(i18n, "theme");
    const themeRecord = theme;
    return {
        light: themeRecord?.light || "Light",
        dark: themeRecord?.dark || "Dark",
        hacker: themeRecord?.hacker || "Hacker",
        ...(themeRecord || {}),
    };
}
export function getPageNavTranslations(i18n) {
    const pageNav = getNestedObject(i18n, "pageNav");
    return {
        previous: pageNav ? getNestedString(pageNav, "previous", "Previous") : "Previous",
        next: pageNav ? getNestedString(pageNav, "next", "Next") : "Next",
    };
}
export function getFooterTranslations(i18n) {
    const footer = getNestedObject(i18n, "footer");
    return {
        poweredBy: footer ? getNestedString(footer, "poweredBy", "Powered by") : "Powered by",
    };
}
export function getNotFoundTranslations(i18n) {
    const notFound = getNestedObject(i18n, "404");
    return {
        title: notFound ? getNestedString(notFound, "title", "Page Not Found") : "Page Not Found",
        message: notFound ? getNestedString(notFound, "message", "The page you're looking for doesn't exist.") : "The page you're looking for doesn't exist.",
        home: notFound ? getNestedString(notFound, "home", "Go Home") : "Go Home",
    };
}
export function getCalloutsTranslations(i18n) {
    const callouts = getNestedObject(i18n, "callouts");
    return {
        note: callouts ? getNestedString(callouts, "note", "Note") : "Note",
        tip: callouts ? getNestedString(callouts, "tip", "Pro Tip") : "Pro Tip",
        info: callouts ? getNestedString(callouts, "info", "Info") : "Info",
        warning: callouts ? getNestedString(callouts, "warning", "Warning") : "Warning",
        error: callouts ? getNestedString(callouts, "error", "Error") : "Error",
        danger: callouts ? getNestedString(callouts, "danger", "Danger") : "Danger",
    };
}
export function getCodeTranslations(i18n) {
    const code = getNestedObject(i18n, "code");
    return {
        copy: code ? getNestedString(code, "copy", "Copy code") : "Copy code",
        copied: code ? getNestedString(code, "copied", "Copied!") : "Copied!",
    };
}
export function getMenuLabel(i18n) {
    return getNestedString(i18n, "menu", "Menu");
}
//# sourceMappingURL=accessors.js.map