import { graphqlRequest } from './api-client';
import { GetProjectsDocument, CreateProjectDocument, CreateProjectInput, GetProjectDocument, GetDashboardStatsDocument, GetRecentSessionsDocument, GetProjectSessionsDocument, GetProjectStatsDocument, GetSessionDocument, GetSessionEventsDocument } from '../graphql/generated/graphql';

export const projectsService = {
    async fetchAll(page = 1, limit = 10) {
        const data = await graphqlRequest(GetProjectsDocument, { page, limit });
        return data.projects;
    },
    async create(input: CreateProjectInput) {
        const data = await graphqlRequest(CreateProjectDocument, { input });
        return data.createProject;
    },
    async fetchById(id: string) {
        const data = await graphqlRequest(GetProjectDocument, { id });
        return data.project;
    },
    async fetchStats(range = '24h') {
        const data = await graphqlRequest(GetDashboardStatsDocument, { range });
        return data.dashboardStats;
    },
    async fetchRecentSessions(page = 1, limit = 5) {
        const data = await graphqlRequest(GetRecentSessionsDocument, { page, limit });
        return data.recentSessions;
    },
    async fetchProjectSessions(projectId: string, page = 1, limit = 10) {
        const data = await graphqlRequest(GetProjectSessionsDocument, { projectId, page, limit });
        return data.sessions;
    },
    async fetchProjectStats(projectId: string, range = '24h') {
        const data = await graphqlRequest(GetProjectStatsDocument, { projectId, range });
        return data.projectStats;
    },
    async fetchSessionById(id: string) {
        const data = await graphqlRequest(GetSessionDocument, { id });
        return data.session;
    },
    async fetchSessionEvents(sessionId: string, page = 1, limit = 10) {
        const data = await graphqlRequest(GetSessionEventsDocument, { sessionId, page, limit });
        return data.sessionEvents;
    }
};
