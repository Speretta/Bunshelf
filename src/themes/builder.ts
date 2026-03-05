import { generateThemeCSS } from "./variables.js";
import { join } from "node:path";

export async function buildThemesCSS(outputPath: string): Promise<void> {
  const css = generateThemeCSS();
  await Bun.write(outputPath, css);
}

export async function ensureThemesCSS(publicDir: string): Promise<void> {
  const outputPath = join(publicDir, "assets/css/themes.css");
  await buildThemesCSS(outputPath);
}
