---
title: Markdown Syntax
description: Complete guide to Bunshelf's extended markdown syntax
order: 1
---

# Markdown Syntax

Bunshelf extends standard Markdown with powerful custom features for creating beautiful documentation.

## Standard Markdown

All standard Markdown syntax is supported:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Unordered list
- Another item

1. Ordered list
2. Second item

[Link text](https://example.com)

![Image alt](/path/to/image.png)

> Blockquote

`inline code`
```

## Colored Text

Add visual emphasis with colored text using a simple syntax:

### Named Colors

```markdown
{red}Red text{/}
{green}Green text{/}
{blue}Blue text{/}
{yellow}Yellow text{/}
{purple}Purple text{/}
{cyan}Cyan text{/}
{orange}Orange text{/}
{pink}Pink text{/}
{gray}Gray text{/}
{accent}Accent color{/}
```

**Result:**

- {red}Red text{/} - for errors or critical warnings
- {green}Green text{/} - for success messages
- {blue}Blue text{/} - for links and highlights
- {yellow}Yellow text{/} - for cautions
- {purple}Purple text{/} - for special mentions
- {cyan}Cyan text{/} - for code-related notes
- {orange}Orange text{/} - for warnings
- {pink}Pink text{/} - for highlights
- {gray}Gray text{/} - for muted content
- {accent}Accent color{/} - matches your theme

### Custom Hex Colors

Use any hex color code:

```markdown
{#ff6b6b}Coral color{/}
{#4ecdc4}Teal color{/}
{#9b59b6}Purple color{/}
{#3498db}Blue color{/}
```

**Result:**

{#ff6b6b}Coral color{/} • {#4ecdc4}Teal color{/} • {#9b59b6}Purple color{/} • {#3498db}Blue color{/}

## Callouts

Create visually distinct blocks for different purposes:

### Note

```markdown
::: note Note
This is a standard note for general information.
:::
```

::: note Note
This is a standard note for general information.
:::

### Info

```markdown
::: info Info
Use info blocks for helpful contextual information.
:::
```

::: info Info
Use info blocks for helpful contextual information.
:::

### Tip

```markdown
::: tip Pro Tip
Tips are for sharing best practices and shortcuts.
:::
```

::: tip Pro Tip
Tips are for sharing best practices and shortcuts.
:::

### Warning

```markdown
::: warning Warning
Warnings alert users to potential issues.
:::
```

::: warning Warning
Warnings alert users to potential issues.
:::

### Error

```markdown
::: error Error
Error blocks highlight problems that need attention.
:::
```

::: error Error
Error blocks highlight problems that need attention.
:::

### Danger

```markdown
::: danger Danger
Danger blocks are for critical warnings that could cause data loss or security issues.
:::
```

::: danger Danger
Danger blocks are for critical warnings that could cause data loss or security issues.
:::

### Custom Title

All callouts support custom titles:

```markdown
::: tip Keyboard Shortcut
Press Ctrl+K to open the search dialog.
:::
```

::: tip Keyboard Shortcut
Press Ctrl+K to open the search dialog.
:::

## Code Blocks

### Basic Code Block

````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

```javascript
const greeting = "Hello, World!";
console.log(greeting);
```

### Supported Languages

Bunshelf supports syntax highlighting for 30+ languages:

| Language | Aliases |
|----------|---------|
| JavaScript | `js`, `javascript` |
| TypeScript | `ts`, `typescript` |
| Python | `py`, `python` |
| Rust | `rust` |
| Go | `go` |
| Java | `java` |
| C | `c` |
| C++ | `cpp` |
| C# | `csharp` |
| Ruby | `rb`, `ruby` |
| PHP | `php` |
| Swift | `swift` |
| Kotlin | `kotlin` |
| Bash | `bash`, `sh`, `shell` |
| PowerShell | `powershell` |
| SQL | `sql` |
| HTML | `html` |
| CSS | `css`, `scss` |
| JSON | `json` |
| YAML | `yaml`, `yml` |
| XML | `xml` |
| Markdown | `markdown`, `md` |
| Dockerfile | `dockerfile` |
| Diff | `diff` |
| Plaintext | `text`, `plaintext` |

### Code Block Features

All code blocks include:

- {green}Line numbers{/} for easy reference
- {green}Language selector{/} dropdown
- {green}Copy button{/} for quick copying
- {green}Syntax highlighting{/} for readability

## Tables

Create tables with standard Markdown syntax:

```markdown
| Feature | Status | Priority |
|---------|--------|----------|
| Search | Done | High |
| Themes | Done | Medium |
| i18n | Done | High |
```

| Feature | Status | Priority |
|---------|--------|----------|
| Search | Done | High |
| Themes | Done | Medium |
| i18n | Done | High |

## Combining Features

You can combine colored text inside callouts:

```markdown
::: tip Important
Use {blue}colored text{/} to highlight key points inside callouts!
:::
```

::: tip Important
Use {blue}colored text{/} to highlight key points inside callouts!
:::

## Best Practices

### When to Use Callouts

| Type | Use Case |
|------|----------|
| `note` | General information, clarifications |
| `info` | Helpful context, additional details |
| `tip` | Best practices, shortcuts, efficiency tips |
| `warning` | Potential issues, breaking changes |
| `error` | Common mistakes, error handling |
| `danger` | Security risks, data loss scenarios |

### When to Use Colored Text

- {red}Red{/} - Errors, critical warnings
- {green}Green{/} - Success, completion, positive outcomes
- {blue}Blue{/} - Links, references, navigation hints
- {yellow}Yellow{/} - Caution, attention needed
- {accent}Accent{/} - Brand colors, emphasis

::: tip Pro Tip
Don't overuse colored text. Reserve it for truly important information that needs to stand out.
:::
