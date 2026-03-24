"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

interface WhatWeHelpWithProps {
    data?: {
        heading?: string;
        tagline?: string;
        description1?: string;
        description2?: string;
        services?: { title: string; iconName: string }[];
    }
}

const defaultServices = [
    {
        title: "Recurring Monthly Bookkeeping",
        iconName: "CalendarDays",
    },
    {
        title: "Account Reconciliation",
        iconName: "Users",
    },
    {
        title: "Monthly Financial Reports",
        iconName: "FileBarChart",
    },
    {
        title: "Ongoing Professional Support",
        iconName: "Headset",
    },
    {
        title: "Year-Round Tax Readiness",
        iconName: "Calculator",
    },
];

export default function WhatWeHelpWith({ data }: WhatWeHelpWithProps) {
    const heading = data?.heading || "What we help with";
    const tagline = data?.tagline || "THE PROSPERA ADVANTAGE";
    const description1 = data?.description1 || "Unlike standalone bookkeepers, our recurring service is designed with tax preparation in mind.";
    const description2 = data?.description2 || "Because we understand both bookkeeping and compliance, your records are structured properly throughout the year not just at filing time.";
    const services = data?.services || defaultServices;

    return (
        <section className="bg-[#FAF6F3] py-16 lg:py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-12 lg:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[2.25rem] md:text-[3rem] lg:text-[4rem] font-serif font-medium text-[#111315] leading-tight"
                    >
                        {heading}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
                    
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-[16px] p-8 lg:p-12 flex flex-col justify-center shadow-sm"
                    >
                        <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-500 font-sans mb-8">
                            {tagline}
                        </span>

                        <div className="space-y-6 max-w-lg">
                            <p className="text-[1.125rem] lg:text-[1.35rem] leading-[1.6] text-[#333] font-sans font-light">
                                {description1}
                            </p>

                            <p className="text-[1.125rem] lg:text-[1.35rem] leading-[1.6] text-[#333] font-sans font-light">
                                {description2}
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-transparent rounded-[16px] overflow-hidden border border-[#D1CFCD] flex flex-col justify-center mt-8 lg:mt-0"
                    >
                        <div className="flex flex-col h-full">
                            {services.map((service, index) => {
                                const IconComponent = (LucideIcons as any)[service.iconName] || LucideIcons.HelpCircle;
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-6 p-6 lg:p-8 flex-1 ${index !== services.length - 1 ? "border-b border-[#D1CFCD]" : ""}`}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#3B4451] flex items-center justify-center shrink-0 shadow-sm">
                                            <IconComponent className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-[1rem] lg:text-[1.125rem] font-bold text-[#111315] font-sans leading-tight">
                                            {service.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] pointer-events-none z-0">
                <Image
                    src="/splitlogopink.png"
                    alt="Prospera Decoration"
                    fill
                    className="object-contain object-right-bottom opacity-40" 
                />
            </div>
        </section>
    );
}