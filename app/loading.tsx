export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-zinc-400">Loading...</p>
            </div>
        </div>
    );
}
