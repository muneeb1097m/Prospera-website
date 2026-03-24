"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="bg-[#111315] text-white overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch w-full">
                
                {/* Left Content Container */}
                <div className="relative flex flex-col justify-center py-20 lg:py-32 pl-6 lg:pl-24 pr-6 lg:pr-12 z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-[550px] relative z-10"
                    >
                        <h2 className="text-[2.5rem] lg:text-[4rem] font-serif font-normal leading-[1.1] mb-6">
                            Ready for Structured <br />
                            Monthly Bookkeeping?
                        </h2>
                        
                        <p className="text-[1rem] lg:text-[1.125rem] text-[#cccccc] font-sans font-light mb-10 leading-relaxed max-w-[380px]">
                            Schedule an intro call to determine if recurring bookkeeping is the right fit for your business.
                        </p>
                        
                        <Link href="/contact" className="bg-white text-black px-10 py-4 font-sans font-extrabold text-[13px] rounded-[8px] hover:bg-gray-200 transition-colors uppercase tracking-widest inline-block">
                            CONTACT US
                        </Link>
                    </motion.div>
                </div>

                {/* Right Image Container - Logo is now attached here! */}
                <div className="relative w-full h-[400px] lg:h-auto min-h-[500px] p-4 lg:py-6 lg:pr-6 lg:pl-0 z-10">
                    
                    {/* The Transparent Split Logo */}
                    {/* Positioned exactly at the left edge of this column, pushed left by 100% ONLY on desktop, and aligned with the bottom padding! */}
                    <div className="absolute bottom-4 lg:bottom-6 right-0 lg:left-0 lg:-translate-x-full w-[160px] lg:w-[240px] h-[160px] lg:h-[240px] pointer-events-none z-0">
                        <Image
                            src="/finalCTAlogo.png"
                            alt="Prospera Logo Decoration"
                            fill
                            className="object-contain object-right-bottom opacity-30"
                        />
                    </div>

                    {/* Girl Image */}
                    <div className="relative w-full h-full overflow-hidden">
                        <Image
                            src="/ftr1.jpg"
                            alt="Contact Prospera"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}