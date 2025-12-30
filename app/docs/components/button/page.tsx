'use client';

import { useState } from 'react';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function ButtonDocsPage() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Components</span>
                    <span>/</span>
                </div>
                <h1 className="text-3xl font-bold text-white">Button</h1>
                <p className="text-slate-400 leading-relaxed">
                    Button component với nhiều variants và sizes. Dựa trên Radix UI Slot.
                </p>
            </div>

            {/* Import */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Import</h2>
                <CodeBlock code={`import { Button } from '@/components/ui/button';`} />
            </section>

            {/* Preview */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Preview</h2>
                <div className="p-6 bg-slate-800/30 border border-slate-800 rounded-lg flex flex-wrap gap-4">
                    <Button>Default</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
            </section>

            {/* Variants */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Variants</h2>
                <CodeBlock
                    code={`// Default - primary action
<Button variant="default">Save Changes</Button>

// Destructive - dangerous action
<Button variant="destructive">Delete Project</Button>

// Outline - secondary action
<Button variant="outline">Cancel</Button>

// Secondary
<Button variant="secondary">Draft</Button>

// Ghost - minimal style
<Button variant="ghost">More Options</Button>

// Link - looks like a link
<Button variant="link">Learn More</Button>`}
                />
            </section>

            {/* Sizes */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Sizes</h2>
                <div className="p-6 bg-slate-800/30 border border-slate-800 rounded-lg flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Check className="size-4" /></Button>
                </div>
                <CodeBlock
                    code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>`}
                />
            </section>

            {/* With Loading */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">With Loading State</h2>
                <div className="p-6 bg-slate-800/30 border border-slate-800 rounded-lg flex flex-wrap gap-4">
                    <Button
                        disabled={loading}
                        onClick={() => {
                            setLoading(true);
                            setTimeout(() => setLoading(false), 2000);
                        }}
                    >
                        {loading ? (
                            <>
                                <RefreshCcw className="size-4 mr-2 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            'Click me'
                        )}
                    </Button>
                </div>
                <CodeBlock
                    code={`const [loading, setLoading] = useState(false);

<Button disabled={loading}>
    {loading ? (
        <>
            <RefreshCcw className="size-4 mr-2 animate-spin" />
            Loading...
        </>
    ) : (
        'Submit'
    )}
</Button>`}
                />
            </section>

            {/* As Child */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">As Child (Link)</h2>
                <p className="text-slate-400 text-sm">
                    Sử dụng <code className="text-primary">asChild</code> để render như element khác (Link, a, etc.)
                </p>
                <CodeBlock
                    code={`import Link from 'next/link';

<Button asChild>
    <Link href="/projects">Go to Projects</Link>
</Button>`}
                />
            </section>

            {/* Props Table */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Prop</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Default</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">variant</code></td>
                                <td className="py-3 px-4 text-slate-400">&apos;default&apos; | &apos;destructive&apos; | &apos;outline&apos; | &apos;secondary&apos; | &apos;ghost&apos; | &apos;link&apos;</td>
                                <td className="py-3 px-4 text-slate-400">&apos;default&apos;</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">size</code></td>
                                <td className="py-3 px-4 text-slate-400">&apos;default&apos; | &apos;sm&apos; | &apos;lg&apos; | &apos;icon&apos;</td>
                                <td className="py-3 px-4 text-slate-400">&apos;default&apos;</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">asChild</code></td>
                                <td className="py-3 px-4 text-slate-400">boolean</td>
                                <td className="py-3 px-4 text-slate-400">false</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">disabled</code></td>
                                <td className="py-3 px-4 text-slate-400">boolean</td>
                                <td className="py-3 px-4 text-slate-400">false</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
