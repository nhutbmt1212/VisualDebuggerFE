'use client';

import { useEffect, useState } from 'react';
import { projectsService } from '@/services/projects.service';
import { Project } from '@/graphql/generated/graphql';
import { Plus, RefreshCcw, Terminal, ExternalLink, Key } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProjects = async () => {
        try {
            setLoading(true);
            const data = await projectsService.fetchAll();
            setProjects(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <RefreshCcw className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 lg:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                        <div className="p-2 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                            <Terminal className="text-white" size={20} />
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight">
                            Visual<span className="text-purple-500">Debugger</span>
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Projects Workspace
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                        Manage your debugging environments, monitor real-time event streams, and distribute API keys securely.
                    </p>
                </div>
                <Link href="/projects/new">
                    <Button className="bg-purple-600 hover:bg-purple-500 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2">
                        <Plus size={20} />
                        New Project
                    </Button>
                </Link>
            </div>

            {error && (
                <div className="bg-destructive/15 text-destructive px-6 py-4 rounded-2xl border border-destructive/20 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    {error}
                </div>
            )}

            {projects.length === 0 ? (
                <div className="bg-[#111113] border border-white/5 rounded-[2.5rem] p-12 md:p-20 text-center backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                    <div className="w-20 h-20 bg-purple-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-purple-600/20 group-hover:scale-110 transition-transform duration-500">
                        <Terminal className="text-purple-500" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">No Projects Found</h2>
                    <p className="text-zinc-500 text-lg mb-10 max-w-md mx-auto">
                        Your workspace is empty. Create your first project to start streaming events and debugging in real-time.
                    </p>
                    <Link href="/projects/new">
                        <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 h-14 px-10 rounded-2xl transition-all">
                            Create First Project
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Link key={project.id} href={`/projects/${project.id}`} className="group">
                            <div className="bg-[#111113] border border-white/5 p-8 rounded-[2.5rem] h-full relative overflow-hidden flex flex-col transition-all duration-500 hover:border-purple-500/50 hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-purple-500/5">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center border border-purple-600/20">
                                        <Terminal className="text-purple-500" size={24} />
                                    </div>
                                    <ExternalLink className="text-zinc-700 group-hover:text-purple-500 transition-colors" size={20} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                    {project.name}
                                </h3>

                                <p className="text-zinc-500 text-base mb-8 line-clamp-2 leading-relaxed flex-grow">
                                    {project.description || 'No description provided. Click to add details and configure settings.'}
                                </p>

                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 uppercase tracking-widest px-1">
                                        <Key size={12} className="text-purple-500" />
                                        API Key
                                    </div>
                                    <div className="bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono text-xs p-4 rounded-2xl relative group/key transition-colors hover:border-zinc-700">
                                        <span className="truncate block pr-8">
                                            {project.apiKey}
                                        </span>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/key:opacity-100 transition-opacity">
                                            <div className="bg-zinc-800 p-1.5 rounded-lg">
                                                <RefreshCcw size={12} className="text-zinc-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Quick Create Card */}
                    <Link href="/projects/new" className="group">
                        <div className="bg-transparent border border-dashed border-zinc-800 p-8 rounded-[2.5rem] h-full flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-purple-500/50 hover:bg-purple-500/5">
                            <div className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Plus className="text-zinc-500 group-hover:text-purple-500 transition-colors" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-400 group-hover:text-white transition-colors">
                                Create Project
                            </h3>
                            <p className="text-zinc-600 mt-2 text-sm px-4">
                                Add a new environment to your workspace
                            </p>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}
