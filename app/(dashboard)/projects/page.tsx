
'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { projectsService } from '@/services/projects.service';
import { Project } from '@/graphql/generated/graphql';
import { RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/features/projects/ProjectCard';
import { CreateProjectDialog } from '@/components/features/projects/CreateProjectDialog';
import { Pagination } from '@/components/ui/pagination';
import { ActivityLog } from '@/components/features/projects/ActivityLog';
import { StatItem, ActivityItem } from '@/components/features/projects/types';
import { formatDistanceToNow } from 'date-fns';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiInsight, setAiInsight] = useState<string | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [stats, setStats] = useState<StatItem[]>([]);
    const [activities, setActivities] = useState<ActivityItem[]>([]);

    const loadProjects = useCallback(async (page = 1, currentLimit = limit) => {
        try {
            setLoading(true);
            const data = await projectsService.fetchAll(page, currentLimit);
            setProjects(data.items || []);
            setTotalPages(data.totalPages || 1);
            setCurrentPage(data.page || 1);
            setError(null);
        } catch (err) {
            const error = err as Error;
            setError(error.message || 'Failed to load projects');
        } finally {
            setLoading(false);
        }
    }, [limit]);

    const loadData = useCallback(async () => {
        try {
            const statsData = await projectsService.fetchStats();
            const sessionsData = await projectsService.fetchRecentSessions(4);

            setStats([
                { label: 'Total Events', value: statsData.totalEvents.toLocaleString(), change: '+5.2%', changeType: 'positive' },
                { label: 'Error Rate', value: `${statsData.errorRate}%`, change: '-0.5%', changeType: 'positive' },
                { label: 'Avg Latency', value: statsData.avgLatency, change: '+2ms', changeType: 'negative' },
                { label: 'Active Sessions', value: statsData.activeSessions.toString(), change: '+1', changeType: 'positive' },
            ]);

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
            console.error('Failed to load dashboard data', err);
        }
    }, []);

    useEffect(() => {
        loadProjects(currentPage, limit);
        loadData();
    }, [currentPage, limit, loadProjects, loadData]);

    const filteredProjects = useMemo(() => {
        return projects.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, projects]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setCurrentPage(1); // Reset to first page when limit changes
    };

    const generateProjectInsight = async () => {
        if (isGenerating) return;
        setIsGenerating(true);
        // Simulate AI Insight since we don't want to expose keys on FE
        setTimeout(() => {
            setAiInsight("Backend API stability is trending positively. User Analytics service is seeing an increase in throughput. No projects require immediate attention.");
            setIsGenerating(false);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <RefreshCcw className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white tracking-tight mb-2 font-display">
                            Projects Workspace
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                            Manage your debugging environments and real-time event streams.
                        </p>
                    </div>
                    <CreateProjectDialog onProjectCreated={loadProjects} />
                </div>

                {/* Top Search & Filter */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6">
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-2.5 text-slate-400 material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-card-dark border border-slate-800 text-sm rounded-md py-2.5 pl-10 pr-3 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-500 text-white transition-all shadow-sm"
                            placeholder="Search projects..."
                        />
                    </div>
                    <button className="px-3 py-2.5 rounded-md bg-card-dark border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>filter_list</span>
                    </button>
                </div>

                {/* AI Insight Box */}
                <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-primary text-4xl">auto_awesome</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">psychology</span>
                                AI Project Insights
                            </h4>
                            <button
                                onClick={generateProjectInsight}
                                disabled={isGenerating}
                                className="text-[10px] font-bold text-primary hover:underline disabled:opacity-50"
                            >
                                {isGenerating ? 'ANALYZING...' : 'REFRESH'}
                            </button>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed italic">
                            {aiInsight || 'Generate a real-time health summary for your workspace using Gemini AI.'}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col gap-1 p-3 rounded-md border border-slate-800 bg-card-dark">
                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wide">{stat.label}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-white">{stat.value}</span>
                                {stat.change && (
                                    <span className={`text-[10px] px-1 rounded ${stat.changeType === 'positive' ? 'text-success bg-green-500/10' : 'text-error bg-red-500/10'}`}>
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Global Stream Activity</h3>
                        <Link href="/activity" className="text-[10px] font-bold text-primary hover:underline">VIEW ALL</Link>
                    </div>
                    <ActivityLog activities={activities} />
                </div>

                {error && (
                    <div className="bg-error/10 text-error px-6 py-4 rounded-xl border border-error/20 mb-8">
                        {error}
                    </div>
                )}

                {/* Section Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Your Projects</h3>
                    <div className="flex items-center gap-3">
                        <Link href="/projects/new" className="flex items-center gap-1.5 px-3 py-2 text-primary bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-semibold transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                            Add Project
                        </Link>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                    {filteredProjects.length === 0 && !loading && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-lg bg-card-dark/50">
                            <span className="material-symbols-outlined text-slate-600 text-4xl mb-4">search_off</span>
                            <p className="text-slate-500 text-lg">No projects found matching your search.</p>
                            <Link href="/projects/new" className="text-primary hover:underline mt-4 inline-block font-bold">
                                Create your first project
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="pb-12 text-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        limit={limit}
                        onLimitChange={handleLimitChange}
                    />
                </div>
            </div>
        </div>
    );
}
