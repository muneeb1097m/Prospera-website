"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutFounder() {
    return (
        <section className="bg-[#FAF7F2] py-20 lg:py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-[1300px] mx-auto">
                    
                    {/* Left Column - Founder Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full h-[450px] lg:h-[650px] rounded-[12px] overflow-hidden">
                            <Image
                                src="/CEO.jpg"
                                alt="Prospera Founder"
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
                        className="flex flex-col items-start pt-2"
                    >
                        {/* 4-LINE TYPOGRAPHY FIX: 
                           Forced breaks exactly as requested. 
                           Added max-w-[500px] to ensure the 4-line stack holds its shape.
                        */}
                        <h2 className="text-[2.5rem] lg:text-[3.5rem] xl:text-[4rem] font-serif font-medium text-[#111315] leading-[1.1] tracking-tight mb-12 max-w-[500px]">
                            Built to provide<br />
                            structured, recurring<br />
                            bookkeeping for<br />
                            U.S. small businesses.
                        </h2>
                        
                        <div className="space-y-6 text-[#111315] font-sans font-light text-[15px] lg:text-[16px] leading-[1.5] mb-12 max-w-[550px]">
                            <p>
                                Prospera was built to support small business owners who want 
                                their finances handled accurately, consistently, and without 
                                unnecessary complexity.
                            </p>
                            <p>
                                Our recurring monthly bookkeeping keeps your records 
                                organized, structured, and tax-ready year-round. We focus on 
                                clarity, compliance, and predictable processes - not one-time 
                                fixes or reactive cleanups.
                            </p>
                        </div>
                        
                        <Link href="/contact" className="bg-[#FEACC6] hover:bg-[#fca1be] text-[#111315] px-10 py-4 font-sans font-bold text-[13px] tracking-[0.1em] rounded-[8px] transition-colors uppercase inline-block text-center">
                            CONTACT US
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