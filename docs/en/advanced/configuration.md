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
locales:
  - en
  - tr
theme:
  default: light
logo: /assets/images/logo.webp
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
| `locales` | string[] | ["en"] | List of available locales |
| `logo` | string | - | Path to logo image |

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

## Complete Configuration Example

```yaml
# Site metadata
title: My Documentation
description: A comprehensive guide to our product
defaultLocale: en
locales:
  - en
  - tr
  - de

# Theme settings
theme:
  default: light

# Branding
logo: /assets/images/company-logo.webp

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
          href: /tr/intro
        - label: Kurulum
          href: /tr/getting-started/installation
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
