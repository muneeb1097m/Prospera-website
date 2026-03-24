import Navbar from "@/components/Navbar";
import Hero from "@/components/Sections/Hero";
import Stats from "@/components/Sections/Stats";
import WhatWeHelpWith from "@/components/Sections/WhatWeHelpWith";
import TailoredServices from "@/components/Sections/TailoredServices";
import HowItWorks from "@/components/Sections/HowItWorks";
import Testimonials from "@/components/Sections/Testimonials";

import FinalCTA from "@/components/Sections/FinalCTA";
import Footer from "@/components/Footer";

import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const pageData = await client.fetch(PAGE_QUERY, { slug: "home" });
    const seo = pageData?.seo;

    return {
        title: seo?.metaTitle || "Prospera Group USA - Premium Bookkeeping Services",
        description: seo?.metaDescription || "Recurring Monthly Bookkeeping for U.S. Small Businesses",
        openGraph: {
            title: seo?.metaTitle,
            description: seo?.metaDescription,
            images: seo?.shareImage?.asset?.url ? [seo.shareImage.asset.url] : [],
        },
    };
}

export default async function Home() {
    let pageData = null;
    try {
        pageData = await client.fetch(PAGE_QUERY, { slug: "home" });
    } catch (e) {
        console.error("Sanity fetch failed:", e);
    }
    
    const sections = pageData?.sections || [];
    const heroData = sections.find((s: { _type: string }) => s._type === "hero");
    const statsData = sections.find((s: { _type: string }) => s._type === "stats");
    const whatWeHelpWithData = sections.find((s: { _type: string }) => s._type === "whatWeHelpWith");
    const tailoredServicesData = sections.find((s: { _type: string }) => s._type === "tailoredServices");
    const howItWorksData = sections.find((s: { _type: string }) => s._type === "howItWorks");

    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero data={heroData} />
            <Stats data={statsData} />
            <WhatWeHelpWith data={whatWeHelpWithData} />
            <TailoredServices data={tailoredServicesData} />
            <HowItWorks data={howItWorksData} />
            <Testimonials />
            <FinalCTA />
            <Footer />
        </main>
    );
}
