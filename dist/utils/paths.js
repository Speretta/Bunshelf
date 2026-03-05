import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
export function getProjectRoot() {
    return join(__dirname, "../..");
}
export function getDocsDir() {
    return join(process.cwd(), "docs");
}
export function getDistDir() {
    return join(process.cwd(), "dist");
}
export function getPublicDir() {
    return join(getProjectRoot(), "public");
}
export function getI18nDir() {
    return join(__dirname, "../i18n/translations");
}
//# sourceMappingURL=paths.js.map