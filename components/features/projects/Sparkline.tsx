
import React from 'react';
import { ProjectStatus } from './types';

interface SparklineProps {
    data: number[];
    status: ProjectStatus;
}

export const Sparkline: React.FC<SparklineProps> = ({ data, status }) => {
    const max = Math.max(...data);

    return (
        <div className="flex items-end h-8 gap-[2px] opacity-90 w-full">
            {data.map((val, idx) => {
                const heightPercent = max > 0 ? (val / max) * 100 : 0;

                let bgColor = 'bg-slate-600/30';
                if (max > 0) {
                    if (status === ProjectStatus.ONLINE) {
                        // Highlight specific peak if it's high
                        if (idx === data.length - 3) bgColor = 'bg-primary';
                        else if (val > max * 0.8) bgColor = 'bg-success';
                        else bgColor = 'bg-slate-600';
                    } else if (status === ProjectStatus.CRITICAL) {
                        if (val > max * 0.6) bgColor = 'bg-error';
                        else bgColor = 'bg-slate-600';
                    } else if (status === ProjectStatus.PAUSED) {
                        bgColor = 'bg-slate-700/50';
                    }
                }

                return (
                    <div
                        key={idx}
                        className={`flex-1 rounded-[1px] transition-all duration-300 ${bgColor}`}
                        style={{ height: `${Math.max(heightPercent, 10)}%` }}
                    />
                );
            })}
        </div>
    );
};
