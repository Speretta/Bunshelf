type LogLevel = "error" | "warn" | "info" | "debug";
declare class Logger {
    private level;
    private levels;
    constructor(level?: LogLevel);
    private shouldLog;
    private format;
    private log;
    error(message: string, context?: Record<string, unknown>): void;
    warn(message: string, context?: Record<string, unknown>): void;
    info(message: string, context?: Record<string, unknown>): void;
    debug(message: string, context?: Record<string, unknown>): void;
    setLevel(level: LogLevel): void;
}
export declare const logger: Logger;
export type { LogLevel };
//# sourceMappingURL=logger.d.ts.map