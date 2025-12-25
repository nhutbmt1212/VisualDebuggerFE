'use client';

import React from 'react';
import { Zap, Layers, Activity, Shield, Database, Cpu } from 'lucide-react';

const featureList = [
    {
        icon: Zap,
        color: 'text-yellow-400',
        title: 'Real-time Streaming',
        desc: 'Experience sub-millisecond event streaming from your backend to our dashboard via WebSockets.'
    },
    {
        icon: Layers,
        color: 'text-purple-400',
        title: 'Event Hierarchy',
        desc: 'Automatically map parent-child relationships between function calls and nested async operations.'
    },
    {
        icon: Activity,
        color: 'text-blue-400',
        title: 'Request Profiling',
        desc: 'In-depth HTTP profiling including body, headers, and full response payloads tracking.'
    },
    {
        icon: Shield,
        color: 'text-green-400',
        title: 'Secure by Design',
        desc: 'JWT-based authentication for dashboards and project-specific API keys for SDK integration.'
    },
    {
        icon: Database,
        color: 'text-orange-400',
        title: 'SQL Introspection',
        desc: 'Visualize Prisma and TypeORM queries as they happen, identifying N+1 problems instantly.'
    },
    {
        icon: Cpu,
        color: 'text-red-400',
        title: 'Resource Monitoring',
        desc: 'Keep an eye on memory usage and CPU spikes linked directly to specific debug events.'
    }
];

export function Features() {
    return (
        <section id="features" className="py-32 bg-zinc-950 relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-20 max-w-3xl">
                    <h2 className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-4">Core Capabilities</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Built for high-traffic NestJS microservices.</h3>
                    <p className="text-xl text-zinc-500">VisualDebugger provides a single pane of glass for your entire stack, from API gateways to worker nodes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureList.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-all hover:bg-zinc-900 group">
                                <div className="p-3 bg-zinc-950 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                                    <Icon className={feature.color} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
