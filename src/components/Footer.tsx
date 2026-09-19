"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactInfoContent } from "@/lib/content/defaults";

export default function Footer({ content }: { content?: Partial<ContactInfoContent> } = {}) {
    const email = content?.email ?? "admin@prosperagroup.us";
    const phone = content?.phone ?? "+1 (336) 860-7529";
    const address = content?.address ?? "3300 Battleground Ave Suite 310 Greensboro, NC 27410";
    const tagline = content?.tagline ?? "Prospera Group USA LLC helps growing businesses gain cleaner bookkeeping, clearer financial reporting, tax-ready organization, and better financial visibility for decision-making.";
    const subtext = content?.subtext ?? "Based in Greensboro, North Carolina. Supporting businesses across the U.S.";

    return (
        <footer className="bg-[#FAF7F2] pt-16 pb-8 text-[#111315]">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                {/* FIXED: Updated grid-cols from 4 columns to 3 columns so the layout stays balanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1.5fr_1.5fr] gap-12 lg:gap-8 mb-12">
                    
                    {/* Brand & Description */}
                    <div className="flex flex-col gap-6">
                        <div className="w-[180px]">
                            <Image
                                src="/footerlogo.png"
                                alt="Prospera Logo"
                                width={180}
                                height={70}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-[15px] leading-relaxed text-[#444] max-w-sm font-sans font-light">
                            {tagline}
                        </p>
                        <p className="text-[14px] leading-relaxed text-[#666] max-w-sm font-sans font-light mt-2">
                            {subtext}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:pl-8">
                        <h4 className="font-serif font-bold text-[1.25rem] text-[#111315] mb-6">Quick Links</h4>
                        <ul className="flex flex-col gap-4 text-[15px] font-sans font-light text-[#444]">
                            <li><Link href="/" className="hover:text-[#FEACC6] transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-[#FEACC6] transition-colors">About</Link></li>
                            <li><Link href="/services" className="hover:text-[#FEACC6] transition-colors">Services</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-[#FEACC6] transition-colors">How It Works</Link></li>
                            <li><Link href="/contact" className="hover:text-[#FEACC6] transition-colors">Start With a Review</Link></li>
                        </ul>
                    </div>

                    {/* FIXED: The "More" section has been completely removed. */}

                    {/* Contact Us */}
                    <div>
                        <h4 className="font-serif font-bold text-[1.25rem] text-[#111315] mb-6">Contact Us</h4>
                        <ul className="flex flex-col gap-5 text-[15px] font-sans font-light text-[#444]">
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[#111315]" />
                                <a href={`mailto:${email}`} className="hover:text-[#FEACC6] transition-colors">{email}</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[#111315]" />
                                <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:text-[#FEACC6] transition-colors">{phone}</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#111315] shrink-0 mt-[2px]" />
                                <span className="leading-relaxed">{address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 text-center border-t border-black/5 mt-8">
                    <p className="text-[14px] font-sans text-[#666] font-light">
                        © {new Date().getFullYear()} Prospera Group USA LLC. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}