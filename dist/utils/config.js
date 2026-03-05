import { parse as parseYaml } from "yaml";
import { join } from "node:path";
import { exists, readTextFile } from "./fs.js";
import { logger } from "./logger.js";
import { createError, ErrorCode } from "./errors.js";
const defaultConfig = {
    title: "Bunshelf",
    description: "A fast documentation website generator",
    defaultLocale: "en",
    locales: ["en"],
    base: "",
};
function isValidLocale(locale) {
    return typeof locale === "string" && /^[a-z]{2}(-[a-z]{2})?$/.test(locale);
}
function isDocConfigPartial(value) {
    if (typeof value !== "object" || value === null)
        return false;
    const obj = value;
    if ("title" in obj && typeof obj.title !== "string")
        return false;
    if ("description" in obj && typeof obj.description !== "string")
        return false;
    if ("defaultLocale" in obj && !isValidLocale(obj.defaultLocale))
        return false;
    if ("base" in obj && typeof obj.base !== "string")
        return false;
    if ("locales" in obj) {
        if (!Array.isArray(obj.locales))
            return false;
        if (!obj.locales.every(isValidLocale))
            return false;
    }
    return true;
}
function getBaseURL() {
    if (process.env.BASE_URL !== undefined) {
        return process.env.BASE_URL;
    }
    if (process.env.GITHUB_REPOSITORY) {
        const [, repoName] = process.env.GITHUB_REPOSITORY.split("/");
        return `/${repoName}`;
    }
    return "";
}
export function validateConfig(config) {
    const errors = [];
    if (config.title && (typeof config.title !== "string" || config.title.length > 200)) {
        errors.push("title must be a string with max 200 characters");
    }
    if (config.description && (typeof config.description !== "string" || config.description.length > 500)) {
        errors.push("description must be a string with max 500 characters");
    }
    if (config.defaultLocale && typeof config.defaultLocale !== "string") {
        errors.push("defaultLocale must be a string");
    }
    if (config.locales) {
        if (!Array.isArray(config.locales)) {
            errors.push("locales must be an array");
        }
        else {
            for (const locale of config.locales) {
                if (typeof locale !== "string" || !/^[a-z]{2}(-[a-z]{2})?$/.test(locale)) {
                    errors.push(`invalid locale format: ${locale}`);
                }
            }
        }
    }
    if (errors.length > 0) {
        throw createError(ErrorCode.CONFIG_ERROR, { errors });
    }
    const baseURL = getBaseURL();
    return {
        ...defaultConfig,
        ...config,
        title: config.title?.trim() || defaultConfig.title,
        description: config.description?.trim() || defaultConfig.description,
        base: baseURL,
    };
}
export async function loadConfig(docsDir) {
    const configPath = join(docsDir, "config.yaml");
    if (!(await exists(configPath))) {
        logger.debug("Using default config", { reason: "no config file found" });
        return defaultConfig;
    }
    try {
        const content = await readTextFile(configPath);
        const parsed = parseYaml(content);
        if (!isDocConfigPartial(parsed)) {
            logger.warn("Config file has invalid structure, using defaults", { path: configPath });
            return defaultConfig;
        }
        const config = validateConfig(parsed);
        logger.info("Config loaded", {
            locales: config.locales,
            defaultLocale: config.defaultLocale
        });
        return config;
    }
    catch (error) {
        logger.error("Failed to load config", { path: configPath, error });
        if (error && typeof error === "object" && "code" in error) {
            throw error;
        }
        throw createError(ErrorCode.CONFIG_ERROR, { path: configPath });
    }
}
export function getDocsDir() {
    const args = process.argv.slice(2);
    const previewIndex = args.indexOf("--preview");
    if (previewIndex !== -1) {
        return join(process.cwd(), "dist");
    }
    return join(process.cwd(), "docs");
}
//# sourceMappingURL=config.js.map