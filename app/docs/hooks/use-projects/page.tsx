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

export default function UseProjectsPage() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Hooks</span>
                    <span>/</span>
                </div>
                <h1 className="text-3xl font-bold text-white">useProjects</h1>
                <p className="text-slate-400 leading-relaxed">
                    Hook để lấy danh sách projects với phân trang. Sử dụng SWR cho caching và revalidation.
                </p>
            </div>

            {/* Import */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Import</h2>
                <CodeBlock code={`import { useProjects } from '@/hooks/useProjects';`} />
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Usage</h2>
                <CodeBlock
                    code={`function ProjectsPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    
    const { 
        projects, 
        totalCount, 
        totalPages, 
        isLoading, 
        isError, 
        mutate 
    } = useProjects(page, limit);

    if (isLoading) return <Loading />;
    if (isError) return <Error message={isError.message} />;

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            
            <Pagination 
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
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
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">page</code></td>
                                <td className="py-3 px-4 text-slate-400">number</td>
                                <td className="py-3 px-4 text-slate-400">1</td>
                                <td className="py-3 px-4 text-slate-400">Số trang hiện tại</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">limit</code></td>
                                <td className="py-3 px-4 text-slate-400">number</td>
                                <td className="py-3 px-4 text-slate-400">10</td>
                                <td className="py-3 px-4 text-slate-400">Số items mỗi trang</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Return */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Return Value</h2>
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
                                <td className="py-3 px-4"><code className="text-primary">projects</code></td>
                                <td className="py-3 px-4 text-slate-400">Project[]</td>
                                <td className="py-3 px-4 text-slate-400">Danh sách projects</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">totalCount</code></td>
                                <td className="py-3 px-4 text-slate-400">number</td>
                                <td className="py-3 px-4 text-slate-400">Tổng số projects</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">totalPages</code></td>
                                <td className="py-3 px-4 text-slate-400">number</td>
                                <td className="py-3 px-4 text-slate-400">Tổng số trang</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">isLoading</code></td>
                                <td className="py-3 px-4 text-slate-400">boolean</td>
                                <td className="py-3 px-4 text-slate-400">Đang loading lần đầu</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">isError</code></td>
                                <td className="py-3 px-4 text-slate-400">Error | undefined</td>
                                <td className="py-3 px-4 text-slate-400">Error nếu có</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">mutate</code></td>
                                <td className="py-3 px-4 text-slate-400">Function</td>
                                <td className="py-3 px-4 text-slate-400">Revalidate data</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Project Type */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Project Type</h2>
                <CodeBlock
                    code={`interface Project {
    id: string;
    name: string;
    description?: string;
    apiKey: string;
    createdAt: string;
    updatedAt: string;
    activityTrend?: number[];
}`}
                />
            </section>

            {/* Tips */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Tips</h2>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li>• Sử dụng <code className="text-primary">mutate()</code> sau khi tạo/xóa project để refresh data</li>
                        <li>• Hook tự động revalidate khi focus lại tab browser</li>
                        <li>• Data được cache nên navigation giữa pages rất nhanh</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
