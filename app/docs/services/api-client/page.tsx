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

export default function ApiClientPage() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Services</span>
                    <span>/</span>
                </div>
                <h1 className="text-3xl font-bold text-white">API Client</h1>
                <p className="text-slate-400 leading-relaxed">
                    Axios client được cấu hình sẵn với authentication interceptor và GraphQL helper.
                </p>
            </div>

            {/* Import */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Import</h2>
                <CodeBlock code={`import apiClient, { graphqlRequest } from '@/services/api-client';`} />
            </section>

            {/* Configuration */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Configuration</h2>
                <CodeBlock
                    code={`// Cấu hình mặc định
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auto-attach token từ localStorage
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('visual_debugger_token');
    if (token) {
        config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
});`}
                />
            </section>

            {/* graphqlRequest */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">graphqlRequest()</h2>
                <p className="text-slate-400 text-sm">
                    Helper function để gọi GraphQL API với auto error handling.
                </p>
                <CodeBlock
                    code={`import { graphqlRequest } from '@/services/api-client';
import { GetProjectDocument } from '@/graphql/generated/graphql';

// Sử dụng với generated documents
const data = await graphqlRequest(GetProjectDocument, { 
    id: 'project-uuid' 
});

console.log(data.project);`}
                />

                <div className="text-sm space-y-2">
                    <strong className="text-slate-300">Parameters:</strong>
                    <ul className="space-y-1 text-slate-400">
                        <li>• <code className="text-primary">query</code>: GraphQL document hoặc string</li>
                        <li>• <code className="text-primary">variables</code>: Object chứa variables</li>
                    </ul>
                </div>
            </section>

            {/* Custom GraphQL Query */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Custom Query</h2>
                <CodeBlock
                    code={`import { graphqlRequest } from '@/services/api-client';

// Raw GraphQL query string
const data = await graphqlRequest(\`
    query GetMyData($id: ID!) {
        myData(id: $id) {
            id
            name
            value
        }
    }
\`, { id: 'some-id' });

console.log(data.myData);`}
                />
            </section>

            {/* REST API */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">REST API (Direct)</h2>
                <p className="text-slate-400 text-sm">
                    Nếu cần gọi REST endpoints trực tiếp:
                </p>
                <CodeBlock
                    code={`import apiClient from '@/services/api-client';

// GET request
const response = await apiClient.get('/api/health');

// POST request với body
const result = await apiClient.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});`}
                />
            </section>

            {/* Environment */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Environment Variables</h2>
                <CodeBlock
                    code={`# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001`}
                    language="env"
                />
            </section>
        </div>
    );
}
