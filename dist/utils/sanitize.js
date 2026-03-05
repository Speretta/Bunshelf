const PATH_TRAVERSAL_PATTERNS = [
    /\.\./,
    /\.\.\\/,
    /\.\.\//,
    /%2e%2e/i,
    /%252e/i,
];
const DANGEROUS_CHARS = /[<>:"|?*\x00-\x1f]/;
export function sanitizeSlug(slug) {
    if (!slug || typeof slug !== "string") {
        return null;
    }
    const trimmed = slug.trim();
    if (trimmed.length === 0 || trimmed.length > 200) {
        return null;
    }
    for (const pattern of PATH_TRAVERSAL_PATTERNS) {
        if (pattern.test(trimmed)) {
            return null;
        }
    }
    if (DANGEROUS_CHARS.test(trimmed)) {
        return null;
    }
    const safeSlug = trimmed
        .replace(/\/+/g, "/")
        .replace(/^\/+|\/+$/g, "");
    if (safeSlug.includes("//")) {
        return null;
    }
    return safeSlug || null;
}
export function sanitizeLocale(locale, allowedLocales) {
    if (!locale || typeof locale !== "string") {
        return null;
    }
    const trimmed = locale.trim().toLowerCase();
    if (trimmed.length === 0 || trimmed.length > 10) {
        return null;
    }
    if (!/^[a-z]{2}(-[a-z]{2})?$/.test(trimmed)) {
        return null;
    }
    return allowedLocales.includes(trimmed) ? trimmed : null;
}
export function sanitizePath(path) {
    if (!path || typeof path !== "string") {
        return null;
    }
    const normalized = path.replace(/\\/g, "/");
    for (const pattern of PATH_TRAVERSAL_PATTERNS) {
        if (pattern.test(normalized)) {
            return null;
        }
    }
    if (normalized.includes("\0")) {
        return null;
    }
    return normalized;
}
export function isValidPath(baseDir, targetPath) {
    const normalizedBase = baseDir.replace(/\\/g, "/");
    const normalizedTarget = targetPath.replace(/\\/g, "/");
    if (!normalizedTarget.startsWith(normalizedBase)) {
        return false;
    }
    if (normalizedTarget.length > normalizedBase.length) {
        const nextChar = normalizedTarget[normalizedBase.length];
        if (nextChar !== "/" && nextChar !== "\\") {
            return false;
        }
    }
    return true;
}
export function sanitizeInput(input, maxLength = 1000) {
    if (!input || typeof input !== "string") {
        return "";
    }
    const trimmed = input.trim();
    if (trimmed.length > maxLength) {
        return trimmed.slice(0, maxLength);
    }
    return trimmed;
}
export function sanitizeHtmlAttribute(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "&#10;")
        .replace(/\r/g, "&#13;")
        .replace(/\t/g, "&#9;");
}
export function stripTags(html) {
    return html.replace(/<[^>]*>/g, "");
}
export function sanitizeForLog(input) {
    return input
        .replace(/[\n\r]/g, " ")
        .replace(/[\x00-\x1f]/g, "")
        .slice(0, 500);
}
//# sourceMappingURL=sanitize.js.map