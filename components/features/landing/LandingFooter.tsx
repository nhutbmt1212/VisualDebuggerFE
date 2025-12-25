'use client';

import React from 'react';
import { Terminal, Twitter, Github, Linkedin } from 'lucide-react';

export function LandingFooter() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 bg-purple-600 rounded-lg">
                                <Terminal className="text-white" size={16} />
                            </div>
                            <span className="text-white font-bold text-lg tracking-tight">VisualDebugger</span>
                        </div>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                            Empowering developers with real-time visibility into their backend services. Open-source, high-performance, and developer-first.
                        </p>
                        <div className="flex gap-4">
                            <Twitter className="text-zinc-500 hover:text-white transition-colors cursor-pointer" size={20} />
                            <Github className="text-zinc-500 hover:text-white transition-colors cursor-pointer" size={20} />
                            <Linkedin className="text-zinc-500 hover:text-white transition-colors cursor-pointer" size={20} />
                        </div>
                    </div>

                    <div>
                        <h6 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Product</h6>
                        <ul className="space-y-4 text-sm text-zinc-500">
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">SDKs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Release Notes</a></li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Company</h6>
                        <ul className="space-y-4 text-sm text-zinc-500">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Newsletter</h6>
                        <p className="text-sm text-zinc-500 mb-4">Stay updated with the latest observability trends.</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="you@email.com"
                                className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-sm flex-1 outline-none focus:border-purple-500 transition-colors"
                            />
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold">Join</button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-xs font-medium uppercase tracking-[0.2em]">
                    &copy; 2024 VisualDebugger Inc. Built with passion for the developer community.
                </div>
            </div>
        </footer>
    );
}
