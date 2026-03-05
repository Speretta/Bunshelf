---
title: Installation
description: How to install and set up Bunshelf
order: 1
---

# Installation

Getting started with Bunshelf is quick and easy. Follow these steps to set up your documentation site.

## Prerequisites

Before you begin, ensure you have {green}Bun{/} installed on your system:

```bash
bun --version
```

If you don't have Bun installed, run:

```bash
curl -fsSL https://bun.sh/install | bash
```

::: info What is Bun?
Bun is a modern JavaScript runtime that's significantly faster than Node.js. It includes a bundler, test runner, and package manager out of the box.
:::

## Installation Methods

### Option 1: Clone the Repository

The fastest way to get started:

```bash
git clone https://github.com/speretta/bunshelf.git
cd bunshelf
bun install
```

### Option 2: Manual Setup

Create a new project from scratch:

```bash
mkdir my-docs
cd my-docs
bun init
```

Install dependencies:

```bash
bun add markdown-it yaml front-matter fuse.js highlight.js
bun add -d @types/bun @types/markdown-it @types/highlight.js
```

::: tip Pro Tip
Use `bun install` instead of `npm install` for significantly faster package installation. Bun can install packages up to 20x faster!
:::

## Project Structure

After installation, your project should look like this:

```
bunshelf/
├── src/
│   ├── core/
│   │   ├── constants/      # Default values, CDN URLs
│   │   └── renderer/       # Page rendering logic
│   ├── templates/          # HTML components
│   │   └── components/     # Navbar, sidebar, etc.
│   ├── markdown/           # Markdown parsing
│   │   ├── parser.ts
│   │   ├── callouts.ts
│   │   └── colored-text.ts
│   ├── themes/             # Theme system
│   ├── i18n/               # Translations
│   ├── utils/              # Utilities
│   ├── server.ts           # Dev server
│   └── ssg/                # Static site generator
├── public/
│   └── assets/
│       ├── css/            # Stylesheets
│       ├── js/             # Client-side JS
│       └── images/         # Logo, icons
├── docs/
│   ├── config.yaml         # Site configuration
│   ├── en/                 # English content
│   └── tr/                 # Turkish content
└── dist/                   # Build output
```

## Configuration

Create a `docs/config.yaml` file:

```yaml
title: My Documentation
description: My awesome documentation site
defaultLocale: en
locales:
  - en
  - tr
theme:
  default: light
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | "Bunshelf" | Site title displayed in navbar |
| `description` | string | - | Meta description for SEO |
| `defaultLocale` | string | "en" | Default language code |
| `locales` | string[] | ["en"] | List of available locales |
| `theme.default` | string | "light" | Default theme (light/dark/hacker) |

## Running the Development Server

Start the development server with hot reload:

```bash
bun run dev
```

Your documentation site will be available at `http://localhost:3000`.

### Available Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run build` | Build static site for production |
| `bun run preview` | Preview production build locally |

::: warning Port in Use
If port 3000 is already in use, you can specify a different port:

```bash
PORT=3001 bun run dev
```
:::

## Verifying Installation

1. Open your browser and navigate to `http://localhost:3000`
2. You should see the welcome page with the Bunshelf logo
3. Try editing `docs/en/intro.md` - changes should appear instantly

## Troubleshooting

### Bun Not Found

If you get a "bun: command not found" error:

```bash
# Add Bun to your PATH
export PATH="$HOME/.bun/bin:$PATH"

# Or restart your terminal
source ~/.bashrc  # or ~/.zshrc
```

### Port Already in Use

```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules bun.lockb
bun install
```

## Next Steps

Now that you have Bunshelf installed, head over to the [Quick Start Guide](/getting-started/quick-start) to learn how to write your first documentation pages.

::: tip What's Next?
- [Quick Start Guide](/getting-started/quick-start) - Create your first pages
- [Configuration](/advanced/configuration) - Customize your site
- [Deployment](/advanced/deployment) - Deploy to production
:::
