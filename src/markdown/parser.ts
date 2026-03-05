import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { processCallouts, setCalloutMarkdownParser } from "./callouts.js";
import { processColoredText } from "./colored-text.js";
import { escapeHtml, escapeAttr } from "../utils/escape.js";

const supportedLanguages = [
  "typescript", "javascript", "python", "rust", "go", "java", "c", "cpp", "csharp",
  "ruby", "php", "swift", "kotlin", "scala", "bash", "shell", "powershell",
  "sql", "html", "css", "scss", "json", "yaml", "xml", "markdown",
  "dockerfile", "nginx", "apache", "git", "diff", "plaintext"
].sort();

const languageAliases: Record<string, string> = {
  "js": "javascript",
  "ts": "typescript",
  "py": "python",
  "rb": "ruby",
  "sh": "bash",
  "zsh": "bash",
  "yml": "yaml",
};

const languageTitles: Record<string, string> = {
  "typescript": "TypeScript",
  "javascript": "JavaScript",
  "python": "Python",
  "rust": "Rust",
  "go": "Go",
  "java": "Java",
  "c": "C",
  "cpp": "C++",
  "csharp": "C#",
  "ruby": "Ruby",
  "php": "PHP",
  "swift": "Swift",
  "kotlin": "Kotlin",
  "scala": "Scala",
  "bash": "Bash",
  "shell": "Shell",
  "powershell": "PowerShell",
  "sql": "SQL",
  "html": "HTML",
  "css": "CSS",
  "scss": "SCSS",
  "json": "JSON",
  "yaml": "YAML",
  "xml": "XML",
  "markdown": "Markdown",
  "dockerfile": "Dockerfile",
  "nginx": "Nginx",
  "apache": "Apache",
  "git": "Git",
  "diff": "Diff",
  "plaintext": "Text",
};

function renderCodeBlock(str: string, lang: string): string {
  let highlighted: string;
  let detectedLang = lang;
  
  if (lang && hljs.getLanguage(lang)) {
    try {
      highlighted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
    } catch {
      highlighted = escapeHtml(str);
    }
  } else {
    try {
      const result = hljs.highlightAuto(str);
      highlighted = result.value;
      detectedLang = result.language || "plaintext";
    } catch {
      highlighted = escapeHtml(str);
      detectedLang = "plaintext";
    }
  }
  
  const normalizedLang = languageAliases[detectedLang] || detectedLang;
  const lineCount = (str.match(/\n/g) || []).length + 1;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => `<span>${i + 1}</span>`).join("");
  
  const langOptions = supportedLanguages.map(l => 
    `<option value="${l}" ${l === normalizedLang ? "selected" : ""}>${languageTitles[l] || l}</option>`
  ).join("");
  
  return `<div class="code-block" data-code="${escapeAttr(str)}">
<div class="code-header">
<select class="code-lang" onchange="changeCodeLanguage(this)">${langOptions}</select>
</div>
<div class="code-content">
<button class="code-copy" onclick="copyCode(this)" title="Copy code">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
</svg>
</button>
<div class="code-lines">${lineNumbers}</div>
<pre><code class="hljs language-${normalizedLang}">${highlighted}</code></pre>
</div>
</div>`;
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const calloutMd = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

calloutMd.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  if (!token) return "";
  const str = token.content.trimEnd();
  const lang = token.info.trim().toLowerCase() || "";
  return renderCodeBlock(str, lang);
};

calloutMd.renderer.rules.code_block = (tokens, idx) => {
  const token = tokens[idx];
  if (!token) return "";
  const str = token.content.trimEnd();
  return renderCodeBlock(str, "");
};

setCalloutMarkdownParser(calloutMd);

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  if (!token) return "";
  const str = token.content.trimEnd();
  const lang = token.info.trim().toLowerCase() || "";
  
  return renderCodeBlock(str, lang);
};

md.renderer.rules.code_block = (tokens, idx) => {
  const token = tokens[idx];
  if (!token) return "";
  const str = token.content.trimEnd();
  
  return renderCodeBlock(str, "");
};

export function parseMarkdown(content: string): string {
  const processed = processColoredText(processCallouts(content));
  return md.render(processed);
}

export { md, supportedLanguages, languageAliases };
