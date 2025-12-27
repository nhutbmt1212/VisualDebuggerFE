'use client';

import React from "react";
import { AuthHeader } from "@/components/features/auth/AuthHeader";
import { AuthHero } from "@/components/features/auth/AuthHero";
import { BackgroundPattern } from "@/components/features/shared/BackgroundPattern";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="dark">
            <div className="min-h-screen flex flex-col relative bg-[#101922] text-white selection:bg-purple-500/30 font-sans">
                <BackgroundPattern />

                {/* Mobile Header */}
                <div className="w-full flex items-center justify-between p-4 bg-[#101922] sticky top-0 z-30 md:hidden border-b border-white/10">
                    <Link
                        href="/"
                        className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-white"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <span className="font-bold text-lg tracking-tight dark:text-white">
                        Visual Debugger
                    </span>
                    <div className="w-8"></div>
                </div>

                <AuthHeader />

                <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-12 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 z-10">
                    <AuthHero />

                    <div className="w-full md:max-w-[480px] flex-shrink-0 z-10">
                        <div className="relative bg-white dark:bg-[#131d27] rounded-2xl shadow-2xl dark:shadow-[0_0_20px_rgba(168,85,247,0.15)] border border-slate-200 dark:border-slate-800/50 p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-300">
                            {/* Top Gradient Bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"></div>

                            {children}
                        </div>

                        <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-6 px-6 leading-relaxed">
                            By logging in, you agree to our <Link className="underline hover:text-slate-400" href="/terms">Terms of Service</Link> and <Link className="underline hover:text-slate-400" href="/privacy">Privacy Policy</Link>.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
