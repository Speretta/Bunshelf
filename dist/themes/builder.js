import { generateThemeCSS } from "./variables.js";
import { join } from "node:path";
export async function buildThemesCSS(outputPath) {
    const css = generateThemeCSS();
    await Bun.write(outputPath, css);
}
export async function ensureThemesCSS(publicDir) {
    const outputPath = join(publicDir, "assets/css/themes.css");
    await buildThemesCSS(outputPath);
}
//# sourceMappingURL=builder.js.map