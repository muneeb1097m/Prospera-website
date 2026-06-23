"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { AlertCircle } from "lucide-react";

const steps = [
    {
        number: "1",
        title: "Financial Structure Review",
        description: "We start by reviewing where your business stands today. This includes your current bookkeeping setup, accounting system, accounts, reporting needs, tax concerns, and any cleanup or catch-up issues. We may also identify situations where payroll processes, entity elections, sales tax responsibilities, estimated tax requirements, or other financial compliance obligations should be reviewed more closely as the business grows.",
        image: "/Intro-Call.png",
        isImageLeft: true,
    },
    {
        number: "2",
        title: "Scope & Setup",
        description: "Once we understand the current situation, we define the scope of support. This may include monthly bookkeeping, account reconciliation, financial reporting, cleanup, tax-ready organization, or additional support based on the complexity of your business. We clarify expectations before work begins so the partnership is structured properly from the start.",
        image: "/TS.png",
        isImageLeft: false,
    },
    {
        number: "3",
        title: "Monthly Financial Clarity & Bookkeeping Support",
        description: "Each month, Prospera helps maintain your financial records, reconcile accounts, organize transactions, and prepare financial reports. The goal is to give you a clearer view of what is happening in the business instead of waiting until tax season, payroll week, or a major decision to find out there is a problem.",
        image: "/ORS.png",
        isImageLeft: true,
    },
    {
        number: "4",
        title: "Reporting & Tax-Ready Coordination",
        description: "Your reports should not just be created. They should be understandable. Throughout the year, we also help keep records organized with tax readiness in mind so tax season is less reactive.",
        image: "/tailored-clarity01.png",
        isImageLeft: false,
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
                        The Process
                    </motion.h2>
                </div>

                {/* The Timeline Container */}
                <div className="relative max-w-[1100px] mx-auto">
                    
                    {/* The Dashed Line */}
                    <div className="absolute left-[30px] lg:left-1/2 top-4 bottom-0 w-[2px] border-l-[2px] border-dashed border-[#FEACC6]/80 lg:-translate-x-1/2 z-0" />

                    <div className="space-y-24 lg:space-y-32">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-24 items-center relative z-10">
                                
                                {/* DESKTOP NUMBER MASK */}
                                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FEACC6] items-center justify-center text-white text-[18px] font-bold z-20 ring-[12px] ring-white">
                                    {step.number}
                                </div>

                                {/* MOBILE HEADER */}
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
                                    className={`relative w-full max-w-[500px] mx-auto ${step.isImageLeft ? "lg:order-1 lg:pr-12" : "lg:order-2 lg:pl-12"}`}
                                >
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
                                    className={`flex flex-col w-full pl-[60px] lg:pl-0 text-left ${step.isImageLeft ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"}`}
                                >
                                    <div className="space-y-5">
                                        
                                        {/* DESKTOP ONLY TITLE */}
                                        <h3 className="hidden lg:block text-[2.5rem] font-serif font-normal text-[#111315] leading-[1.1]">
                                            {step.title}
                                        </h3>
                                        
                                        <p className="text-[16px] lg:text-[17px] text-[#444] font-sans font-light leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* The Result Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 lg:mt-32 max-w-[750px] mx-auto bg-[#FAF7F2] p-8 lg:p-12 rounded-[16px] flex items-start gap-6 shadow-sm border border-black/5"
                >
                    <div className="w-10 h-10 rounded-full bg-[#111315] flex items-center justify-center text-[#FEACC6] shrink-0 mt-[2px]">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <h4 className="text-[18px] lg:text-[21px] font-serif font-normal text-[#111315] mb-4">
                            The Result
                        </h4>
                        <p className="text-[16px] lg:text-[17px] font-sans font-bold text-[#111315] mb-3 leading-relaxed">
                            Cleaner books. Clearer reports. Better tax readiness. More financial visibility before decisions need to be made.
                        </p>
                        <p className="text-[15px] lg:text-[16px] text-[#444] font-sans font-light leading-relaxed">
                            Instead of waiting until tax season or a cash flow problem to understand where things stand, you have a monthly process that helps keep the business more organized and less reactive.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
