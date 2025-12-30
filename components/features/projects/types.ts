
export enum ProjectStatus {
    ONLINE = 'online',
    PAUSED = 'paused',
    CRITICAL = 'critical'
}

export interface ProjectData {
    id: string;
    name: string;
    subtitle: string;
    shortName: string;
    platform: string;
    status: ProjectStatus;
    volume: number[];
    volumeLabel?: string;
    unresolvedCount?: number;
    crashFreeRate?: string;
    errors1h?: number;
    users?: string;
    throughput?: string;
}

export interface StatItem {
    label: string;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
}

export interface ActivityItem {
    id: string;
    projectId: string;
    session: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'LOG' | 'EVNT' | 'ERR' | string;
    path: string;
    time: string;
    duration?: string;
    status?: string;
    type: 'success' | 'error' | 'warning';
    isNew?: boolean; // For real-time animation
}

export interface StatMetric {
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon: string;
    color: string;
    subtext?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface ChartData {
    hour: string;
    requests: number;
}
