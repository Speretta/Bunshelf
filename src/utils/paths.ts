import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function getProjectRoot(): string {
  return join(__dirname, "../..");
}

export function getDocsDir(): string {
  return join(process.cwd(), "docs");
}

export function getDistDir(): string {
  return join(process.cwd(), "dist");
}

export function getPublicDir(): string {
  return join(getProjectRoot(), "public");
}

export function getI18nDir(): string {
  return join(__dirname, "../i18n/translations");
}
