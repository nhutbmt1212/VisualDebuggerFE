import { graphqlRequest } from './api-client';
import {
    GetProjectsDocument,
    CreateProjectDocument,
    CreateProjectInput,
    GetProjectDocument,
    GetDashboardStatsDocument,
    GetRecentSessionsDocument,
    GetProjectSessionsDocument,
    GetProjectStatsDocument,
    GetSessionDocument,
    GetSessionEventsDocument,
    RegenerateProjectKeyDocument,
    GetProjectsQuery,
    GetProjectQuery,
    CreateProjectMutation,
    GetDashboardStatsQuery,
    GetRecentSessionsQuery,
    GetProjectSessionsQuery,
    GetProjectStatsQuery,
    GetSessionQuery,
    GetSessionEventsQuery,
    RegenerateProjectKeyMutation
} from '../graphql/generated/graphql';

export const projectsService = {
    async fetchAll(page = 1, limit = 10) {
        const data = await graphqlRequest<GetProjectsQuery>(GetProjectsDocument, { page, limit });
        return data.projects;
    },
    async create(input: CreateProjectInput) {
        const data = await graphqlRequest<CreateProjectMutation>(CreateProjectDocument, { input });
        return data.createProject;
    },
    async regenerateApiKey(projectId: string) {
        const data = await graphqlRequest<RegenerateProjectKeyMutation>(RegenerateProjectKeyDocument, { id: projectId });
        return data.regenerateProjectKey;
    },
    async fetchById(id: string) {
        const data = await graphqlRequest<GetProjectQuery>(GetProjectDocument, { id });
        return data.project;
    },
    async fetchStats(range = '24h') {
        const data = await graphqlRequest<GetDashboardStatsQuery>(GetDashboardStatsDocument, { range });
        return data.dashboardStats;
    },
    async fetchRecentSessions(page = 1, limit = 5) {
        const data = await graphqlRequest<GetRecentSessionsQuery>(GetRecentSessionsDocument, { page, limit });
        return data.recentSessions;
    },
    async fetchProjectSessions(projectId: string, page = 1, limit = 10) {
        const data = await graphqlRequest<GetProjectSessionsQuery>(GetProjectSessionsDocument, { projectId, page, limit });
        return data.sessions;
    },
    async fetchProjectStats(projectId: string, range = '24h') {
        const data = await graphqlRequest<GetProjectStatsQuery>(GetProjectStatsDocument, { projectId, range });
        return data.projectStats;
    },
    async fetchSessionById(id: string) {
        const data = await graphqlRequest<GetSessionQuery>(GetSessionDocument, { id });
        return data.session;
    },
    async fetchSessionEvents(sessionId: string, page = 1, limit = 10) {
        const data = await graphqlRequest<GetSessionEventsQuery>(GetSessionEventsDocument, { sessionId, page, limit });
        return data.sessionEvents;
    }
};
