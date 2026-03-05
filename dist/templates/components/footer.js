import { getFooterTranslations } from "../../i18n/accessors.js";
export function renderFooter(i18n) {
    const { poweredBy } = getFooterTranslations(i18n);
    return `
  <footer class="footer">
    <p>${poweredBy} <a href="https://github.com/speretta/bunshelf">bunshelf</a></p>
  </footer>`;
}
//# sourceMappingURL=footer.js.map