import { mkdir, cp } from "node:fs/promises";
import { join, dirname } from "node:path";
import { loadConfig } from "../utils/config.js";
import { generateSidebar } from "../sidebar/generator.js";
import { buildSearchIndex } from "../search/indexer.js";
import { readTextFile, exists, getMarkdownFiles, getSlugFromPath } from "../utils/fs.js";
import { loadTranslations, getTranslations } from "../i18n/index.js";
import { getNotFoundTranslations } from "../i18n/accessors.js";
import { themes } from "../themes/registry.js";
import { parseDocument, renderPage } from "../core/renderer/index.js";
import { logger } from "../utils/logger.js";
import { isValidPath } from "../utils/sanitize.js";
import { write as runtimeWrite } from "../utils/runtime.js";
import { renderHead } from "../templates/head.js";
import { getDocsDir, getOutputDir, getPublicDir, getI18nDir } from "../utils/paths.js";
import { getHomeUrl, getIndexRedirectUrl, getThemeInitScript, getLocalePrefix } from "../utils/navigation.js";
import type { SidebarItem, DocConfig } from "../utils/types.js";

const DOCS_DIR = getDocsDir();
const OUTPUT_DIR = getOutputDir();
const PUBLIC_DIR = getPublicDir();
const DEFAULT_LOGO_URL = "https://raw.githubusercontent.com/Speretta/Bunshelf/main/public/assets/images/logo.webp";

interface BuildContext {
  config: Awaited<ReturnType<typeof loadConfig>>;
  searchIndex: Awaited<ReturnType<typeof buildSearchIndex>>;
}

function flattenSidebarItems(items: SidebarItem[]): string[] {
  const hrefs: string[] = [];
  for (const item of items) {
    if (item.href) {
      hrefs.push(item.href);
    }
    if (item.items) {
      hrefs.push(...flattenSidebarItems(item.items));
    }
  }
  return hrefs;
}

async function validateIndexPages(config: DocConfig): Promise<void> {
  const errors: string[] = [];

  for (const [locale, localeConfig] of Object.entries(config.locales)) {
    const indexPage = localeConfig.indexPage;
    if (!indexPage) continue;
    
    const sidebar = config.sidebar?.[locale] || [];
    const allHrefs = flattenSidebarItems(sidebar);

    const prefix = localeConfig.localePrefix || locale;
    const expectedHref = `/${prefix}${indexPage}`;
    if (!allHrefs.includes(expectedHref) && !allHrefs.includes(indexPage)) {
      errors.push(`locales.${locale}.indexPage: Page "${indexPage}" not found in sidebar for locale "${locale}". Make sure the href matches a sidebar item.`);
    }
  }

  if (errors.length > 0) {
    console.error("❌ indexPages validation failed:");
    errors.forEach(err => console.error(`  - ${err}`));
    throw new Error("indexPages validation failed. See errors above.");
  }
}

async function build(): Promise<void> {
  console.log("🔨 Building static site...");
  logger.info("Build started");

  try {
    const config = await loadConfig(DOCS_DIR);
    await loadTranslations(getI18nDir());

    const searchIndex = await buildSearchIndex(DOCS_DIR, Object.keys(config.locales), config);
    
    const base = config.base || "";
    if (base) {
      for (const item of searchIndex) {
        item.href = base + item.href;
      }
    }

    const ctx: BuildContext = { config, searchIndex };

    await mkdir(OUTPUT_DIR, { recursive: true });

    await cp(join(PUBLIC_DIR, "assets", "css"), join(OUTPUT_DIR, "assets", "css"), { recursive: true });
    await cp(join(PUBLIC_DIR, "assets", "js"), join(OUTPUT_DIR, "assets", "js"), { recursive: true });

    if (!config.logo) {
      const logoDownloaded = await downloadDefaultLogo(OUTPUT_DIR);
      ctx.config = { ...config, logo: logoDownloaded ? "/assets/images/logo.webp" : false };
    }

    for (const locale of Object.keys(config.locales)) {
      console.log(`📝 Building locale: ${locale}`);
      logger.debug("Building locale", { locale });
      await buildLocalePages(ctx, locale);
    }

    const searchIndexPath = join(OUTPUT_DIR, "search-index.json");
    await runtimeWrite(searchIndexPath, JSON.stringify(searchIndex));

    await write404Pages(ctx);
    
    const defaultLocaleSidebar = await generateSidebar(DOCS_DIR, ctx.config.defaultLocale, ctx.config.sidebar?.[ctx.config.defaultLocale], ctx.config);
    
    validateIndexPages(ctx.config);
    
    await writeIndexRedirect(
      ctx.config.defaultLocale, 
      ctx.config.base, 
      ctx.config,
      defaultLocaleSidebar
    );

    console.log("✅ Build complete!");
    console.log(`📁 Output: ${OUTPUT_DIR}`);
    logger.info("Build completed", { 
      locales: Object.keys(config.locales).length,
      pages: searchIndex.length 
    });
  } catch (error) {
    console.error("❌ Build failed!");
    logger.error("Build failed", { error });
    process.exit(1);
  }
}

async function downloadDefaultLogo(distDir: string): Promise<boolean> {
  const logoDir = join(distDir, "assets", "images");
  const logoPath = join(logoDir, "logo.webp");
  
  if (await exists(logoPath)) {
    console.log("  ✓ Using cached default logo");
    logger.debug("Logo already exists, skipping download", { path: logoPath });
    return true;
  }
  
  await mkdir(logoDir, { recursive: true });
  
  console.log("  📥 Downloading default logo from GitHub...");
  logger.info("Downloading default logo");
  
  try {
    const response = await fetch(DEFAULT_LOGO_URL);
    if (!response.ok) {
      throw new Error(`Failed to download logo: ${response.statusText}`);
    }
    
    const buffer = await response.arrayBuffer();
    await runtimeWrite(logoPath, Buffer.from(buffer));
    
    console.log("  ✓ Default logo downloaded");
    logger.debug("Default logo saved", { path: logoPath });
    return true;
  } catch (error) {
    console.error("  ⚠️  Failed to download default logo. Please provide your own logo or check internet connection.");
    logger.warn("Failed to download default logo", { error });
    return false;
  }
}

async function buildLocalePages(ctx: BuildContext, locale: string): Promise<void> {
  const localeDir = join(DOCS_DIR, locale);

  if (!(await exists(localeDir))) {
    console.log(`  ⚠️  Locale ${locale} not found, skipping...`);
    return;
  }

  const files = await getMarkdownFiles(localeDir);
  const sidebar = await generateSidebar(DOCS_DIR, locale, ctx.config.sidebar?.[locale], ctx.config);

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
    const prefix = getLocalePrefix(locale, ctx.config);
    
    let outputPath: string;
    if (slug === "index") {
      outputPath = join(OUTPUT_DIR, prefix, "index.html");
    } else if (slug.endsWith("/index")) {
      const dirSlug = slug.replace(/\/index$/, "");
      outputPath = join(OUTPUT_DIR, prefix, dirSlug, "index.html");
    } else {
      outputPath = join(OUTPUT_DIR, prefix, slug, "index.html");
    }

    if (!isValidPath(OUTPUT_DIR, outputPath)) {
      logger.error("Invalid output path", { outputPath });
      return;
    }

    const normalizedSlug = slug.replace(/\/index$/, "") || "index";
    
    const pageHtml = renderPage({
      locale,
      title: meta.title,
      description: meta.description || ctx.config.description,
      content: html,
      sidebar,
      currentSlug: normalizedSlug,
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

async function write404Pages(ctx: BuildContext): Promise<void> {
  const base = ctx.config.base || "";
  
  for (const locale of Object.keys(ctx.config.locales)) {
    const sidebar = await generateSidebar(DOCS_DIR, locale, ctx.config.sidebar?.[locale], ctx.config);
    const i18n = getTranslations(locale);
    const { title, message, home } = getNotFoundTranslations(i18n);
    const homeUrl = getHomeUrl(locale, base, ctx.config, sidebar);
    const prefix = getLocalePrefix(locale, ctx.config);
    
    const html = `<!DOCTYPE html>
<html lang="${locale}">
${renderHead({ title: `404 - ${title}`, siteTitle: ctx.config.title, description: message, base })}
<body>
  <div class="error-page" style="text-align: center; padding: 4rem 2rem; min-height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h1 style="font-size: 6rem; margin: 0; color: var(--text-muted);">404</h1>
    <p style="font-size: 1.25rem; color: var(--text-secondary); margin: 1rem 0;">${message}</p>
    <a href="${homeUrl}" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--accent-primary); color: white; text-decoration: none; border-radius: 6px;">${home}</a>
  </div>
  ${getThemeInitScript()}
</body>
</html>`;

    const locale404Path = join(OUTPUT_DIR, prefix, "404.html");
    await mkdir(dirname(locale404Path), { recursive: true });
    await runtimeWrite(locale404Path, html);
  }
}

async function writeIndexRedirect(defaultLocale: string, base: string = "", config: DocConfig, sidebar?: SidebarItem[]): Promise<void> {
  const redirectUrl = getIndexRedirectUrl(defaultLocale, base, config, sidebar);
  
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${redirectUrl}"></head><body><a href="${redirectUrl}">Redirecting...</a></body></html>`;
  await runtimeWrite(join(OUTPUT_DIR, "index.html"), html);
}

build().catch(console.error);
