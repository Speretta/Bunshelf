export function renderFooter(i18n) {
    const footerI18n = i18n.footer;
    const poweredBy = footerI18n?.poweredBy || "Powered by";
    return `
  <footer class="footer">
    <p>${poweredBy} <a href="https://github.com/speretta/bunshelf">bunshelf</a></p>
  </footer>`;
}
//# sourceMappingURL=footer.js.map