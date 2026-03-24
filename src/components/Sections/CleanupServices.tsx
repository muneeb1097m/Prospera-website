"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CleanupServices() {
    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                
                <div className="bg-[#111315] w-full p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    
                    {/* Left Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full aspect-[4/3] lg:aspect-[1.1] rounded-none overflow-hidden"
                    >
                        <Image
                            src="/ontimecleanup.png" 
                            alt="One-Time Cleanup"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Right Column - Content */}
                    <div className="flex flex-col justify-center text-white">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-serif font-normal leading-[1.1] mb-6">
                                One-Time Cleanup Services
                            </h2>
                            <p className="text-[15px] lg:text-[17px] text-white/80 font-sans font-light mb-10 max-w-lg leading-relaxed">
                                If your books are behind, we provide a one-time catch-up service to bring your accounts current before recurring services begin.
                            </p>

                            {/* Gray Callout Box */}
                            <div className="bg-[#2D3540] p-8 lg:p-10 rounded-[8px]">
                                {/* FIXED: Added font-bold to make it thick, italic, and uppercase */}
                                <h3 className="text-[12px] lg:text-[13px] font-serif italic font-bold text-white uppercase tracking-[0.15em] mb-5">
                                    Our Recurring Monthly Plans Cover
                                </h3>
                                <p className="text-[15px] lg:text-[16px] text-white/70 font-sans font-light leading-relaxed">
                                    Current and future months. If your books are currently behind (backlog), we will perform a &quot;One-Time Cleanup&quot; assessment. This work is quoted as a separate, one-time fee to ensure we start your monthly service with a clean slate.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}