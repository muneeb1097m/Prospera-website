"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LineChart, Compass } from "lucide-react";

export default function FinancialInsights() {
    const services = [
        { 
            icon: <LineChart className="w-6 h-6 text-[#FEACC6]" />, 
            title: "Financial Reporting & Visibility", 
            description: "Financial reports should help you understand what is happening in your business. Prospera provides monthly financial reporting support designed to give owners clearer visibility into revenue, expenses, profitability, cash flow, account balances, trends, and areas that may need attention. Reports should not just exist. They should be useful." 
        },
        { 
            icon: <Compass className="w-6 h-6 text-[#FEACC6]" />, 
            title: "Visibility for Operational Decisions", 
            description: "As a business becomes more complex, financial questions become more important. Prospera helps owners understand what their numbers are showing so decisions around payroll, pricing, hiring, taxes, cash flow, expenses, financing, and owner compensation are made with more visibility and less guesswork." 
        },
    ];

    return (
        <section className="bg-[#37414F] py-24 lg:py-32 text-white relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-[1300px] mx-auto">
                    
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
                                alt="Financial Analysis and Visibility"
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
                            Reporting & Operational Visibility
                        </h2>
                        
                        {/* Table / List structure */}
                        <div className="w-full flex flex-col gap-8 mb-12">
                            {services.map((s, i) => (
                                <div 
                                    key={i} 
                                    className="flex flex-col sm:flex-row items-start gap-5 p-6 bg-white/5 border border-white/10 rounded-[12px]"
                                >
                                    {/* Icon Container */}
                                    <div className="w-12 h-12 border border-white/20 rounded-[8px] flex items-center justify-center shrink-0 bg-white/5">
                                        {s.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-[17px] lg:text-[19px] font-sans font-bold tracking-wide text-white mb-2 text-left">
                                            {s.title}
                                        </h3>
                                        <p className="text-[14px] lg:text-[15px] text-white/80 font-sans font-light leading-relaxed text-left">
                                            {s.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
 
                        <Link href="/contact" className="bg-[#FEACC6] hover:bg-[#fca1be] text-[#111315] px-10 py-4 font-sans font-bold text-[13px] tracking-[0.1em] rounded-[8px] transition-colors uppercase inline-block text-center">
                            Schedule a Financial Structure Review
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