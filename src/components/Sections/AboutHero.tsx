"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
    return (
        /* Updated background to your primary dark color to ensure consistency */
        <section className="relative bg-[#111315] text-white pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* FIXED BADGE: Changed rounded-full to rounded-[8px] and bumped the padding to match the design perfectly */}
                    <div className="bg-[#FEACC6] text-[#111315] px-6 py-2.5 rounded-[8px] text-[13px] font-sans font-bold uppercase tracking-[0.1em] mb-10 inline-block">
                        ABOUT PROSPERA
                    </div>
                    
                    {/* FIXED HEADING: Set to font-normal and added a <br /> to force the exact two-line split from Figma */}
                    <h1 className="text-[2.5rem] lg:text-[5rem] font-serif font-normal leading-[1.1] max-w-5xl mx-auto">
                        A Recurring System for <br className="hidden md:block" /> 
                        Organized Financial Oversight
                    </h1>
                </motion.div>
            </div>

            {/* FIXED LOGO: Updated to whitelogo.png and anchored heavily to the bottom right corner */}
            <div className="absolute -bottom-10 -right-10 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] opacity-[0.06] pointer-events-none">
                <Image
                    src="/whitelogo.png"
                    alt="Prospera Decoration"
                    fill
                    className="object-contain object-bottom right-0"
                    priority
                />
            </div>
        </section>
    );
}