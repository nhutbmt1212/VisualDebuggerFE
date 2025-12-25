'use client';

import React from 'react';
import { ChevronRight, Github } from 'lucide-react';

export function CallToAction() {
    return (
        <section className="py-32 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Stop guessing. <br />
                    <span className="text-purple-500">Start seeing.</span>
                </h2>
                <p className="text-xl text-zinc-400 mb-10">
                    Deploy VisualDebugger in minutes and gain total visibility into your distributed systems.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2">
                        Get Started for Free <ChevronRight size={20} />
                    </button>
                    <button className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                        <Github size={20} /> View Documentation
                    </button>
                </div>
            </div>
        </section>
    );
}
