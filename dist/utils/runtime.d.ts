export declare const isBun: boolean;
export interface RuntimeFile {
    text(): Promise<string>;
    json(): Promise<unknown>;
    arrayBuffer(): Promise<ArrayBuffer>;
}
export declare function file(path: string): RuntimeFile;
export declare function write(path: string, content: string | Uint8Array): Promise<void>;
export interface GlobScanner {
    scan(options?: {
        cwd?: string;
    }): AsyncIterable<string>;
}
export declare function glob(pattern: string): GlobScanner;
export interface ServerOptions {
    port: number;
    fetch: (request: Request) => Promise<Response> | Response;
    error?: (error: Error) => Response;
}
export interface RuntimeServer {
    stop(): void;
}
export declare function serve(options: ServerOptions): RuntimeServer;
export declare function exists(path: string): Promise<boolean>;
//# sourceMappingURL=runtime.d.ts.map