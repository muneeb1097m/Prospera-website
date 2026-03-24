"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutLeadership() {
    return (
        /* 1. CHANGED: Background to match your dark slate design */
        <section className="bg-[#363F4A] py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1300px]">
                <div className="text-center mb-16 lg:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        /* 2. CHANGED: Text to white, font-normal to keep Didot elegant */
                        className="text-[2.5rem] lg:text-[4rem] font-serif font-normal text-white leading-tight"
                    >
                        U.S Based & Led by an <span className="italic text-[#FEACC6]">IRS Enrolled</span> Agent
                    </motion.h2>
                </div>

                {/* 3. CHANGED: Asymmetrical grid! The left column gets 1.6x more space than the right column */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-10">
                    
                    {/* Left Item - Wider */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col"
                    >
                        {/* 4. CHANGED: Hardcoded height so both images align perfectly on top and bottom */}
                        <div className="relative w-full h-[300px] lg:h-[450px] rounded-[16px] overflow-hidden mb-6 lg:mb-8">
                            <Image
                                src="/Aboutm.jpg"
                                alt="Founders collaborating"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* 5. CHANGED: Text to light gray/white to be readable on the dark background */}
                        <p className="text-[15px] lg:text-[16px] text-white/85 font-sans font-light leading-[1.6] max-w-[95%]">
                            Prospera is led by an IRS Enrolled Agent with a deep understanding of U.S. tax compliance and financial reporting standards. We understand American banking systems, regulatory requirements, and the practical realities of running a small business in the United States.
                        </p>
                    </motion.div>

                    {/* Right Item - Narrower */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        {/* Uses the exact same height as the left image, but the grid makes it narrower! */}
                        <div className="relative w-full h-[300px] lg:h-[450px] rounded-[16px] overflow-hidden mb-6 lg:mb-8">
                            <Image
                                src="/About2.png"
                                alt="Professional bookkeeping standards"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-[15px] lg:text-[16px] text-white/85 font-sans font-light leading-[1.6] max-w-[95%]">
                            When you work with Prospera, you work with a knowledgeable professional who understands both bookkeeping structure and tax compliance - not an outsourced team unfamiliar with U.S. standards.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}