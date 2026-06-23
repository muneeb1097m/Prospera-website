import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/Sections/FinalCTA";
import ServicesHero from "@/components/Sections/ServicesHero";
import ServicesOpening from "@/components/Sections/ServicesOpening";
import MonthlyBookkeeping from "@/components/Sections/MonthlyBookkeeping";
import FinancialInsights from "@/components/Sections/FinancialInsights";
import CleanupServices from "@/components/Sections/CleanupServices";
import ServicesWhoIsItFor from "@/components/Sections/ServicesWhoIsItFor";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bookkeeping, Financial Reporting & Tax-Ready Support in Greensboro NC | Prospera Group",
    description: "Prospera Group helps businesses with monthly bookkeeping, financial reporting, cleanup support, tax-ready records, and financial clarity. Based in Greensboro NC.",
    alternates: {
        canonical: "/services",
    },
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <ServicesHero />
            <ServicesOpening />
            <MonthlyBookkeeping />
            <FinancialInsights />
            <CleanupServices />
            <ServicesWhoIsItFor />
            <FinalCTA 
                headline="Ready for Cleaner Records and Clearer Financial Visibility?"
                body="If your business needs bookkeeping, reporting, tax-ready support, or cleanup before monthly support begins, Prospera can help identify the right next step."
                buttonText="Schedule a Financial Structure Review"
            />
            <Footer />
        </main>
    );
}
