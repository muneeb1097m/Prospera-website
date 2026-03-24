"use client";
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#FAF7F2] pt-16 pb-8 text-[#111315]">
            <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
                {/* FIXED: Updated grid-cols from 4 columns to 3 columns so the layout stays balanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1.5fr_1.5fr] gap-12 lg:gap-8 mb-12">
                    
                    {/* Brand & Description */}
                    <div className="flex flex-col gap-6">
                        <div className="w-[180px]">
                            <Image
                                src="/footerlogo.svg"
                                alt="Prospera Logo"
                                width={180}
                                height={70}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-[15px] leading-relaxed text-[#444] max-w-sm font-sans font-light">
                            A structured monthly system that keeps your books accurate, your taxes predictable, and your decisions clearer year-round.
                        </p>
                        <div className="flex items-center gap-5 pt-2 text-[#111315]">
                            <Link href="#" className="hover:text-[#FEACC6] transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-[#FEACC6] transition-colors"><Linkedin size={20} /></Link>
                            <Link href="#" className="hover:text-[#FEACC6] transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-[#FEACC6] transition-colors"><Twitter size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:pl-8">
                        <h4 className="font-serif font-bold text-[1.25rem] text-[#111315] mb-6">Quick Links</h4>
                        <ul className="flex flex-col gap-4 text-[15px] font-sans font-light text-[#444]">
                            <li><Link href="/" className="hover:text-[#FEACC6] transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-[#FEACC6] transition-colors">About</Link></li>
                            <li><Link href="/services" className="hover:text-[#FEACC6] transition-colors">Services</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-[#FEACC6] transition-colors">How It Works</Link></li>
                            <li><Link href="/contact" className="hover:text-[#FEACC6] transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* FIXED: The "More" section has been completely removed. */}

                    {/* Contact Us */}
                    <div>
                        <h4 className="font-serif font-bold text-[1.25rem] text-[#111315] mb-6">Contact Us</h4>
                        <ul className="flex flex-col gap-5 text-[15px] font-sans font-light text-[#444]">
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[#111315]" />
                                <a href="mailto:jenna@prosperagroup.us" className="hover:text-[#FEACC6] transition-colors">jenna@prosperagroup.us</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[#111315]" />
                                <a href="tel:+19108723200" className="hover:text-[#FEACC6] transition-colors">+1 (910) 872-3200</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#111315] shrink-0 mt-[2px]" />
                                <span className="leading-relaxed">Serving U.S. Small Businesses</span>
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