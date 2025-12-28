
import React, { useState } from 'react';

interface ApiKeySectionProps {
    apiKey: string;
}

export const ApiKeySection: React.FC<ApiKeySectionProps> = ({ apiKey }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-2 md:py-4">
            <div className="bg-card-dark rounded-xl border border-slate-800 p-4 shadow-sm">
                <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Project API Key</label>
                <div className="flex items-center">
                    <div className="relative flex-1 group">
                        <input
                            className="w-full bg-background-dark border border-slate-800 rounded-l-lg py-3 px-4 text-slate-300 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all cursor-default"
                            readOnly
                            type="text"
                            value={apiKey}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-500 uppercase">
                                Read Only
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center justify-center px-4 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-r-lg border border-primary transition-colors h-[46px] min-w-[56px]"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {copied ? 'check' : 'content_copy'}
                        </span>
                    </button>
                </div>
                <p className="mt-2 text-[10px] text-slate-500 flex items-center gap-1 font-semibold uppercase tracking-tight">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    Keep this key secret. Do not share it in client-side code.
                </p>
            </div>
        </section>
    );
};
