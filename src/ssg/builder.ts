import { mkdir, cp } from "node:fs/promises";
import { join, dirname } from "node:path";
import { loadConfig } from "../utils/config.js";
import { generateSidebar } from "../sidebar/generator.js";
import { buildSearchIndex } from "../search/indexer.js";
import { readTextFile, exists, getMarkdownFiles, getSlugFromPath } from "../utils/fs.js";
import { loadTranslations } from "../i18n/index.js";
import { themes } from "../themes/registry.js";
import { parseDocument, renderPage } from "../core/renderer/index.js";
import { logger } from "../utils/logger.js";
import { isValidPath } from "../utils/sanitize.js";
import { write as runtimeWrite } from "../utils/runtime.js";

const PROJECT_ROOT = join(import.meta.dir, "../..");
const DOCS_DIR = join(process.cwd(), "docs");
const DIST_DIR = join(process.cwd(), "dist");
const PUBLIC_DIR = join(PROJECT_ROOT, "public");

interface BuildContext {
  config: Awaited<ReturnType<typeof loadConfig>>;
  searchIndex: Awaited<ReturnType<typeof buildSearchIndex>>;
}

async function build(): Promise<void> {
  console.log("🔨 Building static site...");
  logger.info("Build started");

  try {
    const config = await loadConfig(DOCS_DIR);
    await loadTranslations(join(PROJECT_ROOT, "src/i18n/translations"));

    const searchIndex = await buildSearchIndex(DOCS_DIR, config.locales);

    const ctx: BuildContext = { config, searchIndex };

    await mkdir(DIST_DIR, { recursive: true });

    await cp(join(PUBLIC_DIR, "assets"), join(DIST_DIR, "assets"), { recursive: true });

    for (const locale of config.locales) {
      console.log(`📝 Building locale: ${locale}`);
      logger.debug("Building locale", { locale });
      await buildLocalePages(ctx, locale);
    }

    const searchIndexPath = join(DIST_DIR, "search-index.json");
    await runtimeWrite(searchIndexPath, JSON.stringify(searchIndex));

    await write404Page();
    await writeIndexRedirect();

    console.log("✅ Build complete!");
    console.log(`📁 Output: ${DIST_DIR}`);
    logger.info("Build completed", { 
      locales: config.locales.length,
      pages: searchIndex.length 
    });
  } catch (error) {
    console.error("❌ Build failed!");
    logger.error("Build failed", { error });
    process.exit(1);
  }
}

async function buildLocalePages(ctx: BuildContext, locale: string): Promise<void> {
  const localeDir = join(DOCS_DIR, locale);

  if (!(await exists(localeDir))) {
    console.log(`  ⚠️  Locale ${locale} not found, skipping...`);
    return;
  }

  const files = await getMarkdownFiles(localeDir);
  const sidebar = await generateSidebar(DOCS_DIR, locale, ctx.config.sidebar?.[locale]);

  for (const file of files) {
    await buildPage(ctx, locale, file, sidebar);
  }
}

async function buildPage(
  ctx: BuildContext,
  locale: string,
  filePath: string,
  sidebar: Awaited<ReturnType<typeof generateSidebar>>
): Promise<void> {
  try {
    if (!isValidPath(DOCS_DIR, filePath)) {
      logger.warn("Skipping invalid path", { filePath });
      return;
    }

    const content = await readTextFile(filePath);
    const { meta, html } = parseDocument(content);

    const slug = getSlugFromPath(join(DOCS_DIR, locale), filePath);
    const outputPath =
      slug === "index" || slug.endsWith("/index")
        ? join(DIST_DIR, locale === "en" ? "" : locale, "index.html")
        : join(DIST_DIR, locale === "en" ? "" : locale, slug, "index.html");

    if (!isValidPath(DIST_DIR, outputPath)) {
      logger.error("Invalid output path", { outputPath });
      return;
    }

    const pageHtml = renderPage({
      locale,
      title: meta.title,
      description: meta.description || ctx.config.description,
      content: html,
      sidebar,
      currentSlug: slug,
      config: ctx.config,
      searchIndex: ctx.searchIndex,
      themes,
    });

    await mkdir(dirname(outputPath), { recursive: true });
    await runtimeWrite(outputPath, pageHtml);
  } catch (error) {
    logger.error("Failed to build page", { locale, filePath, error });
    throw error;
  }
}

async function write404Page(): Promise<void> {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Page Not Found</title>
  <link rel="stylesheet" href="/assets/css/base.css">
  <link rel="stylesheet" href="/assets/css/themes.css">
  <link rel="stylesheet" href="/assets/css/layout.css">
</head>
<body>
  <div class="error-page">
    <h1>404</h1>
    <p>Page not found</p>
    <a href="/">Go Home</a>
  </div>
</body>
</html>`;

  await runtimeWrite(join(DIST_DIR, "404.html"), html);
}

async function writeIndexRedirect(): Promise<void> {
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/intro"></head><body><a href="/intro">Redirecting...</a></body></html>`;
  await runtimeWrite(join(DIST_DIR, "index.html"), html);
}

build().catch(console.error);
