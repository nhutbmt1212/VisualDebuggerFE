
import React from 'react';
import { ProjectStatus } from './types';
import { Sparkline } from './Sparkline';
import { Project } from '@/graphql/generated/graphql';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    // Mocking template fields for the WOW effect
    const status = ProjectStatus.ONLINE;
    const platform = 'Web';
    const shortName = project.name.substring(0, 3).toUpperCase();
    const subtitle = project.id.substring(0, 8);
    const volume = [20, 45, 30, 80, 50, 90, 60, 40, 70, 55, 85, 45];
    const volumeLabel = 'STABLE';

    const getIcon = () => {
        return <span className="text-xs font-bold text-primary">{shortName}</span>;
    };

    return (
        <Link href={`/projects/${project.id}`} className="group flex flex-col bg-card-dark border border-slate-800 rounded-lg shadow-sm transition-all cursor-pointer relative overflow-hidden hover:border-primary/50">
            <div className="p-4 pb-2 relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                        <div className="size-10 flex items-center justify-center rounded border border-slate-700 bg-surface-dark text-slate-300 font-bold">
                            {getIcon()}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{project.name}</h3>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-500 border border-slate-700 uppercase">
                                    {platform}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{subtitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="flex size-2 rounded-full bg-success shadow-[0_0_8px_rgba(70,195,123,0.5)]"></span>
                    </div>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                    <div className="flex justify-between text-[10px] text-slate-400 uppercase font-semibold">
                        <span>24h Activity</span>
                        <span className="text-success">
                            {volumeLabel}
                        </span>
                    </div>
                    <Sparkline data={volume} status={status} />
                </div>
            </div>

            <div className="mt-2 px-4 py-3 border-t border-slate-700/50 bg-surface-dark/50 rounded-b-lg flex items-center justify-between">
                <div className="flex gap-4 text-xs">
                    <div className="flex flex-col">
                        <span className="text-slate-500 font-semibold uppercase text-[9px]">Created</span>
                        <span className="font-mono text-slate-200">{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500 font-semibold uppercase text-[9px]">API Key</span>
                        <span className="font-mono text-slate-400">{project.apiKey.substring(0, 4)}...</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="p-1.5 text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>analytics</span>
                    </button>
                    <button className="p-1.5 text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
                    </button>
                </div>
            </div>
        </Link>
    );
};
