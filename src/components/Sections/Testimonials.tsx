"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        quote: "Prospera has transformed how we manage our finances. Their monthly reporting gives us clear visibility into performance, and we're always tax-ready and on time.",
        author: "Samantha K",
        role: "Marketing Director",
        image: "https://i.pravatar.cc/150?u=samantha",
    },
    {
        quote: "The accuracy and speed of Prospera's reporting has revolutionized our financial planning. I highly recommend them!",
        author: "Samantha K",
        role: "Marketing Director",
        image: "https://i.pravatar.cc/150?u=samantha2",
    },
    {
        quote: "Thanks to Prospera, I can focus on growing my business instead of worrying about finances. Their automated tools simplify everything.",
        author: "Jordan T",
        role: "Startup Founder",
        image: "https://i.pravatar.cc/150?u=jordan",
    },
    {
        quote: "The accuracy and speed of Prospera's reporting has revolutionized our financial planning. I highly recommend them!",
        author: "Samantha K",
        role: "Marketing Director",
        image: "https://i.pravatar.cc/150?u=samantha3",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-[#FAF7F2] pb-20 overflow-hidden">
            {/* Static Pink Banner */}
            <div className="bg-[#FEACC6] py-3 flex items-center justify-center mb-24 px-6">
                <div className="flex items-center gap-4 text-[13px] font-sans uppercase tracking-widest text-[#111315] text-center">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="whitespace-normal sm:whitespace-nowrap">
                        <span className="font-black">WE BELIEVE BOOKKEEPING SHOULD FEEL:</span>{" "}
                        <span className="font-semibold">Structured. Transparent. Predictable. Reliable.</span>
                    </span>
                </div>
            </div>

            <div className="container mx-auto px-6 text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    /* CHANGED: Swapped font-sans font-bold for font-serif font-normal to trigger Didot! */
                    className="text-[3rem] lg:text-[4.5rem] font-serif font-normal text-[#111315] leading-[1.1] mb-8"
                >
                    Trusted by Structured <br /> Small Businesses
                </motion.h2>
                <p className="text-[1.125rem] text-[#666] font-sans font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                    Our recurring bookkeeping model is designed for business owners who value structure, financial clarity, and long-term stability.
                </p>

                {/* Rating Badge */}
                <div className="flex justify-center mb-20">
                    <div className="bg-[#FEACC6] px-6 py-2 rounded-full flex items-center gap-2 text-[13px] font-sans font-bold shadow-sm">
                        <Star className="w-4 h-4 fill-[#111315]" />
                        <span>4.8 from 200+ Founders</span>
                    </div>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[12px] shadow-sm text-left flex flex-col justify-between"
                        >
                            <p className="text-[1.125rem] text-[#111315] font-sans font-medium mb-8 leading-relaxed italic">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                    <Image src={t.image} alt={t.author} fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-sans font-bold text-[#111315]">{t.author}</h4>
                                    <p className="text-[13px] text-[#666] font-sans">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}