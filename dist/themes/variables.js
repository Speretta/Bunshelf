import { themes, getDefaultTheme } from "./registry.js";
export function generateThemeCSS() {
    let css = ":root {\n";
    const defaultTheme = getDefaultTheme();
    for (const [key, value] of Object.entries(defaultTheme.vars)) {
        css += `  ${key}: ${value};\n`;
    }
    css += "}\n\n";
    for (const theme of themes) {
        css += `[data-theme="${theme.name}"] {\n`;
        for (const [key, value] of Object.entries(theme.vars)) {
            css += `  ${key}: ${value};\n`;
        }
        css += "}\n\n";
    }
    return css;
}
//# sourceMappingURL=variables.js.map