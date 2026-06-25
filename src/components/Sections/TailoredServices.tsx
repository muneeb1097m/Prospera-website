import Image from "next/image";

const defaultServices = [
    { 
        title: "Service-Based Businesses", 
        description: "Businesses that need clean monthly bookkeeping, reporting, and tax-ready financial records.",
        image: "/SMO.jpg" 
    },
    { 
        title: "Trades & Field-Service Companies", 
        description: "Contractors and field-service businesses managing jobs, crews, vendors, equipment, payroll timing, and cash flow pressure.",
        image: "/ESC.jpg" 
    },
    { 
        title: "Inventory or Unit-Based Businesses", 
        description: "Businesses such as auto dealers, equipment companies, and other inventory-heavy operations where costs, assets, loans, or inventory need closer tracking.",
        image: "/SBB.jpg" 
    },
    { 
        title: "Retail, Restaurant & Salon Businesses", 
        description: "Businesses with daily sales activity, deposits, merchant fees, tips, payouts, and sales tax considerations.",
        image: "/FWVC.jpg" 
    },
    { 
        title: "Businesses Across the U.S.", 
        description: "Owners who need clearer financial visibility before making operational decisions.",
        image: "/SMO.jpg" 
    },
];

export default function ServicesTailored() {
    const heading = "Built for Businesses With More Financial Moving Parts";
    const services = defaultServices;

    return (
        <section className="py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                
                <h2 className="text-[2.5rem] lg:text-[4rem] font-serif font-normal text-center mb-16 lg:mb-20 leading-[1.1] text-[#111315]">
                    {heading}
                </h2>

                <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                    {services.map((service, index) => {
                        const imageUrl = service.image;

                        return (
                            <div
                                key={index}
                                className="relative w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)] aspect-[4/5] rounded-[16px] lg:rounded-[24px] overflow-hidden group"
                            >
                                <Image 
                                    src={imageUrl} 
                                    alt={service.title} 
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {/* Subtle bottom gradient for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none z-10" />
                                
                                <div className="absolute bottom-0 left-0 w-full px-8 pt-6 pb-10 lg:p-8 z-20 flex flex-col gap-2.5 lg:gap-0 text-left">
                                    <h3 className="text-white font-bold text-[17px] lg:text-[21px] leading-[1.3] font-sans">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/90 font-sans font-light text-[13px] lg:text-[14px] leading-relaxed opacity-100 max-h-[150px] lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:group-hover:max-h-[150px] lg:group-hover:opacity-100 lg:group-hover:mt-3 lg:transition-all lg:duration-500 lg:ease-out">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}