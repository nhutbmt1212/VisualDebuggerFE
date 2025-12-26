'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Terminal, Github, Chrome, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="p-2 bg-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                            <Terminal className="text-white" size={24} />
                        </div>
                        <span className="text-white font-bold text-2xl tracking-tighter">VisualDebugger</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
                    <p className="text-zinc-500">Sign in to your debugging workspace</p>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
                    <div className="space-y-4 mb-8">
                        <button className="w-full py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-zinc-700 transition-all">
                            <Github size={20} /> Continue with GitHub
                        </button>
                        <button className="w-full py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-zinc-700 transition-all">
                            <Chrome size={20} /> Continue with Google
                        </button>
                    </div>

                    <div className="relative mb-8 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-800"></div>
                        </div>
                        <span className="relative bg-zinc-900/50 px-4 text-xs font-bold text-zinc-600 uppercase tracking-widest">or email</span>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                            <input type="email" required placeholder="name@company.com" className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2 ml-1">
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-[10px] text-purple-400 hover:text-purple-300 font-bold uppercase">Forgot?</a>
                            </div>
                            <input type="password" required placeholder="••••••••" className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-xl text-white outline-none focus:border-purple-500 transition-colors" />
                        </div>
                        <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20">
                            Sign In
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-zinc-500">
                        Don&apos;t have an account? <Link href="/register" className="text-purple-400 font-semibold hover:text-purple-300">Create one</Link>
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors inline-flex items-center gap-1">
                        <ArrowLeft size={12} /> Back to landing
                    </Link>
                </div>
            </div>
        </div>
    );
}
