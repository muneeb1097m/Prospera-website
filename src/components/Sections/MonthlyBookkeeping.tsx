"use client";
import { motion } from "framer-motion";
import { Calendar, User, FileText, MessageSquare } from "lucide-react";

const services = [
    {
        icon: <Calendar className="w-6 h-6 text-[#111315]" />,
        title: "Categorize income and expenses",
        description: "Maintain accurate classification for clear reporting and compliance.",
    },
    {
        icon: <User className="w-6 h-6 text-[#111315]" />,
        title: "Reconcile bank and credit card accounts",
        description: "Ensure all transactions are aligned and verified monthly.",
    },
    {
        icon: <FileText className="w-6 h-6 text-[#111315]" />,
        title: "Prepare monthly financial statements",
        description: "Deliver structured reports that reflect your business performance.",
    },
    {
        icon: <MessageSquare className="w-6 h-6 text-[#111315]" />,
        title: "Provide ongoing support for questions",
        description: "Access ongoing clarification and support as needed.",
    },
];

export default function MonthlyBookkeeping() {
    return (
        <section className="bg-white py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[2.5rem] lg:text-[4rem] font-serif font-medium text-[#111315] leading-tight mb-6"
                    >
                        Monthly Bookkeeping
                    </motion.h2>
                    <p className="text-[1.125rem] text-[#666] font-sans font-light">
                        Our recurring service ensures your books are always accurate and up to date.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {services.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-[#FAF7F2] p-8 lg:p-10 rounded-sm flex flex-col items-start text-left"
                        >
                            <div className="w-14 h-14 rounded-sm bg-white flex items-center justify-center mb-8 shadow-sm">
                                {item.icon}
                            </div>
                            <h3 className="text-[15px] lg:text-[16px] font-sans font-black text-[#111315] mb-4 uppercase tracking-wide leading-tight">
                                {item.title}
                            </h3>
                            <p className="text-[14px] text-[#555] font-sans font-light leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
