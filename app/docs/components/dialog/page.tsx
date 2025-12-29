'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

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

export default function DialogDocsPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Components</span>
                    <span>/</span>
                </div>
                <h1 className="text-3xl font-bold text-white">Dialog</h1>
                <p className="text-slate-400 leading-relaxed">
                    Modal dialog component dựa trên Radix UI Dialog.
                </p>
            </div>

            {/* Import */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Import</h2>
                <CodeBlock code={`import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';`} />
            </section>

            {/* Preview */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Preview</h2>
                <div className="p-6 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Open Dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Create New Project</DialogTitle>
                            <DialogDescription>
                                Fill in the details to create a new debugging project.
                            </DialogDescription>
                            <div className="mt-4 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Project name"
                                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white"
                                />
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Create</Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </section>

            {/* Basic Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Basic Usage</h2>
                <CodeBlock
                    code={`<Dialog>
    <DialogTrigger asChild>
        <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
            Description or instructions here.
        </DialogDescription>
        
        {/* Your content */}
        <div className="mt-4">
            <input type="text" placeholder="Enter value" />
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
        </div>
    </DialogContent>
</Dialog>`}
                />
            </section>

            {/* Controlled */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Controlled Dialog</h2>
                <p className="text-slate-400 text-sm">
                    Kiểm soát state open/close từ bên ngoài:
                </p>
                <div className="p-6 bg-slate-800/30 border border-slate-800 rounded-lg flex gap-4">
                    <Button onClick={() => setOpen(true)}>Open Controlled</Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogTitle>Controlled Dialog</DialogTitle>
                            <DialogDescription>
                                This dialog is controlled by state.
                            </DialogDescription>
                            <Button onClick={() => setOpen(false)} className="mt-4">
                                Close
                            </Button>
                        </DialogContent>
                    </Dialog>
                </div>
                <CodeBlock
                    code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>

<Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
        <DialogTitle>Controlled Dialog</DialogTitle>
        <DialogDescription>
            This dialog is controlled by state.
        </DialogDescription>
        <Button onClick={() => setOpen(false)}>
            Close
        </Button>
    </DialogContent>
</Dialog>`}
                />
            </section>

            {/* With Form */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">With Form</h2>
                <CodeBlock
                    code={`function CreateProjectDialog({ onCreated }: { onCreated: () => void }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await projectsService.create({ name });
            setOpen(false);
            onCreated();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>New Project</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Enter project details.
                    </DialogDescription>
                    
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Project name"
                        required
                    />
                    
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}`}
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
                                <td className="py-3 px-4"><code className="text-primary">Dialog</code></td>
                                <td className="py-3 px-4 text-slate-400">Root component, quản lý state</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">DialogTrigger</code></td>
                                <td className="py-3 px-4 text-slate-400">Element để mở dialog (button)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">DialogContent</code></td>
                                <td className="py-3 px-4 text-slate-400">Container nội dung modal</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">DialogTitle</code></td>
                                <td className="py-3 px-4 text-slate-400">Tiêu đề dialog (required for a11y)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4"><code className="text-primary">DialogDescription</code></td>
                                <td className="py-3 px-4 text-slate-400">Mô tả phụ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
