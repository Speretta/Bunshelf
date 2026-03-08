const MIME_TYPES: Record<string, string> = {
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".xml": "application/xml",
};

const CACHEABLE_EXTENSIONS = new Set([
  ".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp",
  ".woff", ".woff2", ".ttf", ".eot", ".ico",
]);

export function getMimeType(path: string): string {
  const ext = path.substring(path.lastIndexOf(".")).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

export function getCacheHeaders(path: string): Record<string, string> {
  const ext = path.substring(path.lastIndexOf(".")).toLowerCase();
  
  if (CACHEABLE_EXTENSIONS.has(ext)) {
    return { "Cache-Control": "public, max-age=31536000, immutable" };
  }
  
  return { "Cache-Control": "no-cache" };
}

export { MIME_TYPES };
