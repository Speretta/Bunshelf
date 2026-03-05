export const DEFAULTS = {
  title: "Bunshelf",
  description: "A fast documentation website generator",
  untitled: "Untitled" as string,
  searchPlaceholder: "Search...",
  docsLabel: "Docs",
  poweredBy: "Powered by",
};

export const DEFAULT_CONFIG = {
  title: DEFAULTS.title,
  description: DEFAULTS.description,
  defaultLocale: "en",
  locales: ["en"],
} as const;
