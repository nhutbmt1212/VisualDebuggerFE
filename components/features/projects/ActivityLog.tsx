
import React from 'react';
import { ActivityItem } from './types';
import { cn } from '@/lib/utils';
import { useRouter, useParams } from 'next/navigation';

interface ActivityLogProps {
    activities: ActivityItem[];
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id as string;

    const getStatusIcon = (type: string) => {
        switch (type) {
            case 'success': return <span className="material-symbols-outlined text-[20px] text-success">check_circle</span>;
            case 'error': return <span className="material-symbols-outlined text-[20px] text-error">error</span>;
            case 'warning': return <span className="material-symbols-outlined text-[20px] text-warning">warning</span>;
            default: return null;
        }
    };

    const getStatusBg = (type: string) => {
        switch (type) {
            case 'success': return 'bg-success/5 border-success/10 hover:border-success/30';
            case 'error': return 'bg-error/5 border-error/10 hover:border-error/30';
            case 'warning': return 'bg-warning/5 border-warning/10 hover:border-warning/30';
            default: return 'bg-card-dark border-slate-800';
        }
    };

    const handleItemClick = (item: ActivityItem) => {
        const pId = item.projectId || projectId;
        if (pId && item.id) {
            router.push(`/projects/${pId}/sessions/${item.id}`);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={cn(
                        "group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border transition-all cursor-pointer shadow-sm",
                        getStatusBg(item.type),
                        item.isNew && "animate-pulse ring-2 ring-primary/50"
                    )}
                >
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/5">
                            {getStatusIcon(item.type)}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-500 font-mono tracking-wider uppercase">#{item.session}</span>
                                <span className="px-1.5 py-0.5 rounded bg-background-dark text-[10px] font-bold text-slate-400">
                                    {item.method}
                                </span>
                            </div>
                            <p className="text-sm font-bold text-white truncate max-w-[200px] md:max-w-full group-hover:text-primary transition-colors">
                                {item.path}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between md:flex-col md:items-end gap-1 ml-auto md:ml-4">
                        <span className="text-[11px] font-medium text-slate-500">{item.time}</span>
                        <span className={cn(
                            "text-[11px] font-mono font-bold",
                            item.status?.toLowerCase().includes('err') || item.status?.toLowerCase().includes('bad') ? 'text-error' : 'text-slate-400'
                        )}>
                            {item.status || item.duration}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
