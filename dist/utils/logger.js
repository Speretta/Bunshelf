class Logger {
    level;
    levels = {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
    };
    constructor(level = "info") {
        this.level = level;
    }
    shouldLog(level) {
        return this.levels[level] <= this.levels[this.level];
    }
    format(entry) {
        const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
        if (entry.context && Object.keys(entry.context).length > 0) {
            const contextStr = Object.entries(entry.context)
                .map(([k, v]) => `${k}=${v}`)
                .join(" ");
            return `${prefix} ${entry.message} | ${contextStr}`;
        }
        return `${prefix} ${entry.message}`;
    }
    log(level, message, context) {
        if (!this.shouldLog(level))
            return;
        const entry = {
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
    error(message, context) {
        this.log("error", message, context);
    }
    warn(message, context) {
        this.log("warn", message, context);
    }
    info(message, context) {
        this.log("info", message, context);
    }
    debug(message, context) {
        this.log("debug", message, context);
    }
    setLevel(level) {
        this.level = level;
    }
}
export const logger = new Logger(process.env.LOG_LEVEL || "info");
//# sourceMappingURL=logger.js.map