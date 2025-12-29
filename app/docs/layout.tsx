'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    ChevronDown,
    ChevronRight,
    Book,
    Package,
    Puzzle,
    Layers,
    Settings,
    Home,
    Menu,
    X
} from 'lucide-react';

interface NavItem {
    title: string;
    href?: string;
    icon?: React.ReactNode;
    children?: NavItem[];
}

const navigation: NavItem[] = [
    {
        title: 'Getting Started',
        icon: <Book className="size-4" />,
        children: [
            { title: 'Introduction', href: '/docs' },
            { title: 'Installation', href: '/docs/installation' },
            { title: 'Quick Start', href: '/docs/quick-start' },
        ]
    },
    {
        title: 'Hooks',
        icon: <Puzzle className="size-4" />,
        children: [
            { title: 'useProjects', href: '/docs/hooks/use-projects' },
            { title: 'useProject', href: '/docs/hooks/use-project' },
            { title: 'useDashboardStats', href: '/docs/hooks/use-dashboard-stats' },
            { title: 'useSession', href: '/docs/hooks/use-session' },
        ]
    },
    {
        title: 'Services',
        icon: <Settings className="size-4" />,
        children: [
            { title: 'API Client', href: '/docs/services/api-client' },
            { title: 'Auth Service', href: '/docs/services/auth' },
            { title: 'Projects Service', href: '/docs/services/projects' },
        ]
    },
    {
        title: 'Components',
        icon: <Layers className="size-4" />,
        children: [
            { title: 'Button', href: '/docs/components/button' },
            { title: 'Card', href: '/docs/components/card' },
            { title: 'Dialog', href: '/docs/components/dialog' },
        ]
    },
];

function NavSection({ item, level = 0 }: { item: NavItem; level?: number }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.href === pathname;

    if (hasChildren) {
        return (
            <div className="mb-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
                >
                    <span className="flex items-center gap-2">
                        {item.icon}
                        {item.title}
                    </span>
                    {isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                </button>
                {isOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-slate-800 pl-3">
                        {item.children?.map((child) => (
                            <NavSection key={child.href || child.title} item={child} level={level + 1} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href={item.href || '#'}
            className={cn(
                'block px-3 py-1.5 text-sm rounded-md transition-colors',
                isActive
                    ? 'text-primary bg-primary/10 font-medium'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            )}
        >
            {item.title}
        </Link>
    );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0f14] text-slate-200">
            {/* Mobile Header */}
            <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-slate-800">
                <Link href="/" className="flex items-center gap-2 font-bold text-white">
                    <Package className="size-5 text-primary" />
                    VisualDebugger
                </Link>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 text-slate-400 hover:text-white"
                >
                    {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={cn(
                    'fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-[#0d1117] border-r border-slate-800 overflow-y-auto transition-transform lg:translate-x-0',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}>
                    {/* Logo */}
                    <div className="hidden lg:flex items-center gap-2 px-6 py-5 border-b border-slate-800">
                        <Package className="size-6 text-primary" />
                        <span className="font-bold text-lg text-white">VisualDebugger</span>
                        <span className="ml-auto text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-mono">
                            v1.0.0
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-2">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors mb-4"
                        >
                            <Home className="size-4" />
                            Back to Home
                        </Link>

                        {navigation.map((item) => (
                            <NavSection key={item.title} item={item} />
                        ))}
                    </nav>
                </aside>

                {/* Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="max-w-4xl mx-auto px-6 py-10 lg:py-16">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
