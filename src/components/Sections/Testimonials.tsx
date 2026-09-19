"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { TestimonialsContent } from "@/lib/content/defaults";

const defaultTestimonials = [
    {
        quote: "Working with Jenna has been an absolute game changer for my business. Following her bookkeeping and accounting processes has saved me a tremendous amount of time and money. She has a clear, organized system that makes everything so much easier and more efficient.",
        author: "Sami Maaliki",
        role: "Business Owner",
    },
    {
        quote: "Jenna is not only a skilled tax preparer, but she also acts as a mentor, a dedicated and responsible partner. Since Jenna started helping me with my taxes, everything has become much more organized and clearer. Working with her always gives me peace of mind.",
        author: "Kate Tran",
        role: "Small Business Owner",
    },
    {
        quote: "Jenna is extremely knowledgeable, organized and has completely helped me with my Business strategies. I know I'm in good hands with her and I put my complete trust in her to look out for my best interest. She eliminates my stress in dealing with taxes.",
        author: "Renee Bell",
        role: "Managing Director",
    },
    {
        quote: "Working with her has been amazing. She's incredibly organized, always on top of things, and somehow always has a solution whenever something comes up. Her expertise has saved me so much time and made running my business a lot easier.",
        author: "The Morgan Collective",
        role: "Creative Agency",
    },
    {
        quote: "Jenna is knowledgeable, efficient, and responsive to all my bookkeeping and tax needs. I highly recommend her services to my peers in service-based industries!",
        author: "Moniqucia Varner",
        role: "Service Provider",
    },
    {
        quote: "I always have a great experience working with Jenna. She is always professional, organized, and on time. I never have to worry about delays or missed details because she stays on top of everything. She explains things clearly and makes the process simple.",
        author: "Alysia Wake",
        role: "Entrepreneur",
    },
    {
        quote: "Jenna is great! I've been with her over a year now for both personal and business accounting/taxes and she's always very responsive, professional, and invested! Highly recommend.",
        author: "Emily",
        role: "Business Client",
    },
    {
        quote: "If you're looking for someone who is professional, reliable, and truly amazing at what she does, I can't recommend her enough. She genuinely cares about helping her clients succeed.",
        author: "Nguyen Vu",
        role: "Founder",
    },
];

export default function Testimonials({ content }: { content?: Partial<TestimonialsContent> } = {}) {
    const bannerPrefix = content?.bannerPrefix ?? "WE BELIEVE BOOKKEEPING SHOULD FEEL:";
    const bannerHighlight = content?.bannerHighlight ?? "Structured. Transparent. Predictable. Reliable.";
    const items = content?.testimonials ?? defaultTestimonials;

    return (
        <section className="bg-[#FAF7F2] pb-20 overflow-hidden">
            {/* Static Pink Banner */}
            <div className="bg-[#FEACC6] py-3 flex items-center justify-center mb-24 px-6">
                <div className="flex items-center gap-4 text-[13px] font-sans uppercase tracking-widest text-[#111315] text-center">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="whitespace-normal sm:whitespace-nowrap">
                        <span className="font-black">{bannerPrefix}</span>{" "}
                        <span className="font-semibold">{bannerHighlight}</span>
                    </span>
                </div>
            </div>

            <div className="container mx-auto px-6 text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[3rem] lg:text-[4.5rem] font-serif font-normal text-[#111315] leading-[1.1] mb-8"
                >
                    Trusted by Business Owners <br /> Who Value Clarity
                </motion.h2>
                <p className="text-[1.125rem] text-[#666] font-sans font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                    Our recurring bookkeeping model is designed for business owners who value structure, financial clarity, and long-term stability.
                </p>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {items.map((t, i) => (
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
                                <div className="w-12 h-12 rounded-lg bg-[#FEACC6]/20 flex items-center justify-center shrink-0 border border-[#FEACC6]/40">
                                    <span className="text-[#111315] font-sans font-bold text-[14px]">
                                        {(t.author && t.author.trim()) ? t.author.trim().split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'P'}
                                    </span>
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