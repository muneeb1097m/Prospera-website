"use client";
import { motion } from "framer-motion";

export default function AboutOpening() {
    return (
        <section className="bg-white py-20 lg:py-28">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1000px] text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[2rem] lg:text-[3rem] font-serif font-normal leading-[1.2] text-[#111315] mb-8"
                >
                    Most bookkeeping services treat financial records as a data-entry problem. Prospera was built around a different idea: clean books only matter if they help a business owner understand what is actually happening.
                </motion.h2>
                
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[16px] lg:text-[19px] text-[#555555] font-sans font-light leading-relaxed max-w-3xl mx-auto"
                >
                    We help businesses create cleaner records, clearer reporting, and stronger tax-ready organization so decisions are made with better information throughout the year.
                </motion.p>
            </div>
        </section>
    );
}
