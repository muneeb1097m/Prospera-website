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
            <div className="lg:w-[30%] bg-[#47515D] flex items-center justify-center py-20 px-6 lg:px-12 border-l border-white/10">
                <div className="w-full max-w-sm space-y-12">
                    {statsList.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="pb-10 border-b border-white/10 last:border-0"
                        >
                            <span className="text-[13px] uppercase tracking-[0.15em] text-gray-400 font-sans font-medium mb-4 block">
                                {stat.label}
                            </span>
                            <span className="text-5xl lg:text-5xl font-extrabold text-white font-sans tracking-tight">
                                {stat.value}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
