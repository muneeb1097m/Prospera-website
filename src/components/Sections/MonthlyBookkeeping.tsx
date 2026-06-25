"use client";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, ClipboardCheck } from "lucide-react";

export default function MonthlyBookkeeping() {
    const bulletPoints = [
        "Categorizing income and expenses",
        "Reconciling bank and credit card accounts",
        "Reviewing account activity",
        "Preparing monthly financial statements",
        "Organizing records for tax preparation"
    ];

    return (
        <section className="bg-white py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1300px]">
                
                <div className="text-center mb-16 lg:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[2.5rem] lg:text-[4rem] font-serif font-normal text-[#111315] leading-tight mb-6"
                    >
                        Monthly & Tax-Ready Foundation
                    </motion.h2>
                    <p className="text-[16px] lg:text-[18px] text-[#555] font-sans font-light max-w-2xl mx-auto">
                        Clean books are the foundation of your business&apos;s financial clarity. We keep your accounts structured, reconciled, and ready for tax season.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Card 1: Monthly Bookkeeping & Account Reconciliation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#FAF7F2] p-8 lg:p-12 rounded-[16px] flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-14 h-14 rounded-[8px] bg-white flex items-center justify-center mb-8 shadow-sm">
                                <ClipboardCheck className="w-6 h-6 text-[#111315]" />
                            </div>
                            <h3 className="text-[20px] lg:text-[24px] font-serif font-normal text-[#111315] mb-6">
                                Monthly Bookkeeping & Account Reconciliation
                            </h3>
                            <p className="text-[15px] lg:text-[16px] text-[#444] font-sans font-light leading-relaxed mb-8">
                                Clean books are the foundation, but they are not the finish line. Prospera helps maintain the financial foundation of your business through consistent monthly bookkeeping, account reconciliation, and organized records.
                            </p>
                            
                            {/* Checklist */}
                            <ul className="flex flex-col gap-3.5 mb-8">
                                {bulletPoints.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[14px] lg:text-[15px] text-[#333] font-sans font-light">
                                        <CheckCircle2 className="w-5 h-5 text-[#FEACC6] shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Card 2: Tax-Ready Bookkeeping Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-[#FAF7F2] p-8 lg:p-12 rounded-[16px] flex flex-col justify-between"
                    >
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 rounded-[8px] bg-white flex items-center justify-center mb-8 shadow-sm">
                                    <ShieldCheck className="w-6 h-6 text-[#111315]" />
                                </div>
                                <h3 className="text-[20px] lg:text-[24px] font-serif font-normal text-[#111315] mb-6">
                                    Tax-Ready Bookkeeping Support
                                </h3>
                                <p className="text-[15px] lg:text-[16px] text-[#444] font-sans font-light leading-relaxed mb-8">
                                    Tax stress often starts long before the filing deadline. Prospera helps maintain your books throughout the year with tax readiness in mind, so your financial records are cleaner, better organized, and easier to work with when tax deadlines approach.
                                </p>
                            </div>
                            
                            {/* Informational Callout inside Card */}
                            <div className="bg-white/60 border border-black/5 p-6 rounded-[8px] mt-auto">
                                <p className="text-[13px] lg:text-[14px] text-[#666] font-sans font-light leading-relaxed italic">
                                    * Tax preparation, tax strategy, and complex advisory work may be scoped separately depending on the engagement.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
