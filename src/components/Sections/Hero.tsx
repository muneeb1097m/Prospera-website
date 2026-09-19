"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HeroContent } from "@/lib/content/defaults";

export default function Hero({ content }: { content?: Partial<HeroContent> } = {}) {
    const line1Prefix = content?.line1Prefix ?? "Your Revenue ";
    const line1Emphasis = content?.line1Emphasis ?? "Is Growing.";
    const line2 = content?.line2 ?? "Your Numbers Should Keep Up.";
    
    const subtitle = content?.subtitle ?? "When your books are done but your reports still do not make sense, financial decisions get harder than they should be. Prospera helps build the clarity and organization that changes that. No more guesswork.";
    const ctaPrimaryText = content?.ctaPrimaryText ?? "Schedule a Financial Structure Review";
    const ctaSecondaryText = content?.ctaSecondaryText ?? "See How the Process Works";
    const trustText = content?.trustText ?? "Based in Greensboro, North Carolina, Prospera supports businesses across the U.S. that need cleaner bookkeeping, clearer financial reporting, and stronger tax-ready organization throughout the year.";
    const imageUrl = "/hero1.jpg";

    return (
        <section className="relative bg-[#111315] text-white min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden py-24 lg:py-0">
            <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                
                {/* Left Column - Content (Increased width for headline space) */}
                <div className="w-full lg:w-[58%] xl:w-[60%] pt-16 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-[700px]"
                    >
                        {/* Responsive font sizing and whitespace wrapping to prevent overlap */}
                        <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[2.75rem] xl:text-[3.5rem] font-serif font-normal leading-[1.2] tracking-tight text-white mb-8">
                            <span className="block sm:whitespace-nowrap">
                                {line1Prefix}
                                <span className="italic text-[#FEACC6] font-bold">{line1Emphasis}</span>
                            </span>
                            <span className="block sm:whitespace-nowrap mt-2 md:mt-4">
                                {line2}
                            </span>
                        </h1>

                        <p className="text-[15px] lg:text-[17px] text-white/80 font-sans font-light max-w-[480px] mb-10 leading-relaxed">
                            {subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link href="/contact" className="w-full sm:w-auto bg-[#FEACC6] hover:bg-[#fca1be] text-[#111315] px-6 lg:px-8 py-4 font-sans font-bold text-[13px] tracking-[0.1em] rounded-[8px] transition-colors uppercase text-center">
                                {ctaPrimaryText}
                            </Link>
                            <Link href="/how-it-works" className="w-full sm:w-auto border border-white hover:bg-white/10 text-white px-6 lg:px-8 py-4 font-sans font-bold text-[13px] tracking-[0.1em] rounded-[8px] transition-colors uppercase text-center">
                                {ctaSecondaryText}
                            </Link>
                        </div>

                        {/* Local / Trust Line */}
                        <p className="mt-8 text-[13px] text-white/50 font-sans font-light max-w-[500px] leading-relaxed">
                            {trustText}
                        </p>
                    </motion.div>
                </div>

                {/* Right Column - Massive Image */}
                <div className="w-full lg:w-[42%] xl:w-[40%] relative flex justify-center lg:justify-end">
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