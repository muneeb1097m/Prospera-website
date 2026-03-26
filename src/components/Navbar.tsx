"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Cleaned up the links into an array so the code stays DRY and easy to edit
const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "SERVICES", path: "/services" },
    { name: "HOW IT WORKS", path: "/how-it-works" },
];

export default function Navbar() {
    const pathname = usePathname(); // This grabs the current URL path
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed top-0 left-0 w-full z-50 pt-6 px-4 lg:px-10 pointer-events-none">
            <nav className="container mx-auto flex items-center justify-between px-6 md:px-8 py-3 bg-white rounded-[16px] shadow-sm pointer-events-auto max-w-[1400px] w-full">
                
                {/* Logo */}
                <Link href="/" className="flex items-center flex-shrink-0 relative z-[60]">
                    <Image
                        src="/logo2.png"
                        alt="Prospera Logo"
                        width={180}
                        height={50}
                        className="object-contain w-auto h-8 md:h-10"
                        priority
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-10 ml-auto mr-10">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        
                        return (
                            <Link 
                                key={link.name}
                                href={link.path} 
                                className={`relative py-1 text-[13px] font-semibold font-sans uppercase tracking-[0.1em] transition-colors ${
                                    isActive ? "text-[#FF8FAB]" : "text-[#1A1A1A] hover:text-[#FF8FAB]"
                                }`}
                            >
                                {link.name}
                                
                                {/* The Dynamic Active Line */}
                                {isActive && (
                                    <motion.span 
                                        layoutId="activeNavLine"
                                        className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#FEACC6] rounded-full"
                                        /* FIXED: Added initial and animate to stop the first-load fly-in glitch! */
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    {/* CTA Button - Hidden on very small screens, visible on md+ */}
                    <Link href="/contact" className="hidden sm:flex bg-[#FEACC6] hover:bg-[#fca1be] text-[#1A1A1A] text-[13px] font-sans font-bold px-6 md:px-8 py-3 md:py-4 rounded-[8px] transition-colors uppercase tracking-[0.1em]">
                        CONTACT US
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-[#1A1A1A] hover:text-[#FF8FAB] transition-colors relative z-[60]"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full min-h-screen bg-white z-[55] pt-32 px-10 pointer-events-auto md:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col gap-8 items-start">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.path;
                                return (
                                    <Link 
                                        key={link.name}
                                        href={link.path} 
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`text-[2rem] font-serif font-normal transition-colors ${
                                            isActive ? "text-[#FF8FAB]" : "text-[#1A1A1A]"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            
                            <hr className="w-full border-gray-100 my-4" />
                            
                            <Link 
                                href="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full bg-[#FEACC6] text-[#1A1A1A] py-5 rounded-[12px] text-center font-sans font-bold text-[18px] uppercase tracking-widest shadow-lg active:scale-[0.98] transition-transform"
                            >
                                CONTACT US
                            </Link>
                            
                            {/* Contact Info in Menu */}
                            <div className="mt-12 space-y-4">
                                <p className="text-[13px] font-sans font-bold text-gray-400 uppercase tracking-widest">Connect</p>
                                <div className="flex flex-col gap-2">
                                    <a href="mailto:admin@prosperagroup.us" className="text-[#1A1A1A] font-sans">admin@prosperagroup.us</a>
                                    <a href="tel:+13368607529" className="text-[#1A1A1A] font-sans">+1 (336) 860-7529</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}