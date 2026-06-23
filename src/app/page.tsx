import Navbar from "@/components/Navbar";
import Hero from "@/components/Sections/Hero";
import Stats from "@/components/Sections/Stats";
import WhatWeHelpWith from "@/components/Sections/WhatWeHelpWith";
import TailoredServices from "@/components/Sections/TailoredServices";
import HowItWorks from "@/components/Sections/HowItWorks";
import Testimonials from "@/components/Sections/Testimonials";
import FinalCTA from "@/components/Sections/FinalCTA";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Financial Clarity & Bookkeeping Support | Prospera Group Greensboro NC",
    description: "Prospera helps businesses across the U.S. with bookkeeping, reporting, tax-ready organization, cleanup, and clearer financial visibility. Based in Greensboro NC.",
    alternates: {
        canonical: "/",
    },
};

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <Stats />
            <WhatWeHelpWith />
            <TailoredServices />
            <HowItWorks />
            <Testimonials />
            <FinalCTA />
            <Footer />
        </main>
    );
}
