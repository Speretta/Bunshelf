import type { TranslationStrings } from "../../i18n/index.js";

interface FooterTranslations {
  poweredBy?: string;
}

export function renderFooter(i18n: TranslationStrings): string {
  const footerI18n = i18n.footer as FooterTranslations | undefined;
  const poweredBy = footerI18n?.poweredBy || "Powered by";
  
  return `
  <footer class="footer">
    <p>${poweredBy} <a href="https://github.com/speretta/bunshelf">bunshelf</a></p>
  </footer>`;
}
