import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/Sections/FinalCTA";
import HowItWorksHero from "@/components/Sections/HowItWorksHero";
import HowItWorksSteps from "@/components/Sections/HowItWorksSteps";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How Our Financial Structure Review Works | Prospera Group",
    description: "See how Prospera reviews your books, reporting, cleanup needs, and tax readiness before building monthly financial support.",
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
            <FinalCTA 
                headline="Start With a Clearer Picture of Where Your Business Stands"
                body="If your business needs cleaner records, stronger reporting, tax-ready organization, or cleanup before monthly support begins, start with a Financial Structure Review."
                buttonText="Schedule a Financial Structure Review"
            />
            <Footer />
        </main>
    );
}
