'use client';

import React from 'react';
import { format } from 'date-fns';
import { ChevronRight, FileCode as FileCodeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    getEventDisplayType,
    getEventTypeColor,
    getEventStatus,
    formatEventName
} from '@/lib/event-utils';

interface EventData {
    id: string;
    type: string;
    name?: string | null;
    httpUrl?: string | null;
    httpMethod?: string | null;
    httpStatus?: number | null;
    filePath?: string | null;
    lineNumber?: number | null;
    columnNumber?: number | null;
    functionName?: string | null;
    duration?: number | null;
    timestamp: string;
    errorMessage?: string | null;
    errorStack?: string | null;
    arguments?: string | null;
    returnValue?: string | null;
}

interface EventTableRowProps {
    event: EventData;
    isSelected: boolean;
    onSelect: () => void;
    sessionStartTime?: string;
}

export function EventTableRow({ event, isSelected, onSelect, sessionStartTime }: EventTableRowProps) {
    const displayType = getEventDisplayType(event.type);
    const typeColor = getEventTypeColor(event.type);
    const { status, isError } = getEventStatus(event);
    const eventName = formatEventName(event);

    const isHttpEvent = event.type.toLowerCase().includes('http');
    const isConsoleEvent = event.type.toLowerCase().includes('console');

    return (
        <>
            <tr
                onClick={onSelect}
                className={cn(
                    "hover:bg-slate-800/30 transition-colors cursor-pointer",
                    isSelected && "bg-slate-800/50",
                    "animate-in fade-in slide-in-from-top-1 duration-200"
                )}
            >
                {/* Type Badge */}
                <td className="px-4 py-3">
                    <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                        typeColor
                    )}>
                        {displayType}
                    </span>
                </td>

                {/* Event Name/Route */}
                <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                        {isHttpEvent && event.httpMethod && (
                            <span className="text-blue-400 font-bold text-xs">
                                {event.httpMethod}
                            </span>
                        )}
                        <span className="text-slate-300 font-mono text-sm truncate max-w-[300px]" title={eventName}>
                            {eventName}
                        </span>
                    </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "size-2 rounded-full",
                            isError ? "bg-red-500" : "bg-green-500"
                        )} />
                        <span className={cn(
                            "text-sm",
                            isError ? "text-red-400" : "text-slate-400"
                        )}>
                            {status}
                        </span>
                    </div>
                </td>

                {/* Duration */}
                <td className="px-4 py-3 text-slate-500 text-sm">
                    {event.duration ? `${event.duration}ms` : '-'}
                </td>

                {/* Timestamp */}
                <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-slate-600 font-mono text-sm">
                            {format(new Date(event.timestamp), 'HH:mm:ss')}
                        </span>
                        <ChevronRight className={cn(
                            "size-4 text-slate-600 transition-transform duration-200",
                            isSelected && "rotate-90 text-primary"
                        )} />
                    </div>
                </td>
            </tr>

            {/* Expanded Details Row */}
            {isSelected && (
                <tr className="bg-slate-900/50">
                    <td colSpan={5} className="px-4 py-4">
                        <div
                            className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Error Info */}
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

                            {/* HTTP Details */}
                            {isHttpEvent && (
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

                            {/* File Location */}
                            {(event.filePath || event.lineNumber) && (
                                <div className="flex items-center gap-2 p-2 bg-slate-900/50 border border-slate-800/50 rounded-lg">
                                    <FileCodeIcon className="size-3.5 text-slate-500" />
                                    <span className="text-xs text-slate-400 font-mono truncate">
                                        {event.filePath}:{event.lineNumber}{event.columnNumber ? `:${event.columnNumber}` : ''}
                                    </span>
                                </div>
                            )}

                            {/* Arguments */}
                            {event.arguments && (
                                <div className="space-y-1">
                                    <div className="text-[10px] text-slate-500 uppercase font-black px-1">
                                        {isConsoleEvent ? 'Logged Data' : 'Arguments'}
                                    </div>
                                    <pre className="p-3 bg-black/40 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono overflow-x-auto max-h-60">
                                        {(() => {
                                            try {
                                                const parsed = typeof event.arguments === 'string'
                                                    ? JSON.parse(event.arguments)
                                                    : event.arguments;

                                                if (isConsoleEvent && parsed.data) {
                                                    if (Array.isArray(parsed.data) && parsed.data.length === 1) {
                                                        const item = parsed.data[0];
                                                        return typeof item === 'string'
                                                            ? item
                                                            : JSON.stringify(item, null, 2);
                                                    }
                                                    return JSON.stringify(parsed.data, null, 2);
                                                }

                                                return JSON.stringify(parsed, null, 2);
                                            } catch {
                                                return typeof event.arguments === 'string'
                                                    ? event.arguments
                                                    : JSON.stringify(event.arguments);
                                            }
                                        })()}
                                    </pre>
                                </div>
                            )}

                            {/* Return Value */}
                            {event.returnValue && (
                                <div className="space-y-1">
                                    <div className="text-[10px] text-slate-500 uppercase font-black px-1">Return Value</div>
                                    <pre className="p-3 bg-black/40 rounded-xl border border-slate-800 text-[11px] text-green-400/80 font-mono overflow-x-auto max-h-60">
                                        {(() => {
                                            try {
                                                if (typeof event.returnValue === 'string') {
                                                    return JSON.stringify(JSON.parse(event.returnValue), null, 2);
                                                }
                                                return JSON.stringify(event.returnValue, null, 2);
                                            } catch {
                                                return typeof event.returnValue === 'string'
                                                    ? event.returnValue
                                                    : JSON.stringify(event.returnValue);
                                            }
                                        })()}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}
