"use client"

import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartData } from './types';

interface TrendChartProps {
    data: ChartData[];
    title?: string;
    subtitle?: string;
    range?: string;
    onRangeChange?: (range: string) => void;
}

export const TrendChart: React.FC<TrendChartProps> = ({
    data,
    title = "Activity Trend",
    subtitle = "Requests per hour",
    range = '24h',
    onRangeChange
}) => {
    return (
        <div className="bg-card-dark rounded-xl p-5 border border-slate-800 shadow-sm h-full">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{subtitle}</p>
                </div>
                {onRangeChange && (
                    <select
                        value={range}
                        onChange={(e) => onRangeChange(e.target.value)}
                        className="bg-background-dark text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-800 rounded px-2 py-1 outline-none cursor-pointer hover:border-slate-700 transition-colors"
                    >
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                    </select>
                )}
            </div>
            <div className="h-40 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6A5ACD" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6A5ACD" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="hour"
                            stroke="#475569"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={30}
                            tickFormatter={(value) => value}
                        />
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
                            animationDuration={1000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
