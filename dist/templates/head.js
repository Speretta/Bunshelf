import { CDN } from "../core/constants/cdn.js";
export function renderHead(options) {
    const { title, siteTitle, description } = options;
    return `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5, shrink-to-fit=no">
  <meta name="description" content="${description}">
  <meta name="color-scheme" content="light dark">
  <title>${title} | ${siteTitle}</title>
  <link rel="icon" type="image/webp" href="/assets/images/logo.webp">
  <link rel="stylesheet" href="/assets/css/base.css">
  <link rel="stylesheet" href="/assets/css/themes.css">
  <link rel="stylesheet" href="/assets/css/layout.css">
  <link rel="stylesheet" href="/assets/css/sidebar.css">
  <link rel="stylesheet" href="/assets/css/callouts.css">
  <link rel="stylesheet" href="/assets/css/search.css">
  <link rel="stylesheet" href="/assets/css/theme-toggle.css">
  <link rel="stylesheet" href="/assets/css/syntax.css">
  <link rel="stylesheet" href="/assets/css/page-nav.css">
  <script src="${CDN.fuseJs}"></script>
  <script src="${CDN.highlightJs}"></script>
  <script>
    (function() {
      var theme = localStorage.getItem('theme');
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>
  <script src="/assets/js/main.js" defer></script>
</head>`;
}
//# sourceMappingURL=head.js.map