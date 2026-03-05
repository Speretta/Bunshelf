import { describe, test, expect } from "bun:test";
import { parseMarkdown, supportedLanguages, languageAliases } from "./parser.js";

describe("parseMarkdown", () => {
  test("parses basic markdown", () => {
    const result = parseMarkdown("# Hello World");
    expect(result).toContain("<h1>Hello World</h1>");
  });

  test("parses paragraphs", () => {
    const result = parseMarkdown("This is a paragraph.");
    expect(result).toContain("<p>This is a paragraph.</p>");
  });

  test("parses bold and italic text", () => {
    const result = parseMarkdown("**bold** and *italic*");
    expect(result).toContain("<strong>bold</strong>");
    expect(result).toContain("<em>italic</em>");
  });

  test("parses links", () => {
    const result = parseMarkdown("[link](https://example.com)");
    expect(result).toContain('<a href="https://example.com">link</a>');
  });

  test("parses code blocks with language", () => {
    const result = parseMarkdown("```javascript\nconsole.log('hello');\n```");
    expect(result).toContain("code-block");
    expect(result).toContain("javascript");
  });

  test("parses inline code", () => {
    const result = parseMarkdown("`inline code`");
    expect(result).toContain("<code>inline code</code>");
  });

  test("parses lists", () => {
    const result = parseMarkdown("- item 1\n- item 2");
    expect(result).toContain("<ul>");
    expect(result).toContain("<li>item 1</li>");
    expect(result).toContain("<li>item 2</li>");
  });

  test("parses ordered lists", () => {
    const result = parseMarkdown("1. first\n2. second");
    expect(result).toContain("<ol>");
    expect(result).toContain("<li>first</li>");
  });

  test("parses blockquotes", () => {
    const result = parseMarkdown("> quote");
    expect(result).toContain("<blockquote>");
    expect(result).toContain("quote");
  });
});

describe("supportedLanguages", () => {
  test("includes common languages", () => {
    expect(supportedLanguages).toContain("javascript");
    expect(supportedLanguages).toContain("typescript");
    expect(supportedLanguages).toContain("python");
    expect(supportedLanguages).toContain("rust");
  });
});

describe("languageAliases", () => {
  test("maps js to javascript", () => {
    expect(languageAliases["js"]).toBe("javascript");
  });

  test("maps ts to typescript", () => {
    expect(languageAliases["ts"]).toBe("typescript");
  });

  test("maps yml to yaml", () => {
    expect(languageAliases["yml"]).toBe("yaml");
  });
});
