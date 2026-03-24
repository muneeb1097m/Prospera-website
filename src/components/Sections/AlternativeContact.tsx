"use client";
import { motion } from "framer-motion";
import { Mail, Phone, Clock } from "lucide-react";

const contactOptions = [
    {
        icon: <Mail className="w-5 h-5 text-[#FEACC6]" />,
        label: "Email Address",
        value: "Jenna@Prosperagroup.Us",
        href: "mailto:Jenna@Prosperagroup.Us",
    },
    {
        icon: <Phone className="w-5 h-5 text-[#FEACC6]" />,
        label: "Phone Number",
        value: "+1 (910) 872-3200",
        href: "tel:+1 (910) 872-3200",
    },
    {
        icon: <Clock className="w-5 h-5 text-[#FEACC6]" />,
        label: "Hours",
        value: "Monday–Friday | 9:00 AM – 5:00 PM EST",
    },
];

export default function AlternativeContact() {
    return (
        <section className="bg-white pb-24 lg:pb-32">
            <div className="container mx-auto px-6 lg:px-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[2.5rem] lg:text-[4rem] font-serif font-medium text-[#111315] leading-tight mb-20"
                >
                    Alternative Contact Options
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {contactOptions.map((option, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-[#FAF7F2] p-10 rounded-sm flex items-center gap-6 text-left"
                        >
                            <div className="w-12 h-12 rounded-sm bg-white flex items-center justify-center shrink-0 shadow-sm">
                                {option.icon}
                            </div>
                            <div>
                                <p className="text-[12px] font-sans font-bold text-[#888] uppercase tracking-wider mb-1">
                                    {option.label}
                                </p>
                                {option.href ? (
                                    <a 
                                        href={option.href}
                                        className="text-[15px] lg:text-[16px] font-sans font-black text-[#111315] hover:text-[#FEACC6] transition-colors"
                                    >
                                        {option.value}
                                    </a>
                                ) : (
                                    <p className="text-[15px] lg:text-[16px] font-sans font-black text-[#111315]">
                                        {option.value}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
