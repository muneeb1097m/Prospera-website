"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Award } from "lucide-react";

export default function AboutFounder() {
    return (
        <section className="bg-[#FAF7F2] py-20 lg:py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1300px] mx-auto">
                    
                    {/* Left Column - Founder Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full h-[450px] lg:h-[650px] rounded-[12px] overflow-hidden shadow-lg">
                            <Image
                                src="/jenna3.jpg"
                                alt="Prospera Founder - IRS Enrolled Agent"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column - Text Block */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start text-left"
                    >
                        {/* Credential Badge */}
                        <div className="flex items-center gap-2 bg-[#FEACC6]/25 border border-[#FEACC6]/50 text-[#111315] px-4 py-1.5 rounded-[8px] text-[12px] font-sans font-bold uppercase tracking-[0.1em] mb-6">
                            <Award className="w-4 h-4 text-[#111315]" />
                            IRS Enrolled Agent
                        </div>

                        <h2 className="text-[2.25rem] lg:text-[3.5rem] font-serif font-normal text-[#111315] leading-[1.1] tracking-tight mb-8">
                            IRS Enrolled Agent-Led Support
                        </h2>
                        
                        <div className="space-y-6 text-[#111315] font-sans font-light text-[15px] lg:text-[16px] leading-relaxed mb-10 max-w-[550px]">
                            <p>
                                Prospera is led by an IRS Enrolled Agent, a federally authorized tax professional. Prospera’s Enrolled Agent can represent taxpayers before the IRS in federal tax matters, including audits, collection matters, and appeals. Representation before state tax agencies may also be available where permitted and properly authorized.
                            </p>
                            <p>
                                That matters because financial records should not only be organized. They should also be maintained with tax readiness in mind throughout the year.
                            </p>
                            <p>
                                That perspective helps Prospera support business owners with cleaner books, clearer reporting, tax-ready records, and practical financial organization before tax deadlines or major decisions create pressure.
                            </p>
                            <p>
                                As businesses grow, we also help identify when financial processes, reporting structure, payroll handling, or tax-related obligations may need to evolve alongside the business.
                            </p>
                        </div>
                        
                        <Link href="/contact" className="bg-[#111315] hover:bg-black text-[#FEACC6] px-10 py-4 font-sans font-bold text-[13px] tracking-[0.1em] rounded-[8px] transition-colors uppercase inline-block text-center shadow-md">
                            Schedule a Financial Structure Review
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -bottom-16 -right-16 w-[300px] lg:w-[450px] h-[300px] lg:h-[450px] opacity-[0.15] pointer-events-none z-0">
                <Image
                    src="/splitlogopink.png"
                    alt="Prospera Decoration"
                    fill
                    className="object-contain object-bottom right-0"
                />
            </div>
        </section>
    );
}