import { describe, test, expect } from "bun:test";
import { sanitizeSlug, sanitizeLocale, sanitizePath, isValidPath, sanitizeInput, sanitizeHtmlAttribute, stripTags } from "./sanitize.js";

describe("sanitizeSlug", () => {
  test("returns null for empty string", () => {
    expect(sanitizeSlug("")).toBeNull();
  });

  test("returns null for path traversal attempts", () => {
    expect(sanitizeSlug("../etc/passwd")).toBeNull();
    expect(sanitizeSlug("..\\windows\\system32")).toBeNull();
    expect(sanitizeSlug("foo/../../../bar")).toBeNull();
  });

  test("returns null for dangerous characters", () => {
    expect(sanitizeSlug("foo<bar")).toBeNull();
    expect(sanitizeSlug("foo>bar")).toBeNull();
    expect(sanitizeSlug("foo|bar")).toBeNull();
  });

  test("returns sanitized slug for valid input", () => {
    expect(sanitizeSlug("getting-started")).toBe("getting-started");
    expect(sanitizeSlug("intro")).toBe("intro");
    expect(sanitizeSlug("  trimmed  ")).toBe("trimmed");
  });

  test("returns null for slug exceeding max length", () => {
    const longSlug = "a".repeat(201);
    expect(sanitizeSlug(longSlug)).toBeNull();
  });

  test("normalizes multiple slashes", () => {
    expect(sanitizeSlug("foo/bar")).toBe("foo/bar");
  });
});

describe("sanitizeLocale", () => {
  test("returns null for invalid locale format", () => {
    expect(sanitizeLocale("english", ["en"])).toBeNull();
    expect(sanitizeLocale("e", ["en"])).toBeNull();
    expect(sanitizeLocale("engl", ["en"])).toBeNull();
  });

  test("returns null for locale not in allowed list", () => {
    expect(sanitizeLocale("de", ["en", "tr"])).toBeNull();
  });

  test("returns sanitized locale for valid input", () => {
    expect(sanitizeLocale("en", ["en", "tr"])).toBe("en");
    expect(sanitizeLocale("TR", ["en", "tr"])).toBe("tr");
    expect(sanitizeLocale("  en  ", ["en", "tr"])).toBe("en");
  });

  test("supports locale with region code", () => {
    expect(sanitizeLocale("en-us", ["en-us", "en-gb"])).toBe("en-us");
    expect(sanitizeLocale("EN-GB", ["en-us", "en-gb"])).toBe("en-gb");
  });
});

describe("sanitizePath", () => {
  test("returns null for path traversal attempts", () => {
    expect(sanitizePath("../../../etc/passwd")).toBeNull();
    expect(sanitizePath("..\\..\\windows")).toBeNull();
  });

  test("returns null for null bytes", () => {
    expect(sanitizePath("foo\0bar")).toBeNull();
  });

  test("returns normalized path for valid input", () => {
    expect(sanitizePath("docs/intro.md")).toBe("docs/intro.md");
    expect(sanitizePath("docs\\intro.md")).toBe("docs/intro.md");
  });
});

describe("isValidPath", () => {
  test("returns true for paths within base directory", () => {
    expect(isValidPath("/home/user/docs", "/home/user/docs/intro.md")).toBe(true);
    expect(isValidPath("/home/user/docs", "/home/user/docs/subdir/file.md")).toBe(true);
  });

  test("returns false for paths outside base directory", () => {
    expect(isValidPath("/home/user/docs", "/home/user/etc/passwd")).toBe(false);
    expect(isValidPath("/home/user/docs", "/home/user/docssafe")).toBe(false);
  });
});

describe("sanitizeInput", () => {
  test("trims whitespace", () => {
    expect(sanitizeInput("  hello  ")).toBe("hello");
  });

  test("truncates to max length", () => {
    expect(sanitizeInput("hello world", 5)).toBe("hello");
  });

  test("returns empty string for null/undefined", () => {
    expect(sanitizeInput(null as unknown as string)).toBe("");
    expect(sanitizeInput(undefined as unknown as string)).toBe("");
  });
});

describe("sanitizeHtmlAttribute", () => {
  test("escapes special characters", () => {
    expect(sanitizeHtmlAttribute('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
    );
  });

  test("escapes ampersand", () => {
    expect(sanitizeHtmlAttribute("foo & bar")).toBe("foo &amp; bar");
  });
});

describe("stripTags", () => {
  test("removes HTML tags", () => {
    expect(stripTags("<p>Hello</p>")).toBe("Hello");
    expect(stripTags("<div><span>test</span></div>")).toBe("test");
  });

  test("handles nested tags", () => {
    expect(stripTags("<div><p><strong>bold</strong></p></div>")).toBe("bold");
  });
});
