"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ServicesHeroContent } from "@/lib/content/defaults";

interface ServicesHeroProps {
    content?: ServicesHeroContent;
}

export default function ServicesHero({ content }: ServicesHeroProps) {
    const badge = content?.badge || "SERVICES";
    const heading = content?.heading || "Monthly Financial Clarity & Bookkeeping Support";
    const description = content?.description || "When your business has more moving parts, basic bookkeeping stops being enough. Prospera provides monthly financial support for businesses that need cleaner records, clearer reporting, tax-ready organization, and better visibility before decisions are made.";

    return (
        <section className="relative bg-[#111315] text-white pt-28 pb-12 lg:pt-32 lg:pb-16 overflow-hidden text-center">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <div className="bg-[#FEACC6] text-[#111315] px-6 py-2.5 rounded-[8px] text-[13px] font-sans font-bold uppercase tracking-[0.1em] mb-10 inline-block">
                        {badge}
                    </div>

                    <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] font-serif font-normal leading-[1.1] max-w-5xl mx-auto">
                        {heading}
                    </h1>
                    <p className="text-[16px] lg:text-[19px] text-white/80 font-sans font-light max-w-3xl mx-auto mt-8 leading-relaxed">
                        {description}
                    </p>
                </motion.div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] opacity-[0.06] pointer-events-none">
                <Image
                    src="/whitelogo.png"
                    alt=""
                    fill
                    className="object-contain object-bottom right-0"
                    priority
                />
            </div>
        </section>
    );
}