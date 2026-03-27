import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/Sections/FinalCTA";
import HowItWorksHero from "@/components/Sections/HowItWorksHero";
import HowItWorksSteps from "@/components/Sections/HowItWorksSteps";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How It Works",
    description: "Discover our simple, streamlined bookkeeping process. We handle the numbers so you can focus on growing your business.",
    alternates: {
        canonical: "/how-it-works",
    },
};

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <HowItWorksHero />
            <HowItWorksSteps />
            <FinalCTA />
            <Footer />
        </main>
    );
}
