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

export default function QuickStartPage() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">Quick Start</h1>
                <p className="text-slate-400 leading-relaxed">
                    Bắt đầu sử dụng VisualDebugger trong 5 phút.
                </p>
            </div>

            {/* Step 1: Login */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">1</span>
                    Đăng nhập / Đăng ký
                </h2>
                <p className="text-slate-400 text-sm">
                    Truy cập <code className="text-primary">/login</code> hoặc <code className="text-primary">/register</code> để tạo tài khoản.
                </p>
                <CodeBlock
                    code={`import { authService } from '@/services/auth.service';

// Đăng nhập
const result = await authService.login({
    email: 'user@example.com',
    password: 'password123'
});

console.log('Logged in:', result.user.name);
// Token được tự động lưu vào localStorage`}
                />
            </section>

            {/* Step 2: Create Project */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">2</span>
                    Tạo Project Đầu Tiên
                </h2>
                <p className="text-slate-400 text-sm">
                    Vào trang <code className="text-primary">/projects</code> và click "New Project" hoặc dùng API:
                </p>
                <CodeBlock
                    code={`import { projectsService } from '@/services/projects.service';

// Tạo project mới
const project = await projectsService.create({
    name: 'My First Project',
    description: 'Debug application flow'
});

console.log('API Key:', project.apiKey);
// Sử dụng API key này trong SDK`}
                />
            </section>

            {/* Step 3: Use Hooks */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">3</span>
                    Sử dụng Hooks
                </h2>
                <p className="text-slate-400 text-sm">
                    Fetch data với các custom hooks:
                </p>
                <CodeBlock
                    code={`'use client';

import { useProjects, useProject } from '@/hooks/useProjects';

function ProjectsPage() {
    // Lấy danh sách projects với pagination
    const { 
        projects, 
        totalPages, 
        isLoading, 
        mutate 
    } = useProjects(1, 10);

    if (isLoading) return <Loading />;

    return (
        <div>
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}

function ProjectDetail({ id }: { id: string }) {
    // Lấy chi tiết 1 project
    const { project, isLoading, isError } = useProject(id);

    if (isLoading) return <Skeleton />;
    if (isError) return <Error />;

    return <div>{project.name}</div>;
}`}
                />
            </section>

            {/* Step 4: Use Components */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">4</span>
                    Sử dụng Components
                </h2>
                <p className="text-slate-400 text-sm">
                    Import và sử dụng UI components:
                </p>
                <CodeBlock
                    code={`import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';

function MyComponent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                        {/* Dialog content */}
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}`}
                />
            </section>

            {/* Step 5: View Sessions */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">5</span>
                    Xem Debug Sessions
                </h2>
                <p className="text-slate-400 text-sm">
                    Theo dõi các debug sessions realtime:
                </p>
                <CodeBlock
                    code={`import { useSession, useProjectSessions } from '@/hooks/useProjects';

function SessionsPage({ projectId }: { projectId: string }) {
    // Lấy sessions của project (auto-refresh mỗi 5s)
    const { sessions, isLoading } = useProjectSessions(projectId, 1, 10);

    return (
        <div>
            {sessions.map(session => (
                <SessionCard 
                    key={session.id}
                    session={session}
                />
            ))}
        </div>
    );
}

function SessionDetail({ sessionId }: { sessionId: string }) {
    // Lấy chi tiết session với events
    const { session } = useSession(sessionId);

    return (
        <div>
            <h1>Session: {session?.id}</h1>
            <EventList events={session?.events} />
        </div>
    );
}`}
                />
            </section>

            {/* Success */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                <h3 className="font-bold text-green-400 mb-2">🎉 Congratulations!</h3>
                <p className="text-sm text-slate-300">
                    Bạn đã sẵn sàng sử dụng VisualDebugger. Khám phá thêm tại các trang docs khác.
                </p>
            </div>
        </div>
    );
}
