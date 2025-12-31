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
    const { data, error, isLoading, isValidating, mutate: revalidate } = useSWR(
        id ? ['fetchById', id] : null,
        ([_, projectId]) => projectsService.fetchById(projectId),
        { revalidateOnFocus: true }
    );

    return {
        project: data,
        isLoading,
        isValidating,
        isError: error,
        mutate: revalidate
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
    const { data, error, isLoading, mutate: revalidate } = useSWR(
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
        isError: error,
        mutate: revalidate
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
    const { data, error, isLoading, mutate: revalidate } = useSWR(
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
        isError: error,
        mutate: revalidate
    };
}

export function useSession(id: string | null) {
    const { data, error, isLoading, isValidating, mutate: revalidate } = useSWR(
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
        isError: error,
        mutate: revalidate
    };
}

export function useSessionEvents(sessionId: string | null, page = 1, limit = 10) {
    const { data, error, isLoading, isValidating, mutate: revalidate } = useSWR(
        sessionId ? ['fetchSessionEvents', sessionId, page, limit] : null,
        ([_, sid, p, l]) => projectsService.fetchSessionEvents(sid, p, l),
        {
            revalidateOnFocus: false,
            keepPreviousData: true,
        }
    );

    return {
        events: data?.items || [],
        totalCount: data?.totalCount || 0,
        totalPages: data?.totalPages || 1,
        page: data?.page || page,
        limit: data?.limit || limit,
        hasNextPage: data?.hasNextPage || false,
        hasPreviousPage: data?.hasPreviousPage || false,
        isLoading,
        isValidating,
        isError: error,
        mutate: revalidate
    };
}

// Helper to trigger global revalidation for projects
export const mutateProjects = () => mutate((key: any) => Array.isArray(key) && key[0] === 'fetchAll');
