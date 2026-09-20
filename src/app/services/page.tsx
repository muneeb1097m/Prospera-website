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
import { getAllSiteContent } from "@/lib/content/getContent";

export const metadata: Metadata = {
    title: "Bookkeeping, Financial Reporting & Tax-Ready Support in Greensboro NC | Prospera Group",
    description: "Prospera Group helps businesses with monthly bookkeeping, financial reporting, cleanup support, tax-ready records, and financial clarity. Based in Greensboro NC.",
    alternates: {
        canonical: "/services",
    },
};

export default async function ServicesPage() {
    const content = await getAllSiteContent();

    return (
        <main className="min-h-screen">
            <Navbar />
            <ServicesHero content={content.services_hero} />
            <ServicesOpening content={content.services_opening} />
            <MonthlyBookkeeping content={content.services_monthly_bookkeeping} />
            <FinancialInsights content={content.services_financial_insights} />
            <CleanupServices content={content.services_cleanup} />
            <ServicesWhoIsItFor content={content.services_who_is_it_for} />
            <FinalCTA 
                headline={content.services_final_cta?.headline || "Ready for Cleaner Records and Clearer Financial Visibility?"}
                body={content.services_final_cta?.body || "If your business needs bookkeeping, reporting, tax-ready support, or cleanup before monthly support begins, Prospera can help identify the right next step."}
                buttonText={content.services_final_cta?.buttonText || "Schedule a Financial Structure Review"}
            />
            <Footer content={content.contact_info} />
        </main>
    );
}
