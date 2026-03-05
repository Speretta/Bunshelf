function isValidLocale(locale) {
    return typeof locale === "string" && /^[a-z]{2}(-[a-z]{2})?$/.test(locale);
}
export function isDocConfig(value) {
    if (typeof value !== "object" || value === null)
        return false;
    const obj = value;
    if (typeof obj.title !== "string")
        return false;
    if (typeof obj.description !== "string")
        return false;
    if (!isValidLocale(obj.defaultLocale))
        return false;
    if (!Array.isArray(obj.locales))
        return false;
    if (!obj.locales.every(isValidLocale))
        return false;
    return true;
}
export function isPageMeta(value) {
    if (typeof value !== "object" || value === null)
        return false;
    const obj = value;
    if (typeof obj.title !== "string")
        return false;
    if (obj.description !== undefined && typeof obj.description !== "string")
        return false;
    if (obj.order !== undefined && typeof obj.order !== "number")
        return false;
    if (obj.sidebar_label !== undefined && typeof obj.sidebar_label !== "string")
        return false;
    if (obj.hide !== undefined && typeof obj.hide !== "boolean")
        return false;
    return true;
}
export function validateDocConfig(value) {
    if (!isDocConfig(value))
        return null;
    return value;
}
export function validatePageMeta(value) {
    if (!isPageMeta(value))
        return null;
    return value;
}
//# sourceMappingURL=validation.js.map