import type { Metadata } from 'next';
import { LandingNavbar, LandingFooter, Pricing } from '@/components/features/landing';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { ScrollToTop } from '@/components/shared/ScrollToTop';

export const metadata: Metadata = {
    title: 'Pricing - VisualDebugger',
    description: 'Simple, transparent pricing for VisualDebugger. Choose the plan that fits your needs.',
};

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-purple-500/30 selection:text-purple-200">
            <AnimatedBackground />
            <ScrollToTop />
            <LandingNavbar />
            <main className="pt-16">
                <Pricing />
            </main>
            <LandingFooter />
        </div>
    );
}
