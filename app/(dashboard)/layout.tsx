import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background-dark text-slate-200">
            <Sidebar />

            <div className="relative flex flex-col w-full md:flex-1 pb-28 md:pb-8">
                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
                    {children}
                </main>
                <BottomNav />
            </div>
        </div>
    );
}
