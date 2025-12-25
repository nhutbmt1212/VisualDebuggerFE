'use client';

import React, { useState } from 'react';
import { Copy, Terminal } from 'lucide-react';

const codeSnippets: Record<string, string> = {
    sdk: `// Import the SDK
import { VisualDebugger } from '@vdebugger/node-sdk';

const dbg = new VisualDebugger({
  apiKey: process.env.VDBG_API_KEY,
  projectName: 'payment-service',
});

// Automatically trace your NestJS service
@Injectable()
@dbg.Trace() // Just one decorator
export class PaymentService {
  async process(orderId: string) {
    // This will show up in the hierarchy
    return await this.repo.save(orderId);
  }
}`,
    install: `# Install via npm
npm install @vdebugger/node-sdk

# Install via yarn
yarn add @vdebugger/node-sdk

# Docker integration
docker run -p 3001:3001 vdebugger/server:latest`
};

export function CodePreview() {
    const [activeLang, setActiveLang] = useState('sdk');

    const highlightCode = (code: string) => {
        return code
            .replace(/(\/\/.+)/g, '<span class="text-zinc-600">$1</span>')
            .replace(/(@\w+)/g, '<span class="text-purple-400">$1</span>')
            .replace(/(import|from|const|new|async|await|class|return|export)/g, '<span class="text-blue-400">$1</span>')
            .replace(/('[^']+')/g, '<span class="text-green-400">$1</span>');
    };

    return (
        <section id="docs" className="py-32 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-4">Seamless Integration</h2>
                    <h3 className="text-4xl font-bold text-white mb-6">Integrate in seconds, <br />debug for a lifetime.</h3>
                    <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                        We built VisualDebugger to be as non-intrusive as possible. Our SDK uses decorators and
                        interceptors to automatically gather telemetry without polluting your business logic.
                    </p>
                    <ul className="space-y-4">
                        {['No boilerplate code required', 'Zero impact on production performance', 'Auto-discovery of microservices'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                                <div className="p-1 bg-purple-600 rounded-full">
                                    <Terminal size={12} className="text-white" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setActiveLang('sdk')}
                                className={`text-sm font-semibold transition-colors ${activeLang === 'sdk' ? 'text-white' : 'text-zinc-500'}`}
                            >
                                NestJS SDK
                            </button>
                            <button
                                onClick={() => setActiveLang('install')}
                                className={`text-sm font-semibold transition-colors ${activeLang === 'install' ? 'text-white' : 'text-zinc-500'}`}
                            >
                                Installation
                            </button>
                        </div>
                        <Copy size={16} className="text-zinc-500 cursor-pointer hover:text-white transition-colors" />
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <pre className="font-mono text-sm leading-relaxed text-zinc-400">
                            <code dangerouslySetInnerHTML={{ __html: highlightCode(codeSnippets[activeLang]) }} />
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}
