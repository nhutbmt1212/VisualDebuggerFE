import Link from 'next/link';
import { ArrowRight, Book, Puzzle, Settings, Layers } from 'lucide-react';

export default function DocsPage() {
    return (
        <div className="space-y-12">
            {/* Hero */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white tracking-tight">
                    VisualDebugger Documentation
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                    Tài liệu hướng dẫn sử dụng VisualDebugger Frontend từ A-Z.
                    Bao gồm cách cài đặt, sử dụng hooks, services, và components.
                </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    href="/docs/installation"
                    className="group p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl hover:border-primary/40 transition-all"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Book className="size-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-white">Installation</h3>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">
                        Hướng dẫn cài đặt và cấu hình dự án từ đầu.
                    </p>
                    <span className="inline-flex items-center text-sm text-primary font-medium">
                        Get started <ArrowRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                </Link>

                <Link
                    href="/docs/quick-start"
                    className="group p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <ArrowRight className="size-5 text-emerald-400" />
                        </div>
                        <h3 className="font-bold text-white">Quick Start</h3>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">
                        Bắt đầu nhanh với ứng dụng trong 5 phút.
                    </p>
                    <span className="inline-flex items-center text-sm text-emerald-400 font-medium">
                        Start building <ArrowRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                </Link>
            </div>

            {/* Categories */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Explore by Category</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                        href="/docs/hooks/use-projects"
                        className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all group"
                    >
                        <Puzzle className="size-8 text-blue-400 mb-3" />
                        <h3 className="font-bold text-white mb-1">Hooks</h3>
                        <p className="text-sm text-slate-400">Custom hooks để fetch và manage data</p>
                    </Link>

                    <Link
                        href="/docs/services/auth"
                        className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all group"
                    >
                        <Settings className="size-8 text-amber-400 mb-3" />
                        <h3 className="font-bold text-white mb-1">Services</h3>
                        <p className="text-sm text-slate-400">API services để gọi backend</p>
                    </Link>

                    <Link
                        href="/docs/components/button"
                        className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all group"
                    >
                        <Layers className="size-8 text-purple-400 mb-3" />
                        <h3 className="font-bold text-white mb-1">Components</h3>
                        <p className="text-sm text-slate-400">Reusable UI components</p>
                    </Link>
                </div>
            </div>

            {/* API Overview */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">API Overview</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Module</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Import</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="py-3 px-4">
                                    <code className="text-primary">useProjects</code>
                                </td>
                                <td className="py-3 px-4 text-slate-400">Fetch paginated projects</td>
                                <td className="py-3 px-4">
                                    <code className="text-xs bg-slate-800 px-2 py-1 rounded">@/hooks/useProjects</code>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4">
                                    <code className="text-primary">authService</code>
                                </td>
                                <td className="py-3 px-4 text-slate-400">Authentication (login, register)</td>
                                <td className="py-3 px-4">
                                    <code className="text-xs bg-slate-800 px-2 py-1 rounded">@/services/auth.service</code>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4">
                                    <code className="text-primary">Button</code>
                                </td>
                                <td className="py-3 px-4 text-slate-400">Button component với variants</td>
                                <td className="py-3 px-4">
                                    <code className="text-xs bg-slate-800 px-2 py-1 rounded">@/components/ui/button</code>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
