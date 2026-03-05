---
title: Customization
description: Advanced customization options for Bunshelf
order: 2
---

# Customization

Learn how to customize Bunshelf to match your brand and requirements.

## Logo

### Default Logo

Bunshelf includes a default logo. To use it, simply don't specify a logo in your config.

### Custom Logo

Add your logo in `docs/config.yaml`:

```yaml
title: My Docs
logo: /assets/images/my-logo.webp
```

### Logo Requirements

| Format | Supported |
|--------|-----------|
| WebP | {green}Recommended{/} |
| PNG | {green}Yes{/} |
| SVG | {green}Yes{/} |
| ICO | {green}For favicon{/} |

::: tip Pro Tip
Use WebP for best compression. Aim for a logo size of 32x32 to 64x64 pixels for the navbar.
:::

### Logo Placement

1. Add your logo to `public/assets/images/`:

```bash
cp my-logo.webp public/assets/images/
```

2. Reference it in config:

```yaml
logo: /assets/images/my-logo.webp
```

The logo appears in:
- {green}Navbar{/} - Next to the site title
- {green}Favicon{/} - Browser tab icon

## Custom CSS

### Override Existing Styles

Create a custom CSS file:

```css
/* public/assets/css/custom.css */

.navbar {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.sidebar {
  width: 280px;
}

.doc-content {
  max-width: 900px;
}
```

### Add New Styles

You can also add entirely new styles:

```css
/* Custom callout styles */
.my-custom-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
}
```

### Loading Custom CSS

Import your CSS in the head template or add it to `public/assets/css/` directory.

## Custom JavaScript

### Extend Functionality

Modify `public/assets/js/main.js`:

```javascript
// Add custom keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === '?' && e.shiftKey) {
    showHelpModal();
  }
});

function showHelpModal() {
  // Your custom modal logic
}
```

### Third-Party Scripts

Add scripts to your templates:

```html
<script src="https://analytics.example.com/script.js"></script>
```

## Theme Customization

### Modify Existing Theme

Edit `public/assets/css/themes.css`:

```css
[data-theme="light"] {
  --accent-primary: #your-brand-color;
  --link-color: #your-brand-color;
}
```

### Create New Theme

Add a new theme entry:

```css
[data-theme="brand"] {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --accent-primary: #ff6b35;
  --link-color: #ff6b35;
}
```

Register in `src/themes/registry.ts`:

```typescript
{
  name: "brand",
  label: "Brand",
  vars: {
    "--bg-primary": "#ffffff",
    "--text-primary": "#1a1a1a",
    "--accent-primary": "#ff6b35",
    // ...
  },
}
```

## Sidebar Styling

### Custom Icons

Add icons to sidebar items using CSS:

```css
.sidebar-link::before {
  content: "📄 ";
}

.sidebar-category[data-category="getting-started"]::before {
  content: "🚀 ";
}
```

### Collapsed State

Control default collapsed state:

```yaml
sidebar:
  en:
    - label: Getting Started
      collapsed: false  # Expanded by default
      items:
        - label: Introduction
          href: /intro
```

## Page Templates

### Custom Page Layout

Modify `src/core/renderer/page.ts` for layout changes.

### Component Customization

Individual components are in `src/templates/components/`:

| Component | File |
|-----------|------|
| Navbar | `navbar.ts` |
| Sidebar | `sidebar.ts` |
| Footer | `footer.ts` |
| Theme Toggle | `theme-toggle.ts` |
| Page Navigation | `page-nav.ts` |

## Markdown Extensions

### Custom Callout Types

Add new callout types in `src/markdown/callouts.ts`:

```typescript
const calloutTypes: Record<string, CalloutConfig> = {
  // ... existing types
  success: { 
    class: "callout-success", 
    icon: "✅", 
    label: "Success" 
  },
};
```

Add CSS:

```css
.callout-success {
  background: #d4edda;
  border-left: 4px solid #28a745;
}
```

### Custom Colored Text

Add new named colors in `src/markdown/colored-text.ts`:

```typescript
const colorMap: Record<string, string> = {
  // ... existing colors
  brand: "#ff6b35",
  primary: "#2563eb",
};
```

## Build Customization

### Output Directory

Modify `src/utils/paths.ts`:

```typescript
export function getDistDir(): string {
  return join(process.cwd(), "build");  // Instead of "dist"
}
```

### Static Assets

Customize asset copying in `src/ssg/builder.ts`:

```typescript
// Copy additional directories
await cp(join(PROJECT_ROOT, "images"), join(DIST_DIR, "images"), { recursive: true });
```

## Environment-Based Configuration

### Environment Variables

```bash
# Custom port
PORT=8080 bun run dev

# Log level
LOG_LEVEL=debug bun run dev
```

### Config per Environment

```yaml
# config.yaml with environment support
title: ${SITE_TITLE:My Docs}
description: ${SITE_DESCRIPTION:Documentation}
```

## Best Practices

### Maintainability

- Keep customizations in separate files
- Comment your modifications
- Use CSS variables for easy theming

### Upgradability

- Don't modify core files directly
- Use configuration options first
- Keep track of your changes

### Performance

- Minimize custom JavaScript
- Optimize images before adding
- Use CSS variables instead of multiple classes

::: warning Warning
When upgrading Bunshelf, your customizations in `src/` may be overwritten. Keep backups of your modifications.
:::
