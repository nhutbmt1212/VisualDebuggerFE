import { graphqlRequest } from './api-client';
import {
    LoginDocument,
    RegisterDocument,
    RefreshTokenDocument,
    LogoutDocument,
    LoginInput,
    RegisterInput,
    LoginMutation,
    RegisterMutation,
    RefreshTokenMutation,
    LogoutMutation,
} from '../graphql/generated/graphql';

const ACCESS_TOKEN_KEY = 'visual_debugger_token';
const REFRESH_TOKEN_KEY = 'visual_debugger_refresh_token';

export const authService = {
    async login(input: LoginInput) {
        const data = await graphqlRequest<LoginMutation>(LoginDocument, { input });
        const { accessToken, refreshToken } = data.login;
        this.setTokens(accessToken, refreshToken);
        return data.login;
    },

    async register(input: RegisterInput) {
        const data = await graphqlRequest<RegisterMutation>(RegisterDocument, { input });
        const { accessToken, refreshToken } = data.register;
        this.setTokens(accessToken, refreshToken);
        return data.register;
    },

    async refreshTokens() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const data = await graphqlRequest<RefreshTokenMutation>(RefreshTokenDocument, {
            input: { refreshToken },
        });
        const { accessToken, refreshToken: newRefreshToken } = data.refreshToken;
        this.setTokens(accessToken, newRefreshToken);
        return data.refreshToken;
    },

    async logout() {
        const refreshToken = this.getRefreshToken();
        if (refreshToken) {
            try {
                await graphqlRequest<LogoutMutation>(LogoutDocument, {
                    input: { refreshToken },
                });
            } catch (error) {
                // Ignore errors during logout - we'll clear tokens anyway
                console.error('Logout API error:', error);
            }
        }

        this.clearTokens();
        if (typeof window !== 'undefined') {
            // Preserve current path to redirect back after login
            const currentPath = window.location.pathname;
            const callbackUrl = encodeURIComponent(currentPath);
            window.location.href = `/login?callbackUrl=${callbackUrl}`;
        }
    },

    setTokens(accessToken: string, refreshToken: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
    },

    clearTokens() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        }
    },

    getToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(ACCESS_TOKEN_KEY);
        }
        return null;
    },

    getRefreshToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(REFRESH_TOKEN_KEY);
        }
        return null;
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    hasRefreshToken() {
        return !!this.getRefreshToken();
    },
};
