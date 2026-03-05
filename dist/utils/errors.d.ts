export declare enum ErrorCode {
    INVALID_LOCALE = "INVALID_LOCALE",
    INVALID_SLUG = "INVALID_SLUG",
    INVALID_PATH = "INVALID_PATH",
    FILE_NOT_FOUND = "FILE_NOT_FOUND",
    PARSE_ERROR = "PARSE_ERROR",
    CONFIG_ERROR = "CONFIG_ERROR",
    BUILD_ERROR = "BUILD_ERROR",
    UNKNOWN = "UNKNOWN"
}
export interface AppError {
    code: ErrorCode;
    message: string;
    userMessage: string;
    statusCode: number;
    context?: Record<string, unknown>;
}
export declare function createError(code: ErrorCode, context?: Record<string, unknown>): AppError;
export declare function isAppError(error: unknown): error is AppError;
export declare function handleError(error: unknown): AppError;
export declare function tryCatch<T>(fn: () => T): {
    data: T;
    error: null;
} | {
    data: null;
    error: AppError;
};
export declare function tryCatchAsync<T>(fn: () => Promise<T>): Promise<{
    data: T;
    error: null;
} | {
    data: null;
    error: AppError;
}>;
//# sourceMappingURL=errors.d.ts.map