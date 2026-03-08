import { join } from "node:path";
import { exists } from "../utils/fs.js";
import { serve, file as runtimeFile, type ServerOptions } from "../utils/runtime.js";
import { getMimeType, getCacheHeaders } from "../utils/mime.js";
import { getOutputDir } from "../utils/paths.js";

const OUTPUT_DIR = getOutputDir();

async function main(): Promise<void> {
  console.log("Preview server starting...");
  
  const portEnv = parseInt(process.env.PORT || "");
  const port = Number.isFinite(portEnv) ? portEnv : 3000;

  const serverOptions: ServerOptions = {
    port,
    fetch: async (request: Request) => {
      let path: string;
      try {
        path = new URL(request.url).pathname;
      } catch {
        return new Response("Bad Request", { status: 400 });
      }
      
      if (path === "/" || path === "") {
        return Response.redirect(new URL("/intro", request.url), 302);
      }
      
      let filePath = join(OUTPUT_DIR, path);
      
      if (await exists(filePath) && !path.includes(".")) {
        filePath = join(filePath, "index.html");
      } else if (!await exists(filePath) && !path.includes(".")) {
        filePath = join(OUTPUT_DIR, path, "index.html");
      }
      
      if (await exists(filePath)) {
        const fileContent = runtimeFile(filePath);
        const buffer = await fileContent.arrayBuffer();
        const contentType = getMimeType(filePath);
        const cacheHeaders = getCacheHeaders(filePath);
        return new Response(buffer, {
          headers: { "Content-Type": contentType, ...cacheHeaders },
        });
      }
      
      const notFoundPath = join(OUTPUT_DIR, "404.html");
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

export async function startPreviewServer(): Promise<void> {
  await main();
}
