import {
    Hero,
    LandingNavbar,
    Features,
    CodePreview,
    DashboardMockup,
    Statistics,
    CallToAction,
    LandingFooter
} from '@/components/features/landing';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { ScrollToTop } from '@/components/shared/ScrollToTop';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-purple-500/30 selection:text-purple-200">
            <AnimatedBackground />
            <ScrollToTop />
            <LandingNavbar />
            <main>
                <Hero />
                <section id="preview" className="py-20 px-4">
                    <DashboardMockup />
                </section>
                <Features />
                <CodePreview />
                <Statistics />
                <CallToAction />
            </main>
            <LandingFooter />
        </div>
    );
}
