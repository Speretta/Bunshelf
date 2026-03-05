const HTML_ENTITIES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
};
const HTML_ENTITY_REGEX = /[&<>"'`=/]/g;
export function escapeHtml(str) {
    if (!str || typeof str !== "string") {
        return "";
    }
    return str.replace(HTML_ENTITY_REGEX, (char) => HTML_ENTITIES[char] || char);
}
export function escapeAttr(str) {
    if (!str || typeof str !== "string") {
        return "";
    }
    return str
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "&#10;")
        .replace(/\r/g, "&#13;")
        .replace(/\t/g, "&#9;");
}
export function escapeJs(str) {
    if (!str || typeof str !== "string") {
        return "";
    }
    return str
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")
        .replace(/</g, "\\x3C")
        .replace(/>/g, "\\x3E")
        .replace(/&/g, "\\x26");
}
export function escapeUrl(str) {
    if (!str || typeof str !== "string") {
        return "";
    }
    return str.replace(/[<>"']/g, (char) => {
        const codes = {
            "<": "%3C",
            ">": "%3E",
            '"': "%22",
            "'": "%27",
        };
        return codes[char] || char;
    });
}
export function stripDangerousTags(html) {
    if (!html || typeof html !== "string") {
        return "";
    }
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/data:/gi, "")
        .replace(/vbscript:/gi, "");
}
//# sourceMappingURL=escape.js.map