'use client';

import React, { useState, useEffect } from 'react';
import {
    Circle,
    Search,
    Filter,
    Terminal,
    Clock,
    Play,
    Settings,
    Bell,
    ChevronDown
} from 'lucide-react';

interface DebugEvent {
    id: number;
    type: string;
    path: string;
    status: number | string;
    time: string;
    timestamp: string;
}

export function DashboardMockup() {
    const [events, setEvents] = useState<DebugEvent[]>([
        { id: 1, type: 'POST', path: '/api/auth/login', status: 200, time: '2ms', timestamp: '10:45:01' },
        { id: 2, type: 'FUNC', path: 'AuthService.validate', status: 'OK', time: '14ms', timestamp: '10:45:02' },
        { id: 3, type: 'DB', path: 'users.findUnique', status: 'OK', time: '45ms', timestamp: '10:45:02' },
        { id: 4, type: 'ERR', path: '/api/payments', status: 500, time: '120ms', timestamp: '10:45:10' },
    ]);

    // Simulate real-time events
    useEffect(() => {
        const interval = setInterval(() => {
            setEvents(prev => {
                const newEvent: DebugEvent = {
                    id: Date.now(),
                    type: Math.random() > 0.3 ? 'FUNC' : 'DB',
                    path: Math.random() > 0.5 ? 'UserService.getProfile' : 'Prisma.query',
                    status: 'OK',
                    time: Math.floor(Math.random() * 50) + 'ms',
                    timestamp: new Date().toLocaleTimeString()
                };
                return [newEvent, ...prev.slice(0, 7)];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'POST': return 'bg-blue-500/10 text-blue-400';
            case 'ERR': return 'bg-red-500/10 text-red-400';
            case 'DB': return 'bg-orange-500/10 text-orange-400';
            default: return 'bg-purple-500/10 text-purple-400';
        }
    };

    return (
        <div className="max-w-6xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden purple-glow">
            <div className="flex flex-col md:flex-row h-full">
                {/* Sidebar */}
                <div className="w-full md:w-64 border-r border-zinc-800 p-4 bg-zinc-900/30 hidden md:block">
                    <div className="flex items-center gap-2 mb-10 px-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-3 p-2 bg-purple-600/10 text-purple-400 rounded-lg cursor-pointer">
                            <Play size={18} /> <span className="text-sm font-semibold">Live Stream</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 text-zinc-500 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
                            <Clock size={18} /> <span className="text-sm font-semibold">History</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 text-zinc-500 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
                            <Settings size={18} /> <span className="text-sm font-semibold">Project Settings</span>
                        </div>
                    </div>
                    <div className="mt-10 pt-10 border-t border-zinc-800/50">
                        <h5 className="text-[10px] font-bold text-zinc-600 uppercase mb-4 px-2">Recent Projects</h5>
                        <div className="space-y-2 px-2">
                            <div className="text-xs text-zinc-400">api-gateway-prod</div>
                            <div className="text-xs text-zinc-400 font-bold">payment-service-v2</div>
                            <div className="text-xs text-zinc-400">notification-worker</div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col bg-[#0a0a0c]">
                    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-white font-bold text-sm">payment-service-v2</h2>
                            <div className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 font-mono">DEBUGGING</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Search size={18} className="text-zinc-500" />
                            <Bell size={18} className="text-zinc-500" />
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                        </div>
                    </header>

                    <main className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-300">
                                    <Filter size={14} /> All Events
                                </div>
                                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-300">
                                    Environment: Production <ChevronDown size={14} />
                                </div>
                            </div>
                            <div className="text-[10px] font-mono text-zinc-600">UPTIME: 14D 02H 12M</div>
                        </div>

                        <div className="rounded-xl border border-zinc-800/50 overflow-hidden bg-zinc-900/10">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-zinc-900/50 border-b border-zinc-800">
                                    <tr>
                                        <th className="px-4 py-3 text-zinc-500 font-medium">Type</th>
                                        <th className="px-4 py-3 text-zinc-500 font-medium">Event / Route</th>
                                        <th className="px-4 py-3 text-zinc-500 font-medium">Status</th>
                                        <th className="px-4 py-3 text-zinc-500 font-medium">Duration</th>
                                        <th className="px-4 py-3 text-zinc-500 font-medium text-right">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {events.map((e) => (
                                        <tr key={e.id} className="hover:bg-zinc-800/20 transition-colors animate-in fade-in slide-in-from-top-2 duration-300">
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getTypeColor(e.type)}`}>
                                                    {e.type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-zinc-300 font-mono">{e.path}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${e.status === 200 || e.status === 'OK' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                    <span className="text-zinc-400">{e.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-zinc-500">{e.time}</td>
                                            <td className="px-4 py-3 text-zinc-600 text-right font-mono">{e.timestamp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-[10px] text-zinc-700 font-mono uppercase tracking-widest">
                            <Circle size={8} fill="currentColor" className="text-purple-500 animate-pulse" /> Listening for new events...
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
