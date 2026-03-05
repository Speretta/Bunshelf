type LogLevel = "error" | "warn" | "info" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

class Logger {
  private level: LogLevel;
  private levels: Record<LogLevel, number> = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  };

  constructor(level: LogLevel = "info") {
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return this.levels[level] <= this.levels[this.level];
  }

  private format(entry: LogEntry): string {
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
    
    if (entry.context && Object.keys(entry.context).length > 0) {
      const contextStr = Object.entries(entry.context)
        .map(([k, v]) => `${k}=${v}`)
        .join(" ");
      return `${prefix} ${entry.message} | ${contextStr}`;
    }
    
    return `${prefix} ${entry.message}`;
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    const formatted = this.format(entry);
    
    switch (level) {
      case "error":
        console.error(formatted);
        break;
      case "warn":
        console.warn(formatted);
        break;
      case "info":
        console.info(formatted);
        break;
      case "debug":
        console.debug(formatted);
        break;
    }
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.log("error", message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log("warn", message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log("info", message, context);
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log("debug", message, context);
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }
}

export const logger = new Logger(
  (process.env.LOG_LEVEL as LogLevel) || "info"
);

export type { LogLevel };
