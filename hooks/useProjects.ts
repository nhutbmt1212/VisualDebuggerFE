import useSWR, { mutate } from 'swr';
import { projectsService } from '@/services/projects.service';

// Generic fetcher for SWR using our projectsService methods
const fetcher = (methodName: keyof typeof projectsService, ...args: any[]) => {
    const method = projectsService[methodName] as Function;
    return method(...args);
};

export function useProjects(page = 1, limit = 10) {
    const { data, error, isLoading, mutate: revalidate } = useSWR(
        ['fetchAll', page, limit],
        ([method, p, l]) => projectsService.fetchAll(p, l),
        {
            keepPreviousData: true,
            revalidateOnFocus: true,
        }
    );

    return {
        projects: data?.items || [],
        totalCount: data?.totalCount || 0,
        totalPages: data?.totalPages || 1,
        isLoading,
        isError: error,
        mutate: revalidate
    };
}

export function useProject(id: string | null) {
    const { data, error, isLoading, isValidating } = useSWR(
        id ? ['fetchById', id] : null,
        ([_, projectId]) => projectsService.fetchById(projectId),
        { revalidateOnFocus: true }
    );

    return {
        project: data,
        isLoading,
        isValidating,
        isError: error
    };
}

export function useDashboardStats(range = '24h') {
    const { data, error, isLoading } = useSWR(
        ['fetchStats', range],
        ([_, r]) => projectsService.fetchStats(r),
        {
            refreshInterval: 10000, // Refresh global stats every 10s
            revalidateOnFocus: true,
        }
    );

    return {
        stats: data,
        isLoading,
        isError: error
    };
}

export function useProjectStats(projectId: string | null, range = '24h') {
    const { data, error, isLoading } = useSWR(
        projectId ? ['fetchProjectStats', projectId, range] : null,
        ([_, id, r]) => projectsService.fetchProjectStats(id, r),
        {
            refreshInterval: 5000, // Project specific stats refresh faster (5s)
            revalidateOnFocus: true,
        }
    );

    return {
        stats: data,
        isLoading,
        isError: error
    };
}

export function useRecentSessions(page = 1, limit = 5) {
    const { data, error, isLoading } = useSWR(
        ['fetchRecentSessions', page, limit],
        ([_, p, l]) => projectsService.fetchRecentSessions(p, l),
        {
            keepPreviousData: true,
            refreshInterval: 5000, // Auto refresh log stream
        }
    );

    return {
        sessions: data?.items || [],
        totalPages: data?.totalPages || 1,
        isLoading,
        isError: error
    };
}

export function useProjectSessions(projectId: string | null, page = 1, limit = 10) {
    const { data, error, isLoading } = useSWR(
        projectId ? ['fetchProjectSessions', projectId, page, limit] : null,
        ([_, id, p, l]) => projectsService.fetchProjectSessions(id, p, l),
        {
            keepPreviousData: true,
            refreshInterval: 5000,
        }
    );

    return {
        sessions: data?.items || [],
        totalPages: data?.totalPages || 1,
        isLoading,
        isError: error
    };
}

export function useSession(id: string | null) {
    const { data, error, isLoading, isValidating } = useSWR(
        id ? ['fetchSessionById', id] : null,
        ([_, sessionId]) => projectsService.fetchSessionById(sessionId),
        {
            revalidateOnFocus: true,
            keepPreviousData: false,
        }
    );

    return {
        session: data,
        isLoading,
        isValidating,
        isError: error
    };
}

// Helper to trigger global revalidation for projects
export const mutateProjects = () => mutate((key: any) => Array.isArray(key) && key[0] === 'fetchAll');
