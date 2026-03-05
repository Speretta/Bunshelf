import { CDN } from "../core/constants/cdn.js";

const DEFAULT_LOGO = "/assets/images/logo.webp";

export function renderHead(options: {
  title: string;
  siteTitle: string;
  description: string;
  logo?: string;
  base?: string;
}): string {
  const { title, siteTitle, description, logo = DEFAULT_LOGO, base = "" } = options;
  
  const prefixedLogo = base + logo;
  const prefixedBase = base + "/assets/css/base.css";
  const prefixedThemes = base + "/assets/css/themes.css";
  const prefixedLayout = base + "/assets/css/layout.css";
  const prefixedSidebar = base + "/assets/css/sidebar.css";
  const prefixedCallouts = base + "/assets/css/callouts.css";
  const prefixedSearch = base + "/assets/css/search.css";
  const prefixedThemeToggle = base + "/assets/css/theme-toggle.css";
  const prefixedSyntax = base + "/assets/css/syntax.css";
  const prefixedPageNav = base + "/assets/css/page-nav.css";
  const prefixedMainJs = base + "/assets/js/main.js";

  return `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5, shrink-to-fit=no">
  <meta name="description" content="${description}">
  <meta name="color-scheme" content="light dark">
  <title>${title} | ${siteTitle}</title>
  <link rel="icon" type="image/webp" href="${prefixedLogo}">
  <link rel="stylesheet" href="${prefixedBase}">
  <link rel="stylesheet" href="${prefixedThemes}">
  <link rel="stylesheet" href="${prefixedLayout}">
  <link rel="stylesheet" href="${prefixedSidebar}">
  <link rel="stylesheet" href="${prefixedCallouts}">
  <link rel="stylesheet" href="${prefixedSearch}">
  <link rel="stylesheet" href="${prefixedThemeToggle}">
  <link rel="stylesheet" href="${prefixedSyntax}">
  <link rel="stylesheet" href="${prefixedPageNav}">
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
  <script src="${prefixedMainJs}" defer></script>
</head>`;
}
