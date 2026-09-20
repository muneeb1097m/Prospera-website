import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/Sections/ContactHero";
import ContactForm from "@/components/Sections/ContactForm";
import AlternativeContact from "@/components/Sections/AlternativeContact";
import { Metadata } from "next";
import { getAllSiteContent } from "@/lib/content/getContent";

export const metadata: Metadata = {
    title: "Schedule a Financial Structure Review | Prospera Group Greensboro NC",
    description: "Request a Financial Structure Review for bookkeeping, cleanup, reporting, tax-ready support, and clearer financial visibility.",
    alternates: {
        canonical: "/contact",
    },
};

export default async function ContactPage() {
    const content = await getAllSiteContent();

    return (
        <main className="min-h-screen">
            <Navbar />
            <ContactHero content={content.contact_hero} />
            <ContactForm content={content.contact_form_info} />
            <AlternativeContact content={content.contact_alternative} />
            <Footer content={content.contact_info} />
        </main>
    );
}
