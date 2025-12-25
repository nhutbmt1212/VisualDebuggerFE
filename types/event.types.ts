export type EventType =
    | 'FUNCTION_CALL'
    | 'HTTP_REQUEST'
    | 'ERROR'
    | 'console_log'
    | 'console_error'
    | 'console_warn';

export interface DebugEvent {
    id: string;
    sessionId: string;
    parentEventId?: string;
    type: EventType;
    name?: string;

    // Source location
    filePath?: string;
    lineNumber?: number;
    columnNumber?: number;

    // Data
    arguments?: Record<string, unknown>;
    returnValue?: unknown;
    errorMessage?: string;
    errorStack?: string;

    // HTTP
    httpMethod?: string;
    httpUrl?: string;
    httpStatus?: number;

    // Timing
    duration?: number;
    depth: number;
    timestamp: string;
    metadata?: Record<string, unknown>;

    createdAt: string;
    updatedAt: string;
}
