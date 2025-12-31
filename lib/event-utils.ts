/**
 * Utility functions for event display in Event Timeline
 */

export type EventType =
    | 'HTTP_REQUEST'
    | 'HTTP_RESPONSE'
    | 'FUNCTION_ENTER'
    | 'FUNCTION_EXIT'
    | 'console_log'
    | 'console_error'
    | 'console_warn'
    | 'ERROR'
    | 'function_enter'
    | 'function_exit'
    | 'function_error'
    | string;

/**
 * Get short display type for table badge
 */
export function getEventDisplayType(type: string): string {
    const normalizedType = type.toLowerCase();

    if (normalizedType.includes('http')) {
        return 'HTTP';
    }
    if (normalizedType.includes('function') || normalizedType === 'func') {
        return 'FUNC';
    }
    if (normalizedType.includes('console') || normalizedType === 'log') {
        return 'LOG';
    }
    if (normalizedType.includes('error') || normalizedType === 'err') {
        return 'ERR';
    }
    if (normalizedType.includes('db') || normalizedType.includes('database') || normalizedType.includes('query')) {
        return 'DB';
    }

    // Fallback: first 4 chars uppercase
    return type.substring(0, 4).toUpperCase();
}

/**
 * Get Tailwind color classes for event type badge
 */
export function getEventTypeColor(type: string): string {
    const displayType = getEventDisplayType(type);

    switch (displayType) {
        case 'HTTP':
            return 'bg-blue-500/10 text-blue-400';
        case 'FUNC':
            return 'bg-purple-500/10 text-purple-400';
        case 'LOG':
            return 'bg-cyan-500/10 text-cyan-400';
        case 'ERR':
            return 'bg-red-500/10 text-red-400';
        case 'DB':
            return 'bg-orange-500/10 text-orange-400';
        default:
            return 'bg-slate-500/10 text-slate-400';
    }
}

/**
 * Determine event status from event data
 */
export function getEventStatus(event: {
    type: string;
    httpStatus?: number | null;
    errorMessage?: string | null;
}): { status: string; isError: boolean } {
    // Check for explicit error
    if (event.type.toLowerCase().includes('error') || event.errorMessage) {
        return { status: 'ERROR', isError: true };
    }

    // Check HTTP status
    if (event.httpStatus !== undefined && event.httpStatus !== null) {
        if (event.httpStatus >= 400) {
            return { status: String(event.httpStatus), isError: true };
        }
        return { status: String(event.httpStatus), isError: false };
    }

    // Default OK status
    return { status: 'OK', isError: false };
}

/**
 * Format event name for display
 */
export function formatEventName(event: {
    name?: string | null;
    httpUrl?: string | null;
    httpMethod?: string | null;
    filePath?: string | null;
    functionName?: string | null;
}): string {
    if (event.name) return event.name;

    if (event.httpUrl) {
        try {
            const url = new URL(event.httpUrl);
            return url.pathname + url.search;
        } catch {
            return event.httpUrl;
        }
    }

    if (event.functionName) return event.functionName;

    if (event.filePath) {
        // Show just filename
        const parts = event.filePath.split(/[/\\]/);
        return parts[parts.length - 1] || event.filePath;
    }

    return 'Unnamed Event';
}
