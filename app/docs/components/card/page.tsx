'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
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

export default function CardDocsPage() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Components</span>
                    <span>/</span>
                </div>
                <h1 className="text-3xl font-bold text-white">Card</h1>
                <p className="text-slate-400 leading-relaxed">
                    Container component để nhóm các nội dung liên quan.
                </p>
            </div>

            {/* Import */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Import</h2>
                <CodeBlock code={`import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from '@/components/ui/card';`} />
            </section>

            {/* Preview */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Preview</h2>
                <div className="p-6 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <Card className="max-w-md">
                        <CardHeader>
                            <CardTitle>Project Settings</CardTitle>
                            <CardDescription>
                                Manage your project configuration and API keys.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-400">
                                Configure debugging options, notification preferences, and team access.
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Usage</h2>
                <CodeBlock
                    code={`<Card>
    <CardHeader>
        <CardTitle>Project Settings</CardTitle>
        <CardDescription>
            Manage your project configuration.
        </CardDescription>
    </CardHeader>
    <CardContent>
        <p>Your content here...</p>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
    </CardFooter>
</Card>`}
                />
            </section>

            {/* Simple Card */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Simple Card</h2>
                <div className="p-6 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <Card className="max-w-sm p-6">
                        <h3 className="font-bold text-white">Simple Content</h3>
                        <p className="text-sm text-slate-400 mt-2">
                            You can use Card without sub-components.
                        </p>
                    </Card>
                </div>
                <CodeBlock
                    code={`<Card className="p-6">
    <h3 className="font-bold">Simple Content</h3>
    <p className="text-sm text-slate-400">
        You can use Card without sub-components.
    </p>
</Card>`}
                />
            </section>

            {/* Components */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Sub-components</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Component</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">Card</code></td>
                                <td className="py-3 px-4 text-slate-400">Container chính với border và background</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">CardHeader</code></td>
                                <td className="py-3 px-4 text-slate-400">Phần header chứa title và description</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">CardTitle</code></td>
                                <td className="py-3 px-4 text-slate-400">Tiêu đề của card (h3)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">CardDescription</code></td>
                                <td className="py-3 px-4 text-slate-400">Mô tả phụ</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">CardContent</code></td>
                                <td className="py-3 px-4 text-slate-400">Nội dung chính</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">CardFooter</code></td>
                                <td className="py-3 px-4 text-slate-400">Footer với actions (buttons)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
