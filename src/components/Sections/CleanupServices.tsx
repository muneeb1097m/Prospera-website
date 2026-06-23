"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Wrench } from "lucide-react";

export default function CleanupServices() {
    const cleanupIncludes = [
        "Reviewing prior transactions",
        "Correcting categorization issues",
        "Reconciling bank & credit card accounts",
        "Organizing missing records",
        "Reviewing balance sheet issues",
        "Preparing the books for ongoing monthly support"
    ];

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                
                <div className="bg-[#111315] w-full p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center rounded-[16px]">
                    
                    {/* Left Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full aspect-[4/3] lg:aspect-[1.1] rounded-[8px] overflow-hidden"
                    >
                        <Image
                            src="/ontimecleanup.png" 
                            alt="Cleanup and Catch-Up Support"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Right Column - Content */}
                    <div className="flex flex-col justify-center text-white text-left">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-serif font-normal leading-[1.1] mb-6">
                                Cleanup & Catch-Up Support
                            </h2>
                            <p className="text-[15px] lg:text-[17px] text-white/80 font-sans font-light mb-8 max-w-lg leading-relaxed">
                                If your books are behind, messy, or unclear, ongoing monthly support may not be the first step. Prospera can review your current financial records and identify what needs to be cleaned up before a monthly process begins.
                            </p>

                            {/* Callout Box */}
                            <div className="bg-[#2D3540] p-8 lg:p-10 rounded-[8px]">
                                <div className="flex items-center gap-3 mb-6">
                                    <Wrench className="w-5 h-5 text-[#FEACC6]" />
                                    <h3 className="text-[12px] lg:text-[13px] font-serif italic font-bold text-white uppercase tracking-[0.15em]">
                                        What Cleanup Work May Include
                                    </h3>
                                </div>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {cleanupIncludes.map((item, idx) => (
                                        <li key={idx} className="text-[13px] lg:text-[14px] text-white/80 font-sans font-light leading-relaxed flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-[#FEACC6] rounded-full shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}