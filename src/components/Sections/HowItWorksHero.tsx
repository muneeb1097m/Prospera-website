"use client";
import { motion } from "framer-motion";
import Image from "next/image"; // Added missing Image import

export default function HowItWorksHero() {
    return (
        /* FIXED: Background updated to your core brand dark slate #111315 */
        <section className="relative bg-[#111315] text-white pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden text-center">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* FIXED BADGE: Swapped rounded-full for rounded-[8px] and fixed the padding/font-weight */}
                    <div className="bg-[#FEACC6] text-[#111315] px-6 py-2.5 rounded-[8px] text-[13px] font-sans font-bold uppercase tracking-[0.1em] mb-10 inline-block">
                        HOW IT WORKS
                    </div>
                    
                    {/* FIXED HEADING: Changed font-medium to font-normal to keep Didot elegant */}
                    <h1 className="text-[2.5rem] lg:text-[5rem] font-serif font-normal leading-[1.1] max-w-5xl mx-auto">
                        How Prospera Builds Financial Clarity
                    </h1>
                    <p className="text-[16px] lg:text-[19px] text-white/80 font-sans font-light max-w-3xl mx-auto mt-8 leading-relaxed">
                        Prospera’s process is designed to help business owners move from unclear records and reactive decisions to cleaner books, clearer reporting, and stronger tax-ready organization.
                    </p>
                </motion.div>
            </div>

            {/* FIXED DECORATION: Added the missing whitelogo.png anchored to the bottom right */}
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