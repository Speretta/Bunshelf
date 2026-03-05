import { escapeHtml, escapeAttr } from "../utils/escape.js";

const colorMap: Record<string, string> = {
  red: "#ef4444",
  green: "#22c55e",
  blue: "#3b82f6",
  yellow: "#eab308",
  orange: "#f97316",
  purple: "#a855f7",
  pink: "#ec4899",
  cyan: "#06b6d4",
  gray: "#6b7280",
  accent: "#0066cc",
};

const VALID_COLOR_REGEX = /^#[0-9a-fA-F]{3,6}$/;

export function processColoredText(content: string): string {
  const pattern = /\{(#[0-9a-fA-F]{3,6}|[a-z]+)\}([\s\S]*?)\{\/\}/g;
  
  return content.replace(pattern, (match, colorSpec, text) => {
    let color: string;
    
    if (colorSpec.startsWith("#")) {
      if (!VALID_COLOR_REGEX.test(colorSpec)) {
        return match;
      }
      color = colorSpec;
    } else if (colorMap[colorSpec]) {
      color = colorMap[colorSpec];
    } else {
      return match;
    }
    
    const safeColor = escapeAttr(color);
    const safeText = escapeHtml(text);
    
    return `<span style="color: ${safeColor}" class="colored-text">${safeText}</span>`;
  });
}
