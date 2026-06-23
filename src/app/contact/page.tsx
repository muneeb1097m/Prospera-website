import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/Sections/ContactHero";
import ContactForm from "@/components/Sections/ContactForm";
import AlternativeContact from "@/components/Sections/AlternativeContact";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Schedule a Financial Structure Review | Prospera Group Greensboro NC",
    description: "Request a Financial Structure Review for bookkeeping, cleanup, reporting, tax-ready support, and clearer financial visibility.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <ContactHero />
            <ContactForm />
            <AlternativeContact />
            <Footer />
        </main>
    );
}
