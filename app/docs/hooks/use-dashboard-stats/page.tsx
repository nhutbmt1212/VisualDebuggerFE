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

export default function UseDashboardStatsPage() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Hooks</span>
                    <span>/</span>
                </div>
                <h1 className="text-3xl font-bold text-white">useDashboardStats</h1>
                <p className="text-slate-400 leading-relaxed">
                    Hook để lấy thống kê tổng quan dashboard. Auto-refresh mỗi 10 giây.
                </p>
            </div>

            {/* Import */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Import</h2>
                <CodeBlock code={`import { useDashboardStats } from '@/hooks/useProjects';`} />
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Usage</h2>
                <CodeBlock
                    code={`function StatsGrid() {
    const { stats, isLoading, isError } = useDashboardStats('24h');

    if (isLoading) return <StatsSkeleton />;

    return (
        <div className="grid grid-cols-4 gap-4">
            <StatCard 
                label="Total Events" 
                value={stats?.totalEvents.toLocaleString()} 
                change={\`\${stats?.totalEventsChange}%\`}
            />
            <StatCard 
                label="Error Rate" 
                value={\`\${stats?.errorRate}%\`} 
                change={\`\${stats?.errorRateChange}%\`}
            />
            <StatCard 
                label="Avg Latency" 
                value={stats?.avgLatency} 
                change={\`\${stats?.avgLatencyChange}ms\`}
            />
            <StatCard 
                label="Active Sessions" 
                value={stats?.activeSessions} 
                change={\`\${stats?.activeSessionsChange}\`}
            />
        </div>
    );
}`}
                />
            </section>

            {/* With Trend Chart */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">With Trend Chart</h2>
                <CodeBlock
                    code={`function Dashboard() {
    const [range, setRange] = useState('24h');
    const { stats, isLoading } = useDashboardStats(range);

    return (
        <div>
            {/* Range Selector */}
            <div className="flex gap-2 mb-4">
                {['24h', '7d', '30d'].map(r => (
                    <button 
                        key={r} 
                        onClick={() => setRange(r)}
                        className={range === r ? 'active' : ''}
                    >
                        {r}
                    </button>
                ))}
            </div>
            
            {/* Trend Chart */}
            <TrendChart 
                data={stats?.trend || []}
                title="Activity Trend"
                subtitle={range === '24h' ? 'Per hour' : 'Per day'}
            />
        </div>
    );
}`}
                />
            </section>

            {/* Parameters */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Parameters</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Default</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">range</code></td>
                                <td className="py-3 px-4 text-slate-400">string</td>
                                <td className="py-3 px-4 text-slate-400">&apos;24h&apos;</td>
                                <td className="py-3 px-4 text-slate-400">Khoảng thời gian: &apos;24h&apos;, &apos;7d&apos;, &apos;30d&apos;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Return */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Return Value (stats)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Property</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">totalEvents</code></td>
                                <td className="py-3 px-4 text-slate-400">number</td>
                                <td className="py-3 px-4 text-slate-400">Tổng số events trong khoảng thời gian</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">errorRate</code></td>
                                <td className="py-3 px-4 text-slate-400">number</td>
                                <td className="py-3 px-4 text-slate-400">Tỷ lệ lỗi (%)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">avgLatency</code></td>
                                <td className="py-3 px-4 text-slate-400">string</td>
                                <td className="py-3 px-4 text-slate-400">Latency trung bình (e.g., &quot;120ms&quot;)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">activeSessions</code></td>
                                <td className="py-3 px-4 text-slate-400">number</td>
                                <td className="py-3 px-4 text-slate-400">Số sessions đang active</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">trend</code></td>
                                <td className="py-3 px-4 text-slate-400">TrendPoint[]</td>
                                <td className="py-3 px-4 text-slate-400">Data cho biểu đồ {`{ hour, requests }`}</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">*Change</code></td>
                                <td className="py-3 px-4 text-slate-400">number</td>
                                <td className="py-3 px-4 text-slate-400">Thay đổi so với kỳ trước</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Auto Refresh */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Auto Refresh</h2>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                    <p className="text-sm text-slate-300">
                        Hook tự động refresh data mỗi <strong className="text-emerald-400">10 giây</strong> để
                        đảm bảo stats luôn cập nhật realtime trên dashboard.
                    </p>
                </div>
            </section>
        </div>
    );
}
