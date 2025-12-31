'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { SocialButtons } from './SocialButtons';
import Link from 'next/link';

export function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/projects';

    useEffect(() => {
        if (authService.isAuthenticated()) {
            router.replace(callbackUrl);
        }
    }, [callbackUrl, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await authService.register({ name, email, password });
            router.push(callbackUrl);
        } catch (err) {
            const error = err as Error;
            setError(error.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center md:text-left mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Join us today to start debugging faster.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-200 dark:border-red-900/30 text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-1.5 text-left">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="name">Full Name</label>
                    <input
                        className="w-full h-12 px-4 rounded-lg bg-slate-50 dark:bg-[#192633] border border-slate-300 dark:border-[#324d67] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-normal"
                        id="name"
                        placeholder="Jane Doe"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-1.5 text-left">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">Email Address</label>
                    <input
                        className="w-full h-12 px-4 rounded-lg bg-slate-50 dark:bg-[#192633] border border-slate-300 dark:border-[#324d67] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-normal"
                        id="email"
                        placeholder="jane@company.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-1.5 text-left">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            className="w-full h-12 px-4 pr-12 rounded-lg bg-slate-50 dark:bg-[#192633] border border-slate-300 dark:border-[#324d67] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-normal"
                            id="password"
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg shadow-purple-600/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
                </button>
            </form>

            <div className="relative my-8">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-[#324d67]"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-3 bg-white dark:bg-[#131d27] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                        Or continue with
                    </span>
                </div>
            </div>

            <SocialButtons />

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Already have an account? <Link className="text-purple-600 dark:text-purple-400 font-bold hover:underline" href="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
}
