import { describe, test, expect } from "bun:test";
import { parseFrontmatter, extractTitle, stripFrontmatter } from "./frontmatter.js";

describe("parseFrontmatter", () => {
  test("parses frontmatter correctly", () => {
    const content = `---
title: My Page
description: A test page
order: 1
---

# Content`;
    const result = parseFrontmatter(content);
    expect(result.meta.title).toBe("My Page");
    expect(result.meta.description).toBe("A test page");
    expect(result.meta.order).toBe(1);
    expect(result.body).toContain("# Content");
  });

  test("handles quoted values", () => {
    const content = `---
title: "My Title"
description: 'My Description'
---

Content`;
    const result = parseFrontmatter(content);
    expect(result.meta.title).toBe("My Title");
    expect(result.meta.description).toBe("My Description");
  });

  test("extracts title from heading if no frontmatter", () => {
    const content = `# Hello World

Some content`;
    const result = parseFrontmatter(content);
    expect(result.meta.title).toBe("Hello World");
  });

  test("returns default title for empty content", () => {
    const result = parseFrontmatter("");
    expect(result.meta.title).toBe("Untitled");
  });

  test("handles sidebar_label", () => {
    const content = `---
title: My Page
sidebar_label: Introduction
---

Content`;
    const result = parseFrontmatter(content);
    expect(result.meta.sidebar_label).toBe("Introduction");
  });

  test("handles hide flag", () => {
    const content = `---
title: Hidden Page
hide: true
---

Content`;
    const result = parseFrontmatter(content);
    expect(result.meta.hide).toBe(true);
  });
});

describe("extractTitle", () => {
  test("extracts title from frontmatter", () => {
    const content = `---
title: My Title
---

Content`;
    expect(extractTitle(content)).toBe("My Title");
  });

  test("extracts title from heading", () => {
    const content = `# Heading Title

Content`;
    expect(extractTitle(content)).toBe("Heading Title");
  });

  test("prioritizes frontmatter title", () => {
    const content = `---
title: Frontmatter Title
---

# Heading Title`;
    expect(extractTitle(content)).toBe("Frontmatter Title");
  });

  test("returns null for no title", () => {
    expect(extractTitle("Just content")).toBeNull();
  });
});

describe("stripFrontmatter", () => {
  test("removes frontmatter from content", () => {
    const content = `---
title: My Title
---

# Content`;
    const result = stripFrontmatter(content);
    expect(result).not.toContain("---");
    expect(result).toContain("# Content");
  });

  test("returns content unchanged if no frontmatter", () => {
    const content = "# Just Content";
    expect(stripFrontmatter(content)).toBe(content);
  });
});
