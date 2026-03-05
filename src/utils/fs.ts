import { readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { file as runtimeFile, write as runtimeWrite, exists as runtimeExists } from "./runtime.js";
import { logger } from "./logger.js";

export async function exists(path: string): Promise<boolean> {
  return runtimeExists(path);
}

export async function readTextFile(path: string): Promise<string> {
  return runtimeFile(path).text();
}

export async function readJsonFile<T>(path: string): Promise<T | null> {
  try {
    const data = await runtimeFile(path).json();
    return data as T;
  } catch (error) {
    logger.debug("Failed to read JSON file", { path, error });
    return null;
  }
}

export async function writeTextFile(path: string, content: string): Promise<void> {
  return runtimeWrite(path, content);
}

export async function walkDir(
  dir: string,
  callback: (path: string) => Promise<void> | void
): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath, callback);
    } else if (entry.isFile()) {
      await callback(fullPath);
    }
  }
}

export async function getMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  if (!(await exists(dir))) return files;
  
  await walkDir(dir, (path) => {
    if (path.endsWith(".md")) {
      files.push(path);
    }
  });
  
  return files;
}

export function getSlugFromPath(basePath: string, filePath: string): string {
  const rel = relative(basePath, filePath);
  return rel.replace(/\.md$/, "").replace(/\\/g, "/");
}

export async function ensureDir(path: string): Promise<boolean> {
  try {
    await runtimeWrite(path + "/.gitkeep", "");
    return true;
  } catch (error) {
    logger.warn("Failed to ensure directory", { path, error });
    return false;
  }
}

export function getParentDir(path: string): string {
  return resolve(path, "..");
}
