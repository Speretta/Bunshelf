# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
