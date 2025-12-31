'use client';

import { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(authService.isAuthenticated());
            setIsLoading(false);
        };

        checkAuth();

        // Optional: Add event listener for storage changes if multiple tabs are used
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    return {
        isAuthenticated,
        isLoading,
        logout: () => authService.logout(),
    };
}
