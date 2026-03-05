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
export declare function getSearchTranslations(i18n: TranslationStrings): SearchTranslations;
export declare function getThemeTranslations(i18n: TranslationStrings): ThemeTranslations;
export declare function getPageNavTranslations(i18n: TranslationStrings): PageNavTranslations;
export declare function getFooterTranslations(i18n: TranslationStrings): FooterTranslations;
export declare function getNotFoundTranslations(i18n: TranslationStrings): NotFoundTranslations;
export declare function getCalloutsTranslations(i18n: TranslationStrings): CalloutsTranslations;
export declare function getCodeTranslations(i18n: TranslationStrings): CodeTranslations;
export declare function getMenuLabel(i18n: TranslationStrings): string;
export {};
//# sourceMappingURL=accessors.d.ts.map