import { logger } from "./logger.js";
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["INVALID_LOCALE"] = "INVALID_LOCALE";
    ErrorCode["INVALID_SLUG"] = "INVALID_SLUG";
    ErrorCode["INVALID_PATH"] = "INVALID_PATH";
    ErrorCode["FILE_NOT_FOUND"] = "FILE_NOT_FOUND";
    ErrorCode["PARSE_ERROR"] = "PARSE_ERROR";
    ErrorCode["CONFIG_ERROR"] = "CONFIG_ERROR";
    ErrorCode["BUILD_ERROR"] = "BUILD_ERROR";
    ErrorCode["UNKNOWN"] = "UNKNOWN";
})(ErrorCode || (ErrorCode = {}));
const ERROR_MESSAGES = {
    [ErrorCode.INVALID_LOCALE]: {
        message: "Invalid or unsupported locale",
        userMessage: "The requested language is not available.",
        statusCode: 400,
    },
    [ErrorCode.INVALID_SLUG]: {
        message: "Invalid slug format",
        userMessage: "The page address contains invalid characters.",
        statusCode: 400,
    },
    [ErrorCode.INVALID_PATH]: {
        message: "Invalid file path",
        userMessage: "The requested resource path is invalid.",
        statusCode: 400,
    },
    [ErrorCode.FILE_NOT_FOUND]: {
        message: "File not found",
        userMessage: "The requested page could not be found.",
        statusCode: 404,
    },
    [ErrorCode.PARSE_ERROR]: {
        message: "Failed to parse content",
        userMessage: "There was an error processing the content.",
        statusCode: 500,
    },
    [ErrorCode.CONFIG_ERROR]: {
        message: "Configuration error",
        userMessage: "There was an error loading the configuration.",
        statusCode: 500,
    },
    [ErrorCode.BUILD_ERROR]: {
        message: "Build error",
        userMessage: "There was an error building the documentation.",
        statusCode: 500,
    },
    [ErrorCode.UNKNOWN]: {
        message: "An unexpected error occurred",
        userMessage: "Something went wrong. Please try again later.",
        statusCode: 500,
    },
};
export function createError(code, context) {
    const errorInfo = ERROR_MESSAGES[code];
    const error = {
        code,
        message: errorInfo.message,
        userMessage: errorInfo.userMessage,
        statusCode: errorInfo.statusCode,
        context,
    };
    logger.error(errorInfo.message, { code, ...context });
    return error;
}
export function isAppError(error) {
    return (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        "message" in error &&
        "userMessage" in error &&
        "statusCode" in error);
}
export function handleError(error) {
    if (isAppError(error)) {
        return error;
    }
    if (error instanceof Error) {
        logger.error(error.message, { stack: error.stack });
        return createError(ErrorCode.UNKNOWN, {
            originalError: error.message
        });
    }
    logger.error("Unknown error type", { error });
    return createError(ErrorCode.UNKNOWN);
}
export function tryCatch(fn) {
    try {
        return { data: fn(), error: null };
    }
    catch (e) {
        return { data: null, error: handleError(e) };
    }
}
export async function tryCatchAsync(fn) {
    try {
        return { data: await fn(), error: null };
    }
    catch (e) {
        return { data: null, error: handleError(e) };
    }
}
//# sourceMappingURL=errors.js.map