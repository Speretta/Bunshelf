import type { DocConfig, PageMeta, LocaleConfig } from "./types.js";

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

export function isDocConfig(value: unknown): value is DocConfig {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  
  if (typeof obj.title !== "string") return false;
  if (typeof obj.description !== "string") return false;
  if (!isValidLocale(obj.defaultLocale)) return false;
  if (typeof obj.locales !== "object" || obj.locales === null) return false;
  
  const locales = obj.locales as Record<string, unknown>;
  for (const [locale, config] of Object.entries(locales)) {
    if (!isValidLocale(locale)) return false;
    if (!isValidLocaleConfig(config)) return false;
  }
  
  return true;
}

export function isPageMeta(value: unknown): value is PageMeta {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  
  if (typeof obj.title !== "string") return false;
  if (obj.description !== undefined && typeof obj.description !== "string") return false;
  if (obj.order !== undefined && typeof obj.order !== "number") return false;
  if (obj.sidebar_label !== undefined && typeof obj.sidebar_label !== "string") return false;
  if (obj.hide !== undefined && typeof obj.hide !== "boolean") return false;
  
  return true;
}

export function validateDocConfig(value: unknown): DocConfig | null {
  if (!isDocConfig(value)) return null;
  return value;
}

export function validatePageMeta(value: unknown): PageMeta | null {
  if (!isPageMeta(value)) return null;
  return value;
}
