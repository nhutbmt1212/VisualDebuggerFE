import { graphqlRequest } from './api-client';
import { GetProjectsDocument } from '../graphql/generated/graphql';

export const projectsService = {
    async fetchAll() {
        const data = await graphqlRequest(GetProjectsDocument);
        return data.projects;
    },
};
