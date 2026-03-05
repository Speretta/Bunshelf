---
title: Themes
description: Customize your documentation with beautiful themes
order: 2
---

# Themes

Bunshelf comes with three beautiful themes out of the box, and you can customize them or create your own.

## Built-in Themes

### Light Theme

The default theme with a clean, professional look:

- {blue}White background{/} for main content
- {gray}Light gray sidebar{/}
- {blue}Blue accent colors{/}
- Best for {green}daytime reading{/}

### Dark Theme

Easy on the eyes, perfect for late-night coding:

- {purple}Dark blue background{/}
- Softer contrast for reduced eye strain
- {blue}Brighter accent colors{/}
- Ideal for {green}low-light environments{/}

### Hacker Theme

Terminal-inspired green on black:

- {green}Black background{/}
- {green}Green text{/} and accents
- Matrix-style aesthetics
- Perfect for {green}developers who love terminals{/}

## Setting Default Theme

Configure the default theme in `docs/config.yaml`:

```yaml
theme:
  default: light  # Options: light, dark, hacker
```

::: note Note
Users can always switch themes using the toggle in the navbar. The `default` option only sets the initial theme.
:::

## Theme CSS Variables

Each theme is defined using CSS variables. Here are the available variables:

```css
[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f7f8fa;
  --bg-tertiary: #eef0f4;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --accent-primary: #2563eb;
  --accent-secondary: #3b82f6;
  --accent-hover: #1d4ed8;
  --border-color: #e2e8f0;
  --code-bg: #f1f5f9;
  --code-text: #1e293b;
  --link-color: #2563eb;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
}
```

### Variable Reference

| Variable | Description |
|----------|-------------|
| `--bg-primary` | Main content background |
| `--bg-secondary` | Sidebar, cards background |
| `--bg-tertiary` | Tertiary elements |
| `--text-primary` | Main text color |
| `--text-secondary` | Secondary text |
| `--text-muted` | Muted/disabled text |
| `--accent-primary` | Primary accent (buttons, links) |
| `--accent-secondary` | Secondary accent |
| `--accent-hover` | Hover state accent |
| `--border-color` | Border color |
| `--code-bg` | Code block background |
| `--code-text` | Code text color |
| `--link-color` | Link color |
| `--shadow-sm` | Small shadow |
| `--shadow-md` | Medium shadow |

## Custom Theme

Create a custom theme by adding CSS variables in `public/assets/css/themes.css`:

```css
[data-theme="custom"] {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #eaeaea;
  --text-secondary: #b8b8b8;
  --accent-primary: #e94560;
  --border-color: #0f3460;
}

[data-theme="custom"] .theme-option[data-theme="custom"] {
  display: flex;
}
```

Then update the theme registry in `src/themes/registry.ts`:

```typescript
export const themes: Theme[] = [
  // ... existing themes
  {
    name: "custom",
    label: "Custom",
    vars: {
      "--bg-primary": "#1a1a2e",
      "--text-primary": "#eaeaea",
      // ... other variables
    },
  },
];
```

## Automatic Theme Detection

Bunshelf automatically detects the user's system preference:

```javascript
// Checks system preference on first visit
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Uses dark theme
}
```

::: info Theme Persistence
The user's theme choice is saved to localStorage and persists across sessions.
:::

## Theme Toggle

Users can switch themes using the dropdown in the navbar:

1. Click the theme icon (sun/moon/terminal)
2. Select your preferred theme
3. The choice is saved automatically

## Best Practices

### Color Contrast

Ensure sufficient contrast between text and background:

- {green}Good{/}: Light text on dark background, dark text on light background
- {red}Avoid{/}: Low contrast combinations

### Accessibility

- Test your theme with color blindness simulators
- Ensure focus states are visible
- Maintain readable font sizes

### Brand Consistency

Match your documentation theme with your brand:

```yaml
# Match your brand colors
--accent-primary: #your-brand-color;
--link-color: #your-brand-color;
```

::: tip Pro Tip
Use the browser's DevTools to experiment with CSS variables in real-time before committing to a theme.
:::
