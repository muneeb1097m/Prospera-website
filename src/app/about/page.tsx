import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/Sections/FinalCTA";
import AboutHero from "@/components/Sections/AboutHero";
import AboutOpening from "@/components/Sections/AboutOpening";
import AboutFounder from "@/components/Sections/AboutFounder";
import WhyDifferent from "@/components/Sections/WhyDifferent";
import { Metadata } from "next";
import { getAllSiteContent } from "@/lib/content/getContent";

export const metadata: Metadata = {
    title: "About Prospera Group | IRS Enrolled Agent-Led Financial Support",
    description: "Prospera is led by an IRS Enrolled Agent helping businesses build cleaner books, clearer reporting, and year-round tax readiness.",
    alternates: {
        canonical: "/about",
    },
};

export default async function AboutPage() {
    const content = await getAllSiteContent();

    return (
        <main className="min-h-screen">
            <Navbar />
            <AboutHero content={content.about_hero} />
            <AboutOpening content={content.about_opening} />
            <AboutFounder content={content.about_founder} />
            <WhyDifferent content={content.about_why_different} />
            <FinalCTA 
                headline={content.about_final_cta?.headline || "If Your Business Has Outgrown Basic Bookkeeping, We Can Help."}
                body={content.about_final_cta?.body || "Prospera helps businesses create cleaner records, clearer reporting, tax-ready organization, and better financial visibility."}
                buttonText={content.about_final_cta?.buttonText || "Schedule a Financial Structure Review"}
            />
            <Footer content={content.contact_info} />
        </main>
    );
}
