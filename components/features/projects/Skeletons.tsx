
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ProjectCardSkeleton = () => {
    return (
        <div className="flex flex-col bg-card-dark border border-slate-800 rounded-lg p-4 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded" />
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-10" />
                        </div>
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
                <Skeleton className="size-4 rounded-full" />
            </div>

            <div className="flex flex-col gap-2 mt-6">
                <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-8 w-full rounded" />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-2 w-10" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-2 w-10" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="size-7 rounded" />
                    <Skeleton className="size-7 rounded" />
                </div>
            </div>
        </div>
    );
};

export const ActivityItemSkeleton = () => {
    return (
        <div className="bg-card-dark/40 border border-slate-800/50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-10" />
                    </div>
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-8" />
            </div>
        </div>
    );
};
