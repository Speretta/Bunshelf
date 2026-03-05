---
title: Search
description: Built-in full-text search powered by Fuse.js
order: 3
---

# Search

Bunshelf includes powerful full-text search out of the box, powered by {blue}Fuse.js{/}.

## How It Works

### Search Index

During build, Bunshelf creates a search index containing:

- Page titles
- Page content (text only, no HTML)
- Page excerpts
- Locale information

### Fuzzy Search

The search uses fuzzy matching, which means:

- {green}Typo tolerance{/} - "instalation" finds "installation"
- {green}Partial matching{/} - "config" finds "configuration"
- {green}Relevance ranking{/} - Best matches appear first

## Using Search

### Keyboard Shortcut

Press {accent}Ctrl+K{/} (or {accent}Cmd+K{/} on Mac) to open search.

### Search Bar

Click the search input in the navbar to start searching.

### Results

Search results show:

1. Page title
2. Content excerpt with the matching text highlighted
3. Click to navigate to the page

## Search Configuration

The search is configured for optimal results:

```typescript
{
  keys: ["title", "content"],
  threshold: 0.3,           // Lower = stricter matching
  includeMatches: true,     // Show what matched
  minMatchCharLength: 2,    // Minimum characters to search
  ignoreLocation: true,     // Search anywhere in content
  findAllMatches: true      // Find all occurrences
}
```

## Search Index File

The search index is generated as `search-index.json`:

```json
[
  {
    "title": "Installation",
    "href": "/getting-started/installation",
    "excerpt": "Getting started with Bunshelf...",
    "content": "Full text content...",
    "locale": "en"
  }
]
```

## Multilingual Search

Search respects the current locale:

- English pages search English content
- Turkish pages search Turkish content
- Each locale has its own index

::: tip Pro Tip
When switching languages, search automatically updates to search in the selected language.
:::

## Performance

### Index Size

The search index is lightweight:

- JSON format
- Text-only content (no HTML)
- Compressed during build

### Client-Side

All search happens in the browser:

- {green}No server requests{/} required
- {green}Instant results{/} as you type
- {green}Works offline{/} after initial load

## Customizing Search

### Exclude Pages

Hide pages from search with frontmatter:

```yaml
---
title: Hidden Page
hide: true
---
```

### Search Results Limit

By default, search returns up to 10 results. This can be customized in the search handler.

## Best Practices

### Writing Searchable Content

- Use descriptive titles
- Include relevant keywords naturally
- Write clear, concise descriptions
- Use headings to structure content

### Improving Search Results

- Use consistent terminology
- Avoid jargon without explanation
- Include synonyms in content
- Write for your audience

::: info Note
Search indexes the rendered text content, not the raw markdown. This means HTML elements and code comments are not searchable.
:::

## Technical Details

### Fuse.js Integration

Bunshelf uses Fuse.js v7 for fuzzy search:

```typescript
import Fuse from "fuse.js";

const fuse = new Fuse(searchIndex, {
  keys: ["title", "content"],
  threshold: 0.3,
  // ... other options
});

const results = fuse.search(query, { limit: 10 });
```

### CDN Loading

Fuse.js is loaded from CDN for optimal caching:

```html
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js"></script>
```

This ensures:
- {green}Fast loading{/} from global CDN
- {green}Browser caching{/} across sites using Fuse.js
- {green}Smaller bundle size{/} for your documentation
