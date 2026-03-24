import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/Sections/ContactHero";
import ContactForm from "@/components/Sections/ContactForm";
import AlternativeContact from "@/components/Sections/AlternativeContact";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Prospera Group USA for specialized bookkeeping services.",
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
