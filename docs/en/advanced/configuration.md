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
sidebar:
  en:
    - label: Section
      href: /section
```

## Configuration Options

### Site Metadata

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | "Bunshelf" | Site title |
| `description` | string | - | Site description for SEO |
| `defaultLocale` | string | "en" | Default language |
| `locales` | string[] | ["en"] | Available locales |

### Theme Configuration

```yaml
theme:
  default: light  # light, dark, or hacker
```

::: tip Pro Tip
Users can still switch themes using the theme toggle in the navbar. The `default` option only sets the initial theme.
:::

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

::: warning Warning
If `hide` is set to `true`, the page won't appear in the sidebar but will still be accessible via direct URL.
:::

## Advanced Customization

### Custom CSS

Add custom styles by creating new CSS files in `public/assets/css/` and importing them in your template.

### Custom JS

Extend functionality by modifying `public/assets/js/main.js`.

### Markdown Extensions

You can extend the markdown parser in `src/markdown/parser.ts` to add custom syntax or plugins.
