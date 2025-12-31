'use client';

import React from 'react';

export function DashboardFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto py-6 px-4 border-t border-slate-800/50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-500">VisualDebugger</span>
                    <span>•</span>
                    <span>© {currentYear} All rights reserved</span>
                </div>
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-slate-400 transition-colors">Documentation</a>
                    <a href="#" className="hover:text-slate-400 transition-colors">Support</a>
                    <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
                </div>
            </div>
        </footer>
    );
}
