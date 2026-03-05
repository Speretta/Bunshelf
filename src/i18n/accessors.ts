import type { TranslationStrings } from "./index.js";

interface SearchTranslations {
  placeholder: string;
  noResults: string;
  results: string;
}

interface ThemeTranslations {
  light: string;
  dark: string;
  hacker: string;
  [key: string]: string;
}

interface PageNavTranslations {
  previous: string;
  next: string;
}

interface FooterTranslations {
  poweredBy: string;
}

interface NotFoundTranslations {
  title: string;
  message: string;
  home: string;
}

interface CalloutsTranslations {
  note: string;
  tip: string;
  info: string;
  warning: string;
  error: string;
  danger: string;
}

interface CodeTranslations {
  copy: string;
  copied: string;
}

export function getSearchTranslations(i18n: TranslationStrings): SearchTranslations {
  const search = i18n.search as TranslationStrings | undefined;
  return {
    placeholder: search?.placeholder as string || "Search...",
    noResults: search?.noResults as string || "No results found",
    results: search?.results as string || "Results",
  };
}

export function getThemeTranslations(i18n: TranslationStrings): ThemeTranslations {
  const theme = i18n.theme as Record<string, string> | undefined;
  return {
    light: theme?.light || "Light",
    dark: theme?.dark || "Dark",
    hacker: theme?.hacker || "Hacker",
    ...(theme || {}),
  };
}

export function getPageNavTranslations(i18n: TranslationStrings): PageNavTranslations {
  const pageNav = i18n.pageNav as TranslationStrings | undefined;
  return {
    previous: pageNav?.previous as string || "Previous",
    next: pageNav?.next as string || "Next",
  };
}

export function getFooterTranslations(i18n: TranslationStrings): FooterTranslations {
  const footer = i18n.footer as TranslationStrings | undefined;
  return {
    poweredBy: footer?.poweredBy as string || "Powered by",
  };
}

export function getNotFoundTranslations(i18n: TranslationStrings): NotFoundTranslations {
  const notFound = i18n["404"] as TranslationStrings | undefined;
  return {
    title: notFound?.title as string || "Page Not Found",
    message: notFound?.message as string || "The page you're looking for doesn't exist.",
    home: notFound?.home as string || "Go Home",
  };
}

export function getCalloutsTranslations(i18n: TranslationStrings): CalloutsTranslations {
  const callouts = i18n.callouts as TranslationStrings | undefined;
  return {
    note: (callouts?.note as string) || "Note",
    tip: (callouts?.tip as string) || "Pro Tip",
    info: (callouts?.info as string) || "Info",
    warning: (callouts?.warning as string) || "Warning",
    error: (callouts?.error as string) || "Error",
    danger: (callouts?.danger as string) || "Danger",
  };
}

export function getCodeTranslations(i18n: TranslationStrings): CodeTranslations {
  const code = i18n.code as TranslationStrings | undefined;
  return {
    copy: (code?.copy as string) || "Copy code",
    copied: (code?.copied as string) || "Copied!",
  };
}

export function getMenuLabel(i18n: TranslationStrings): string {
  return (i18n.menu as string) || "Menu";
}
