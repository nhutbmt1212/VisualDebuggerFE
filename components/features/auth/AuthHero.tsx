'use client';

import React from 'react';
import { Zap, Clock } from 'lucide-react';

export const AuthHero: React.FC = () => {
    return (
        <div className="hidden md:flex flex-col flex-1 max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4 text-left">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                    Catch bugs <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">before they ship.</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                    Visual Debugger gives you x-ray vision into your application&apos;s state. Join thousands of developers streamlining their workflow today.
                </p>
            </div>

            <div className="space-y-4 pt-4">
                <FeatureItem
                    icon={<Zap size={20} />}
                    title="Real-time Inspection"
                    description="Visualize state changes as they happen."
                />
                <FeatureItem
                    icon={<Clock size={20} />}
                    title="Time Travel Debugging"
                    description="Step back in time to reproduce errors instantly."
                />
            </div>
        </div>
    );
};

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-[#1a2634]/50 border border-slate-200 dark:border-[#324d67] backdrop-blur-sm transition-all text-left">
        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
            {icon}
        </div>
        <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
    </div>
);
