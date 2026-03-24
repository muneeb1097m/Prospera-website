import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/Sections/FinalCTA";
import HowItWorksHero from "@/components/Sections/HowItWorksHero";
import HowItWorksSteps from "@/components/Sections/HowItWorksSteps";

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
