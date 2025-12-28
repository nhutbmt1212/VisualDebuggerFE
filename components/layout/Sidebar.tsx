
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';

const NavItem: React.FC<{ icon: string, label: string, href: string, active?: boolean, fill?: boolean }> = ({ icon, label, href, active, fill }) => (
    <Link className={`flex items-center gap-3 p-2 rounded-md transition-colors ${active ? 'bg-surface-dark text-primary' : 'text-slate-400 hover:bg-surface-dark/50 hover:text-slate-200'}`} href={href}>
        <span className={`material-symbols-outlined ${fill ? 'fill-1' : ''}`} style={{ fontSize: '24px' }}>{icon}</span>
        <span className="font-medium">{label}</span>
    </Link>
);

export const Sidebar: React.FC = () => {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex flex-col w-64 bg-card-dark border-r border-slate-800 p-4 sticky top-0 h-screen overflow-y-auto">
            <div className="flex items-center gap-3 mb-8 px-2">
                <div className="flex items-center justify-center size-9 rounded bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30">
                    V
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xs text-slate-500 font-medium uppercase tracking-wider">Debugger</h2>
                    <h1 className="text-base font-bold leading-tight text-white">Visual Workspace</h1>
                </div>
            </div>
            <ul className="flex-grow space-y-1">
                <li><NavItem icon="dashboard" label="Overview" href="/dashboard" active={pathname === '/dashboard'} /></li>
                <li><NavItem icon="folder" label="Projects" href="/projects" active={pathname === '/projects'} fill /></li>
                <li><NavItem icon="bug_report" label="Issues" href="/issues" active={pathname === '/issues'} /></li>
                <li><NavItem icon="settings" label="Settings" href="/settings" active={pathname === '/settings'} /></li>
            </ul>
            <div className="mt-auto pt-4 border-t border-slate-700">
                <div className="flex items-center gap-3 p-2">
                    <Image
                        src="https://picsum.photos/seed/user/32/32"
                        width={32}
                        height={32}
                        className="rounded-full border border-slate-600 cursor-pointer"
                        alt="Avatar"
                    />
                    <span className="text-sm font-medium text-white">Admin User</span>
                </div>
            </div>
        </nav>
    );
};
