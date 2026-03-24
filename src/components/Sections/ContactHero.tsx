"use client";
import { motion } from "framer-motion";
import Image from "next/image"; // Added missing Image import

export default function ContactHero() {
    return (
        /* FIXED: Background updated to your core brand dark slate #111315 */
        <section className="relative bg-[#111315] text-white pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden text-center">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* FIXED BADGE: Swapped rounded-full for rounded-[8px] to match the navbar button */}
                    <div className="bg-[#FEACC6] text-[#111315] px-6 py-2.5 rounded-[8px] text-[13px] font-sans font-bold uppercase tracking-[0.1em] mb-10 inline-block">
                        CONTACT PROSPERA
                    </div>
                    
                    {/* FIXED HEADING: Changed font-medium to font-normal for that premium, elegant serif look */}
                    <h1 className="text-[3rem] lg:text-[5.5rem] font-serif font-normal leading-[1.1] max-w-5xl mx-auto">
                        Start Your Recurring <br /> Bookkeeping Plan
                    </h1>
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