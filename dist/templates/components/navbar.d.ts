import type { Theme } from "../../utils/types.js";
import type { TranslationStrings } from "../../i18n/index.js";
export declare function renderNavbar(options: {
    title: string;
    homeUrl: string;
    i18n: TranslationStrings;
}): string;
export declare function renderNavbarWithThemes(options: {
    title: string;
    homeUrl: string;
    themes: Theme[];
    currentTheme?: string;
    i18n: TranslationStrings;
}): string;
//# sourceMappingURL=navbar.d.ts.map