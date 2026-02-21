"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function StartProject() {
    const [budget, setBudget] = useState("₹15,000 – ₹50,000 (Starter)");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        description: "",
        timeline: ""
    });
    const [services, setServices] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceToggle = (service: string) => {
        setServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network delay
        setTimeout(() => {
            const newQuery = {
                id: Date.now().toString(),
                ...formData,
                services,
                budget,
                status: "Pending",
                date: new Date().toISOString().split('T')[0]
            };

            const existingQueries = JSON.parse(localStorage.getItem("projectQueries") || "[]");
            localStorage.setItem("projectQueries", JSON.stringify([newQuery, ...existingQueries]));

            setIsSubmitting(false);
            setIsSuccess(true);

            // Reset form
            setFormData({ name: "", email: "", company: "", description: "", timeline: "" });
            setServices([]);
            setBudget("₹35,000 – ₹70,000 (Starter)");

            // Reset success message after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000);
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-[#F5F5F7] pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 text-center"
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm font-medium mb-8">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-semibold mb-4 text-primary tracking-tight">
                        Start your project.
                    </h1>
                    <p className="text-xl text-secondary max-w-xl mx-auto">
                        Tell us about your vision. We'll help you build it.
                    </p>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white rounded-[32px] shadow-apple p-8 md:p-12 border border-white/50 relative overflow-hidden"
                >
                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-0 left-0 w-full bg-green-500 text-white p-4 text-center font-medium z-10 flex items-center justify-center gap-2"
                        >
                            <CheckCircle2 className="w-5 h-5" /> Request Submitted Successfully!
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Section 1: About You */}
                        <div>
                            <h3 className="text-xl font-semibold text-primary mb-6">The Basics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary ml-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Your Name"
                                        className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-accent/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="your@email.com"
                                        className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-accent/20 transition-all"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-secondary ml-1">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        placeholder="Company Name"
                                        className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-accent/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Project Details */}
                        <div>
                            <h3 className="text-xl font-semibold text-primary mb-6">Project Details</h3>
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-secondary ml-1">What is Required?</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {["Web Design", "Digital Marketing", "SEO", "Content Creation", "Branding", "App Development"].map((item) => (
                                            <label key={item} className="cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="hidden peer"
                                                    checked={services.includes(item)}
                                                    onChange={() => handleServiceToggle(item)}
                                                />
                                                <div className="border border-gray-100 bg-white rounded-xl p-4 text-center text-sm font-medium text-secondary peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:border-gray-300 transition-all">
                                                    {item}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-medium text-secondary ml-1">About the Project</label>
                                        <span className="text-xs text-gray-400">{formData.description.length}/300</span>
                                    </div>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={5}
                                        maxLength={300}
                                        placeholder="Tell us about your project goals..."
                                        className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary ml-1">Timeline</label>
                                    <input
                                        type="text"
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 2 months, ASAP"
                                        className="w-full bg-[#F5F5F7] border-none rounded-xl p-4 text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-accent/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Budget Selection */}
                        <div>
                            <h3 className="text-xl font-semibold text-primary mb-6">Budget Selection</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { label: "₹35,000 – ₹70,000", tag: "Starter", desc: "Ideal for local businesses, landing pages & basic SEO" },
                                    { label: "₹70,000 – ₹2,00,000", tag: "Growth", desc: "Best for growing brands needing full web + marketing" },
                                    { label: "₹2,00,000+", tag: "Enterprise", desc: "End-to-end solutions for established & scaling businesses" },
                                ].map((range) => (
                                    <label key={range.tag} className="flex items-start gap-4 cursor-pointer group p-5 border rounded-xl hover:border-accent transition-colors bg-[#F5F5F7] has-[:checked]:border-accent has-[:checked]:bg-accent/5">
                                        <input
                                            type="radio"
                                            name="budget"
                                            value={`${range.label} (${range.tag})`}
                                            checked={budget === `${range.label} (${range.tag})`}
                                            onChange={() => setBudget(`${range.label} (${range.tag})`)}
                                            className="w-4 h-4 text-accent border-gray-300 focus:ring-accent mt-1"
                                        />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-base font-bold ${budget === `${range.label} (${range.tag})` ? "text-primary" : "text-secondary"}`}>{range.label}</span>
                                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">{range.tag}</span>
                                            </div>
                                            <p className="text-sm text-gray-400 mt-1">{range.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-accent text-white text-lg font-medium py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-accent-hover transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Request"}
                                {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
