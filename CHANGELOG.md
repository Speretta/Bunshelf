# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.5] - 2026-03-08

### Breaking Changes
- **Redesigned `locales` configuration** - Now uses object format with per-locale settings instead of string array
- Removed `indexPages` and `localePrefixes` config options (now part of `locales`)
- Default locale no longer uses URL prefix (e.g., `/intro` instead of `/english/intro`)

### Added
- `localePrefix` option per locale for custom URL prefixes (e.g., `turkish` instead of `tr`)
- `indexPage` option per locale for custom landing pages
- Automatic warnings when `localePrefix` or `indexPage` are not defined
- Default values are automatically assigned for missing locale settings

### Changed
- `locales` config now uses object format:
  ```yaml
  locales:
    en:
      indexPage: /intro
      localePrefix: english
    tr:
      indexPage: /intro
      localePrefix: turkish
  ```
- Sidebar `href` values no longer need manual locale prefix (added automatically)
- Logo link respects default locale (no prefix added for default language)
- Locale switcher respects default locale (no prefix added for default language)
- Documentation updated with new `locales` configuration format

### Fixed
- Sidebar active link now correctly matches pages with `localePrefix`
- Logo link now correctly goes to `/intro` for default locale instead of `/english/intro`
- Locale switcher URLs now correct for default locale (no prefix)

## [1.5.4] - 2026-03-08

### Fixed
- Logo is now downloaded directly to `out/assets/images/` from GitHub during build (no images in npm package)
- Removed `public/assets/images/` from npm package files

## [1.5.3] - 2026-03-08

### Fixed
- Added `public/assets/images/` to npm package files (fixes build error when installed via npm)

## [1.5.2] - 2026-03-08

### Fixed
- Images folder now copied to output directory during build (fixes 404 for logo on GitHub Pages)

## [1.5.1] - 2026-03-08

### Changed
- README.md images now use GitHub raw URLs for better visibility on npm
- Documentation updated to use `bunx bunshelf` commands instead of `bun run`
- Documentation updated with all CLI commands (dev, build, preview, clean, --help, --version)
- Project structure documentation simplified for end users
- Build output directory documentation updated (`out/` instead of `dist/`)

## [1.5.0] - 2026-03-08

### Breaking Changes
- Build output directory changed from `dist/` to `out/`
- `dist/` now contains only compiled CLI code (for npm distribution)
- All locale pages now in their own subdirectories (e.g., `/en/intro`, `/tr/intro`)
- Root index.html redirects to `defaultLocale`'s first page

### Added
- `bunshelf clean` command to remove build output directory
- `bun run clean` and `bun run clean:all` npm scripts
- Static `public/404.html` template as fallback
- TypeScript `.d.ts` declaration files for API type support
- Default logo now downloaded from GitHub when not provided in config

### Changed
- Separated CLI distribution (`dist/`) from static site output (`out/`)
- `tsconfig.build.json` now compiles `server.ts` and `preview.ts` (required by CLI)
- `--version` command now uses `fs.readFile` for Node.js compatibility
- Removed `bunshelf-*.png` and `logo*.*` from npm package (still in git)
- Each locale now has its own directory regardless of `defaultLocale` setting
- Removed all hardcoded `"en"` locale checks - now fully respects `defaultLocale` from config

### Fixed
- Fixed CLI commands not working after TypeScript compilation
- Fixed index redirect now uses generated sidebar for correct URL
- Fixed sidebar active link not working for non-default locales
- Fixed locale links and navigation using correct locale-prefixed URLs

## [1.4.7] - 2026-03-08

### Changed
- Removed dist folder from git tracking (now generated during build/publish)
- Updated npm package to include only necessary compiled files via `files` field

## [1.4.6] - 2026-03-08

### Fixed
- Removed stray test files from npm package

## [1.4.5] - 2026-03-08

### Fixed
- Fixed sidebar active link not highlighting for index.md files in subdirectories (slug normalization)

## [1.4.4] - 2026-03-08

### Fixed
- Fixed index.md files in subdirectories not being built (all were writing to root index.html)

## [1.4.3] - 2026-03-07

### Fixed
- Fixed build failing when dist folder doesn't exist (ENOENT error on 404.html)

## [1.4.2] - 2026-03-07

### Fixed
- Fixed search results dropdown not visible due to `overflow: hidden` on navbar

## [1.4.1] - 2026-03-07

### Fixed
- Fixed sidebar active link not highlighting when href ends with trailing slash

## [1.4.0] - 2026-03-07

### Added
- New `utils/navigation.ts` module with shared navigation utilities:
  - `getHomeUrl()` - centralized home URL calculation
  - `getIndexRedirectUrl()` - index redirect URL generation
  - `getThemeInitScript()` - shared theme initialization script

### Changed
- **Refactored**: Extracted duplicated home URL calculation logic to `getHomeUrl()` utility
- **Refactored**: Extracted duplicated theme init script to `getThemeInitScript()` utility
- **Refactored**: Moved `DEFAULT_LOGO` constant to `core/constants/defaults.ts`
- **Refactored**: Removed duplicate `ParsedDocument` interface from `utils/types.ts`
- **Improved**: `DocConfig` interface now uses `readonly` modifiers for immutability
- **Improved**: `i18n/accessors.ts` now uses helper functions instead of type assertions
- **Improved**: Added explicit return types to all exported async functions

### Fixed
- Fixed potential crash when request arrives before server initialization (`state` undefined)
- Fixed PORT environment variable validation (now handles NaN from `parseInt`)
- Fixed URL parsing error handling in `router.ts` (malformed URLs no longer throw)
- Fixed translation file loading errors now properly throw instead of silently failing
- Fixed `exists()` function in `runtime.ts` now logs unexpected errors
- Fixed prev/next navigation failing when sidebar href ends with trailing slash
- Fixed sidebar active link not highlighting when href ends with trailing slash

## [1.3.9] - 2026-03-06

### Fixed
- Fixed binary file handling using `arrayBuffer()` instead of `text()` for proper encoding

## [1.3.8] - 2026-03-05

### Fixed
- Fixed default logo base URL to work correctly with GitHub Pages deployments

## [1.3.7] - 2026-03-05

### Fixed
- Fixed color syntax rendering in lists and inline code blocks

## [1.3.6] - 2026-03-05

### Added
- Documentation for `homePage` and `base` URL configuration options

## [1.3.5] - 2026-03-05

### Added
- Configurable `homePage` option with smart fallback to first doc page
- `homePage` prop in config for customizing the home link destination

## [1.3.4] - 2026-03-05

### Fixed
- Fixed 404 page home URL to correctly include base URL prefix

## [1.3.3] - 2026-03-05

### Added
- Automatic base URL detection from environment for easier deployment

## [1.3.2] - 2026-03-05

### Fixed
- Fixed npm bin configuration for proper CLI installation

## [1.3.0] - 2026-03-05

### Added
- `base` URL configuration option for GitHub Pages deployment support
- GitHub Pages deployment workflow (`.github/workflows/deploy.yml`)
- Base URL support in renderer, sidebar, SSG builder, and head templates
- Documentation for GitHub Pages deployment

### Changed
- Updated locale links, page renderer, and sidebar to respect base URL
- SSG builder now generates correct paths with base URL prefix

## [1.2.5] - 2025-03-05

### Fixed
- Fixed GitHub Action for screenshot automation:
  - Added Chrome installation step for Puppeteer
  - Improved server wait mechanism (60s timeout with HTTP status check)
  - Enhanced error handling and logging
  - Increased screenshot timeout to 60s
  - Added `networkidle0` wait for full page load

### Changed
- Screenshot script now has better error messages and debugging output
- GitHub Action won't trigger on screenshot commits (uses `[skip ci]`)

## [1.2.4] - 2025-03-05

### Added
- GitHub Action for automatic screenshot updates on main branch changes
- `screenshots` npm script for manual screenshot capture
- Screenshot script using Puppeteer (scripts/take-screenshots.ts)
- GitHub Actions workflow badge in README.md

### Changed
- Screenshots now auto-update when code, styles, or docs change
- Desktop and mobile screenshots captured at 1920x1080 and 375x812 respectively

## [1.2.3] - 2025-03-05

### Fixed
- Corrected misleading bundle size information in documentation
- Updated size comparison tables: JS Bundle ~113KB, Package ~1.7MB (was incorrectly stated as ~50KB)
- Added separate "JS Bundle" and "Package Size" metrics for clarity

## [1.2.2] - 2025-03-05

### Added
- Escape support for colored text syntax: `\{red}text{/}` now shows literal text
- Label normalization for sidebar: "getting-started" and "getting started" now match
- Auto-generated badge (⚡) for sidebar items not defined in config.yaml
- `autoGenerated` flag to SidebarItem interface for tracking auto-generated items

### Fixed
- Code blocks now preserve colored text and callout syntax (no longer converted to HTML)
- Sidebar duplicate issue: config and auto-generated sidebars properly merged
- README.md examples: HTML format replaced with correct `{color}text{/}` syntax

### Changed
- README.md callouts examples updated to use `::: note` syntax instead of HTML
- Sidebar generator now uses normalized labels for matching categories
- CSS styles added for `.auto-badge` to visually distinguish auto-generated items

## [1.2.1] - 2025-03-05

### Changed
- Comprehensive documentation rewrite for all features
- Added Features section: Markdown Syntax, Themes, Search, i18n
- Added Advanced section: Configuration, Customization
- Full Turkish translations for all new documentation
- Updated sidebar configuration in docs/config.yaml

## [1.2.0] - 2025-03-05

### Added
- Configurable `logo` option in config.yaml for custom branding
- Default bunshelf logo included in dist/assets/images/
- Logo prop passed through renderHead, renderNavbar, renderNavbarWithThemes

### Changed
- Users can now override default logo via `logo: /path/to/custom-logo.webp` in config

## [1.1.2] - 2025-03-05

### Fixed
- Fixed duplicate nested translations directory in npm package
- Removed redundant src/i18n/translations from files (now uses dist copy)

## [1.1.1] - 2025-03-05

### Fixed
- Fixed `getI18nDir()` to correctly resolve translations path in published package
- Added translations directory to npm package files
- Added `copy:i18n` build step for distribution

## [1.1.0] - 2025-03-05

### Added
- `src/utils/mime.ts` - Centralized MIME type utilities
- `src/i18n/accessors.ts` - Type-safe i18n accessor functions
- `src/utils/paths.ts` - Path resolution utilities
- `src/utils/validation.ts` - Type guards for config and metadata
- i18n keys: `menu`, `callouts.*`, `code.*`

### Changed
- Refactored duplicate MIME_TYPES code into shared module
- Improved type safety with typed i18n accessors
- Better null/undefined checks in server request handlers
- Improved error handling in i18n JSON loading
- Better runtime validation for YAML config parsing
- Simplified default constants (removed unused exports)
- Improved 404 page generation with i18n support per locale

### Fixed
- `state` undefined check in server.ts before accessing `state.fuse`
- `themes/builder.ts` now uses `runtimeWrite` for Node.js compatibility
- `ensureDir` now returns boolean and logs errors instead of silently ignoring

### Removed
- Dead code: `getDocPath`, `buildUrl` from router.ts
- Dead code: `EXTERNAL_SCRIPTS` from cdn.ts
- Unused constants: `untitled`, `searchPlaceholder`, `docsLabel`, `poweredBy`

## [1.0.0] - 2025-03-05

### Added
- Initial release
- Beautiful themes (Light, Dark, Hacker)
- Full-text search with Fuse.js
- i18n support for multiple languages
- Responsive design with mobile bottom action bar
- Static site generation
- CLI tool (bunshelf dev/build/preview)
- Programmatic API
- Markdown support with frontmatter
- Code blocks with language selector
- Callout components (note, tip, warning, error)
- Colored text syntax
- Auto-generated sidebar from folder structure
- Manual sidebar configuration
- Theme customization support
- SEO-friendly meta tags

### Mobile Improvements
- Bottom action bar for easy navigation
- Responsive search input (no iOS zoom issues)
- Collapsible sidebar
- Proper viewport configuration
- Font-size optimization for mobile

### Fixed
- Horizontal overflow on mobile devices
- iOS Safari auto-zoom on input focus
- Responsive navbar with brand text truncation
