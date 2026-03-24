"use client";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface HowItWorksProps {
    data?: {
        heading?: string;
        steps?: { title: string; description: string; iconName: string }[];
        noteTitle?: string;
        noteText?: string;
    }
}

const defaultSteps = [
    {
        title: "Intro Call",
        description: "A consultation to assess your needs.",
        iconName: "Phone",
    },
    {
        title: "Transparent Setup",
        description: "Secure account connection and plan selection.",
        iconName: "Monitor",
    },
    {
        title: "Recurring Support",
        description: "We handle the monthly heavy lifting.",
        iconName: "Headset",
    },
];

export default function HowItWorks({ data }: HowItWorksProps) {
    const heading = data?.heading || "How It Works";
    const steps = data?.steps || defaultSteps;
    const noteTitle = data?.noteTitle || "Note";
    const noteText = data?.noteText || "Recurring services begin after onboarding. Historical cleanup or \"catch-up\" work for past months is assessed and quoted separately.";

    return (
        <section className="bg-[#3B4451] pt-16 lg:pt-20 pb-16 lg:pb-24 text-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-12 lg:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[2.5rem] lg:text-[4rem] font-serif font-medium leading-tight"
                    >
                        {heading}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16 max-w-5xl mx-auto">
                    {steps.map((step, index) => {
                        const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[step.iconName] || LucideIcons.HelpCircle;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex flex-col items-center text-center space-y-3"
                            >
                                <div className="w-[72px] h-[72px] rounded-[16px] bg-[#fcecf1] flex items-center justify-center mb-2">
                                    <IconComponent className="w-7 h-7 text-[#111315]" />
                                </div>
                                <h3 className="text-[1.125rem] lg:text-[1.25rem] font-sans font-bold text-white tracking-wide">
                                    {step.title}
                                </h3>
                                <p className="text-[1rem] text-gray-300 font-sans font-light leading-relaxed max-w-[260px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-[800px] mx-auto bg-[#2D3540] rounded-[12px] p-6 lg:p-8 flex items-start gap-4 lg:gap-5 border border-white/5"
                >
                    <div className="w-8 h-8 rounded-full bg-[#FEACC6] text-[#111315] flex items-center justify-center shrink-0 mt-1 font-bold text-[1.125rem]">
                        !
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-[1.125rem] font-bold font-sans">{noteTitle}</h4>
                        <p className="text-[1rem] text-gray-300 font-sans font-light leading-relaxed">
                            {noteText}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}