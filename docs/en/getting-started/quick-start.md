---
title: Quick Start
description: Get up and running with Bunshelf in minutes
order: 2
---

# Quick Start

Let's create your first documentation page in just a few minutes!

## Creating Your First Page

Create a new markdown file in `docs/en/`:

```bash
touch docs/en/my-first-page.md
```

Add some content:

```markdown
---
title: My First Page
description: My first documentation page
---

# My First Page

Welcome to my {blue}first documentation page{/}!

## Features

- Easy to write
- Fast to render
- Beautiful by default

::: tip Pro Tip
You can use all the custom syntax features right away!
:::
```

## Frontmatter Reference

Each page can have frontmatter at the top:

```yaml
---
title: Page Title
description: A brief description
order: 1
sidebar_label: Custom Label
hide: false
---
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Page title shown in the document |
| `description` | string | Meta description for SEO |
| `order` | number | Ordering in sidebar (optional) |
| `sidebar_label` | string | Custom label in sidebar |
| `hide` | boolean | Hide from sidebar navigation |

## Custom Markdown Syntax

### Colored Text

Add emphasis with colored text using a simple syntax:

```markdown
{red}Important error message{/}
{green}Success! Operation completed{/}
{blue}See the documentation for details{/}
{#ff6b6b}Custom coral color{/}
```

**Available Colors:**

| Syntax | Result |
|--------|--------|
| `{red}text{/}` | {red}Red text{/} |
| `{green}text{/}` | {green}Green text{/} |
| `{blue}text{/}` | {blue}Blue text{/} |
| `{yellow}text{/}` | {yellow}Yellow text{/} |
| `{purple}text{/}` | {purple}Purple text{/} |
| `{cyan}text{/}` | {cyan}Cyan text{/} |
| `{orange}text{/}` | {orange}Orange text{/} |
| `{pink}text{/}` | {pink}Pink text{/} |
| `{gray}text{/}` | {gray}Gray text{/} |
| `{#hex}text{/}` | Custom hex color |

### Callouts

Create visually distinct blocks for different purposes:

```markdown
::: note Note
General information goes here.
:::

::: tip Pro Tip
Best practices and helpful shortcuts.
:::

::: warning Warning
Potential issues to watch out for.
:::

::: error Error
Problems that need attention.
:::
```

## Sidebar Configuration

### Auto-Generated Sidebar

By default, the sidebar is generated from your folder structure:

```
docs/en/
├── intro.md           → /intro
├── getting-started/
│   ├── installation.md
│   └── quick-start.md
└── advanced/
    └── configuration.md
```

### Manual Sidebar Configuration

For more control, configure in `docs/config.yaml`:

```yaml
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
    - label: Advanced
      items:
        - label: Configuration
          href: /advanced/configuration
```

#### Sidebar Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Display text in sidebar |
| `href` | string | Link URL (optional for section headers) |
| `items` | array | Nested navigation items |
| `collapsed` | boolean | Start section collapsed (default: true) |

::: note Note
When you specify a sidebar configuration, it completely replaces the auto-generated sidebar.
:::

## Adding a New Language

1. Create a new folder in `docs/`:

```bash
mkdir docs/de  # German
```

2. Add the locale to `config.yaml`:

```yaml
locales:
  - en
  - tr
  - de
```

3. Create translated content:

```bash
cp docs/en/intro.md docs/de/intro.md
```

4. Translate the content and update frontmatter.

## Building for Production

Generate a static site:

```bash
bun run build
```

The output will be in the `dist/` directory:

```
dist/
├── index.html
├── intro/
│   └── index.html
├── getting-started/
│   ├── installation/
│   │   └── index.html
│   └── quick-start/
│       └── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── search-index.json
```

### Preview Production Build

Test your production build locally:

```bash
bun run preview
```

::: info Static Site
The build process generates fully static HTML files. No server-side rendering required - deploy to any static hosting service!
:::

## Deployment Options

### Vercel

```bash
vercel deploy dist
```

### Netlify

Drag and drop the `dist/` folder to Netlify, or use the CLI:

```bash
netlify deploy --prod --dir=dist
```

### GitHub Pages

Push the `dist/` folder to your `gh-pages` branch.

## What's Next?

Now that you know the basics:

- [Configuration Guide](/advanced/configuration) - Customize every aspect
- [Theme Customization](/advanced/themes) - Create custom themes
- [Deploy](/advanced/deployment) - Deploy to production

::: tip Pro Tip
Use the search feature (Ctrl+K) in the navbar to quickly find any page!
:::
