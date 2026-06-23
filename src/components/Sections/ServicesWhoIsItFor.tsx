"use client";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";

export default function ServicesWhoIsItFor() {
    const listItems = [
        "You have outgrown DIY bookkeeping.",
        "Your books are current, but your reports are not useful.",
        "Revenue is growing, but cash flow still feels unclear.",
        "Tax season keeps creating stress or surprises.",
        "Your business has more accounts, systems, or moving parts than before.",
        "You need more organization around financial reporting and decision-making."
    ];

    return (
        <section className="bg-[#FAF7F2] py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1300px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* Left Column - Who This Is For */}
                    <div className="lg:col-span-7 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[2.25rem] lg:text-[3.25rem] font-serif font-normal text-[#111315] leading-tight mb-8">
                                Who This Is For
                            </h2>
                            <p className="text-[16px] lg:text-[18px] text-[#444] font-sans font-light mb-8">
                                Prospera is designed for businesses where:
                            </p>
                            
                            <ul className="flex flex-col gap-4">
                                {listItems.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4 text-[15px] lg:text-[16px] text-[#222] font-sans font-light leading-relaxed">
                                        <div className="w-6 h-6 rounded-full bg-[#111315] flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-[#FEACC6]" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Right Column - Scope Clarification */}
                    <div className="lg:col-span-5 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="bg-white border border-black/5 p-8 lg:p-10 rounded-[16px] shadow-sm"
                        >
                            <div className="flex items-center gap-3.5 mb-6">
                                <AlertCircle className="w-6 h-6 text-[#FEACC6] shrink-0" />
                                <h3 className="text-[18px] lg:text-[21px] font-serif font-normal text-[#111315]">
                                    Scope Clarification
                                </h3>
                            </div>
                            
                            <p className="text-[14px] lg:text-[15px] text-[#555] font-sans font-light leading-relaxed mb-6">
                                Prospera may not be the right next step if your current needs are limited to basic transaction entry only, your business is not yet at a stage where a structured monthly process makes sense, or you are looking for unlimited advisory support without defined boundaries.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
