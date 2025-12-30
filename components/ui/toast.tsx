'use client';

import React, { useEffect, useState } from 'react';
import { X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
    onClose?: () => void;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function Toast({
    message,
    type = 'info',
    duration = 5000,
    onClose,
    action
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!isVisible) return null;

    const bgColors = {
        info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        success: 'bg-green-500/10 border-green-500/20 text-green-400',
        warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
        error: 'bg-red-500/10 border-red-500/20 text-red-400',
    };

    return (
        <div className={cn(
            'fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-sm animate-in slide-in-from-bottom-5 duration-300',
            bgColors[type]
        )}>
            <Zap className="size-4 shrink-0" />
            <span className="text-sm font-medium">{message}</span>
            {action && (
                <button
                    onClick={action.onClick}
                    className="text-xs font-bold uppercase tracking-wider hover:underline"
                >
                    {action.label}
                </button>
            )}
            <button
                onClick={() => {
                    setIsVisible(false);
                    onClose?.();
                }}
                className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
            >
                <X className="size-3" />
            </button>
        </div>
    );
}

// Toast container for managing multiple toasts
interface ToastItem extends ToastProps {
    id: string;
}

interface ToastContainerProps {
    toasts: ToastItem[];
    onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast, index) => (
                <div
                    key={toast.id}
                    style={{ transform: `translateY(-${index * 8}px)` }}
                >
                    <Toast
                        {...toast}
                        onClose={() => onRemove(toast.id)}
                    />
                </div>
            ))}
        </div>
    );
}

// Hook for managing toasts
export function useToast() {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = (toast: Omit<ToastItem, 'id'>) => {
        const id = Math.random().toString(36).substring(7);
        setToasts(prev => [...prev, { ...toast, id }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return { toasts, addToast, removeToast };
}
