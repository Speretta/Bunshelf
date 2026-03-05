import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { createServer, type IncomingMessage, type ServerResponse, type Server as HttpServer } from "node:http";
import { join } from "node:path";

export const isBun = typeof globalThis.Bun !== "undefined";

export interface RuntimeFile {
  text(): Promise<string>;
  json(): Promise<unknown>;
  arrayBuffer(): Promise<ArrayBuffer>;
}

class NodeFile implements RuntimeFile {
  constructor(private path: string) {}

  async text(): Promise<string> {
    return readFile(this.path, "utf-8");
  }

  async json(): Promise<unknown> {
    const content = await this.text();
    return JSON.parse(content);
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    const buffer = await readFile(this.path);
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  }
}

class BunFile implements RuntimeFile {
  private bunFile: ReturnType<typeof Bun.file>;

  constructor(path: string) {
    this.bunFile = Bun.file(path);
  }

  text(): Promise<string> {
    return this.bunFile.text();
  }

  json(): Promise<unknown> {
    return this.bunFile.json();
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    return this.bunFile.arrayBuffer();
  }
}

export function file(path: string): RuntimeFile {
  if (isBun) {
    return new BunFile(path);
  }
  return new NodeFile(path);
}

export async function write(path: string, content: string | Uint8Array): Promise<void> {
  if (isBun) {
    await Bun.write(path, content);
  } else {
    await writeFile(path, content);
  }
}

export interface GlobScanner {
  scan(options?: { cwd?: string }): AsyncIterable<string>;
}

class NodeGlob implements GlobScanner {
  constructor(private pattern: string) {}

  async *scan(options?: { cwd?: string }): AsyncIterable<string> {
    const cwd = options?.cwd || process.cwd();
    const files = await this.walkDir(cwd);
    for (const file of files) {
      if (this.match(this.pattern, file)) {
        yield file;
      }
    }
  }

  private async walkDir(dir: string): Promise<string[]> {
    const files: string[] = [];
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await this.walkDir(fullPath));
      } else {
        files.push(fullPath);
      }
    }
    return files;
  }

  private match(pattern: string, path: string): boolean {
    const regex = pattern
      .replace(/\./g, "\\.")
      .replace(/\*\*/g, ".*")
      .replace(/\*/g, "[^/]*")
      .replace(/\?/g, ".");
    return new RegExp(`^${regex}$`).test(path);
  }
}

class BunGlob implements GlobScanner {
  private glob: InstanceType<typeof Bun.Glob>;

  constructor(pattern: string) {
    this.glob = new Bun.Glob(pattern);
  }

  async *scan(options?: { cwd?: string }): AsyncIterable<string> {
    yield* this.glob.scan(options);
  }
}

export function glob(pattern: string): GlobScanner {
  if (isBun) {
    return new BunGlob(pattern);
  }
  return new NodeGlob(pattern);
}

export interface ServerOptions {
  port: number;
  fetch: (request: Request) => Promise<Response> | Response;
  error?: (error: Error) => Response;
}

export interface RuntimeServer {
  stop(): void;
}

class NodeServer implements RuntimeServer {
  private server: HttpServer;

  constructor(options: ServerOptions) {
    this.server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
      try {
        const url = `http://${req.headers.host || "localhost"}${req.url}`;
        const body = await this.readBody(req);
        const request = new Request(url, {
          method: req.method || "GET",
          headers: req.headers as HeadersInit,
          body: body || undefined,
        });

        const response = await options.fetch(request);
        res.statusCode = response.status;
        response.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });
        const buffer = await response.arrayBuffer();
        res.end(Buffer.from(buffer));
      } catch (error) {
        if (options.error) {
          const response = options.error(error as Error);
          res.statusCode = response.status;
          res.end("Internal Server Error");
        } else {
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      }
    });

    this.server.listen(options.port);
  }

  private async readBody(req: IncomingMessage): Promise<string | null> {
    return new Promise((resolve) => {
      const chunks: Uint8Array[] = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => {
        if (chunks.length === 0) {
          resolve(null);
        } else {
          const buffer = Buffer.concat(chunks);
          resolve(buffer.toString("utf-8"));
        }
      });
    });
  }

  stop(): void {
    this.server.close();
  }
}

class BunServer implements RuntimeServer {
  private server: ReturnType<typeof Bun.serve>;

  constructor(options: ServerOptions) {
    this.server = Bun.serve({
      port: options.port,
      fetch: options.fetch,
      error: options.error,
    });
  }

  stop(): void {
    this.server.stop();
  }
}

export function serve(options: ServerOptions): RuntimeServer {
  if (isBun) {
    return new BunServer(options);
  }
  return new NodeServer(options);
}

export async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}
