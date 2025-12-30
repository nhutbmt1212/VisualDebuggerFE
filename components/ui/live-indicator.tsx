import React from 'react';
import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
    isConnected: boolean;
    isConnecting?: boolean;
    className?: string;
    showLabel?: boolean;
}

export function LiveIndicator({
    isConnected,
    isConnecting = false,
    className,
    showLabel = true
}: LiveIndicatorProps) {
    return (
        <div className={cn(
            'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border transition-all',
            isConnected && 'bg-green-500/10 border-green-500/30',
            isConnecting && 'bg-yellow-500/10 border-yellow-500/30',
            !isConnected && !isConnecting && 'bg-slate-500/10 border-slate-500/30',
            className
        )}>
            <span className="relative flex size-2">
                {isConnected && (
                    <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full size-2 bg-green-500" />
                    </>
                )}
                {isConnecting && (
                    <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                        <span className="relative inline-flex rounded-full size-2 bg-yellow-500" />
                    </>
                )}
                {!isConnected && !isConnecting && (
                    <span className="relative inline-flex rounded-full size-2 bg-slate-500" />
                )}
            </span>
            {showLabel && (
                <span className={cn(
                    'text-[10px] font-black uppercase tracking-widest',
                    isConnected && 'text-green-400',
                    isConnecting && 'text-yellow-400',
                    !isConnected && !isConnecting && 'text-slate-500'
                )}>
                    {isConnected ? 'Live' : isConnecting ? 'Connecting' : 'Offline'}
                </span>
            )}
        </div>
    );
}
