"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface HeroProps {
    data?: {
        titleLine1?: string;
        titleLine2Italic?: string;
        titleLine2Normal?: string;
        titleLine3?: string;
        subtitle?: string;
        ctaText?: string;
        image?: { _type: string; asset: { _ref: string; _type: string } };
    }
}

export default function Hero({ data }: HeroProps) {
    const line1 = data?.titleLine1 || "Recurring Monthly";
    const line2Italic = data?.titleLine2Italic || "Bookkeeping";
    const line2Normal = data?.titleLine2Normal || "for U.S.";
    const line3 = data?.titleLine3 || "Small Businesses";
    
    const subtitle = data?.subtitle || "A structured monthly system that keeps your books accurate, your taxes predictable, and your decisions clearer year-round.";
    const ctaText = data?.ctaText || "CONTACT US";
    
    const imageUrl = data?.image ? urlFor(data.image).url() : "/hero1.jpg";

    return (
        <section className="relative bg-[#111315] text-white min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden py-24 lg:py-0">
            <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                
                {/* Left Column - Content */}
                {/* FIXED: Increased the width allowance slightly so the text has room to stretch */}
                <div className="w-full lg:w-[55%] xl:w-[55%]">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-[700px]"
                    >
                        {/* FIXED: Adjusted font sizes and added lg:whitespace-nowrap to FORCE the 3 lines! */}
                        <h1 className="text-[2.75rem] md:text-[4rem] lg:text-[3.5rem] xl:text-[4.5rem] font-serif font-normal leading-[1.1] tracking-tight text-white mb-8">
                            <span className="block lg:whitespace-nowrap">{line1}</span>
                            <span className="block lg:whitespace-nowrap">
                                <span className="italic text-[#FEACC6] font-bold">{line2Italic}</span> <span className="font-serif font-normal">{line2Normal}</span>
                            </span>
                            <span className="block lg:whitespace-nowrap">{line3}</span>
                        </h1>

                        <p className="text-[15px] lg:text-[17px] text-white/80 font-sans font-light max-w-[420px] mb-10 leading-relaxed">
                            {subtitle}
                        </p>

                        <Link href="/contact" className="bg-[#FEACC6] hover:bg-[#fca1be] text-[#111315] px-10 py-4 font-sans font-bold text-[13px] tracking-[0.1em] rounded-[8px] transition-colors uppercase inline-block text-center">
                            {ctaText}
                        </Link>
                    </motion.div>
                </div>

                {/* Right Column - Massive Image */}
                <div className="w-full lg:w-[45%] xl:w-[45%] relative flex justify-center lg:justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="relative w-full max-w-[700px]"
                    >
                        <Image
                            src={imageUrl}
                            alt="Prospera Bookkeeping"
                            width={1200}
                            height={800}
                            /* Ensure image remains huge with soft rounded borders */
                            className="w-full h-auto rounded-[16px] lg:rounded-[24px] shadow-2xl"
                            priority
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}