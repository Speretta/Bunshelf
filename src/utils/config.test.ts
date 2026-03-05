import { describe, test, expect } from "bun:test";
import { validateConfig } from "./config.js";

describe("validateConfig", () => {
  test("applies default values for empty config", () => {
    const result = validateConfig({});
    expect(result.title).toBe("Bunshelf");
    expect(result.defaultLocale).toBe("en");
    expect(result.locales).toEqual(["en"]);
  });

  test("validates title length", () => {
    const longTitle = "a".repeat(201);
    expect(() => validateConfig({ title: longTitle })).toThrow();
  });

  test("validates description length", () => {
    const longDescription = "a".repeat(501);
    expect(() => validateConfig({ description: longDescription })).toThrow();
  });

  test("validates locale format", () => {
    expect(() => validateConfig({ locales: ["english"] })).toThrow();
    expect(() => validateConfig({ locales: ["e"] })).toThrow();
  });

  test("accepts valid locale formats", () => {
    const result = validateConfig({ locales: ["en", "tr", "en-gb"] });
    expect(result.locales).toEqual(["en", "tr", "en-gb"]);
  });

  test("trims title and description", () => {
    const result = validateConfig({ title: "  My Docs  ", description: "  A description  " });
    expect(result.title).toBe("My Docs");
    expect(result.description).toBe("A description");
  });

  test("accepts valid config", () => {
    const config = {
      title: "My Documentation",
      description: "A comprehensive guide",
      defaultLocale: "en",
      locales: ["en", "tr"],
      theme: { default: "dark" },
    };
    const result = validateConfig(config);
    expect(result.title).toBe("My Documentation");
    expect(result.description).toBe("A comprehensive guide");
    expect(result.defaultLocale).toBe("en");
    expect(result.locales).toEqual(["en", "tr"]);
  });
});
