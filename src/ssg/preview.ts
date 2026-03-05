import { join } from "node:path";
import { exists } from "../utils/fs.js";
import { serve, file as runtimeFile, type ServerOptions } from "../utils/runtime.js";

const DIST_DIR = join(process.cwd(), "dist");

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

function getMimeType(path: string): string {
  const ext = path.substring(path.lastIndexOf(".")).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

async function main() {
  console.log("Preview server starting...");
  
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  const serverOptions: ServerOptions = {
    port,
    fetch: async (request: Request) => {
      const url = new URL(request.url);
      let path = url.pathname;
      
      if (path === "/" || path === "") {
        return Response.redirect(new URL("/intro", request.url), 302);
      }
      
      let filePath = join(DIST_DIR, path);
      
      if (await exists(filePath) && !path.includes(".")) {
        filePath = join(filePath, "index.html");
      } else if (!await exists(filePath) && !path.includes(".")) {
        filePath = join(DIST_DIR, path, "index.html");
      }
      
      if (await exists(filePath)) {
        const fileContent = runtimeFile(filePath);
        const buffer = await fileContent.arrayBuffer();
        const contentType = getMimeType(filePath);
        return new Response(buffer, {
          headers: { "Content-Type": contentType },
        });
      }
      
      const notFoundPath = join(DIST_DIR, "404.html");
      if (await exists(notFoundPath)) {
        const fileContent = runtimeFile(notFoundPath);
        const buffer = await fileContent.arrayBuffer();
        return new Response(buffer, { 
          status: 404,
          headers: { "Content-Type": "text/html" },
        });
      }
      
      return new Response("Not Found", { status: 404 });
    },
  };

  serve(serverOptions);
  
  console.log(`🌐 Preview server running at http://localhost:${port}`);
}

main().catch(console.error);

export async function startPreviewServer() {
  await main();
}
