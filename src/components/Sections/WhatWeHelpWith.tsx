"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

export default function WhatWeHelpWith() {
    const heading = "What Prospera Helps You Gain";
    const tagline = "THE PROSPERA ADVANTAGE";
    const description1 = "Unlike standalone bookkeepers, our structured monthly system is designed with tax preparation in mind.";
    const description2 = "Because we understand both financial organization and tax compliance, your records are structured properly throughout the year—not just at filing time.";
    
    const services = [
        {
            title: "Monthly Bookkeeping & Reconciliation",
            description: "Transactions, bank accounts, and credit cards are organized and reconciled consistently.",
            iconName: "CalendarDays",
        },
        {
            title: "Financial Reporting & Visibility",
            description: "Monthly reports help you understand revenue, expenses, profitability, and cash flow.",
            iconName: "FileBarChart",
        },
        {
            title: "Tax-Ready Bookkeeping Support",
            description: "Your records are maintained throughout the year with tax preparation and compliance in mind.",
            iconName: "Calculator",
        },
        {
            title: "Cleanup & Catch-Up Support",
            description: "If your books are behind, messy, or unclear, we help define what needs to be corrected before ongoing support begins.",
            iconName: "Users",
        },
        {
            title: "Financial Visibility for Operational Decisions",
            description: "We help business owners use their financial information to make more informed decisions around payroll, pricing, hiring, taxes, and growth.",
            iconName: "Headset",
        },
    ];

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
                        className="bg-transparent rounded-[16px] overflow-hidden border border-[#D1CFCD] flex flex-col justify-between mt-8 lg:mt-0"
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
                                        <div className="flex flex-col gap-1 text-left">
                                            <span className="text-[1rem] lg:text-[1.125rem] font-bold text-[#111315] font-sans leading-tight">
                                                {service.title}
                                            </span>
                                            <span className="text-[14px] text-[#555] font-sans font-light leading-relaxed">
                                                {service.description}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            
                            {/* Operational alignment notice */}
                            <div className="p-6 lg:p-8 bg-black/5 border-t border-[#D1CFCD]">
                                <p className="text-[13px] text-gray-600 font-sans font-light leading-relaxed text-left">
                                    We may also help identify when payroll processes, entity elections, sales tax responsibilities, estimated tax requirements, or reporting structure may no longer align with how the business operates today.
                                </p>
                            </div>
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