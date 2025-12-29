
import { StatItem, ActivityItem } from './types';

export const MOCK_STATS: StatItem[] = [
    { label: 'Total Events', value: '1,284', change: '+12.5%', changeType: 'positive' },
    { label: 'Error Rate', value: '0.2%', change: '-2.1%', changeType: 'positive' },
    { label: 'Avg Latency', value: '142ms', change: '+4ms', changeType: 'negative' },
    { label: 'Active Sessions', value: '12', change: '+2', changeType: 'positive' },
];

export const MOCK_ACTIVITIES: ActivityItem[] = [
    { id: '1', projectId: 'mock', session: 'SESS-892', method: 'GET', path: '/api/v2/users/me', time: '2m ago', duration: '45ms', type: 'success' },
    { id: '2', projectId: 'mock', session: 'SESS-891', method: 'POST', path: '/api/v2/auth/login', time: '15m ago', status: '500 ERR', type: 'error' },
    { id: '3', projectId: 'mock', session: 'SESS-890', method: 'GET', path: '/api/v2/products', time: '1h ago', duration: '120ms', type: 'success' },
    { id: '4', projectId: 'mock', session: 'SESS-889', method: 'PUT', path: '/api/v2/user/settings', time: '2h ago', status: '400 Bad', type: 'warning' },
];
