import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { join } from "node:path";
export const isBun = typeof globalThis.Bun !== "undefined";
class NodeFile {
    path;
    constructor(path) {
        this.path = path;
    }
    async text() {
        return readFile(this.path, "utf-8");
    }
    async json() {
        const content = await this.text();
        return JSON.parse(content);
    }
    async arrayBuffer() {
        const buffer = await readFile(this.path);
        return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    }
}
class BunFile {
    bunFile;
    constructor(path) {
        this.bunFile = Bun.file(path);
    }
    text() {
        return this.bunFile.text();
    }
    json() {
        return this.bunFile.json();
    }
    arrayBuffer() {
        return this.bunFile.arrayBuffer();
    }
}
export function file(path) {
    if (isBun) {
        return new BunFile(path);
    }
    return new NodeFile(path);
}
export async function write(path, content) {
    if (isBun) {
        await Bun.write(path, content);
    }
    else {
        await writeFile(path, content);
    }
}
class NodeGlob {
    pattern;
    constructor(pattern) {
        this.pattern = pattern;
    }
    async *scan(options) {
        const cwd = options?.cwd || process.cwd();
        const files = await this.walkDir(cwd);
        for (const file of files) {
            if (this.match(this.pattern, file)) {
                yield file;
            }
        }
    }
    async walkDir(dir) {
        const files = [];
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = join(dir, entry.name);
            if (entry.isDirectory()) {
                files.push(...await this.walkDir(fullPath));
            }
            else {
                files.push(fullPath);
            }
        }
        return files;
    }
    match(pattern, path) {
        const regex = pattern
            .replace(/\./g, "\\.")
            .replace(/\*\*/g, ".*")
            .replace(/\*/g, "[^/]*")
            .replace(/\?/g, ".");
        return new RegExp(`^${regex}$`).test(path);
    }
}
class BunGlob {
    glob;
    constructor(pattern) {
        this.glob = new Bun.Glob(pattern);
    }
    async *scan(options) {
        yield* this.glob.scan(options);
    }
}
export function glob(pattern) {
    if (isBun) {
        return new BunGlob(pattern);
    }
    return new NodeGlob(pattern);
}
class NodeServer {
    server;
    constructor(options) {
        this.server = createServer(async (req, res) => {
            try {
                const url = `http://${req.headers.host || "localhost"}${req.url}`;
                const body = await this.readBody(req);
                const request = new Request(url, {
                    method: req.method || "GET",
                    headers: req.headers,
                    body: body || undefined,
                });
                const response = await options.fetch(request);
                res.statusCode = response.status;
                response.headers.forEach((value, key) => {
                    res.setHeader(key, value);
                });
                const buffer = await response.arrayBuffer();
                res.end(Buffer.from(buffer));
            }
            catch (error) {
                if (options.error) {
                    const response = options.error(error);
                    res.statusCode = response.status;
                    res.end("Internal Server Error");
                }
                else {
                    res.statusCode = 500;
                    res.end("Internal Server Error");
                }
            }
        });
        this.server.listen(options.port);
    }
    async readBody(req) {
        return new Promise((resolve) => {
            const chunks = [];
            req.on("data", (chunk) => chunks.push(chunk));
            req.on("end", () => {
                if (chunks.length === 0) {
                    resolve(null);
                }
                else {
                    const buffer = Buffer.concat(chunks);
                    resolve(buffer.toString("utf-8"));
                }
            });
        });
    }
    stop() {
        this.server.close();
    }
}
class BunServer {
    server;
    constructor(options) {
        this.server = Bun.serve({
            port: options.port,
            fetch: options.fetch,
            error: options.error,
        });
    }
    stop() {
        this.server.stop();
    }
}
export function serve(options) {
    if (isBun) {
        return new BunServer(options);
    }
    return new NodeServer(options);
}
export async function exists(path) {
    try {
        await stat(path);
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=runtime.js.map