
import React from 'react';
import { StatMetric } from './types';
import { cn } from '@/lib/utils';

export const StatCard: React.FC<StatMetric> = ({ label, value, change, trend, icon, color, subtext, sentiment }) => {
    const isPositive = sentiment ? sentiment === 'positive' : trend === 'up';

    return (
        <div className="bg-card-dark rounded-xl p-4 border border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
                <div className={cn("p-1.5 rounded-md bg-opacity-10", color.replace('text-', 'bg-'), color)}>
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {label}
                </span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            {change && (
                <p className={cn("text-xs font-medium mt-1 flex items-center", isPositive ? 'text-success' : 'text-error')}>
                    <span className="material-symbols-outlined text-[14px] mr-1">
                        {trend === 'up' ? 'trending_up' : 'trending_down'}
                    </span>
                    {change}
                </p>
            )}
            {subtext && <p className="text-xs text-slate-400 font-medium mt-1">{subtext}</p>}
        </div>
    );
};
