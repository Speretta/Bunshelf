import { glob, file as runtimeFile } from "../utils/runtime.js";

export interface TranslationStrings {
  [key: string]: string | TranslationStrings;
}

const translations: Record<string, TranslationStrings> = {};

export async function loadTranslations(i18nDir: string): Promise<void> {
  const scanner = glob("*.json");
  
  for await (const file of scanner.scan({ cwd: i18nDir })) {
    const fileName = file.split("/").pop() || file;
    const locale = fileName.replace(".json", "");
    const content = await runtimeFile(file).json();
    translations[locale] = content as TranslationStrings;
  }
}

export function t(key: string, locale: string, fallback?: string): string {
  const keys = key.split(".");
  let value: TranslationStrings | string = translations[locale] || {};
  
  for (const k of keys) {
    if (typeof value === "string") return value;
    value = value[k] || {};
  }
  
  if (typeof value === "string") return value;
  
  if (fallback) return fallback;
  
  const enValue = getNestedValue(translations["en"] ?? {}, keys);
  return typeof enValue === "string" ? enValue : key;
}

function getNestedValue(obj: TranslationStrings, keys: string[]): TranslationStrings | string {
  let value: TranslationStrings | string = obj || {};
  for (const k of keys) {
    if (typeof value === "string") return value;
    value = value[k] || {};
  }
  return value;
}

export function getTranslations(locale: string): TranslationStrings {
  return translations[locale] || translations["en"] || {};
}

export function getAvailableLocales(): string[] {
  return Object.keys(translations);
}
