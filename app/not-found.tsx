import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950">
            <div className="text-center space-y-6 p-8">
                <h1 className="text-8xl font-bold text-purple-500">404</h1>
                <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
                <p className="text-zinc-400">The page you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/">
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    );
}
