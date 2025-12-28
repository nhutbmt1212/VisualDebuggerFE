
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BottomNav: React.FC = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-20 bg-background-dark/95 backdrop-blur-md border-t border-slate-800 md:hidden">
            <div className="flex items-center justify-around h-20 px-2 pb-2">
                <Link href="/dashboard" className={`flex flex-col items-center justify-center gap-1 w-16 ${pathname === '/dashboard' ? 'text-primary' : 'text-slate-400'}`}>
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-[10px] font-medium">Overview</span>
                </Link>
                <Link href="/projects" className={`flex flex-col items-center justify-center gap-1 w-16 ${pathname === '/projects' ? 'text-primary' : 'text-slate-400'}`}>
                    <span className="material-symbols-outlined fill-1">folder</span>
                    <span className="text-[10px] font-medium">Projects</span>
                </Link>
                <div className="w-16"></div> {/* Spacer for FAB */}
                <Link href="/issues" className={`flex flex-col items-center justify-center gap-1 w-16 ${pathname === '/issues' ? 'text-primary' : 'text-slate-400'}`}>
                    <span className="material-symbols-outlined">bug_report</span>
                    <span className="text-[10px] font-medium">Issues</span>
                </Link>
                <Link href="/settings" className={`flex flex-col items-center justify-center gap-1 w-16 ${pathname === '/settings' ? 'text-primary' : 'text-slate-400'}`}>
                    <span className="material-symbols-outlined">settings</span>
                    <span className="text-[10px] font-medium">Settings</span>
                </Link>
            </div>
        </nav>
    );
};
