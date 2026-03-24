"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// RESTORED: Your exact original image file names!
const items = [
    {
        title: "Clarity First",
        image: "/tailored-small-business01.png",
    },
    {
        title: <>Recurring <br /> Support</>,
        image: "/Whywe're different001.png",
    },
    {
        title: <>Built For Small <br /> Businesses</>,
        image: "/Whywe'redifferent002.png",
    },
    {
        title: "Practical Guidance",
        image: "/Whywe'redifferent003.png",
    },
];

export default function WhyDifferent() {
    return (
        <section className="bg-[#FAF7F2] py-20 lg:py-24">
            <div className="mx-auto max-w-[1536px] px-6 lg:px-12">
                
                <div className="text-center mb-16 lg:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[2.5rem] lg:text-[4rem] font-serif font-normal text-[#111315] leading-[1.1]"
                    >
                        Why We&apos;re Different
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            /* NO shadows, NO borders, overflow visible so nothing gets cut off */
                            className="relative w-full overflow-visible"
                        >
                            <Image
                                src={item.image}
                                alt="Why We're Different"
                                width={750}
                                height={1000}
                                className="w-full h-auto object-contain pointer-events-none"
                            />
                            
                            {/* TEXT PLACEMENT: Pushed right (pl-12/pl-16) to sit inside the empty space of your images, no background gradients applied. */}
                            <div className="absolute bottom-0 left-0 w-full pl-12 lg:pl-16 pb-8 lg:pb-10">
                                <h3 className="text-white font-semibold text-[15px] lg:text-[17px] leading-[1.3] tracking-wide ![font-family:'Metropolis',_sans-serif]">
                                    {item.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}