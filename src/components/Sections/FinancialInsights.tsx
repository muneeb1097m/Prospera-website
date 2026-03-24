"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, FileText, CheckCircle2 } from "lucide-react";

export default function FinancialInsights() {
    const features = [
        { icon: <Calendar className="w-5 h-5" />, text: "Recurring Monthly Bookkeeping" },
        { icon: <User className="w-5 h-5" />, text: "Account Reconciliation" },
        { icon: <FileText className="w-5 h-5" />, text: "Monthly Financial Reports" },
        { icon: <CheckCircle2 className="w-5 h-5" />, text: "Year-Round Tax Readiness" },
    ];

    return (
        /* UPDATED: Background color set to #37414F */
        <section className="bg-[#37414F] py-24 lg:py-32 text-white relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-[1300px] mx-auto">
                    
                    {/* Left Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full h-[450px] lg:h-[650px] rounded-[12px] overflow-hidden">
                            <Image
                                src="/FI.jpg" 
                                alt="Financial Analysis"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start pt-2"
                    >
                        <h2 className="text-[2.5rem] lg:text-[4rem] font-serif font-normal leading-[1.1] mb-8">
                            Financial Insights
                        </h2>
                        <p className="text-[16px] text-white/80 font-sans font-light mb-10 max-w-md">
                            We deliver actionable reports that help you understand:
                        </p>

                        {/* FIXED TABLE: Transparent background, white borders, semi-bold text */}
                        <div className="w-full border border-white/20 rounded-[12px] overflow-hidden mb-12">
                            {features.map((f, i) => (
                                <div 
                                    key={i} 
                                    className={`flex items-center gap-6 p-5 lg:px-8 lg:py-6 ${
                                        i !== features.length - 1 ? "border-b border-white/10" : ""
                                    }`}
                                >
                                    {/* Icon Box: Transparent with white border */}
                                    <div className="w-11 h-11 border border-white/20 rounded-[8px] flex items-center justify-center shrink-0">
                                        {f.icon}
                                    </div>
                                    <span className="text-[16px] font-sans font-semibold tracking-wide text-white">
                                        {f.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <p className="text-[15px] lg:text-[16px] text-white/70 font-sans font-light mb-10 max-w-lg leading-relaxed">
                            Your records are structured throughout the year, making tax preparation smoother and reducing last-minute stress.
                        </p>

                        <Link href="/contact" className="bg-[#FEACC6] hover:bg-[#fca1be] text-[#111315] px-10 py-4 font-sans font-bold text-[13px] tracking-[0.1em] rounded-[8px] transition-colors uppercase inline-block text-center">
                            CONTACT US
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -bottom-16 -right-16 w-[300px] lg:w-[450px] h-[300px] lg:h-[450px] opacity-[0.05] pointer-events-none z-0">
                <Image
                    src="/whitelogo.png"
                    alt=""
                    fill
                    className="object-contain object-bottom right-0"
                />
            </div>
        </section>
    );
}