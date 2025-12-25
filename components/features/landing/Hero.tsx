'use client';

import React from 'react';
import { ChevronRight, PlayCircle } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-40 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-xs font-medium text-purple-400 mb-8 animate-bounce">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    New: NestJS 10 support & WebSocket streaming
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                    Visualize your code <br />
                    <span className="gradient-text">in real-time.</span>
                </h1>

                <p className="max-w-2xl mx-auto text-xl text-zinc-400 mb-10 leading-relaxed">
                    The open-source observability platform for modern Node.js backends.
                    Track every function call, database query, and HTTP request with zero configuration.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group">
                        Start Debugging Free <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                        <PlayCircle size={20} className="text-zinc-500" /> Watch Demo
                    </button>
                </div>

                <div className="mt-16 flex items-center justify-center gap-8 grayscale opacity-50 overflow-hidden whitespace-nowrap">
                    <span className="text-xl font-bold tracking-tighter">DATADOG</span>
                    <span className="text-xl font-bold tracking-tighter italic">Sentry</span>
                    <span className="text-xl font-bold tracking-tighter">NEW RELIC</span>
                    <span className="text-xl font-bold tracking-tighter opacity-30 hidden md:inline">LOGROCKET</span>
                </div>
            </div>
        </section>
    );
}
