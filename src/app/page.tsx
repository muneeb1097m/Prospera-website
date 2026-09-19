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
import { getAllSiteContent } from "@/lib/content/getContent";

export const metadata: Metadata = {
    title: "Financial Clarity & Bookkeeping Support | Prospera Group Greensboro NC",
    description: "Prospera helps businesses across the U.S. with bookkeeping, reporting, tax-ready organization, cleanup, and clearer financial visibility. Based in Greensboro NC.",
    alternates: {
        canonical: "/",
    },
};

export default async function Home() {
    const content = await getAllSiteContent();

    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero content={content.home_hero} />
            <Stats content={content.home_stats} />
            <WhatWeHelpWith content={content.home_what_we_help_with} />
            <TailoredServices content={content.home_tailored_services} />
            <HowItWorks content={content.home_how_it_works} />
            <Testimonials content={content.home_testimonials} />
            <FinalCTA
                headline={content.home_final_cta.headline}
                body={content.home_final_cta.body}
                buttonText={content.home_final_cta.buttonText}
            />
            <Footer content={content.contact_info} />
        </main>
    );
}
