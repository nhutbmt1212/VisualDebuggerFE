'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Terminal, ArrowLeft, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 px-4">
                <div className="hidden lg:block">
                    <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
                        <div className="p-2 bg-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                            <Terminal className="text-white" size={24} />
                        </div>
                        <span className="text-white font-bold text-2xl tracking-tighter">VisualDebugger</span>
                    </Link>
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Start debugging in <span className="text-purple-500">minutes.</span>
                    </h2>
                    <ul className="space-y-6">
                        {[
                            "Real-time event streaming",
                            "Unlimited project history",
                            "Advanced team collaboration",
                            "Custom SQL tracing hooks"
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-zinc-400">
                                <CheckCircle size={20} className="text-purple-500" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
                        <div className="mb-8 lg:hidden text-center">
                            <Link href="/" className="inline-flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-purple-600 rounded-lg">
                                    <Terminal className="text-white" size={18} />
                                </div>
                                <span className="text-white font-bold text-xl">VisualDebugger</span>
                            </Link>
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2 text-center lg:text-left">Create Account</h1>
                        <p className="text-zinc-500 mb-8 text-center lg:text-left">No credit card required for free tier.</p>

                        <form className="space-y-4" onSubmit={handleRegister}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2 ml-1">First Name</label>
                                    <input type="text" required placeholder="John" className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-xl text-white outline-none focus:border-purple-500 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2 ml-1">Last Name</label>
                                    <input type="text" required placeholder="Doe" className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-xl text-white outline-none focus:border-purple-500 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2 ml-1">Email</label>
                                <input type="email" required placeholder="john@company.com" className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-xl text-white outline-none focus:border-purple-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2 ml-1">Password</label>
                                <input type="password" required placeholder="At least 8 chars" className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-xl text-white outline-none focus:border-purple-500 text-sm" />
                            </div>
                            <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20 mt-2">
                                Get Started
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-zinc-500">
                            Already have an account? <Link href="/login" className="text-purple-400 font-semibold hover:text-purple-300">Log in</Link>
                        </p>
                    </div>
                    <div className="mt-8 text-center">
                        <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors inline-flex items-center gap-1">
                            <ArrowLeft size={12} /> Back to landing
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
