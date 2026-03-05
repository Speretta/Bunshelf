import { generateThemeCSS } from "./variables.js";
import { join } from "node:path";
import { write as runtimeWrite } from "../utils/runtime.js";
export async function buildThemesCSS(outputPath) {
    const css = generateThemeCSS();
    await runtimeWrite(outputPath, css);
}
export async function ensureThemesCSS(publicDir) {
    const outputPath = join(publicDir, "assets/css/themes.css");
    await buildThemesCSS(outputPath);
}
//# sourceMappingURL=builder.js.map