"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const cards = [
    {
        title: <>Maintain Compliance <br /> Year-Round</>,
        image: "/recurring1.png", // Updated
    },
    {
        title: <>Eliminate Tax Season <br /> Scrambling</>,
        image: "/recurring2.png", // Updated
    },
    {
        title: <>Gain Consistent Visibility <br /> into Your Numbers</>,
        image: "/recurring3.png", // Updated (Check the double 'u' here!)
    },
    {
        title: <>Build Predictable Financial <br /> Structure For Growth</>,
        image: "/recurring4.png", // Updated
    },
];

export default function RecurringModelWorks() {
    return (
        <section className="bg-white py-20 lg:py-24">
            <div className="mx-auto max-w-[1536px] px-6 lg:px-12">
                
                <div className="text-center mb-16 lg:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[2.5rem] lg:text-[4rem] font-serif font-normal text-[#111315] leading-[1.1]"
                    >
                        Why Our Recurring <br /> Model Works
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative w-full overflow-visible"
                        >
                            <Image
                                src={card.image}
                                alt="Recurring Model Benefit"
                                width={750}
                                height={1000}
                                className="w-full h-auto object-contain pointer-events-none"
                            />
                            
                            <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
                                <h3 className="text-white font-semibold text-[15px] lg:text-[17px] leading-[1.3] tracking-wide ![font-family:'Metropolis',_sans-serif]">
                                    {card.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}