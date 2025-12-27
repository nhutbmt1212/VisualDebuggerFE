'use client';

import React from 'react';
import { Terminal } from 'lucide-react';
import Link from 'next/link';

export const AuthHeader: React.FC = () => {
    return (
        <header className="hidden md:flex w-full px-8 py-6 items-center justify-between max-w-7xl mx-auto z-20 relative">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-purple-600 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-purple-600/20">
                    <Terminal className="text-white" size={20} />
                </div>
                <span className="text-white font-bold text-xl tracking-tighter">
                    Visual<span className="text-purple-500">Debugger</span>
                </span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
                <Link className="text-zinc-500 hover:text-white transition-colors" href="/docs">Documentation</Link>
                <Link className="text-zinc-500 hover:text-white transition-colors" href="/pricing">Pricing</Link>
                <Link className="text-white hover:underline" href="/login">Log In</Link>
            </div>
        </header>
    );
};
