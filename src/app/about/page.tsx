import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/Sections/FinalCTA";
import AboutHero from "@/components/Sections/AboutHero";
import AboutOpening from "@/components/Sections/AboutOpening";
import AboutFounder from "@/components/Sections/AboutFounder";
import WhyDifferent from "@/components/Sections/WhyDifferent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Prospera Group | IRS Enrolled Agent-Led Financial Support",
    description: "Prospera is led by an IRS Enrolled Agent helping businesses build cleaner books, clearer reporting, and year-round tax readiness.",
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <AboutHero />
            <AboutOpening />
            <AboutFounder />
            <WhyDifferent />
            <FinalCTA 
                headline="If Your Business Has Outgrown Basic Bookkeeping, We Can Help."
                body="Prospera helps businesses create cleaner records, clearer reporting, tax-ready organization, and better financial visibility."
                buttonText="Schedule a Financial Structure Review"
            />
            <Footer />
        </main>
    );
}
