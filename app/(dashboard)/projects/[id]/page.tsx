"use client"

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProject } from '@/hooks/useProjects';
import { useRealtimeActivity } from '@/hooks/useRealtimeActivity';
import { StatCard } from '@/components/features/projects/StatCard';
import { TrendChart } from '@/components/features/projects/TrendChart';
import { Pagination } from '@/components/ui/pagination';
import { ActivityLog } from '@/components/features/projects/ActivityLog';
import { ApiKeySection } from '@/components/features/projects/ApiKeySection';
import { LiveIndicator } from '@/components/ui/live-indicator';
import { ArrowLeft, Play, Settings, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ActivityItemSkeleton } from '@/components/features/projects/Skeletons';
import Image from 'next/image';

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    // Activity Pagination state
    const [activityPage, setActivityPage] = useState(1);
    const [activityLimit, setActivityLimit] = useState(10);

    // Project data
    const {
        project,
        isLoading: loadingProject,
        isValidating: validatingProject,
        isError: projectError,
        mutate: mutateProject
    } = useProject(projectId);

    // Realtime activity (combines SWR + WebSocket)
    const {
        isConnected,
        isConnecting,
        activities,
        totalPages: activityTotalPages,
        isLoading: loadingSessions,
        stats: projectStats,
        statsLoading: loadingStats,
        newEventsCount,
        handleRefresh,
        setTrendRange,
        trendRange
    } = useRealtimeActivity({
        projectId,
        page: activityPage,
        limit: activityLimit
    });

    // Error handling
    const projectErrorMessage = projectError ? (projectError as Error).message || '' : '';
    const isAborted = projectErrorMessage.toLowerCase().includes('abort') ||
        projectErrorMessage.toLowerCase().includes('canceled');
    const isLoadingState = loadingProject || validatingProject || isAborted;
    const showSkeleton = isLoadingState && !project;
    const error = (!isAborted && projectError) ? projectErrorMessage : null;

    const handleActivityPageChange = (page: number) => {
        setActivityPage(page);
    };

    const handleActivityLimitChange = (newLimit: number) => {
        setActivityLimit(newLimit);
        setActivityPage(1);
    };

    if (!isLoadingState && (error || !project)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 max-w-md w-full">
                    <AlertCircle className="size-12 mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">Error Loading Project</h2>
                    <p className="text-sm opacity-80 mb-6">{error || 'Project not found'}</p>
                    <Button variant="outline" onClick={() => router.push('/projects')} className="w-full">
                        <ArrowLeft className="mr-2 size-4" /> Back to Projects
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen pb-12">
            {/* Header / Breadcrumb */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.push('/projects')}
                    className="flex items-center justify-center size-10 rounded-full hover:bg-slate-800 transition-colors text-slate-400 group"
                >
                    <ArrowLeft className="size-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Workspace / Projects</span>
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight">
                        {showSkeleton ? <Skeleton className="h-8 w-40" /> : project?.name}
                    </h1>
                </div>
            </div>

            {/* Hero Section */}
            <section className="lg:flex lg:items-center lg:justify-between lg:gap-8 mb-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6 lg:flex-1">
                    <div className="flex items-start gap-4">
                        <div className="relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#161d27] group">
                            {showSkeleton ? (
                                <Skeleton className="absolute inset-0" />
                            ) : (
                                <>
                                    <Image
                                        src={`https://picsum.photos/seed/${project?.id}/200/200`}
                                        alt="Service logo"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </>
                            )}
                        </div>
                        <div className="flex flex-col pt-1">
                            <div className="flex items-center gap-3 mb-1.5">
                                {showSkeleton ? (
                                    <Skeleton className="h-8 w-48" />
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-black text-white leading-tight tracking-tight uppercase">{project?.name}</h2>
                                        <span className="px-2.5 py-0.5 rounded-full bg-success/10 border border-success/20 text-success text-[10px] font-black uppercase tracking-widest">Active</span>
                                    </>
                                )}
                            </div>
                            <div className="mt-1">
                                {loadingProject ? (
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-96" />
                                        <Skeleton className="h-4 w-64" />
                                    </div>
                                ) : (
                                    <p className="text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
                                        {project?.description || "No description provided for this project. Manage your debugging sessions and real-time event streams for this service."}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 lg:mt-0 lg:ml-auto flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800 h-12 px-6 rounded-xl font-bold"
                    >
                        <Settings className="size-4 mr-2" />
                        Settings
                    </Button>
                    <Button
                        className="bg-primary hover:bg-primary/90 text-white font-black h-12 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2 uppercase tracking-wider"
                    >
                        <Play className="size-4 fill-current" />
                        Start Debugging
                    </Button>
                </div>
            </section>

            {/* API Key Section */}
            {!showSkeleton && project && (
                <ApiKeySection
                    apiKey={project.apiKey}
                    projectId={project.id}
                    onKeyRegenerated={() => mutateProject()}
                />
            )}

            <section className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loadingStats && projectStats === undefined ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="bg-card-dark rounded-xl p-4 border border-slate-800 shadow-sm h-[110px]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Skeleton className="size-8 rounded-md" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <Skeleton className="h-8 w-24 mb-2" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        ))
                    ) : (
                        <>
                            <StatCard
                                label="Total Events"
                                value={projectStats?.totalEvents.toLocaleString() || "0"}
                                change={`${projectStats?.totalEventsChange > 0 ? '+' : ''}${projectStats?.totalEventsChange || 0}%`}
                                trend={(projectStats?.totalEventsChange || 0) >= 0 ? "up" : "down"}
                                sentiment={(projectStats?.totalEventsChange || 0) >= 0 ? "positive" : "negative"}
                                icon="dataset"
                                color="text-blue-500"
                            />
                            <StatCard
                                label="Error Rate"
                                value={`${projectStats?.errorRate || 0}%`}
                                change={`${projectStats?.errorRateChange > 0 ? '+' : ''}${projectStats?.errorRateChange || 0}%`}
                                trend={(projectStats?.errorRateChange || 0) > 0 ? "up" : "down"}
                                sentiment={(projectStats?.errorRateChange || 0) <= 0 ? "positive" : "negative"}
                                icon="bug_report"
                                color="text-red-500"
                            />
                            <StatCard
                                label="Avg Latency"
                                value={projectStats?.avgLatency || "0ms"}
                                change={`${projectStats?.avgLatencyChange > 0 ? '+' : ''}${projectStats?.avgLatencyChange || 0}ms`}
                                trend={(projectStats?.avgLatencyChange || 0) > 0 ? "up" : "down"}
                                sentiment={(projectStats?.avgLatencyChange || 0) <= 0 ? "positive" : "negative"}
                                icon="timer"
                                color="text-purple-500"
                            />
                        </>
                    )}
                </div>
            </section>

            <section className="py-2 md:py-4">
                {loadingStats && projectStats === undefined ? (
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                ) : (
                    <TrendChart
                        data={projectStats?.trend || []}
                        title="Activity Trend"
                        subtitle={trendRange === '24h' ? "Requests per hour" : "Requests per day"}
                        range={trendRange}
                        onRangeChange={setTrendRange}
                    />
                )}
            </section>

            {/* Recent Activity */}
            <section className="py-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-white uppercase tracking-tight">Recent Activity</h3>
                        <LiveIndicator isConnected={isConnected} isConnecting={isConnecting} />
                        {newEventsCount > 0 && (
                            <span className="px-2 py-0.5 text-[10px] font-black bg-primary/20 text-primary rounded-full animate-pulse">
                                +{newEventsCount} new
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="text-xs font-black text-primary hover:text-primary/80 uppercase tracking-widest transition-colors"
                    >
                        Refresh
                    </button>
                </div>

                {loadingSessions && activities.length === 0 ? (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <ActivityItemSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        <ActivityLog activities={activities} />
                        {activities.length > 0 && (
                            <div className="mt-4 flex justify-center">
                                <Pagination
                                    currentPage={activityPage}
                                    totalPages={activityTotalPages}
                                    onPageChange={handleActivityPageChange}
                                    limit={activityLimit}
                                    onLimitChange={handleActivityLimitChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
