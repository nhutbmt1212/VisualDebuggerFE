'use client';

import React, { useState } from 'react';
import { Terminal, Menu, X, Github } from 'lucide-react';
import Link from 'next/link';

export function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="p-2 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                        <Terminal className="text-white" size={20} />
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">
                        Visual<span className="text-purple-500">Debugger</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</a>
                    <a href="#preview" className="text-zinc-400 hover:text-white transition-colors">Dashboard</a>
                    <a href="#docs" className="text-zinc-400 hover:text-white transition-colors">Docs</a>
                    <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button className="px-4 py-2 text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                        <Github size={18} />
                    </button>
                    <Link href="/login">
                        <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
                            Login
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-zinc-400" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-6 flex flex-col gap-4">
                    <a href="#features" className="text-lg text-zinc-300">Features</a>
                    <a href="#preview" className="text-lg text-zinc-300">Dashboard</a>
                    <a href="#docs" className="text-lg text-zinc-300">Docs</a>
                    <Link href="/pricing" className="text-lg text-zinc-300">Pricing</Link>
                    <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold">Sign Up Free</button>
                </div>
            )}
        </nav>
    );
}
