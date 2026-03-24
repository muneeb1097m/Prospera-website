import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/Sections/FinalCTA";
import ServicesHero from "@/components/Sections/ServicesHero";
import MonthlyBookkeeping from "@/components/Sections/MonthlyBookkeeping";
import FinancialInsights from "@/components/Sections/FinancialInsights";
import CleanupServices from "@/components/Sections/CleanupServices";
import RecurringModelWorks from "@/components/Sections/RecurringModelWorks";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services",
    description: "Explore our range of bookkeeping services, including monthly reporting, financial insights, and cleanup services.",
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <ServicesHero />
            <MonthlyBookkeeping />
            <FinancialInsights />
            <CleanupServices />
            <RecurringModelWorks />
            <FinalCTA />
            <Footer />
        </main>
    );
}
