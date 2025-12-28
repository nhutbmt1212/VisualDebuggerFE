"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { projectsService } from '@/services/projects.service';
import { Project } from '@/graphql/generated/graphql';
import { StatCard } from '@/components/features/projects/StatCard';
import { TrendChart } from '@/components/features/projects/TrendChart';
import { ActivityLog } from '@/components/features/projects/ActivityLog';
import { ApiKeySection } from '@/components/features/projects/ApiKeySection';
import { ActivityItem } from '@/components/features/projects/types';
import { formatDistanceToNow } from 'date-fns';
import { RefreshCcw, ArrowLeft, Play, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params.id) {
            loadProject(params.id as string);
        }
    }, [params.id]);

    const loadProject = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await projectsService.fetchById(id);
            setProject(data);

            const sessionsData = await projectsService.fetchProjectSessions(id);
            const formattedActivities: ActivityItem[] = sessionsData.map((session: any) => {
                const latestEvent = session.events?.[0];
                let method: any = 'GET';
                let type: 'success' | 'error' | 'warning' = 'success';

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
                    session: `SESS-${session.id.substring(0, 4).toUpperCase()}`,
                    method,
                    path: latestEvent?.httpUrl || latestEvent?.filePath || session.environment,
                    time: formatDistanceToNow(new Date(session.startedAt), { addSuffix: true }),
                    duration: latestEvent?.duration ? `${latestEvent.duration}ms` : undefined,
                    status: latestEvent?.httpStatus ? `${latestEvent.httpStatus}` : (latestEvent?.type === 'ERROR' ? 'ERROR' : 'OK'),
                    type
                };
            });
            setActivities(formattedActivities);
        } catch (err) {
            const error = err as Error;
            setError(error.message || 'Failed to load project details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <RefreshCcw className="animate-spin text-primary size-8" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] space-y-4 text-center">
                <div className="p-4 bg-error/10 border border-error/20 rounded-2xl text-error max-w-md">
                    <p className="font-bold">Error Loading Project</p>
                    <p className="text-sm opacity-80">{error || 'Project not found'}</p>
                </div>
                <Button variant="outline" onClick={() => router.push('/projects')}>
                    <ArrowLeft className="mr-2 size-4" /> Go Back to Projects
                </Button>
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
                    <h1 className="text-2xl font-black text-white tracking-tight">{project.name}</h1>
                </div>
            </div>

            {/* Hero Section */}
            <section className="lg:flex lg:items-center lg:justify-between lg:gap-8 mb-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6 lg:flex-1">
                    <div className="flex items-start gap-4">
                        <div className="relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#161d27] group">
                            <Image
                                src={`https://picsum.photos/seed/${project.id}/200/200`}
                                alt="Service logo"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="flex flex-col pt-1">
                            <div className="flex items-center gap-3 mb-1.5">
                                <h2 className="text-2xl font-black text-white leading-tight tracking-tight uppercase">{project.name}</h2>
                                <span className="px-2.5 py-0.5 rounded-full bg-success/10 border border-success/20 text-success text-[10px] font-black uppercase tracking-widest">Active</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
                                {project.description || "No description provided for this project. Manage your debugging sessions and real-time event streams for this service."}
                            </p>
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
            <ApiKeySection apiKey={project.apiKey} />

            {/* Stats Grid */}
            <section className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard
                        label="Total Events"
                        value="1,240"
                        change="+12% this week"
                        trend="up"
                        icon="dataset"
                        color="text-blue-500"
                    />
                    <StatCard
                        label="Error Rate"
                        value="0.14%"
                        subtext="Last 24 hours"
                        icon="bug_report"
                        color="text-red-500"
                    />
                    <StatCard
                        label="Avg Latency"
                        value="120ms"
                        subtext="System Healthy"
                        icon="timer"
                        color="text-purple-500"
                    />
                </div>
            </section>

            {/* Chart Section */}
            <section className="py-2 md:py-4">
                <TrendChart />
            </section>

            {/* Recent Activity */}
            <section className="py-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Recent Activity</h3>
                    <button className="text-xs font-black text-primary hover:text-primary/80 uppercase tracking-widest transition-colors">View All Stream</button>
                </div>
                <ActivityLog activities={activities} />
            </section>
        </div>
    );
}
