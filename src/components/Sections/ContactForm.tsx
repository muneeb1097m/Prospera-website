"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// FIXED: Imported ChevronDown for the custom dropdown arrow
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

// FIXED: Defined our dropdown options cleanly
const helpOptions = [
    { value: "bookkeeping", label: "Monthly Bookkeeping" },
    { value: "tax", label: "Tax Preparation" },
    { value: "cleanup", label: "Catch-up / Cleanup" },
    { value: "other", label: "Other" }
];

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "", lastName: "", company: "", email: "", phone: "", help: "", message: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    
    // FIXED: Added state and ref for the custom dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // FIXED: Click-away listener to close the dropdown when clicking outside
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

    // FIXED: Custom handler for our new dropdown
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
                    
                    {/* Left Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-[500px] lg:h-[750px] rounded-[4px] overflow-hidden"
                    >
                        <Image src="/CU.jpg" alt="Contact Prospera" fill className="object-cover" />
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col pt-2"
                    >
                        <h2 className="text-[2.5rem] lg:text-[4rem] font-serif font-normal text-[#111315] leading-[1.05] mb-6">
                            Start Your Recurring <br /> Bookkeeping Plan
                        </h2>
                        <p className="text-[15px] lg:text-[17px] text-[#444] font-sans font-light mb-10 max-w-lg leading-relaxed">
                            Ready for recurring bookkeeping support? Book an intro call to confirm fit and discuss next steps.
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

                            {/* Row 3 - Custom Dropdown implemented here */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-sans font-bold text-[#111315]">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Type here" className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-transparent'} rounded-[8px] px-5 py-4 text-[14px] font-sans focus:ring-1 focus:ring-[#FEACC6] outline-none shadow-sm transition-colors`} />
                                    {errors.phone && <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>}
                                </div>
                                
                                <div className="space-y-2" ref={dropdownRef}>
                                    <label className="text-[13px] font-sans font-bold text-[#111315]">How can we help?</label>
                                    
                                    {/* FIXED: Replaced standard <select> with custom UI */}
                                    <div className="relative">
                                        <div 
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className={`w-full bg-white border ${errors.help ? 'border-red-500' : 'border-transparent'} rounded-[8px] px-5 py-4 text-[14px] font-sans focus:ring-1 focus:ring-[#FEACC6] outline-none shadow-sm transition-colors cursor-pointer flex justify-between items-center ${!formData.help ? 'text-gray-400' : 'text-[#444]'}`}
                                        >
                                            {formData.help ? helpOptions.find(o => o.value === formData.help)?.label : "Select here"}
                                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </div>

                                        {/* Dropdown Menu Animation */}
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

                            <button type="submit" disabled={isSubmitting} className={`${isSubmitting ? 'bg-[#fca1be] cursor-not-allowed' : 'bg-[#FEACC6] hover:bg-[#fca1be]'} text-[#111315] px-10 py-4 font-sans font-bold text-[13px] tracking-[0.1em] rounded-[8px] transition-colors uppercase mt-2 inline-block`}>
                                {isSubmitting ? "SENDING..." : "BOOK AN INTRO CALL"}
                            </button>

                            {submitStatus === 'success' && <p className="text-green-600 text-[14px] font-sans font-bold mt-4">Thank you! Your intro call request has been sent.</p>}
                            {submitStatus === 'error' && <p className="text-red-500 text-[14px] font-sans font-bold mt-4">Something went wrong. Please try again or email us directly.</p>}

                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}