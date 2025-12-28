import { graphqlRequest } from './api-client';
import { GetProjectsDocument, CreateProjectDocument, CreateProjectInput, GetProjectDocument, GetDashboardStatsDocument, GetRecentSessionsDocument, GetProjectSessionsDocument } from '../graphql/generated/graphql';

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
    async fetchStats() {
        const data = await graphqlRequest(GetDashboardStatsDocument, {});
        return data.dashboardStats;
    },
    async fetchRecentSessions(limit = 5) {
        const data = await graphqlRequest(GetRecentSessionsDocument, { limit });
        return data.recentSessions;
    },
    async fetchProjectSessions(projectId: string) {
        const data = await graphqlRequest(GetProjectSessionsDocument, { projectId });
        return data.sessions;
    },
};
