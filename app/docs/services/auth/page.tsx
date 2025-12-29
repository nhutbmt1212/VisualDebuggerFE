'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <div className="absolute top-2 right-2 flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono">{language}</span>
                <button
                    onClick={handleCopy}
                    className="p-1.5 bg-slate-700/50 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                    {copied ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5" />}
                </button>
            </div>
            <pre className="bg-[#161b22] border border-slate-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-slate-300 font-mono whitespace-pre">{code}</code>
            </pre>
        </div>
    );
}

export default function AuthServicePage() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Services</span>
                    <span>/</span>
                </div>
                <h1 className="text-3xl font-bold text-white">authService</h1>
                <p className="text-slate-400 leading-relaxed">
                    Service để quản lý authentication: đăng nhập, đăng ký, và quản lý token.
                </p>
            </div>

            {/* Import */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Import</h2>
                <CodeBlock code={`import { authService } from '@/services/auth.service';`} />
            </section>

            {/* Methods */}
            <section className="space-y-6">
                <h2 className="text-xl font-bold text-white">Methods</h2>

                {/* login */}
                <div className="space-y-4 p-4 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white">
                        <code className="text-primary">login(input)</code>
                    </h3>
                    <p className="text-sm text-slate-400">
                        Đăng nhập user và lưu token vào localStorage.
                    </p>
                    <CodeBlock
                        code={`const handleLogin = async (email: string, password: string) => {
    try {
        const result = await authService.login({ email, password });
        
        console.log('User:', result.user.name);
        console.log('Token saved automatically');
        
        // Redirect to dashboard
        router.push('/projects');
    } catch (error) {
        console.error('Login failed:', error.message);
    }
};`}
                    />
                    <div className="text-sm">
                        <strong className="text-slate-300">Parameters:</strong>
                        <ul className="mt-2 space-y-1 text-slate-400">
                            <li>• <code className="text-primary">email</code>: string - Email đăng nhập</li>
                            <li>• <code className="text-primary">password</code>: string - Mật khẩu</li>
                        </ul>
                    </div>
                    <div className="text-sm">
                        <strong className="text-slate-300">Returns:</strong>
                        <code className="ml-2 text-slate-400">{`{ accessToken, user: { id, email, name } }`}</code>
                    </div>
                </div>

                {/* register */}
                <div className="space-y-4 p-4 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white">
                        <code className="text-primary">register(input)</code>
                    </h3>
                    <p className="text-sm text-slate-400">
                        Đăng ký user mới và tự động đăng nhập.
                    </p>
                    <CodeBlock
                        code={`const handleRegister = async (data: RegisterForm) => {
    try {
        const result = await authService.register({
            email: data.email,
            password: data.password,
            name: data.name
        });
        
        // Token đã được lưu, redirect
        router.push('/projects');
    } catch (error) {
        setError(error.message);
    }
};`}
                    />
                </div>

                {/* logout */}
                <div className="space-y-4 p-4 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white">
                        <code className="text-primary">logout()</code>
                    </h3>
                    <p className="text-sm text-slate-400">
                        Xóa token và redirect về trang login.
                    </p>
                    <CodeBlock
                        code={`// Logout và redirect
authService.logout();`}
                    />
                </div>

                {/* getToken */}
                <div className="space-y-4 p-4 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white">
                        <code className="text-primary">getToken()</code>
                    </h3>
                    <p className="text-sm text-slate-400">
                        Lấy token hiện tại từ localStorage.
                    </p>
                    <CodeBlock
                        code={`const token = authService.getToken();
// Returns: string | null`}
                    />
                </div>

                {/* isAuthenticated */}
                <div className="space-y-4 p-4 bg-slate-800/30 border border-slate-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white">
                        <code className="text-primary">isAuthenticated()</code>
                    </h3>
                    <p className="text-sm text-slate-400">
                        Kiểm tra user đã đăng nhập chưa.
                    </p>
                    <CodeBlock
                        code={`if (!authService.isAuthenticated()) {
    router.push('/login');
}
// Returns: boolean`}
                    />
                </div>
            </section>

            {/* Full Example */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">Complete Example</h2>
                <CodeBlock
                    code={`'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await authService.login({ email, password });
            router.push('/projects');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            
            <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Email"
            />
            <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password"
            />
            
            <button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
        </form>
    );
}`}
                />
            </section>
        </div>
    );
}
