import { glob, file as runtimeFile } from "../utils/runtime.js";
import { join } from "node:path";
const translations = {};
export async function loadTranslations(i18nDir) {
    const scanner = glob("*.json");
    for await (const file of scanner.scan({ cwd: i18nDir })) {
        const fileName = file.split("/").pop() || file;
        const locale = fileName.replace(".json", "");
        const fullPath = join(i18nDir, file);
        const content = await runtimeFile(fullPath).json();
        translations[locale] = content;
    }
}
export function t(key, locale, fallback) {
    const keys = key.split(".");
    let value = translations[locale] || {};
    for (const k of keys) {
        if (typeof value === "string")
            return value;
        value = value[k] || {};
    }
    if (typeof value === "string")
        return value;
    if (fallback)
        return fallback;
    const enValue = getNestedValue(translations["en"] ?? {}, keys);
    return typeof enValue === "string" ? enValue : key;
}
function getNestedValue(obj, keys) {
    let value = obj || {};
    for (const k of keys) {
        if (typeof value === "string")
            return value;
        value = value[k] || {};
    }
    return value;
}
export function getTranslations(locale) {
    return translations[locale] || translations["en"] || {};
}
export function getAvailableLocales() {
    return Object.keys(translations);
}
//# sourceMappingURL=index.js.map