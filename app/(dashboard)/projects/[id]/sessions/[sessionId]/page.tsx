"use client"

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useRealtimeSession } from '@/hooks/useRealtimeSession';
import { formatDistanceToNow, format } from 'date-fns';
import {
    ArrowLeft,
    Globe,
    Cpu,
    Clock,
    AlertCircle,
    Terminal,
    Network,
    Server,
    Shield,
    Info,
    Filter,
    ChevronDown,
    Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LiveIndicator } from '@/components/ui/live-indicator';
import { Pagination } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { EventTableRow } from '@/components/features/sessions/EventTableRow';

export default function SessionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;
    const sessionId = params.sessionId as string;

    const {
        session, isLoading, isValidating, isError, events,
        isConnected, isConnecting, newEventsCount,
        handleRefresh, allEventsCount,
        page, limit, totalPages, setPage, setLimit
    } = useRealtimeSession({
        sessionId,
        projectId
    });
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    // Error handling - ignore abort/canceled errors during navigation
    const errorMessage = isError ? (isError as Error).message || '' : '';
    const isAborted = errorMessage.toLowerCase().includes('abort') ||
        errorMessage.toLowerCase().includes('canceled');
    const isLoadingState = isLoading || isValidating || isAborted;
    const error = (!isAborted && isError) ? errorMessage : null;

    if (!isLoadingState && (error || !session)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 max-w-md w-full">
                    <AlertCircle className="size-12 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Failed to load session</h2>
                    <p className="text-sm opacity-80 mb-6">{error || 'The session you are looking for may have been deleted or you don\'t have access to it.'}</p>
                    <Button variant="outline" onClick={() => router.push(`/projects/${projectId}`)} className="w-full">
                        <ArrowLeft className="mr-2 size-4" /> Back to Project
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen pb-20">
            {/* Navigation & Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.push(`/projects/${projectId}`)}
                    className="flex items-center justify-center size-10 rounded-full hover:bg-slate-800 transition-colors text-slate-400 group"
                >
                    <ArrowLeft className="size-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Project / Debug Session</span>
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                        {isLoading ? (
                            <Skeleton className="h-8 w-64" />
                        ) : (
                            <>
                                <span className="text-primary">#SESS-{session?.id.substring(0, 8).toUpperCase()}</span>
                                {session?.environment && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-widest">
                                        {session.environment}
                                    </span>
                                )}
                            </>
                        )}
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Metadata & Details */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Session Status Card */}
                    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Info className="size-3" /> Session Info
                        </h3>

                        {isLoading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ) : (
                            <div className="space-y-4 relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Started At</span>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <Clock className="size-4 text-slate-500" />
                                        {format(new Date(session?.startedAt || 0), 'PPpp')}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Duration</span>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <Network className="size-4 text-slate-500" />
                                        {session?.endedAt
                                            ? formatDistanceToNow(new Date(session.startedAt), { addSuffix: false })
                                            : <span className="text-success flex items-center gap-1.5"><span className="size-2 bg-success rounded-full animate-pulse" /> Active Session</span>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Environment</span>
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <Server className="size-4 text-slate-500" />
                                        {session?.environment || 'Unknown'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Technical Metadata */}
                    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Shield className="size-3" /> Device Context
                        </h3>
                        {isLoading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        ) : (
                            <div className="space-y-4 relative z-10">
                                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/50">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">IP Address</span>
                                    <div className="flex items-center gap-2 text-slate-300 text-sm font-mono tracking-tight">
                                        <Globe className="size-3.5 text-slate-500" />
                                        {session?.ipAddress || 'Not recorded'}
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/50">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold mb-1 block">User Agent</span>
                                    <div className="flex items-start gap-2 text-slate-300 text-sm font-mono leading-tight break-all">
                                        <Cpu className="size-3.5 text-slate-500 mt-0.5 shrink-0" />
                                        {session?.userAgent || 'Unknown device'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Event Timeline */}
                <div className="lg:col-span-8 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2 px-1">
                        <div className="flex items-center gap-3">
                            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                                <Terminal className="size-4 text-primary" /> Event Timeline
                            </h3>
                            <LiveIndicator isConnected={isConnected} isConnecting={isConnecting} />
                            {newEventsCount > 0 && (
                                <span className="px-2 py-0.5 text-[10px] font-black bg-primary/20 text-primary rounded-full animate-pulse">
                                    +{newEventsCount} new
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleRefresh}
                                className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest transition-colors"
                            >
                                Refresh
                            </button>
                            <span className="text-[10px] font-black text-slate-500 uppercase bg-slate-800/50 px-2 py-0.5 rounded-full border border-slate-700/50">
                                {allEventsCount} Events
                            </span>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
                                <Filter size={14} /> All Events
                            </button>
                            <button className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
                                Environment: {session?.environment || 'All'} <ChevronDown size={14} />
                            </button>
                        </div>
                        <div className="text-[10px] font-mono text-slate-600 hidden sm:block">
                            {session?.startedAt && (
                                <>STARTED: {format(new Date(session.startedAt), 'HH:mm:ss')}</>
                            )}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="rounded-xl border border-slate-800/50 overflow-hidden bg-slate-900/10">
                            <div className="bg-slate-900/50 border-b border-slate-800 px-4 py-3">
                                <Skeleton className="h-4 w-full" />
                            </div>
                            <div className="divide-y divide-slate-800/50">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="px-4 py-3">
                                        <Skeleton className="h-6 w-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Events Table */}
                            <div className="rounded-xl border border-slate-800/50 overflow-hidden bg-slate-900/10">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-900/50 border-b border-slate-800">
                                        <tr>
                                            <th className="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Type</th>
                                            <th className="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Event / Route</th>
                                            <th className="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Status</th>
                                            <th className="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider">Duration</th>
                                            <th className="px-4 py-3 text-slate-500 font-medium text-xs uppercase tracking-wider text-right">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50">
                                        {events.map((event) => (
                                            <EventTableRow
                                                key={event.id}
                                                event={event}
                                                isSelected={selectedEventId === event.id}
                                                onSelect={() => setSelectedEventId(selectedEventId === event.id ? null : event.id)}
                                                sessionStartTime={session?.startedAt}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Listening Indicator */}
                            {isConnected && (
                                <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-700 font-mono uppercase tracking-widest">
                                    <Circle size={8} fill="currentColor" className="text-primary animate-pulse" />
                                    Listening for new events...
                                </div>
                            )}
                        </>
                    )}

                    {/* Pagination */}
                    {!isLoading && allEventsCount > 0 && (
                        <div className="mt-6 flex justify-center">
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                                limit={limit}
                                onLimitChange={setLimit}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
