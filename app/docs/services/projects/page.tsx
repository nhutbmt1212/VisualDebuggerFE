'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <div className="absolute top-2 right-2 flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono">{language}</span>
                <button
                    onClick={handleCopy}
                    className="p-1.5 bg-slate-700/50 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                    {copied ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5" />}
                </button>
            </div>
            <pre className="bg-[#161b22] border border-slate-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-slate-300 font-mono whitespace-pre">{code}</code>
            </pre>
        </div>
    );
}

export default function ProjectsServicePage() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Services</span>
                    <span>/</span>
                </div>
                <h1 className="text-3xl font-bold text-white">projectsService</h1>
                <p className="text-slate-400 leading-relaxed">
                    Service để quản lý projects và sessions thông qua GraphQL API.
                </p>
            </div>

            {/* Import */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Import</h2>
                <CodeBlock code={`import { projectsService } from '@/services/projects.service';`} />
            </section>

            {/* Methods Table */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Methods Overview</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Method</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">fetchAll(page, limit)</code></td>
                                <td className="py-3 px-4 text-slate-400">Lấy danh sách projects có phân trang</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">create(input)</code></td>
                                <td className="py-3 px-4 text-slate-400">Tạo project mới</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">fetchById(id)</code></td>
                                <td className="py-3 px-4 text-slate-400">Lấy chi tiết project</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">fetchStats(range)</code></td>
                                <td className="py-3 px-4 text-slate-400">Lấy thống kê dashboard</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">fetchProjectStats(id, range)</code></td>
                                <td className="py-3 px-4 text-slate-400">Lấy thống kê 1 project</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">fetchRecentSessions(page, limit)</code></td>
                                <td className="py-3 px-4 text-slate-400">Lấy sessions gần đây</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">fetchProjectSessions(id, page, limit)</code></td>
                                <td className="py-3 px-4 text-slate-400">Lấy sessions của project</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">fetchSessionById(id)</code></td>
                                <td className="py-3 px-4 text-slate-400">Lấy chi tiết session</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Examples */}
            <section className="space-y-6">
                <h2 className="text-xl font-bold text-white">Usage Examples</h2>

                {/* fetchAll */}
                <div className="space-y-4 p-4 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white">Fetch All Projects</h3>
                    <CodeBlock
                        code={`const result = await projectsService.fetchAll(1, 10);

console.log(result.items);      // Project[]
console.log(result.totalCount); // number
console.log(result.totalPages); // number`}
                    />
                </div>

                {/* create */}
                <div className="space-y-4 p-4 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white">Create Project</h3>
                    <CodeBlock
                        code={`const project = await projectsService.create({
    name: 'My New Project',
    description: 'Debug authentication flow'
});

console.log(project.id);      // UUID
console.log(project.apiKey);  // API key for SDK`}
                    />
                </div>

                {/* fetchStats */}
                <div className="space-y-4 p-4 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white">Fetch Dashboard Stats</h3>
                    <CodeBlock
                        code={`// range: '24h' | '7d' | '30d'
const stats = await projectsService.fetchStats('24h');

console.log(stats.totalEvents);
console.log(stats.errorRate);
console.log(stats.avgLatency);
console.log(stats.trend); // Chart data`}
                    />
                </div>

                {/* fetchSessionById */}
                <div className="space-y-4 p-4 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white">Fetch Session with Events</h3>
                    <CodeBlock
                        code={`const session = await projectsService.fetchSessionById('session-uuid');

console.log(session.environment);
console.log(session.startedAt);
console.log(session.events); // All debug events`}
                    />
                </div>
            </section>

            {/* Note */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-sm text-slate-300">
                    <strong className="text-blue-400">💡 Tip:</strong> Nên sử dụng hooks (<code className="text-primary">useProjects</code>, etc.)
                    thay vì gọi trực tiếp service. Hooks cung cấp caching, revalidation và loading states.
                </p>
            </div>
        </div>
    );
}
