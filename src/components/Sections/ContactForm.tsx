"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react"; 

interface FormData {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
    help: string;
    message: string;
}

interface FormErrors {
    firstName?: string | null;
    lastName?: string | null;
    company?: string | null;
    email?: string | null;
    phone?: string | null;
    help?: string | null;
}

const helpOptions = [
    { value: "Monthly bookkeeping and financial reporting", label: "Monthly bookkeeping and financial reporting" },
    { value: "Cleanup or catch-up support", label: "Cleanup or catch-up support" },
    { value: "Tax support and planning", label: "Tax support and planning" },
    { value: "Financial Structure Review", label: "Financial Structure Review" },
    { value: "Not sure yet", label: "Not sure yet" }
];

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "", lastName: "", company: "", email: "", phone: "", help: "", message: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSelectOption = (value: string) => {
        setFormData((prev) => ({ ...prev, help: value }));
        if (errors.help) setErrors((prev) => ({ ...prev, help: null }));
        setIsDropdownOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.company.trim()) newErrors.company = "Company name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.help) newErrors.help = "Please select an option";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); 
        } else {
            setIsSubmitting(true);
            setSubmitStatus('idle');

            fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            .then(async (res) => {
                if (res.ok) {
                    setSubmitStatus('success');
                    setFormData({
                        firstName: "", lastName: "", company: "", email: "", phone: "", help: "", message: ""
                    });
                } else {
                    setSubmitStatus('error');
                }
            })
            .catch(() => setSubmitStatus('error'))
            .finally(() => setIsSubmitting(false));
        }
    };

    return (
        <section className="bg-[#FAF7F2] py-20 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-20 items-start max-w-[1300px] mx-auto">
                    
                    {/* Left Column - Image + Info Box */}
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full h-[300px] lg:h-[350px] rounded-[12px] overflow-hidden shadow-sm"
                        >
                            <Image src="/CU.jpg" alt="Contact Prospera" fill className="object-cover object-top" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white p-8 rounded-[16px] border border-black/5 text-left flex flex-col gap-6 shadow-sm"
                        >
                            <div>
                                <h3 className="text-[17px] lg:text-[19px] font-serif font-normal text-[#111315] mb-4">
                                    We are especially interested in understanding:
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    {[
                                        "Whether your books are current",
                                        "What accounting system you use",
                                        "Whether cleanup or catch-up work is needed",
                                        "What financial questions feel unclear",
                                        "Whether you need monthly bookkeeping, reporting, tax-ready support, cleanup, or operational visibility support"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-[14px] lg:text-[15px] text-[#444] font-sans font-light leading-relaxed">
                                            <span className="w-1.5 h-1.5 bg-[#FEACC6] rounded-full shrink-0 mt-2"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <hr className="border-black/5" />

                            <p className="text-[14px] lg:text-[15px] text-[#555] font-sans font-light leading-relaxed">
                                <strong>Prospera Group USA LLC</strong> is based in Greensboro, North Carolina, and supports businesses across the U.S.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col pt-2 text-left"
                    >
                        <h2 className="text-[2.25rem] lg:text-[3.5rem] font-serif font-normal text-[#111315] leading-[1.05] mb-6">
                            Request a Financial <br /> Structure Review
                        </h2>
                        <p className="text-[15px] lg:text-[17px] text-[#444] font-sans font-light mb-10 max-w-lg leading-relaxed">
                            If your business needs cleaner books, clearer reporting, better tax readiness, or clearer visibility into financial decisions, Prospera can help you identify the next right step. Use this form to tell us where your business stands today and what type of support you are looking for.
                        </p>
 
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Row 1 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-sans font-bold text-[#111315]">First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Type here" className={`w-full bg-white border ${errors.firstName ? 'border-red-500' : 'border-transparent'} rounded-[8px] px-5 py-4 text-[14px] font-sans focus:ring-1 focus:ring-[#FEACC6] outline-none shadow-sm transition-colors`} />
                                    {errors.firstName && <p className="text-red-500 text-[12px] mt-1">{errors.firstName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-sans font-bold text-[#111315]">Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Type here" className={`w-full bg-white border ${errors.lastName ? 'border-red-500' : 'border-transparent'} rounded-[8px] px-5 py-4 text-[14px] font-sans focus:ring-1 focus:ring-[#FEACC6] outline-none shadow-sm transition-colors`} />
                                    {errors.lastName && <p className="text-red-500 text-[12px] mt-1">{errors.lastName}</p>}
                                </div>
                            </div>
 
                            {/* Row 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-sans font-bold text-[#111315]">Company Name</label>
                                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Type here" className={`w-full bg-white border ${errors.company ? 'border-red-500' : 'border-transparent'} rounded-[8px] px-5 py-4 text-[14px] font-sans focus:ring-1 focus:ring-[#FEACC6] outline-none shadow-sm transition-colors`} />
                                    {errors.company && <p className="text-red-500 text-[12px] mt-1">{errors.company}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-sans font-bold text-[#111315]">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Type here" className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-transparent'} rounded-[8px] px-5 py-4 text-[14px] font-sans focus:ring-1 focus:ring-[#FEACC6] outline-none shadow-sm transition-colors`} />
                                    {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
                                </div>
                            </div>
 
                            {/* Row 3 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-sans font-bold text-[#111315]">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Type here" className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-transparent'} rounded-[8px] px-5 py-4 text-[14px] font-sans focus:ring-1 focus:ring-[#FEACC6] outline-none shadow-sm transition-colors`} />
                                    {errors.phone && <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>}
                                </div>
                                
                                <div className="space-y-2" ref={dropdownRef}>
                                    <label className="text-[13px] font-sans font-bold text-[#111315]">How can we help?</label>
                                    
                                    <div className="relative">
                                        <div 
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className={`w-full bg-white border ${errors.help ? 'border-red-500' : 'border-transparent'} rounded-[8px] px-5 py-4 text-[14px] font-sans focus:ring-1 focus:ring-[#FEACC6] outline-none shadow-sm transition-colors cursor-pointer flex justify-between items-center ${!formData.help ? 'text-gray-400' : 'text-[#444]'}`}
                                        >
                                            {formData.help ? helpOptions.find(o => o.value === formData.help)?.label : "Select here"}
                                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </div>
 
                                        <AnimatePresence>
                                            {isDropdownOpen && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-[8px] shadow-xl overflow-hidden"
                                                >
                                                    {helpOptions.map((option) => (
                                                        <div 
                                                            key={option.value}
                                                            onClick={() => handleSelectOption(option.value)}
                                                            className={`px-5 py-3.5 text-[14px] font-sans cursor-pointer transition-colors hover:bg-[#FAF7F2] hover:text-[#111315] ${formData.help === option.value ? 'bg-[#FAF7F2] text-[#111315] font-bold' : 'text-[#444]'}`}
                                                        >
                                                            {option.label}
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    {errors.help && <p className="text-red-500 text-[12px] mt-1">{errors.help}</p>}
                                </div>
                            </div>
 
                            {/* Message Row */}
                            <div className="space-y-2">
                                <label className="text-[13px] font-sans font-bold text-[#111315]">Message (Optional)</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Type here" className="w-full bg-white border border-transparent rounded-[8px] px-5 py-4 text-[14px] font-sans focus:ring-1 focus:ring-[#FEACC6] outline-none resize-none shadow-sm"></textarea>
                            </div>
 
                            <button type="submit" disabled={isSubmitting} className={`${isSubmitting ? 'bg-[#fca1be] cursor-not-allowed' : 'bg-[#FEACC6] hover:bg-[#fca1be]'} text-[#111315] w-full sm:w-auto px-8 py-4 font-sans font-bold text-[13px] tracking-[0.1em] rounded-[8px] transition-colors uppercase mt-2 inline-block text-center`}>
                                {isSubmitting ? "SENDING..." : "Schedule a Financial Structure Review"}
                            </button>
 
                            {submitStatus === 'success' && <p className="text-green-600 text-[14px] font-sans font-bold mt-4">Thank you! Your request has been sent.</p>}
                            {submitStatus === 'error' && <p className="text-red-500 text-[14px] font-sans font-bold mt-4">Something went wrong. Please try again or email us directly.</p>}

                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}