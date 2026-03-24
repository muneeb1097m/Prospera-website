"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const steps = [
    {
        number: "1",
        title: "Intro Call & Scope Review",
        description: "We begin with a short conversation to understand your business, current bookkeeping setup, and goals. We confirm whether your books are ready for recurring service or if a one-time cleanup is needed first.",
        image: "/introcall copy.png",
        isImageLeft: true,
    },
    {
        number: "2",
        title: "Transparent Setup",
        subtitle: "Setup & Monthly Plan ",
        description: "Once aligned, we establish your recurring bookkeeping plan:",
        checklist: [
            "Defined scope of services",
            "Transparent monthly pricing",
            "Secure account connections",
        ],
        footer: "Everything is structured before monthly work begins.",
        image: "/TS.png",
        isImageLeft: false,
    },
    {
        number: "3",
        title: "Ongoing Recurring Support",
        description: "Each month we:",
        checklist: [
            "Process & Reconcile Accounts",
            "Prepare Financial Reports",
            "Provide Ongoing Support",
        ],
        footer: "Your records stay organized and predictable year-round.",
        image: "/ORS.png",
        isImageLeft: true,
    },
];

export default function HowItWorksSteps() {
    return (
        <section className="bg-white py-20 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative max-w-[1400px]">
                
                <div className="text-center mb-16 lg:mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[2.5rem] lg:text-[4rem] font-serif font-normal text-[#111315]"
                    >
                        How It Works
                    </motion.h2>
                </div>

                {/* The Timeline Container */}
                <div className="relative max-w-[1100px] mx-auto">
                    
                    {/* FIXED: The Dashed Line. 
                        On Mobile: It hugs the far left edge (left-[30px]).
                        On Desktop: It sits perfectly in the center (left-1/2). */}
                    <div className="absolute left-[30px] lg:left-1/2 top-4 bottom-0 w-[2px] border-l-[2px] border-dashed border-[#FEACC6]/80 lg:-translate-x-1/2 z-0" />

                    <div className="space-y-24 lg:space-y-32">
                        {steps.map((step, index) => (
                            /* FIXED: Used standard flex directions for mobile (col) and grid for desktop (grid-cols-2) */
                            <div key={index} className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-24 items-center relative z-10">
                                
                                {/* DESKTOP NUMBER MASK: Sits perfectly in the center of the grid over the dashed line */}
                                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FEACC6] items-center justify-center text-white text-[18px] font-bold z-20 ring-[12px] ring-white">
                                    {step.number}
                                </div>

                                {/* MOBILE HEADER (Number + Title) - Only shows on mobile screens */}
                                <div className="flex lg:hidden items-center gap-6 w-full pl-2">
                                    <div className="w-10 h-10 rounded-full bg-[#FEACC6] flex items-center justify-center text-white text-[16px] font-bold shrink-0 z-20 ring-[8px] ring-white">
                                        {step.number}
                                    </div>
                                    <h3 className="text-[2rem] font-serif font-normal text-[#111315] leading-[1.1]">
                                        {step.title}
                                    </h3>
                                </div>

                                {/* IMAGE COLUMN */}
                                <motion.div
                                    initial={{ opacity: 0, x: step.isImageLeft ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    /* FIXED: On mobile, the image takes full width. On desktop, it respects the zigzag order. */
                                    className={`relative w-full max-w-[500px] mx-auto ${step.isImageLeft ? "lg:order-1 lg:pr-12" : "lg:order-2 lg:pl-12"}`}
                                >
                                    {/* FIXED: Removed overflow-hidden so the natural shape of your images is preserved, just like the previous section! */}
                                    <div className="relative w-full">
                                        <Image 
                                            src={step.image} 
                                            alt={step.title} 
                                            width={800} 
                                            height={800} 
                                            className="w-full h-auto object-contain" 
                                            priority={index === 0}
                                        />
                                    </div>
                                </motion.div>

                                {/* TEXT CONTENT COLUMN */}
                                <motion.div
                                    initial={{ opacity: 0, x: step.isImageLeft ? 30 : -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    /* FIXED: On mobile, pushed text left to align with the rest of the site. On desktop, respects zigzag order. */
                                    className={`flex flex-col w-full pl-[60px] lg:pl-0 text-left ${step.isImageLeft ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"}`}
                                >
                                    <div className="space-y-5">
                                        
                                        {/* DESKTOP ONLY TITLE: Hidden on mobile since it's above the image there */}
                                        <h3 className="hidden lg:block text-[2.5rem] font-serif font-normal text-[#111315] leading-[1.1]">
                                            {step.title}
                                        </h3>
                                        
                                        <p className="text-[16px] lg:text-[17px] text-[#444] font-sans font-light leading-relaxed">
                                            {step.subtitle && <span className="font-semibold text-[#111315] mr-1">{step.subtitle}</span>}
                                            {step.description}
                                        </p>

                                        {step.checklist && (
                                            <ul className="space-y-4 pt-3">
                                                {step.checklist.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-4 text-[#111315] font-sans font-medium text-[16px]">
                                                        <CheckCircle2 className="w-[20px] h-[20px] fill-[#111315] text-white shrink-0 mt-[2px]" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {step.footer && (
                                            <p className="text-[15px] text-[#666] font-sans font-light pt-3">
                                                {step.footer}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* The Result Box - Unchanged as it looked fine */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 lg:mt-32 max-w-[700px] mx-auto bg-[#FAF7F2] p-8 lg:p-10 rounded-[12px] flex items-start gap-5 shadow-sm"
                >
                    <div className="w-8 h-8 rounded-full bg-[#FEACC6] flex items-center justify-center text-white font-bold text-[16px] shrink-0 mt-[2px]">
                        !
                    </div>
                    <div className="text-left">
                        <h4 className="text-[16px] font-sans font-bold text-[#111315] mb-2">
                            The Result
                        </h4>
                        <p className="text-[15px] lg:text-[16px] text-[#666] font-sans font-light leading-relaxed">
                            No more shoeboxes of receipts. No more tax-season panic. Just a predictable, monthly report that tells you exactly how your business is performing.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}