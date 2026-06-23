"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const items = [
    {
        title: "Clarity First",
        description: "We help business owners understand what their numbers are showing, not just receive reports.",
        image: "/tailored-small-business01.png",
    },
    {
        title: "Structured Monthly Support",
        description: "We maintain clean records, reconciled accounts, and organized financial information throughout the year.",
        image: "/Whywe're different001.png",
    },
    {
        title: "Built for More Complexity",
        description: "We support owners whose businesses have more financial moving parts than basic bookkeeping can handle.",
        image: "/Whywe'redifferent002.png",
    },
    {
        title: "Tax-Ready Focus",
        description: "Your records are organized with tax season and compliance in mind.",
        image: "/Whywe'redifferent003.png",
    },
    {
        title: "Practical Financial Visibility",
        description: "We help connect financial information to real business decisions around payroll, pricing, hiring, cash flow, and growth.",
        image: "/tailored-service-based01.png",
    },
];

export default function WhyDifferent() {
    return (
        <section className="bg-white py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                
                <div className="text-center mb-16 lg:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[2.5rem] lg:text-[4rem] font-serif font-normal text-[#111315] leading-[1.1]"
                    >
                        Why Prospera Is Different
                    </motion.h2>
                </div>

                <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)] aspect-[4/5] rounded-[16px] lg:rounded-[24px] overflow-hidden group"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20 flex flex-col text-left">
                                <h3 className="text-white font-bold text-[17px] lg:text-[21px] leading-[1.3] font-sans">
                                    {item.title}
                                </h3>
                                <p className="text-white/90 font-sans font-light text-[13px] lg:text-[14px] leading-relaxed max-h-0 opacity-0 overflow-hidden group-hover:max-h-[150px] group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-out">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}