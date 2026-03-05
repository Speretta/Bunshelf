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
  const codeBlockRegex = /```[\s\S]*?```/g;
  const inlineCodeRegex = /`[^`]+`/g;
  const codeBlocks: string[] = [];
  
  let contentWithPlaceholders = content.replace(codeBlockRegex, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });
  
  contentWithPlaceholders = contentWithPlaceholders.replace(inlineCodeRegex, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });
  
  const pattern = /\\?\{(#[0-9a-fA-F]{3,6}|[a-z]+)\}([\s\S]*?)\{\/\}/g;
  
  const processed = contentWithPlaceholders.replace(pattern, (match, colorSpec, text) => {
    if (match.startsWith('\\')) {
      return match.substring(1);
    }
    
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
  
  return processed.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => {
    return codeBlocks[parseInt(index)] || '';
  });
}
