import type { HttpError } from "@refinedev/core";

type ApiErrorBody = {
    message?: string;
    error?: string;
    errors?: Record<string, string | string[]>;
};

export const createHttpError = (
    message: string,
    statusCode: number,
    errors?: HttpError["errors"]
): HttpError => ({ message, statusCode, errors });

const readText = async (response: Response): Promise<string> => {
    try {
        return await response.clone().text();
    } catch (cause) {
        throw createHttpError(
            `Could not read the response body (${cause instanceof Error ? cause.message : String(cause)}).`,
            response.status
        );
    }
};

const extractErrorMessage = (body: string, statusCode: number): string => {
    try {
        const parsed = JSON.parse(body) as ApiErrorBody;
        const message = parsed.message ?? parsed.error;
        if (message) return message;
    } catch {
        // Not JSON - fall through to the raw body below.
    }

    const trimmed = body.trim();
    if (trimmed) return trimmed.slice(0, 300);

    return `Request failed with status ${statusCode}.`;
};

const extractFieldErrors = (body: string): HttpError["errors"] => {
    try {
        const parsed = JSON.parse(body) as ApiErrorBody;
        return parsed.errors;
    } catch {
        return undefined;
    }
};

/**
 * The REST data provider is created with `throwHttpErrors: false` and does not
 * check `response.ok` for every method, so failures have to be turned into
 * errors explicitly instead of being mapped as if they were successful.
 */
export const assertOk = async (
    response: Response,
    context: string
): Promise<void> => {
    if (response.ok) return;

    const body = await readText(response);

    throw createHttpError(
        `${context} failed: ${extractErrorMessage(body, response.status)}`,
        response.status,
        extractFieldErrors(body)
    );
};

export const toHttpError = async (
    response: Response,
    context: string
): Promise<HttpError> => {
    const body = await readText(response);

    return createHttpError(
        `${context} failed: ${extractErrorMessage(body, response.status)}`,
        response.status,
        extractFieldErrors(body)
    );
};

export const parseJson = async <T>(
    response: Response,
    context: string
): Promise<T> => {
    const body = await readText(response);

    if (!body.trim()) {
        throw createHttpError(
            `${context} returned an empty response body.`,
            response.status
        );
    }

    try {
        return JSON.parse(body) as T;
    } catch (cause) {
        throw createHttpError(
            `${context} returned a malformed JSON response (${
                cause instanceof Error ? cause.message : String(cause)
            }).`,
            response.status
        );
    }
};
