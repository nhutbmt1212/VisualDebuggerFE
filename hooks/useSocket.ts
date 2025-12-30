'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { DebugSession, DebugEvent } from '@/graphql/generated/graphql';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface UseSocketOptions {
    projectId: string | null;
    onNewSession?: (session: DebugSession) => void;
    onNewEvent?: (event: DebugEvent) => void;
    onSessionEnded?: (sessionId: string) => void;
}

interface UseSocketReturn {
    isConnected: boolean;
    isConnecting: boolean;
    error: Error | null;
    newSessionsCount: number;
    newEventsCount: number;
    latestSession: DebugSession | null;
    latestEvent: DebugEvent | null;
    clearCounts: () => void;
}

export function useSocket({
    projectId,
    onNewSession,
    onNewEvent,
    onSessionEnded,
}: UseSocketOptions): UseSocketReturn {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [newSessionsCount, setNewSessionsCount] = useState(0);
    const [newEventsCount, setNewEventsCount] = useState(0);
    const [latestSession, setLatestSession] = useState<DebugSession | null>(null);
    const [latestEvent, setLatestEvent] = useState<DebugEvent | null>(null);

    const socketRef = useRef<Socket | null>(null);
    const callbacksRef = useRef({ onNewSession, onNewEvent, onSessionEnded });

    // Update callbacks ref to avoid stale closures
    useEffect(() => {
        callbacksRef.current = { onNewSession, onNewEvent, onSessionEnded };
    }, [onNewSession, onNewEvent, onSessionEnded]);

    const clearCounts = useCallback(() => {
        setNewSessionsCount(0);
        setNewEventsCount(0);
    }, []);

    useEffect(() => {
        if (!projectId) {
            return;
        }

        setIsConnecting(true);
        setError(null);

        // Create socket connection to /debug namespace
        const socket = io(`${SOCKET_URL}/debug`, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('[Socket] Connected to debug namespace');
            setIsConnected(true);
            setIsConnecting(false);
            setError(null);

            // Subscribe to project room
            socket.emit('subscribe', projectId);
        });

        socket.on('disconnect', (reason) => {
            console.log('[Socket] Disconnected:', reason);
            setIsConnected(false);
        });

        socket.on('connect_error', (err) => {
            console.error('[Socket] Connection error:', err);
            setError(new Error(`Connection failed: ${err.message}`));
            setIsConnecting(false);
        });

        // Handle new session
        socket.on('new_session', (session: DebugSession) => {
            console.log('[Socket] New session:', session.id);
            setLatestSession(session);
            setNewSessionsCount(prev => prev + 1);
            callbacksRef.current.onNewSession?.(session);
        });

        // Handle new event
        socket.on('new_event', (event: DebugEvent) => {
            console.log('[Socket] New event:', event.id, event.type);
            setLatestEvent(event);
            setNewEventsCount(prev => prev + 1);
            callbacksRef.current.onNewEvent?.(event);
        });

        // Handle session ended
        socket.on('session_ended', ({ sessionId }: { sessionId: string }) => {
            console.log('[Socket] Session ended:', sessionId);
            callbacksRef.current.onSessionEnded?.(sessionId);
        });

        // Cleanup on unmount or projectId change
        return () => {
            console.log('[Socket] Cleaning up connection');
            socket.disconnect();
            socketRef.current = null;
        };
    }, [projectId]);

    return {
        isConnected,
        isConnecting,
        error,
        newSessionsCount,
        newEventsCount,
        latestSession,
        latestEvent,
        clearCounts,
    };
}
