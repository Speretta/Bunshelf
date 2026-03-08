import { parse as parseYaml } from "yaml";
import { join } from "node:path";
import { exists, readTextFile } from "./fs.js";
import { logger } from "./logger.js";
import { createError, ErrorCode } from "./errors.js";
import type { DocConfig, LocaleConfig } from "./types.js";

const defaultConfig: DocConfig = {
  title: "Bunshelf",
  description: "A fast documentation website generator",
  defaultLocale: "en",
  locales: { en: { indexPage: "/intro", localePrefix: "en" } },
  base: "",
};

function isValidLocale(locale: unknown): locale is string {
  return typeof locale === "string" && /^[a-z]{2}(-[a-z]{2})?$/.test(locale);
}

function isValidLocaleConfig(value: unknown): value is LocaleConfig {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  
  if ("indexPage" in obj && typeof obj.indexPage !== "string") return false;
  if ("localePrefix" in obj && typeof obj.localePrefix !== "string") return false;
  
  return true;
}

function isDocConfigPartial(value: unknown): value is Partial<DocConfig> {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  
  if ("title" in obj && typeof obj.title !== "string") return false;
  if ("description" in obj && typeof obj.description !== "string") return false;
  if ("defaultLocale" in obj && !isValidLocale(obj.defaultLocale)) return false;
  if ("base" in obj && typeof obj.base !== "string") return false;
  if ("locales" in obj) {
    if (typeof obj.locales !== "object" || obj.locales === null) return false;
    const locales = obj.locales as Record<string, unknown>;
    for (const [locale, config] of Object.entries(locales)) {
      if (!isValidLocale(locale)) return false;
      if (!isValidLocaleConfig(config)) return false;
    }
  }
  
  return true;
}

function getBaseURL(): string {
  if (process.env.BASE_URL !== undefined) {
    return process.env.BASE_URL;
  }
  
  if (process.env.GITHUB_REPOSITORY) {
    const [, repoName] = process.env.GITHUB_REPOSITORY.split("/");
    return `/${repoName}`;
  }
  
  return "";
}

export function validateConfig(config: Partial<DocConfig>): DocConfig {
  const errors: string[] = [];
  const warnings: string[] = [];

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
    if (typeof config.locales !== "object" || config.locales === null) {
      errors.push("locales must be an object");
    } else {
      for (const [locale, localeConfig] of Object.entries(config.locales)) {
        if (!/^[a-z]{2}(-[a-z]{2})?$/.test(locale)) {
          errors.push(`invalid locale format: ${locale}`);
        }
        
        if (!localeConfig.localePrefix) {
          warnings.push(`locale "${locale}" has no localePrefix defined, using "${locale}" as default`);
          localeConfig.localePrefix = locale;
        }
        
        if (!localeConfig.indexPage) {
          warnings.push(`locale "${locale}" has no indexPage defined, using "/intro" as default`);
          localeConfig.indexPage = "/intro";
        }
      }
    }
  }

  if (warnings.length > 0) {
    for (const warning of warnings) {
      logger.warn(warning);
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

export async function loadConfig(docsDir: string): Promise<DocConfig> {
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
      locales: Object.keys(config.locales),
      defaultLocale: config.defaultLocale 
    });
    
    return config;
  } catch (error) {
    logger.error("Failed to load config", { path: configPath, error });
    
    if (error && typeof error === "object" && "code" in error) {
      throw error;
    }
    
    throw createError(ErrorCode.CONFIG_ERROR, { path: configPath });
  }
}

export function getDocsDir(): string {
  const args = process.argv.slice(2);
  const previewIndex = args.indexOf("--preview");
  
  if (previewIndex !== -1) {
    return join(process.cwd(), "dist");
  }
  
  return join(process.cwd(), "docs");
}
