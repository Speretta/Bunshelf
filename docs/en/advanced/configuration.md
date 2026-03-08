---
title: Configuration
description: Complete configuration reference for Bunshelf
order: 1
---

# Configuration

This guide covers all configuration options available in Bunshelf.

## Configuration File

The main configuration is in `docs/config.yaml`:

```yaml
title: My Docs
description: My documentation site
defaultLocale: en
base: ""
logo: false
locales:
  en:
    indexPage: /intro
    localePrefix: english
  tr:
    indexPage: /intro
    localePrefix: turkish
theme:
  default: light
sidebar:
  en:
    - label: Section
      href: /section
```

## Configuration Options

### Site Metadata

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | "Bunshelf" | Site title displayed in navbar |
| `description` | string | - | Meta description for SEO |
| `defaultLocale` | string | "en" | Default language code |
| `locales` | object | { en: {} } | Locale configuration with `indexPage` and `localePrefix` |
| `base` | string | "" | Base URL path for subdirectory deployment |
| `logo` | string \| false | - | Path to logo image, or `false` to use default logo |

### Base URL

The `base` option should be set to `""` (empty string) for root deployment:

```yaml
base: ""
```

For subdirectory deployment (e.g., GitHub Pages), set it to your repository name:

```yaml
base: /my-repo
```

::: note Automatic Detection
When deploying with GitHub Actions, the `base` URL is automatically detected from the `GITHUB_REPOSITORY` environment variable.
:::

### Logo Configuration

Set `logo: false` to use the default Bunshelf logo:

```yaml
logo: false
```

To use a custom logo, provide the path:

```yaml
logo: /assets/images/my-logo.webp
```

Place your custom logo in `public/assets/images/` directory.

### Locales Configuration

The `locales` option now uses an object format with per-locale settings:

```yaml
locales:
  en:
    indexPage: /intro
    localePrefix: english
  tr:
    indexPage: /intro
    localePrefix: turkish
```

#### Locale Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `indexPage` | string | "/intro" | Landing page path for this locale |
| `localePrefix` | string | locale code | URL prefix for this locale (e.g., `turkish` instead of `tr`) |

#### Default Behavior

- {green}Default locale{/} - No URL prefix added (e.g., `/intro`)
- {green}Other locales{/} - Uses `localePrefix` in URL (e.g., `/turkish/intro`)
- {green}Missing settings{/} - Warnings are shown and defaults are applied

#### URL Structure Example

With this configuration:

```yaml
defaultLocale: en
locales:
  en:
    indexPage: /intro
    localePrefix: english
  tr:
    indexPage: /intro
    localePrefix: turkish
```

The URLs will be:
- English (default): `/intro`, `/getting-started/installation`
- Turkish: `/turkish/intro`, `/turkish/getting-started/installation`

### Base URL Configuration

The `base` option is essential when deploying to a subdirectory (e.g., GitHub Pages, GitLab Pages):

```yaml
# For GitHub Pages: https://username.github.io/repo-name/
base: /repo-name

# For GitLab Pages: https://username.gitlab.io/project/
base: /project

# For custom domain or root deployment
base: ""
```

::: note Automatic Detection
When deploying with GitHub Actions, the `base` URL is {green}automatically detected{/} from the `GITHUB_REPOSITORY` environment variable. You don't need to set it manually in `config.yaml` for GitHub Pages deployments.
:::

::: tip Manual Override
To override automatic detection, set the `BASE_URL` environment variable:
```bash
BASE_URL=/custom-path bun run build
```
:::

#### Base URL Priority

Bunshelf determines the base URL in this order:

1. {accent}`BASE_URL` environment variable{/} (highest priority)
2. {accent}`GITHUB_REPOSITORY` environment variable{/} (for GitHub Actions)
3. {accent}`base` in config.yaml{/}
4. Empty string (default)

::: note Important
The `base` option automatically prefixes all internal links, assets, and navigation URLs. This ensures your documentation works correctly when hosted in a subdirectory.
:::

#### GitHub Pages Example

For GitHub Pages deployment:

1. Add `base` to your `config.yaml`:
   ```yaml
   base: /YourRepoName
   ```

2. The repository name should match your `base` value (case-sensitive)

3. All URLs will be prefixed automatically:
   - Assets: `/YourRepoName/assets/css/style.css`
   - Pages: `/YourRepoName/intro`
   - Navigation: `/YourRepoName/getting-started/installation`

### Theme Configuration

```yaml
theme:
  default: light  # light, dark, or hacker
```

::: tip Pro Tip
Users can still switch themes using the theme toggle in the navbar. The `default` option only sets the initial theme.
:::

### Logo Configuration

Add your custom logo:

```yaml
logo: /assets/images/my-logo.webp
```

The logo appears in:
- {green}Navbar{/} - Next to the site title
- {green}Favicon{/} - Browser tab icon

Place your logo in `public/assets/images/` directory.

### Sidebar Configuration

The sidebar supports nested navigation:

```yaml
sidebar:
  en:
    - label: Section Title
      collapsed: true
      items:
        - label: Page Title
          href: /page-slug
```

#### Sidebar Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Display text |
| `href` | string | Link URL (optional for sections) |
| `items` | array | Nested items |
| `collapsed` | boolean | Start collapsed |

## Tam Yapılandırma Örneği

 ```yaml
# Site metadata
title: My Documentation
description: A comprehensive guide to our product
defaultLocale: en
base: ""
logo: false
locales:
  en:
    indexPage: /intro
    localePrefix: english
  tr:
    indexPage: /intro
    localePrefix: turkish
  de:
    indexPage: /intro
    localePrefix: german

# Theme settings
theme:
  default: light

# English sidebar
sidebar:
  en:
    - label: Getting Started
      collapsed: false
      items:
        - label: Introduction
          href: /intro
        - label: Installation
          href: /getting-started/installation
        - label: Quick Start
          href: /getting-started/quick-start
    - label: Features
      items:
        - label: Markdown Syntax
          href: /features/markdown-syntax
        - label: Themes
          href: /features/themes
        - label: Search
          href: /features/search
        - label: Internationalization
          href: /features/i18n
    - label: Advanced
      items:
        - label: Configuration
          href: /advanced/configuration
        - label: Customization
          href: /advanced/customization

# Turkish sidebar
  tr:
    - label: Başlarken
      collapsed: false
      items:
        - label: Giriş
          href: /intro
        - label: Kurulum
          href: /getting-started/installation
        - label: Hızlı Başlangıç
          href: /getting-started/quick-start
```

## Custom Themes

You can customize themes by modifying CSS variables in `public/assets/css/themes.css`:

```css
[data-theme="custom"] {
  --bg-primary: #your-bg;
  --text-primary: #your-text;
  --accent-primary: #your-accent;
}
```

### Available CSS Variables

| Variable | Description |
|----------|-------------|
| `--bg-primary` | Main background |
| `--bg-secondary` | Secondary background (sidebar, etc.) |
| `--text-primary` | Main text color |
| `--text-secondary` | Secondary text |
| `--accent-primary` | Primary accent color |
| `--border-color` | Border color |
| `--code-bg` | Code block background |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3000) |
| `LOG_LEVEL` | Logging level (error, warn, info, debug) |

## Page Frontmatter

Each markdown page can have its own configuration:

```yaml
---
title: Page Title
description: Page description
order: 1
sidebar_label: Custom Label
hide: false
---
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Page title |
| `description` | string | Meta description for SEO |
| `order` | number | Ordering in sidebar |
| `sidebar_label` | string | Custom label in sidebar |
| `hide` | boolean | Hide from sidebar |

::: warning Warning
If `hide` is set to `true`, the page won't appear in the sidebar but will still be accessible via direct URL.
:::

## Advanced Customization

### Custom CSS

Add custom styles by creating new CSS files in `public/assets/css/`.

### Custom JS

Extend functionality by modifying `public/assets/js/main.js`.

### Markdown Extensions

Extend the markdown parser in `src/markdown/parser.ts` to add custom syntax or plugins.
