import { logger } from "./logger.js";

export enum ErrorCode {
  INVALID_LOCALE = "INVALID_LOCALE",
  INVALID_SLUG = "INVALID_SLUG",
  INVALID_PATH = "INVALID_PATH",
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  PARSE_ERROR = "PARSE_ERROR",
  CONFIG_ERROR = "CONFIG_ERROR",
  BUILD_ERROR = "BUILD_ERROR",
  UNKNOWN = "UNKNOWN",
}

export interface AppError {
  code: ErrorCode;
  message: string;
  userMessage: string;
  statusCode: number;
  context?: Record<string, unknown>;
}

const ERROR_MESSAGES: Record<ErrorCode, { message: string; userMessage: string; statusCode: number }> = {
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

export function createError(
  code: ErrorCode,
  context?: Record<string, unknown>
): AppError {
  const errorInfo = ERROR_MESSAGES[code];
  
  const error: AppError = {
    code,
    message: errorInfo.message,
    userMessage: errorInfo.userMessage,
    statusCode: errorInfo.statusCode,
    context,
  };

  logger.error(errorInfo.message, { code, ...context });

  return error;
}

export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    "userMessage" in error &&
    "statusCode" in error
  );
}

export function handleError(error: unknown): AppError {
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

export function tryCatch<T>(
  fn: () => T
): { data: T; error: null } | { data: null; error: AppError } {
  try {
    return { data: fn(), error: null };
  } catch (e) {
    return { data: null, error: handleError(e) };
  }
}

export async function tryCatchAsync<T>(
  fn: () => Promise<T>
): Promise<{ data: T; error: null } | { data: null; error: AppError }> {
  try {
    return { data: await fn(), error: null };
  } catch (e) {
    return { data: null, error: handleError(e) };
  }
}
