"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ContactHeroContent } from "@/lib/content/defaults";

interface ContactHeroProps {
    content?: ContactHeroContent;
}

export default function ContactHero({ content }: ContactHeroProps) {
    const badge = content?.badge || "CONTACT PROSPERA";
    const line1 = content?.line1 || "Request a Financial";
    const line2 = content?.line2 || "Structure Review";

    return (
        <section className="relative bg-[#111315] text-white pt-28 pb-12 lg:pt-32 lg:pb-16 overflow-hidden text-center">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <div className="bg-[#FEACC6] text-[#111315] px-6 py-2.5 rounded-[8px] text-[13px] font-sans font-bold uppercase tracking-[0.1em] mb-10 inline-block">
                        {badge}
                    </div>
                    
                    <h1 className="text-[2.5rem] lg:text-[5rem] font-serif font-normal leading-[1.1] max-w-5xl mx-auto">
                        {line1} {line2 ? <><br />{line2}</> : null}
                    </h1>
                </motion.div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] opacity-[0.06] pointer-events-none">
                <Image
                    src="/whitelogo.png"
                    alt=""
                    fill
                    className="object-contain object-bottom right-0"
                    priority
                />
            </div>
        </section>
    );
}