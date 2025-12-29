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

export default function UseProjectPage() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Hooks</span>
                    <span>/</span>
                </div>
                <h1 className="text-3xl font-bold text-white">useProject</h1>
                <p className="text-slate-400 leading-relaxed">
                    Hook để lấy chi tiết một project theo ID.
                </p>
            </div>

            {/* Import */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Import</h2>
                <CodeBlock code={`import { useProject } from '@/hooks/useProjects';`} />
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Usage</h2>
                <CodeBlock
                    code={`function ProjectDetailPage({ projectId }: { projectId: string }) {
    const { 
        project, 
        isLoading, 
        isValidating, 
        isError 
    } = useProject(projectId);

    // Loading state - lần đầu fetch
    if (isLoading) return <Skeleton />;
    
    // Error state
    if (isError) return <Error message="Project not found" />;
    
    // Null check
    if (!project) return null;

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            
            {/* Show subtle loading khi revalidate */}
            {isValidating && <span>Refreshing...</span>}
            
            <ApiKeySection apiKey={project.apiKey} />
        </div>
    );
}`}
                />
            </section>

            {/* With Dynamic Route */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">With Dynamic Route</h2>
                <CodeBlock
                    code={`'use client';

import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/useProjects';

export default function ProjectPage() {
    const params = useParams();
    const projectId = params.id as string;
    
    const { project, isLoading } = useProject(projectId);

    if (isLoading) return <ProjectSkeleton />;

    return <ProjectDetail project={project} />;
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
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">id</code></td>
                                <td className="py-3 px-4 text-slate-400">string | null</td>
                                <td className="py-3 px-4 text-slate-400">Project ID (UUID). Nếu null, hook sẽ không fetch.</td>
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
                                <td className="py-3 px-4"><code className="text-primary">project</code></td>
                                <td className="py-3 px-4 text-slate-400">Project | undefined</td>
                                <td className="py-3 px-4 text-slate-400">Chi tiết project</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">isLoading</code></td>
                                <td className="py-3 px-4 text-slate-400">boolean</td>
                                <td className="py-3 px-4 text-slate-400">Đang loading lần đầu (chưa có data)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">isValidating</code></td>
                                <td className="py-3 px-4 text-slate-400">boolean</td>
                                <td className="py-3 px-4 text-slate-400">Đang revalidate (có data cũ)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">isError</code></td>
                                <td className="py-3 px-4 text-slate-400">Error | undefined</td>
                                <td className="py-3 px-4 text-slate-400">Error nếu có</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Tips */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Tips</h2>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li>• Phân biệt <code className="text-primary">isLoading</code> và <code className="text-primary">isValidating</code>:</li>
                        <li className="ml-4">- <code>isLoading</code>: Lần đầu fetch, chưa có data</li>
                        <li className="ml-4">- <code>isValidating</code>: Đang refresh, vẫn hiển thị data cũ</li>
                        <li>• Hook tự động revalidate khi focus lại window</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
