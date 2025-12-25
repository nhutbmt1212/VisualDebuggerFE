export interface DebugSession {
    id: string;
    projectId: string;
    environment?: string;
    userAgent?: string;
    ipAddress?: string;
    metadata?: Record<string, unknown>;
    startedAt: string;
    endedAt?: string;
    createdAt: string;
    updatedAt: string;
}
