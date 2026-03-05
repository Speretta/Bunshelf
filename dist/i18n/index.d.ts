export interface TranslationStrings {
    [key: string]: string | TranslationStrings;
}
export declare function loadTranslations(i18nDir: string): Promise<void>;
export declare function t(key: string, locale: string, fallback?: string): string;
export declare function getTranslations(locale: string): TranslationStrings;
export declare function getAvailableLocales(): string[];
//# sourceMappingURL=index.d.ts.map