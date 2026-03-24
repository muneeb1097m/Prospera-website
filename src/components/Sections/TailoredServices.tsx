import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface TailoredServicesProps {
    data?: {
        heading?: string;
        services?: { title: string; image: any }[];
    }
}

const defaultServices = [
    { title: "Small Business Owners", image: "/SMO.jpg" },
    { title: "Early-Stage Companies", image: "/ESC.jpg" },
    { title: "Service-Based Businesses", image: "/SBB.jpg" },
    { 
        title: "Founders Who Value Clarity And Consistency", 
        image: "/FWVC.jpg" 
    },
];

export default function ServicesTailored({ data }: TailoredServicesProps) {
    const heading = data?.heading || "Our services are tailored for";
    const services = data?.services || defaultServices;

    return (
        <section className="py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                
                <h2 className="text-[2.5rem] lg:text-[4rem] font-serif font-normal text-center mb-16 lg:mb-20 leading-[1.1] text-[#111315]">
                    {heading}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {services.map((service, index) => {
                        const imageUrl = service.image && typeof service.image !== 'string' 
                            ? urlFor(service.image).url() 
                            : service.image;

                        return (
                            <div
                                key={index}
                                className="relative w-full aspect-[4/5] rounded-[16px] lg:rounded-[24px] overflow-hidden group"
                            >
                                <Image 
                                    src={imageUrl} 
                                    alt={service.title} 
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {/* FIXED: Restricted the gradient height. 
                                    'to-30%' ensures the dark shadow is completely transparent before it reaches the top 30% of the image. 
                                    'from-black/80' gives it that strong visibility punch for the text without covering the whole photo. */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent to-30% pointer-events-none z-10" />
                                
                                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20">
                                    <h3 className="text-white font-semibold text-[15px] lg:text-[17px] leading-[1.4] tracking-[0.02em] font-sans">
                                        {service.title}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}