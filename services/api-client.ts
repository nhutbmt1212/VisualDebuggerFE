import axios from 'axios';
import { print } from 'graphql';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the token
apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('visual_debugger_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Helper for GraphQL requests
export const graphqlRequest = async (query: any, variables = {}) => {
    const response = await apiClient.post('/graphql', {
        query: typeof query === 'string' ? query : print(query),
        variables,
    });

    if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
};

export default apiClient;
