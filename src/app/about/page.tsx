import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/Sections/FinalCTA";
import AboutHero from "@/components/Sections/AboutHero";
import AboutLeadership from "@/components/Sections/AboutLeadership";
import WhyDifferent from "@/components/Sections/WhyDifferent";
import AboutFounder from "@/components/Sections/AboutFounder";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about Prospera Group USA and our dedicated team of bookkeeping professionals.",
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <AboutHero />
            <AboutLeadership />
            <WhyDifferent />
            <AboutFounder />
            <FinalCTA />
            <Footer />
        </main>
    );
}
