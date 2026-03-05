import type { TranslationStrings } from "../../i18n/index.js";
import { getFooterTranslations } from "../../i18n/accessors.js";

export function renderFooter(i18n: TranslationStrings): string {
  const { poweredBy } = getFooterTranslations(i18n);
  
  return `
  <footer class="footer">
    <p>${poweredBy} <a href="https://github.com/speretta/bunshelf">bunshelf</a></p>
  </footer>`;
}
