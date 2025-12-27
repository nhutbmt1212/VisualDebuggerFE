import { graphqlRequest } from './api-client';
import { LoginDocument, RegisterDocument, LoginInput, RegisterInput } from '../graphql/generated/graphql';

const TOKEN_KEY = 'visual_debugger_token';

export const authService = {
    async login(input: LoginInput) {
        const data = await graphqlRequest(LoginDocument, { input });
        const { accessToken } = data.login;
        this.setToken(accessToken);
        return data.login;
    },

    async register(input: RegisterInput) {
        const data = await graphqlRequest(RegisterDocument, { input });
        const { accessToken } = data.register;
        this.setToken(accessToken);
        return data.register;
    },

    logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEY);
            window.location.href = '/login';
        }
    },

    setToken(token: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_KEY, token);
        }
    },

    getToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(TOKEN_KEY);
        }
        return null;
    },

    isAuthenticated() {
        return !!this.getToken();
    },
};
