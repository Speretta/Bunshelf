import { readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { file as runtimeFile, write as runtimeWrite, exists as runtimeExists } from "./runtime.js";
export async function exists(path) {
    return runtimeExists(path);
}
export async function readTextFile(path) {
    return runtimeFile(path).text();
}
export async function readJsonFile(path) {
    try {
        const data = await runtimeFile(path).json();
        return data;
    }
    catch {
        return null;
    }
}
export async function writeTextFile(path, content) {
    return runtimeWrite(path, content);
}
export async function walkDir(dir, callback) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            await walkDir(fullPath, callback);
        }
        else if (entry.isFile()) {
            await callback(fullPath);
        }
    }
}
export async function getMarkdownFiles(dir) {
    const files = [];
    if (!(await exists(dir)))
        return files;
    await walkDir(dir, (path) => {
        if (path.endsWith(".md")) {
            files.push(path);
        }
    });
    return files;
}
export function getSlugFromPath(basePath, filePath) {
    const rel = relative(basePath, filePath);
    return rel.replace(/\.md$/, "").replace(/\\/g, "/");
}
export async function ensureDir(path) {
    await runtimeWrite(path + "/.gitkeep", "").catch(() => { });
}
export function getParentDir(path) {
    return resolve(path, "..");
}
//# sourceMappingURL=fs.js.map