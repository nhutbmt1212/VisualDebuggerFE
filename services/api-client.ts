import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { print } from 'graphql';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

const ACCESS_TOKEN_KEY = 'visual_debugger_token';
const REFRESH_TOKEN_KEY = 'visual_debugger_refresh_token';

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Add a request interceptor to add the token
apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Add a response interceptor to handle 401 and auto-refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // Check if it's a 401 error and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Check if the failed request was a refresh token request itself
            const requestData = originalRequest.data
                ? JSON.parse(originalRequest.data)
                : {};
            const isRefreshRequest =
                requestData.query?.includes('refreshToken') ||
                requestData.operationName === 'RefreshToken';

            if (isRefreshRequest) {
                // Refresh token is invalid, clear tokens and redirect to login
                if (typeof window !== 'undefined') {
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                    localStorage.removeItem(REFRESH_TOKEN_KEY);
                    const callbackUrl = encodeURIComponent(window.location.pathname);
                    window.location.href = `/login?callbackUrl=${callbackUrl}`;
                }
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Queue the request while refreshing
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken =
                typeof window !== 'undefined'
                    ? localStorage.getItem(REFRESH_TOKEN_KEY)
                    : null;

            if (!refreshToken) {
                isRefreshing = false;
                if (typeof window !== 'undefined') {
                    const callbackUrl = encodeURIComponent(window.location.pathname);
                    window.location.href = `/login?callbackUrl=${callbackUrl}`;
                }
                return Promise.reject(error);
            }

            try {
                // Call refresh token API
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/graphql`,
                    {
                        query: `
              mutation RefreshToken($input: RefreshTokenInput!) {
                refreshToken(input: $input) {
                  accessToken
                  refreshToken
                }
              }
            `,
                        variables: {
                            input: { refreshToken },
                        },
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );

                if (response.data.errors) {
                    throw new Error(response.data.errors[0].message);
                }

                const { accessToken, refreshToken: newRefreshToken } =
                    response.data.data.refreshToken;

                // Save new tokens
                if (typeof window !== 'undefined') {
                    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
                    localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
                }

                // Process queued requests with new token
                processQueue(null, accessToken);

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh failed, clear tokens and redirect to login
                processQueue(refreshError as Error, null);
                if (typeof window !== 'undefined') {
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                    localStorage.removeItem(REFRESH_TOKEN_KEY);
                    const callbackUrl = encodeURIComponent(window.location.pathname);
                    window.location.href = `/login?callbackUrl=${callbackUrl}`;
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

// Helper for GraphQL requests
export const graphqlRequest = async <T = unknown>(
    query: unknown,
    variables: Record<string, unknown> = {},
): Promise<T> => {
    const response = await apiClient.post('/graphql', {
        query: typeof query === 'string' ? query : print(query as Parameters<typeof print>[0]),
        variables,
    });

    if (response.data.errors) {
        const errorMessage = response.data.errors[0].message;

        // Check for authentication errors in GraphQL response
        const isAuthError =
            errorMessage.toLowerCase().includes('unauthorized') ||
            errorMessage.toLowerCase().includes('unauthenticated') ||
            errorMessage.toLowerCase().includes('jwt') ||
            errorMessage.toLowerCase().includes('token');

        if (isAuthError && typeof window !== 'undefined') {
            // Clear tokens and redirect to login
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            const callbackUrl = encodeURIComponent(window.location.pathname);
            window.location.href = `/login?callbackUrl=${callbackUrl}`;
            // Return a never-resolving promise to prevent UI from showing error
            return new Promise(() => { });
        }

        throw new Error(errorMessage);
    }

    return response.data.data as T;
};

export default apiClient;
