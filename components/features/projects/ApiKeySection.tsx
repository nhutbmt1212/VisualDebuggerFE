'use client';

import React, { useState } from 'react';
import { projectsService } from '@/services/projects.service';

interface ApiKeySectionProps {
    apiKey: string;
    projectId?: string;
    onKeyRegenerated?: (newApiKey: string) => void;
}

export const ApiKeySection: React.FC<ApiKeySectionProps> = ({ apiKey, projectId, onKeyRegenerated }) => {
    const [copied, setCopied] = useState(false);
    const [showKey, setShowKey] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleToggleVisibility = () => {
        setShowKey(!showKey);
    };

    const handleRefreshKey = async () => {
        if (!projectId) return;

        const confirmed = window.confirm(
            'Are you sure you want to regenerate your API key? Your existing key will be invalidated immediately.'
        );

        if (!confirmed) return;

        setIsRegenerating(true);
        try {
            const result = await projectsService.regenerateApiKey(projectId);
            if (result?.apiKey) {
                onKeyRegenerated?.(result.apiKey);
            }
        } catch (error) {
            console.error('Failed to regenerate API key:', error);
        } finally {
            setIsRegenerating(false);
        }
    };

    // Mask the API key, showing only first 4 and last 4 characters
    const maskedKey = apiKey.length > 8
        ? `${apiKey.substring(0, 4)}${'•'.repeat(Math.min(apiKey.length - 8, 24))}${apiKey.substring(apiKey.length - 4)}`
        : '•'.repeat(apiKey.length);

    return (
        <section className="py-2 md:py-4">
            <div className="bg-card-dark rounded-xl border border-slate-800 p-4 shadow-sm">
                <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Project API Key</label>
                <div className="flex items-center">
                    <div className="relative flex-1 group">
                        <input
                            className="w-full bg-background-dark border border-slate-800 rounded-l-lg py-3 px-4 pr-24 text-slate-300 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all cursor-default"
                            readOnly
                            type="text"
                            value={showKey ? apiKey : maskedKey}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
                            <button
                                onClick={handleToggleVisibility}
                                className="flex items-center justify-center size-7 hover:bg-slate-700/50 rounded transition-colors"
                                title={showKey ? 'Hide API Key' : 'Show API Key'}
                            >
                                <span className="material-symbols-outlined text-[18px] text-slate-400 hover:text-slate-300">
                                    {showKey ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-500 uppercase leading-none">
                                Read Only
                            </span>
                        </div>
                    </div>
                    {projectId && (
                        <button
                            onClick={handleRefreshKey}
                            disabled={isRegenerating}
                            className="flex items-center justify-center px-4 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-medium border border-slate-600 transition-colors h-[46px] min-w-[56px]"
                            title="Regenerate API Key"
                        >
                            <span className={`material-symbols-outlined text-[20px] ${isRegenerating ? 'animate-spin' : ''}`}>
                                {isRegenerating ? 'progress_activity' : 'refresh'}
                            </span>
                        </button>
                    )}
                    <button
                        onClick={handleCopy}
                        className={`flex items-center justify-center px-4 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-r-lg border border-primary transition-colors h-[46px] min-w-[56px]`}
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
