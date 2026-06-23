"use client";
import { motion } from "framer-motion";

export default function ServicesOpening() {
    return (
        <section className="bg-[#FAF7F2] py-20 lg:py-28">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1300px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* Left Column - Large Callout */}
                    <div className="lg:col-span-5">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-[2rem] lg:text-[2.75rem] font-serif font-normal leading-[1.2] text-[#111315]"
                        >
                            Clean books matter. <br />
                            But businesses with more complexity need more than completed books.
                        </motion.h2>
                    </div>

                    {/* Right Column - Narrative Paragraphs */}
                    <div className="lg:col-span-7 text-left flex flex-col gap-6">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-[16px] lg:text-[18px] text-[#444444] font-sans font-light leading-relaxed"
                        >
                            Many businesses have bookkeeping in place, but still lack clarity. The reports may be generated. The accounts may be reconciled. The transactions may be categorized. But the owner may still be unsure about cash flow, profitability, tax exposure, payroll pressure, or what the numbers actually mean.
                        </motion.p>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-[16px] lg:text-[18px] text-[#111315] font-sans font-medium leading-relaxed"
                        >
                            That is where Prospera comes in. We provide bookkeeping, reporting, cleanup support, and tax-ready financial organization designed to help business owners understand their numbers with more confidence.
                        </motion.p>
                    </div>

                </div>
            </div>
        </section>
    );
}
