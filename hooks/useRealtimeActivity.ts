'use client';

import { useCallback, useState, useMemo } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useProjectSessions, useProjectStats } from '@/hooks/useProjects';
import { DebugSession, DebugEvent } from '@/graphql/generated/graphql';
import { formatDistanceToNow } from 'date-fns';
import { ActivityItem } from '@/components/features/projects/types';

interface UseRealtimeActivityOptions {
    projectId: string;
    page?: number;
    limit?: number;
    trendRange?: string;
}

interface UseRealtimeActivityReturn {
    // Connection status
    isConnected: boolean;
    isConnecting: boolean;

    // Activity data
    activities: ActivityItem[];
    totalPages: number;
    isLoading: boolean;

    // Stats data
    stats: any;
    statsLoading: boolean;

    // Realtime counts
    newEventsCount: number;

    // Toast state
    showToast: boolean;
    toastMessage: string;

    // Actions
    handleRefresh: () => void;
    dismissToast: () => void;
    setTrendRange: (range: string) => void;
    trendRange: string;
}

export function useRealtimeActivity({
    projectId,
    page = 1,
    limit = 10,
    trendRange: initialRange = '24h'
}: UseRealtimeActivityOptions): UseRealtimeActivityReturn {
    // Realtime state
    const [realtimeSessions, setRealtimeSessions] = useState<DebugSession[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [trendRange, setTrendRange] = useState(initialRange);

    // SWR Hooks
    const {
        stats,
        isLoading: statsLoading,
        mutate: mutateStats
    } = useProjectStats(projectId, trendRange);

    const {
        sessions: rawSessions,
        totalPages,
        isLoading,
        mutate: mutateSessions
    } = useProjectSessions(projectId, page, limit);

    // WebSocket callbacks
    const handleNewSession = useCallback((session: DebugSession) => {
        setRealtimeSessions(prev => {
            if (prev.some(s => s.id === session.id)) return prev;
            return [session, ...prev].slice(0, 5);
        });
        // Toast disabled - only update activity list
    }, []);

    const handleNewEvent = useCallback((event: DebugEvent) => {
        // Toast disabled - only refresh stats
        mutateStats();
    }, [mutateStats]);

    // Socket connection
    const {
        isConnected,
        isConnecting,
        newEventsCount,
        clearCounts
    } = useSocket({
        projectId,
        onNewSession: handleNewSession,
        onNewEvent: handleNewEvent,
    });

    // Combine realtime + SWR sessions
    const allSessions = useMemo(() => {
        const combined = [...realtimeSessions, ...rawSessions];
        const seen = new Set<string>();
        return combined.filter(session => {
            if (seen.has(session.id)) return false;
            seen.add(session.id);
            return true;
        });
    }, [realtimeSessions, rawSessions]);

    // Transform to ActivityItem format
    const activities = useMemo(() => {
        return allSessions.map((session) => {
            const latestEvent = session.events?.[0];
            let method: string = 'GET';
            let type: 'success' | 'error' | 'warning' = 'success';
            const isNew = realtimeSessions.some(s => s.id === session.id);

            if (latestEvent) {
                if (latestEvent.type === 'HTTP_REQUEST' && latestEvent.httpMethod) {
                    method = latestEvent.httpMethod;
                } else if (latestEvent.type === 'ERROR') {
                    method = 'ERR';
                    type = 'error';
                } else if (latestEvent.type === 'LOG') {
                    method = 'LOG';
                } else {
                    method = 'EVNT';
                }
            }

            return {
                id: session.id,
                projectId: session.project?.id || projectId,
                session: `SESS-${session.id.substring(0, 4).toUpperCase()}`,
                method,
                path: latestEvent?.httpUrl || latestEvent?.filePath || session.environment,
                time: formatDistanceToNow(new Date(session.startedAt), { addSuffix: true }),
                duration: latestEvent?.duration ? `${latestEvent.duration}ms` : undefined,
                status: latestEvent?.httpStatus ? `${latestEvent.httpStatus}` : (latestEvent?.type === 'ERROR' ? 'ERROR' : 'OK'),
                type,
                isNew
            };
        });
    }, [allSessions, projectId, realtimeSessions]);

    // Actions
    const handleRefresh = useCallback(() => {
        setRealtimeSessions([]);
        clearCounts();
        mutateSessions();
        mutateStats();
        setShowToast(false);
    }, [clearCounts, mutateSessions, mutateStats]);

    const dismissToast = useCallback(() => {
        setShowToast(false);
    }, []);

    return {
        isConnected,
        isConnecting,
        activities,
        totalPages,
        isLoading,
        stats,
        statsLoading,
        newEventsCount,
        showToast,
        toastMessage,
        handleRefresh,
        dismissToast,
        setTrendRange,
        trendRange
    };
}
