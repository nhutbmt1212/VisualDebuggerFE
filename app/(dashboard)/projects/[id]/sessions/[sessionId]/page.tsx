"use client"

export const dynamic = 'force-dynamic';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useProjects';
import { formatDistanceToNow, format } from 'date-fns';
import {
    ArrowLeft,
    Globe,
    Cpu,
    Clock,
    AlertCircle,
    ChevronRight,
    Terminal,
    Code,
    Network,
    FileCode,
    Bug,
    Server,
    Shield,
    Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function SessionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;
    const sessionId = params.sessionId as string;

    const { session, isLoading, isError } = useSession(sessionId);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    const events = useMemo(() => {
        if (!session?.events) return [];
        return [...session.events].sort((a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
    }, [session?.events]);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 max-w-md w-full">
                    <AlertCircle className="size-12 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Failed to load session</h2>
                    <p className="text-sm opacity-80 mb-6">The session you are looking for may have been deleted or you don&apos;t have access to it.</p>
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
                    <div className="flex items-center justify-between mb-2 px-1">
                        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                            <Terminal className="size-4 text-primary" /> Event Timeline
                        </h3>
                        <span className="text-[10px] font-black text-slate-500 uppercase bg-slate-800/50 px-2 py-0.5 rounded-full border border-slate-700/50">
                            {events.length} Events Total
                        </span>
                    </div>

                    {isLoading ? (
                        <div className="space-y-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full rounded-xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="relative space-y-3">
                            <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-800" />

                            {events.map((event) => {
                                const isError = event.type === 'ERROR';
                                const isHttp = event.type === 'HTTP_REQUEST' || event.type === 'HTTP_RESPONSE';
                                const isSelected = selectedEventId === event.id;

                                return (
                                    <div
                                        key={event.id}
                                        className={cn(
                                            "relative pl-12 transition-all duration-300 group",
                                            isSelected ? "z-10" : ""
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "absolute left-[18px] top-1/2 -translate-y-1/2 size-3 rounded-full border-2 border-[#090e14] z-10 transition-transform duration-300 group-hover:scale-125",
                                                isError ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                                                    isHttp ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" :
                                                        "bg-slate-600"
                                            )}
                                        />

                                        <div
                                            onClick={() => setSelectedEventId(isSelected ? null : event.id)}
                                            className={cn(
                                                "bg-[#111827] border rounded-2xl p-4 cursor-pointer transition-all duration-300",
                                                isSelected
                                                    ? "border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] translate-x-1"
                                                    : "border-slate-800/50 hover:border-slate-700 hover:translate-x-1 hover:bg-[#161d27]"
                                            )}
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className={cn(
                                                        "p-2 rounded-lg shrink-0",
                                                        isError ? "bg-red-500/10 text-red-500" :
                                                            isHttp ? "bg-blue-500/10 text-blue-500" :
                                                                "bg-slate-800 text-slate-400"
                                                    )}>
                                                        {isError ? <Bug className="size-4" /> :
                                                            isHttp ? <Network className="size-4" /> :
                                                                <Code className="size-4" />}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                                {event.type}
                                                            </span>
                                                            {event.duration && (
                                                                <span className="text-[10px] text-slate-600 font-bold">
                                                                    {event.duration}ms
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h4 className="text-sm font-bold text-slate-200 truncate">
                                                            {event.name || event.httpUrl || event.filePath || 'Unnamed Event'}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 shrink-0">
                                                    <div className="text-right hidden sm:block">
                                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                                                            {format(new Date(event.timestamp), 'HH:mm:ss')}
                                                        </div>
                                                        <div className="text-[10px] text-slate-600">
                                                            +{(new Date(event.timestamp).getTime() - new Date(session?.startedAt || 0).getTime())}ms
                                                        </div>
                                                    </div>
                                                    <ChevronRight className={cn(
                                                        "size-4 text-slate-600 transition-transform duration-300",
                                                        isSelected ? "rotate-90 text-primary" : ""
                                                    )} />
                                                </div>
                                            </div>

                                            {/* Expandable Content */}
                                            {isSelected && (
                                                <div className="mt-4 pt-4 border-t border-slate-800/50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    {isError && event.errorMessage && (
                                                        <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
                                                            <div className="text-[10px] text-red-400/60 uppercase font-black mb-1">Error Message</div>
                                                            <div className="text-sm text-red-400 font-medium font-mono">
                                                                {event.errorMessage}
                                                            </div>
                                                            {event.errorStack && (
                                                                <div className="mt-3">
                                                                    <div className="text-[10px] text-red-400/40 uppercase font-black mb-1">Stack Trace</div>
                                                                    <pre className="text-[10px] text-red-400/50 font-mono overflow-x-auto p-2 bg-black/20 rounded-lg max-h-40">
                                                                        {event.errorStack}
                                                                    </pre>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {isHttp && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            <div className="p-3 bg-slate-900/50 border border-slate-800/50 rounded-xl">
                                                                <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Request</div>
                                                                <div className="text-xs font-mono text-slate-400">
                                                                    <span className="text-blue-400 font-bold mr-2">{event.httpMethod}</span>
                                                                    {event.httpUrl}
                                                                </div>
                                                            </div>
                                                            {event.httpStatus && (
                                                                <div className="p-3 bg-slate-900/50 border border-slate-800/50 rounded-xl">
                                                                    <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Status</div>
                                                                    <div className={cn(
                                                                        "text-xs font-bold font-mono",
                                                                        event.httpStatus >= 400 ? "text-red-400" : "text-green-400"
                                                                    )}>
                                                                        {event.httpStatus} {event.httpStatus >= 400 ? 'Error' : 'Success'}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {(event.filePath || event.lineNumber) && (
                                                        <div className="flex items-center gap-2 p-2 bg-slate-900/50 border border-slate-800/50 rounded-lg">
                                                            <FileCode className="size-3.5 text-slate-500" />
                                                            <span className="text-xs text-slate-400 font-mono truncate">
                                                                {event.filePath}:{event.lineNumber}{event.columnNumber ? `:${event.columnNumber}` : ''}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {event.arguments && (
                                                        <div className="space-y-1">
                                                            <div className="text-[10px] text-slate-500 uppercase font-black px-1">Arguments</div>
                                                            <pre className="p-3 bg-black/40 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono overflow-x-auto max-h-60">
                                                                {(() => {
                                                                    try {
                                                                        return JSON.stringify(JSON.parse(event.arguments), null, 2);
                                                                    } catch {
                                                                        return event.arguments;
                                                                    }
                                                                })()}
                                                            </pre>
                                                        </div>
                                                    )}

                                                    {event.returnValue && (
                                                        <div className="space-y-1">
                                                            <div className="text-[10px] text-slate-500 uppercase font-black px-1">Return Value</div>
                                                            <pre className="p-3 bg-black/40 rounded-xl border border-slate-800 text-[11px] text-success/80 font-mono overflow-x-auto max-h-60">
                                                                {(() => {
                                                                    try {
                                                                        return JSON.stringify(JSON.parse(event.returnValue || ''), null, 2);
                                                                    } catch {
                                                                        return event.returnValue;
                                                                    }
                                                                })()}
                                                            </pre>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
