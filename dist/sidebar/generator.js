import { getMarkdownFiles, getSlugFromPath, readTextFile, exists } from "../utils/fs.js";
import { parseFrontmatter } from "../utils/frontmatter.js";
import { DEFAULT_ORDER } from "../core/constants/defaults.js";
import { join, basename } from "node:path";
export async function generateSidebar(docsDir, locale, configSidebar) {
    const localeDir = join(docsDir, locale);
    if (!(await exists(localeDir))) {
        return [];
    }
    const files = await getMarkdownFiles(localeDir);
    const autoStructure = await buildStructure(files, localeDir, locale);
    if (!configSidebar || configSidebar.length === 0) {
        return autoStructure;
    }
    const configItems = addLocalePrefix(configSidebar, locale);
    const definedHrefs = new Set();
    collectHrefs(configItems, definedHrefs);
    const autoItems = filterAutoItems(autoStructure, definedHrefs, locale);
    return mergeSidebars(configItems, autoItems);
}
function collectHrefs(items, hrefs) {
    for (const item of items) {
        if (item.href) {
            hrefs.add(item.href);
        }
        if (item.items) {
            collectHrefs(item.items, hrefs);
        }
    }
}
function filterAutoItems(items, definedHrefs, locale) {
    const result = [];
    for (const item of items) {
        if (item.href && definedHrefs.has(item.href)) {
            continue;
        }
        if (item.items) {
            const filteredItems = filterAutoItems(item.items, definedHrefs, locale);
            if (filteredItems.length > 0) {
                result.push({
                    ...item,
                    items: filteredItems,
                });
            }
        }
        else if (item.href) {
            result.push(item);
        }
    }
    return result;
}
function mergeSidebars(configItems, autoItems) {
    const result = [];
    for (const configItem of configItems) {
        if (configItem.items && configItem.items.length > 0) {
            const autoCategory = autoItems.find(a => a.items && a.label.toLowerCase() === configItem.label.toLowerCase());
            if (autoCategory && autoCategory.items) {
                const configHrefs = new Set(configItem.items.map(i => i.href));
                const newAutoItems = autoCategory.items.filter(i => !configHrefs.has(i.href));
                result.push({
                    ...configItem,
                    items: [...configItem.items, ...newAutoItems],
                });
            }
            else {
                result.push(configItem);
            }
        }
        else {
            result.push(configItem);
        }
    }
    for (const autoItem of autoItems) {
        if (autoItem.items && autoItem.items.length > 0) {
            const existsInResult = result.some(r => r.items && r.label.toLowerCase() === autoItem.label.toLowerCase());
            if (!existsInResult) {
                result.push(autoItem);
            }
        }
        else {
            const existsInResult = result.some(r => r.href === autoItem.href);
            if (!existsInResult) {
                result.push(autoItem);
            }
        }
    }
    return result;
}
function addLocalePrefix(items, locale) {
    return items.map(item => ({
        ...item,
        href: item.href ? addLocaleToHref(item.href, locale) : undefined,
        items: item.items ? addLocalePrefix(item.items, locale) : undefined,
    }));
}
function addLocaleToHref(href, locale) {
    if (locale === "en")
        return href;
    if (href.startsWith(`/${locale}/`))
        return href;
    if (href.startsWith("/"))
        return `/${locale}${href}`;
    return `/${locale}/${href}`;
}
async function buildStructure(files, baseDir, locale) {
    const entries = [];
    for (const file of files) {
        const slug = getSlugFromPath(baseDir, file);
        const content = await readTextFile(file);
        const { meta } = parseFrontmatter(content);
        if (meta.hide)
            continue;
        entries.push({
            slug,
            path: file,
            meta,
            isIndex: slug === "index" || slug.endsWith("/index"),
        });
    }
    entries.sort((a, b) => {
        const orderA = a.meta.order ?? DEFAULT_ORDER;
        const orderB = b.meta.order ?? DEFAULT_ORDER;
        if (orderA !== orderB)
            return orderA - orderB;
        return a.slug.localeCompare(b.slug);
    });
    const root = [];
    const dirs = new Map();
    for (const entry of entries) {
        const parts = entry.slug.split("/");
        const label = entry.meta.sidebar_label || entry.meta.title || basename(entry.slug);
        const baseHref = entry.isIndex
            ? `/${parts.slice(0, -1).join("/")}` || "/"
            : `/${entry.slug}`;
        const href = locale === "en" ? baseHref : `/${locale}${baseHref}`;
        if (parts.length === 1 && !entry.isIndex) {
            root.push({ label, href });
        }
        else if (entry.isIndex) {
            const dirPath = parts.slice(0, -1).join("/");
            if (dirPath) {
                const dirItem = {
                    label,
                    href: locale === "en" ? `/${dirPath}` : `/${locale}/${dirPath}`,
                    items: [],
                };
                dirs.set(dirPath, dirItem);
            }
        }
        else {
            const dirPath = parts[0];
            if (dirPath) {
                if (!dirs.has(dirPath)) {
                    dirs.set(dirPath, {
                        label: dirPath.charAt(0).toUpperCase() + dirPath.slice(1),
                        items: [],
                    });
                }
                const dirItem = dirs.get(dirPath);
                if (dirItem && dirItem.items) {
                    dirItem.items.push({ label, href });
                }
            }
        }
    }
    for (const [, dirItem] of dirs) {
        root.push(dirItem);
    }
    return root;
}
export function flattenSidebar(items) {
    const result = [];
    for (const item of items) {
        if (item.href) {
            result.push({ label: item.label, href: item.href });
        }
        if (item.items) {
            result.push(...flattenSidebar(item.items));
        }
    }
    return result;
}
//# sourceMappingURL=generator.js.map