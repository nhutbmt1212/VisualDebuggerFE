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

export default function UseSessionPage() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Hooks</span>
                    <span>/</span>
                </div>
                <h1 className="text-3xl font-bold text-white">useSession</h1>
                <p className="text-slate-400 leading-relaxed">
                    Hook để lấy chi tiết một debug session với đầy đủ events.
                </p>
            </div>

            {/* Import */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Import</h2>
                <CodeBlock code={`import { useSession } from '@/hooks/useProjects';`} />
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Usage</h2>
                <CodeBlock
                    code={`function SessionDetailPage({ sessionId }: { sessionId: string }) {
    const { 
        session, 
        isLoading, 
        isValidating, 
        isError 
    } = useSession(sessionId);

    if (isLoading) return <SessionSkeleton />;
    if (isError || !session) return <Error />;

    return (
        <div>
            <header>
                <h1>Session: {session.id}</h1>
                <span>Environment: {session.environment}</span>
                <span>Started: {session.startedAt}</span>
            </header>

            <EventList events={session.events} />
        </div>
    );
}`}
                />
            </section>

            {/* With Events */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Working with Events</h2>
                <CodeBlock
                    code={`function EventList({ events }: { events: DebugEvent[] }) {
    // Filter by type
    const httpEvents = events.filter(e => e.type === 'HTTP_REQUEST');
    const errorEvents = events.filter(e => e.type === 'ERROR');
    const logEvents = events.filter(e => e.type === 'LOG');

    return (
        <div>
            <Tabs>
                <TabsList>
                    <Tab>All ({events.length})</Tab>
                    <Tab>HTTP ({httpEvents.length})</Tab>
                    <Tab>Errors ({errorEvents.length})</Tab>
                </TabsList>

                <TabsContent value="all">
                    {events.map(event => (
                        <EventCard 
                            key={event.id}
                            type={event.type}
                            name={event.name}
                            duration={event.duration}
                            timestamp={event.timestamp}
                        />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}`}
                />
            </section>

            {/* Return */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Return Value (session)</h2>
                <CodeBlock
                    code={`interface DebugSession {
    id: string;
    environment: string;
    userAgent?: string;
    ipAddress?: string;
    metadata?: object;
    startedAt: string;
    endedAt?: string;
    project: {
        id: string;
        name: string;
    };
    events: DebugEvent[];
}

interface DebugEvent {
    id: string;
    type: 'HTTP_REQUEST' | 'ERROR' | 'LOG' | 'FUNCTION_ENTER' | 'FUNCTION_EXIT';
    name?: string;
    filePath?: string;
    lineNumber?: number;
    httpMethod?: string;
    httpUrl?: string;
    httpStatus?: number;
    duration?: number;
    errorMessage?: string;
    errorStack?: string;
    depth: number;
    timestamp: string;
    parentEventId?: string;
}`}
                />
            </section>

            {/* Related Hooks */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Related Hooks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="/docs/hooks/use-projects" className="block p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-primary/50 transition-all">
                        <code className="text-primary">useProjectSessions</code>
                        <p className="text-sm text-slate-400 mt-1">Lấy danh sách sessions của project</p>
                    </a>
                    <a href="/docs/hooks/use-projects" className="block p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-primary/50 transition-all">
                        <code className="text-primary">useRecentSessions</code>
                        <p className="text-sm text-slate-400 mt-1">Lấy sessions gần đây (global)</p>
                    </a>
                </div>
            </section>
        </div>
    );
}
