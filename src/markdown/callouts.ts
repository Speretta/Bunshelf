import MarkdownIt from "markdown-it";
import { processColoredText } from "./colored-text.js";

interface CalloutConfig {
  class: string;
  icon: string;
  label: string;
}

const calloutTypes: Record<string, CalloutConfig> = {
  note: { class: "callout-note", icon: "📝", label: "Note" },
  tip: { class: "callout-tip", icon: "💡", label: "Pro Tip" },
  info: { class: "callout-info", icon: "ℹ️", label: "Info" },
  warning: { class: "callout-warning", icon: "⚠️", label: "Warning" },
  error: { class: "callout-error", icon: "❌", label: "Error" },
  danger: { class: "callout-danger", icon: "🔥", label: "Danger" },
};

let md: MarkdownIt | null = null;

export function setCalloutMarkdownParser(parser: MarkdownIt): void {
  md = parser;
}

export function processCallouts(content: string): string {
  const lines = content.split("\n");
  const result: string[] = [];
  let inCallout = false;
  let calloutType = "";
  let calloutTitle = "";
  let calloutBody: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    
    if (line.startsWith("::: ") && !inCallout) {
      const match = line.match(/^:::\s*(\w+)(?:\s+(.*))?$/);
      if (match && match[1]) {
        const type = match[1].toLowerCase();
        const config = calloutTypes[type];
        if (config) {
          inCallout = true;
          calloutType = type;
          calloutTitle = match[2] ?? config.label;
          calloutBody = [];
          continue;
        }
      }
    }
    
    if (line === ":::" && inCallout) {
      const config = calloutTypes[calloutType];
      if (config) {
        const bodyContent = calloutBody.join("\n");
        const processedBody = processColoredText(bodyContent);
        const parsedBody = md ? md.render(processedBody) : bodyContent;
        
        result.push(
          `<div class="callout ${config.class}">`,
          `<div class="callout-title"><span class="callout-icon">${config.icon}</span><span>${calloutTitle}</span></div>`,
          `<div class="callout-content">${parsedBody}</div>`,
          `</div>`
        );
      }
      inCallout = false;
      continue;
    }
    
    if (inCallout) {
      calloutBody.push(line);
    } else {
      result.push(line);
    }
  }
  
  return result.join("\n");
}
