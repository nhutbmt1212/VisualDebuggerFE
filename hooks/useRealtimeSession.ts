'use client';

import { useCallback, useState, useMemo } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useSession, useSessionEvents } from '@/hooks/useProjects';
import { DebugEvent } from '@/graphql/generated/graphql';

interface UseRealtimeSessionOptions {
    sessionId: string;
    projectId: string;
    initialPage?: number;
    initialLimit?: number;
}

interface UseRealtimeSessionReturn {
    // Connection status
    isConnected: boolean;
    isConnecting: boolean;

    // Session data
    session: any;
    isLoading: boolean;
    isValidating: boolean;
    isError: any;

    // Events data (server-side pagination)
    events: DebugEvent[];
    allEventsCount: number;
    newEventsCount: number;

    // Pagination (from server)
    page: number;
    limit: number;
    totalPages: number;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;

    // Actions
    handleRefresh: () => void;
    clearNewEvents: () => void;
}

export function useRealtimeSession({
    sessionId,
    projectId,
    initialPage = 1,
    initialLimit = 10
}: UseRealtimeSessionOptions): UseRealtimeSessionReturn {
    // Realtime events state (for WebSocket new events)
    const [realtimeEvents, setRealtimeEvents] = useState<DebugEvent[]>([]);
    const [newEventsCount, setNewEventsCount] = useState(0);

    // Pagination state
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);

    // SWR Hook for session info (without events)
    const {
        session,
        isLoading: sessionLoading,
        isValidating: sessionValidating,
        isError: sessionError,
        mutate: mutateSession
    } = useSession(sessionId);

    // SWR Hook for paginated events (server-side)
    const {
        events: serverEvents,
        totalCount,
        totalPages,
        isLoading: eventsLoading,
        mutate: mutateEvents
    } = useSessionEvents(sessionId, page, limit);

    // WebSocket callback for new events in THIS session
    const handleNewEvent = useCallback((event: DebugEvent) => {
        // Only add events that belong to this session
        if (event.sessionId === sessionId) {
            setRealtimeEvents(prev => {
                if (prev.some(e => e.id === event.id)) return prev;
                return [...prev, event];
            });
            setNewEventsCount(prev => prev + 1);
        }
    }, [sessionId]);

    // Socket connection
    const {
        isConnected,
        isConnecting,
    } = useSocket({
        projectId,
        onNewEvent: handleNewEvent,
    });

    // Combine server events + realtime events (realtime events at the end since they're newest)
    const events = useMemo(() => {
        // On first page, prepend new realtime events
        // On other pages, show only server events
        if (page === 1) {
            const combined = [...serverEvents, ...realtimeEvents];
            // Remove duplicates
            const seen = new Set<string>();
            return combined.filter(event => {
                if (seen.has(event.id)) return false;
                seen.add(event.id);
                return true;
            });
        }
        return serverEvents;
    }, [serverEvents, realtimeEvents, page]);

    const allEventsCount = totalCount + (page === 1 ? realtimeEvents.length : 0);

    // Actions
    const handleRefresh = useCallback(() => {
        setRealtimeEvents([]);
        setNewEventsCount(0);
        setPage(1);
        mutateSession();
        mutateEvents();
    }, [mutateSession, mutateEvents]);

    const clearNewEvents = useCallback(() => {
        setNewEventsCount(0);
    }, []);

    // Handle limit change - reset to page 1
    const handleSetLimit = useCallback((newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    }, []);

    return {
        isConnected,
        isConnecting,
        session,
        isLoading: sessionLoading || eventsLoading,
        isValidating: sessionValidating,
        isError: sessionError,
        events,
        allEventsCount,
        newEventsCount,
        page,
        limit,
        totalPages,
        setPage,
        setLimit: handleSetLimit,
        handleRefresh,
        clearNewEvents
    };
}
