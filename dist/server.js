import { join } from "node:path";
import { loadConfig, getDocsDir } from "./utils/config.js";
import { loadTranslations, getTranslations } from "./i18n/index.js";
import { getNotFoundTranslations } from "./i18n/accessors.js";
import { parseRoute, isAssetRequest, isSearchRequest } from "./router.js";
import { generateSidebar } from "./sidebar/generator.js";
import { buildSearchIndex, createFuseInstance } from "./search/indexer.js";
import { readTextFile, exists } from "./utils/fs.js";
import { themes } from "./themes/registry.js";
import { renderPage, parseDocument } from "./core/renderer/index.js";
import { sanitizeSlug, sanitizeLocale, isValidPath } from "./utils/sanitize.js";
import { logger } from "./utils/logger.js";
import { handleError } from "./utils/errors.js";
import { serve, file as runtimeFile } from "./utils/runtime.js";
import { getMimeType } from "./utils/mime.js";
import { getPublicDir, getI18nDir } from "./utils/paths.js";
const DOCS_DIR = getDocsDir();
const PUBLIC_DIR = getPublicDir();
let state;
async function initServer() {
    try {
        const config = await loadConfig(DOCS_DIR);
        await loadTranslations(getI18nDir());
        const searchIndex = await buildSearchIndex(DOCS_DIR, config.locales);
        const fuse = createFuseInstance(searchIndex);
        logger.info("Bunshelf initialized", {
            locales: config.locales.length,
            pages: searchIndex.length,
        });
        console.log(`🚀 Bunshelf ready`);
        console.log(`📚 ${config.locales.length} locale(s): ${config.locales.join(", ")}`);
        console.log(`🔍 ${searchIndex.length} pages indexed`);
        return { config, searchIndex, fuse };
    }
    catch (error) {
        logger.error("Failed to initialize server", { error });
        throw error;
    }
}
async function handleRequest(request) {
    const url = request.url;
    if (isAssetRequest(url)) {
        return handleAsset(url);
    }
    if (isSearchRequest(url)) {
        return handleSearch(url);
    }
    return handlePage(url);
}
async function handleAsset(url) {
    let path = new URL(url).pathname;
    if (state?.config.base && path.startsWith(state.config.base)) {
        path = path.slice(state.config.base.length);
    }
    const filePath = join(PUBLIC_DIR, path);
    if (await exists(filePath)) {
        const fileContent = runtimeFile(filePath);
        const buffer = await fileContent.arrayBuffer();
        const contentType = getMimeType(filePath);
        return new Response(buffer, {
            headers: { "Content-Type": contentType },
        });
    }
    return new Response("Not Found", { status: 404 });
}
async function handleSearch(url) {
    if (!state) {
        return Response.json({ results: [] });
    }
    const searchParams = new URL(url).searchParams;
    const query = searchParams.get("q");
    if (!query || !state.fuse) {
        return Response.json({ results: [] });
    }
    const sanitizedQuery = query.trim().slice(0, 200);
    if (sanitizedQuery.length < 2) {
        return Response.json({ results: [] });
    }
    try {
        const results = state.fuse.search(sanitizedQuery, { limit: 10 });
        return Response.json({
            results: results.map((r) => ({
                title: r.item.title,
                href: r.item.href,
                excerpt: r.item.excerpt,
            })),
        });
    }
    catch (error) {
        logger.error("Search error", { query: sanitizedQuery, error });
        return Response.json({ results: [] });
    }
}
async function handlePage(url) {
    if (!state) {
        return handle404("en");
    }
    const params = parseRoute(url, state.config);
    if (!params) {
        return handle404();
    }
    const { locale, slug } = params;
    const safeLocale = sanitizeLocale(locale, state.config.locales);
    if (!safeLocale) {
        logger.warn("Invalid locale requested", { locale, url });
        return handle404("en");
    }
    const safeSlug = sanitizeSlug(slug);
    if (!safeSlug && slug !== "index") {
        logger.warn("Invalid slug requested", { slug, locale: safeLocale, url });
        return handle404(safeLocale);
    }
    let docPath = await resolveDocPath(safeLocale, safeSlug || "index");
    if (!docPath && slug === "index") {
        let redirectTarget;
        if (state.config.homePage) {
            redirectTarget = safeLocale === "en"
                ? state.config.homePage
                : `/${safeLocale}${state.config.homePage}`;
        }
        else {
            const sidebar = state.config.sidebar?.[safeLocale];
            const firstPage = sidebar?.[0]?.items?.[0]?.href;
            if (firstPage) {
                redirectTarget = firstPage;
            }
            else {
                redirectTarget = safeLocale === "en" ? "/intro" : `/${safeLocale}/intro`;
            }
        }
        return Response.redirect(new URL(redirectTarget, url), 302);
    }
    if (!docPath) {
        return handle404(safeLocale);
    }
    if (!isValidPath(DOCS_DIR, docPath)) {
        logger.error("Path traversal attempt blocked", { path: docPath, url });
        return handle404(safeLocale);
    }
    try {
        const content = await readTextFile(docPath);
        const { meta, html } = parseDocument(content);
        const sidebar = await generateSidebar(DOCS_DIR, safeLocale, state.config.sidebar?.[safeLocale]);
        const pageHtml = renderPage({
            locale: safeLocale,
            title: meta.title,
            description: meta.description || state.config.description,
            content: html,
            sidebar,
            currentSlug: safeSlug || "index",
            config: state.config,
            searchIndex: state.searchIndex,
            themes,
        });
        return new Response(pageHtml, {
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }
    catch (error) {
        const appError = handleError(error);
        logger.error("Failed to render page", {
            locale: safeLocale,
            slug: safeSlug,
            error: appError.message
        });
        return handle404(safeLocale);
    }
}
async function resolveDocPath(locale, slug) {
    const candidates = [
        join(DOCS_DIR, locale, `${slug}.md`),
        join(DOCS_DIR, locale, slug, "index.md"),
    ];
    for (const path of candidates) {
        if (await exists(path)) {
            return path;
        }
    }
    return null;
}
async function handle404(locale = "en") {
    if (!state) {
        return new Response("Not Found", { status: 404 });
    }
    const sidebar = await generateSidebar(DOCS_DIR, locale, state.config.sidebar?.[locale]);
    const i18n = getTranslations(locale);
    const { title, message, home } = getNotFoundTranslations(i18n);
    const base = state.config.base || "";
    let homeUrl;
    if (state.config.homePage) {
        homeUrl = locale === "en"
            ? `${base}${state.config.homePage}`
            : `${base}/${locale}${state.config.homePage}`;
    }
    else {
        const firstPage = sidebar?.[0]?.items?.[0]?.href;
        homeUrl = firstPage ? `${base}${firstPage}` : (locale === "en" ? `${base}/` : `${base}/${locale}`);
    }
    const pageHtml = renderPage({
        locale,
        title: `404 - ${title}`,
        description: message,
        content: `
      <div style="text-align: center; padding: 4rem 2rem;">
        <h1 style="font-size: 6rem; margin: 0; color: var(--text-muted);">404</h1>
        <p style="font-size: 1.25rem; color: var(--text-secondary); margin: 1rem 0;">${message}</p>
        <a href="${homeUrl}" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--accent-primary); color: white; text-decoration: none; border-radius: 6px;">${home}</a>
      </div>
    `,
        sidebar,
        currentSlug: "404",
        config: state.config,
        searchIndex: state.searchIndex,
        themes,
    });
    return new Response(pageHtml, {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
async function main() {
    try {
        state = await initServer();
        const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
        const serverOptions = {
            port,
            fetch: handleRequest,
            error: (error) => {
                logger.error("Server error", { error: error.message });
                return new Response("Internal Server Error", { status: 500 });
            },
        };
        serve(serverOptions);
        logger.info("Server started", { port });
        console.log(`\n🌐 Server running at http://localhost:${port}`);
        console.log(`📖 Press Ctrl+C to stop\n`);
    }
    catch (error) {
        logger.error("Fatal error during startup", { error });
        console.error("\n❌ Failed to start server");
        console.error("Run with LOG_LEVEL=debug for more details\n");
        process.exit(1);
    }
}
main().catch((error) => {
    logger.error("Unhandled error", { error });
    process.exit(1);
});
export async function startDevServer() {
    await main();
}
//# sourceMappingURL=server.js.map