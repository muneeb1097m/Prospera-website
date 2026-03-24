import Image from "next/image";

export default function ServicesTailored() {
    const services = [
        { title: <>Small <br /> Business Owners</>, image: "/SMO.jpg" },
        { title: <>Early-Stage <br /> Companies</>, image: "/ESC.jpg" },
        { title: <>Service-Based <br /> Businesses</>, image: "/tailored-service-based01.png" },
        { title: <>Business Owners Who Value <br /> Clarity And Consistency</>, image: "/tailored-clarity01.png" },
    ];

    return (
        <section className="py-20 lg:py-24 bg-white">
            {/* 1. Widened the container and reduced the side padding to let the cards take up maximum screen real estate */}
            <div className="mx-auto max-w-[1300px] px-4 lg:px-6">
                
                <h2 className="text-[2.5rem] lg:text-[4rem] font-serif font-normal text-center mb-16 lg:mb-20 leading-[1.1] text-[#111315]">
                    Our services <br /> are tailored for
                </h2>

                {/* 2. Drastically reduced the gap from gap-6 to gap-3/gap-4 to pull the cards tightly together */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="relative w-full flex flex-col"
                        >
                            <Image 
                                src={service.image} 
                                alt="Service category" 
                                width={800}
                                height={1000}
                                className="w-full h-auto pointer-events-none"
                            />
                            
                            {/* Adjusted the text padding so it sits perfectly in the gradient */}
                            <div className="absolute inset-0 flex items-end p-5 lg:p-6">
                                {/* 3. Changed to font-normal and dropped the text size to match the delicate Figma look */}
                                <h3 className="text-white font-normal text-[14px] lg:text-[15px] leading-snug tracking-wide ![font-family:'Metropolis',_sans-serif]">
                                    {service.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}