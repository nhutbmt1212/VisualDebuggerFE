"use client"

import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartData } from './types';

const data: ChartData[] = [
    { hour: '00:00', requests: 40 },
    { hour: '01:00', requests: 30 },
    { hour: '02:00', requests: 45 },
    { hour: '03:00', requests: 20 },
    { hour: '04:00', requests: 25 },
    { hour: '05:00', requests: 15 },
    { hour: '06:00', requests: 40 },
    { hour: '07:00', requests: 60 },
    { hour: '08:00', requests: 80 },
    { hour: '09:00', requests: 50 },
    { hour: '10:00', requests: 70 },
];

export const TrendChart: React.FC = () => {
    return (
        <div className="bg-card-dark rounded-xl p-5 border border-slate-800 shadow-sm">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="text-base font-bold text-white tracking-tight">Activity Trend</h3>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Requests per hour</p>
                </div>
                <div className="px-2 py-1 bg-background-dark rounded text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-800">
                    Last 24 Hours
                </div>
            </div>
            <div className="h-32 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6A5ACD" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6A5ACD" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="hour" hide />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1a1625',
                                border: '1px solid #2f283f',
                                borderRadius: '12px',
                                color: '#fff',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
                            }}
                            itemStyle={{ color: '#6A5ACD' }}
                            labelStyle={{ color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="requests"
                            stroke="#6A5ACD"
                            fillOpacity={1}
                            fill="url(#colorRequests)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
