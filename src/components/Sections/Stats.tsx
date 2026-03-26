"use client";
import { motion } from "framer-motion";

interface StatsProps {
    data?: {
        heading?: string;
        subtext?: string;
        statsList?: { label: string; value: string }[];
    }
}

const defaultStats = [
    { label: "Trusted by Founders", value: "9000+" },
    { label: "Since", value: "2016" },
    { label: "Happy Clients", value: "6378" },
];

export default function Stats({ data }: StatsProps) {
    const heading = data?.heading || "Prospera Provides";
    const subtext = data?.subtext || "Recurring monthly bookkeeping for U.S. small businesses. We simplify your financial processes, provide clarity on your numbers, and ensure everything is organized and tax-ready year-round without confusing jargon or last-minute surprises.";
    const statsList = data?.statsList || defaultStats;

    return (
        <section className="relative flex flex-col lg:flex-row min-h-[450px]">
            {/* Left Side - Darker shade (70%) */}
            <div className="lg:w-[70%] bg-[#3B4451] flex items-center justify-center py-24 px-6 lg:px-32">
                <div className="w-full max-w-2xl space-y-10">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl lg:text-[5.5rem] font-serif font-medium text-white leading-[1.1]"
                    >
                        {heading}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[1.25rem] text-gray-300 leading-relaxed font-sans font-light max-w-xl"
                    >
                        {subtext}
                    </motion.p>
                </div>
            </div>

            {/* Right Side - Lighter shade (30%) */}
            <div className="lg:w-[30%] bg-[#47515D] flex flex-col justify-center py-20 px-6 lg:px-12 border-l border-white/10">
                <div className="w-full max-w-sm space-y-10">
                    {/* Header for Right Side */}
                    <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-white font-serif text-2xl lg:text-3xl mb-4 border-b border-white/10 pb-6"
                    >
                        Why Clients Trust Prospera
                    </motion.h3>

                    {/* Trust Blocks */}
                    <div className="space-y-8">
                        {[
                            { 
                                title: "Clear Scope", 
                                desc: "Defined pricing and services based on actual work needed" 
                            },
                            { 
                                title: "Structured Process", 
                                desc: "A consistent system for onboarding, bookkeeping, and ongoing support." 
                            },
                            { 
                                title: "Accurate & Tax-Ready", 
                                desc: "Books kept organized, reconciled, and prepared for tax season." 
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <h4 className="text-[14px] uppercase tracking-[0.15em] text-[#FEACC6] font-sans font-bold mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-[1.05rem] text-gray-200 leading-relaxed font-sans font-light">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
