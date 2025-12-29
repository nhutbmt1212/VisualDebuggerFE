'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <pre className="bg-[#161b22] border border-slate-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-slate-300 font-mono">{code}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-slate-700/50 hover:bg-slate-700 rounded-md text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
                {copied ? <Check className="size-4 text-green-400" /> : <Copy className="size-4" />}
            </button>
        </div>
    );
}

export default function InstallationPage() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">Installation</h1>
                <p className="text-slate-400 leading-relaxed">
                    Hướng dẫn cài đặt và cấu hình VisualDebugger Frontend từ đầu.
                </p>
            </div>

            {/* Requirements */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">1</span>
                    Requirements
                </h2>
                <div className="bg-slate-800/30 border border-slate-800 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex items-center gap-2">
                            <Check className="size-4 text-green-400" />
                            Node.js 18.x hoặc cao hơn
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="size-4 text-green-400" />
                            npm 9.x hoặc yarn 1.22+
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="size-4 text-green-400" />
                            Backend API đang chạy (port 3001)
                        </li>
                    </ul>
                </div>
            </section>

            {/* Step 1: Clone */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">2</span>
                    Clone Repository
                </h2>
                <CodeBlock code={`git clone https://github.com/your-org/VisualDebugger.git
cd VisualDebugger/VisualDebuggerFE`} />
            </section>

            {/* Step 2: Install Dependencies */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">3</span>
                    Install Dependencies
                </h2>
                <p className="text-slate-400 text-sm">
                    Cài đặt tất cả dependencies bằng npm hoặc yarn:
                </p>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Terminal className="size-4" />
                        <span>Using npm:</span>
                    </div>
                    <CodeBlock code="npm install" />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Terminal className="size-4" />
                        <span>Using yarn:</span>
                    </div>
                    <CodeBlock code="yarn install" />
                </div>
            </section>

            {/* Step 3: Environment Variables */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">4</span>
                    Environment Variables
                </h2>
                <p className="text-slate-400 text-sm">
                    Tạo file <code className="text-primary">.env.local</code> từ file mẫu:
                </p>
                <CodeBlock code="cp .env.example .env.local" />

                <p className="text-slate-400 text-sm mt-4">
                    Cấu hình các biến môi trường:
                </p>
                <CodeBlock
                    code={`# .env.local

# API Backend URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# WebSocket URL (optional)
NEXT_PUBLIC_WS_URL=ws://localhost:3001`}
                    language="env"
                />

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mt-4">
                    <p className="text-sm text-amber-400">
                        <strong>⚠️ Lưu ý:</strong> Đảm bảo Backend API đang chạy trước khi start Frontend.
                    </p>
                </div>
            </section>

            {/* Step 4: Run Development Server */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">5</span>
                    Run Development Server
                </h2>
                <CodeBlock code="npm run dev" />

                <p className="text-slate-400 text-sm">
                    Ứng dụng sẽ chạy tại <a href="http://localhost:3000" className="text-primary hover:underline">http://localhost:3000</a>
                </p>
            </section>

            {/* Step 5: Build for Production */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 bg-primary/20 text-primary rounded-full text-sm font-bold">6</span>
                    Build for Production
                </h2>
                <CodeBlock code={`# Build
npm run build

# Start production server
npm start`} />
            </section>

            {/* Project Structure */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Project Structure</h2>
                <CodeBlock code={`VisualDebuggerFE/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (dashboard)/       # Dashboard routes
│   ├── docs/              # Documentation (you are here!)
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components
│   └── features/          # Feature-specific components
├── hooks/                  # Custom React hooks
├── services/              # API service functions
├── graphql/               # GraphQL queries & types
└── lib/                   # Utility functions`} />
            </section>

            {/* Next Steps */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Next Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                        href="/docs/quick-start"
                        className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-primary/50 transition-all"
                    >
                        <h3 className="font-bold text-white mb-1">Quick Start →</h3>
                        <p className="text-sm text-slate-400">Tạo project đầu tiên</p>
                    </a>
                    <a
                        href="/docs/hooks/use-projects"
                        className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-primary/50 transition-all"
                    >
                        <h3 className="font-bold text-white mb-1">Hooks API →</h3>
                        <p className="text-sm text-slate-400">Tìm hiểu về useProjects</p>
                    </a>
                </div>
            </section>
        </div>
    );
}
