---
title: Introduction
description: Welcome to Bunshelf - a fast, modular documentation generator
order: 1
---

<img src="/assets/images/logo.webp" alt="Bunshelf Logo" style="width: 120px; height: 120px; margin-bottom: 1.5rem;" />

# Introduction

Welcome to {blue}Bunshelf{/}! A lightweight, blazing-fast documentation website generator powered by {green}Bun.js{/}.


## What is Bunshelf?

Bunshelf is a {accent}modern documentation generator{/} designed for developers who value simplicity and performance. Unlike heavy alternatives like Docusaurus, it doesn't require React or complex build pipelines. Just write Markdown, and get a beautiful documentation site.

### Why Choose Bunshelf?

| Feature | Bunshelf | Docusaurus | mdBook |
|---------|----------|------------|--------|
| Build Speed | {green}Ultra Fast{/} | Slow | Fast |
| Dependencies | {green}Minimal{/} | Heavy | Minimal |
| Framework | None | React | Rust |
| i18n Support | {green}Built-in{/} | Plugin | Manual |
| JS Bundle | {green}~13KB{/} | ~300KB | ~0KB |
| Package Size | {green}~3.3MB{/} | ~100MB | ~20MB |

## Key Features

### {accent}Lightning Fast{/}

Built on Bun.js, Bunshelf delivers exceptional performance:

- **Hot Reload**: Changes appear instantly in development
- **Fast Build**: Static sites generate in milliseconds
- **Minimal Bundle**: Only ~113KB of JavaScript

### {yellow}Modular Architecture{/}

Clean, separated codebase that's easy to understand and extend:

```
src/
├── core/           # Core rendering logic
├── templates/      # HTML components
├── markdown/       # Markdown parsing
├── themes/         # Theme system
└── utils/          # Utilities
```

### {green}Internationalization{/}

Built-in i18n support with custom locale prefixes:

```yaml
locales:
  en:
    indexPage: /intro
    localePrefix: english
  tr:
    indexPage: /intro
    localePrefix: turkish
```

### {purple}Theme System{/}

Three beautiful themes out of the box:

- **Light** - Clean, professional look
- **Dark** - Easy on the eyes
- **Hacker** - Terminal-inspired green on black

### {cyan}Rich Markdown Extensions{/}

Enhanced Markdown with custom syntax:

- **Colored Text**: `{color}text{/}` syntax for inline highlighting
- **Callouts**: Note, tip, warning, and error blocks
- **Syntax Highlighting**: Code blocks with language support
- **Custom Colors**: Hex color support `{#ff6b6b}text{/}`

## Quick Example

Here's a taste of what you can do with custom markdown syntax:

::: tip Pro Tip
Use the `{color}text{/}` syntax to highlight important information in your docs!
:::

## Callout Types

We support several callout types for different purposes:

::: note Note
This is a standard note for general information.
:::

::: info Info
Use info blocks for helpful contextual information.
:::

::: tip Pro Tip
Tips are for sharing best practices and shortcuts.
:::

::: warning Warning
Warnings alert users to potential issues.
:::

::: error Error
Error blocks highlight problems that need attention.
:::

::: danger Danger
Danger blocks are for critical warnings that could cause data loss or security issues.
:::

## Colored Text Examples

You can add colors to your text using a simple syntax:

- {red}Red text{/} for errors or important warnings
- {green}Green text{/} for success messages
- {blue}Blue text{/} for links or highlights
- {yellow}Yellow text{/} for cautions
- {purple}Purple text{/} for special mentions
- {cyan}Cyan text{/} for code-related notes
- {orange}Orange text{/} for warnings
- {pink}Pink text{/} for highlights
- {gray}Gray text{/} for muted content

You can also use custom hex colors: {#ff6b6b}Custom coral color{/} or {#4ecdc4}Teal color{/}.

## Code Blocks

Syntax highlighting with language selection and copy button:

```typescript
import { parseMarkdown } from "./markdown/parser.js";
import { renderPage } from "./core/renderer/index.js";

const content = await Bun.file("docs/intro.md").text();
const html = parseMarkdown(content);

console.log(html);
```

```python
def greet(name: str) -> str:
    """Return a greeting message."""
    return f"Hello, {name}!"

print(greet("World"))
```

## Getting Started

Ready to build your documentation site?

1. **Install** - Get Bunshelf running on your machine
2. **Configure** - Customize your site settings
3. **Write** - Create your documentation content
4. **Deploy** - Share your docs with the world

## Next Steps

Ready to get started? Check out the [Installation Guide](/getting-started/installation) to set up your first documentation site.

::: info Need Help?
Check out the GitHub repository for issues, discussions, and contributions.
:::
