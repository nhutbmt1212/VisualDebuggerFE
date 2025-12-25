'use client';

import React from 'react';

export function Statistics() {
    return (
        <section className="py-20 border-y border-zinc-800/50 bg-zinc-900/20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div className="text-4xl font-bold text-white mb-2 font-mono">
                        <span className="text-purple-500">&lt;</span> 1ms
                    </div>
                    <div className="text-sm text-zinc-500 uppercase tracking-widest">Latency</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-white mb-2 font-mono">99.9%</div>
                    <div className="text-sm text-zinc-500 uppercase tracking-widest">Uptime</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-white mb-2 font-mono">10M+</div>
                    <div className="text-sm text-zinc-500 uppercase tracking-widest">Events/Day</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-white mb-2 font-mono">SDKs</div>
                    <div className="text-sm text-zinc-500 uppercase tracking-widest">Multiple Languages</div>
                </div>
            </div>
        </section>
    );
}
