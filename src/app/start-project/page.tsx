"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function StartProject() {
    const [budget, setBudget] = useState("5k-10k");

    return (
        <main className="min-h-screen bg-cream pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <Link href="/" className="inline-block mb-8 text-black font-bold uppercase tracking-widest border-b-2 border-black hover:bg-black hover:text-cream transition-colors">
                        ← Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-8xl font-bold mb-6 text-black tracking-tighter">
                        START YOUR <br /> PROJECT
                    </h1>
                    <p className="text-xl text-black/70 max-w-2xl mx-auto">
                        Tell us about your vision. We'll help you build it.
                    </p>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white border-4 border-black shadow-neo p-8 md:p-12 relative"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-black" />
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-black" />

                    <form className="space-y-12">
                        {/* Section 1: About You */}
                        <div>
                            <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-black text-cream flex items-center justify-center text-sm rounded-none">01</span>
                                The Basics
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-white border-2 border-black p-4 focus:outline-none focus:shadow-neo transition-all placeholder:text-black/30 text-black font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full bg-white border-2 border-black p-4 focus:outline-none focus:shadow-neo transition-all placeholder:text-black/30 text-black font-medium"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Company / Organization</label>
                                    <input
                                        type="text"
                                        placeholder="Company Name (Optional)"
                                        className="w-full bg-white border-2 border-black p-4 focus:outline-none focus:shadow-neo transition-all placeholder:text-black/30 text-black font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Project Details */}
                        <div>
                            <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-black text-cream flex items-center justify-center text-sm rounded-none">02</span>
                                Project Details
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">What do you need?</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {["Web Design", "Development", "Branding", "Marketing", "E-Commerce", "Other"].map((item) => (
                                            <label key={item} className="cursor-pointer group">
                                                <input type="checkbox" className="hidden peer" />
                                                <div className="border-2 border-black p-4 text-center font-bold text-black peer-checked:bg-black peer-checked:text-white hover:shadow-neo transition-all">
                                                    {item}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Project Description</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Tell us about your project goals, target audience, and any specific requirements..."
                                        className="w-full bg-white border-2 border-black p-4 focus:outline-none focus:shadow-neo transition-all resize-none placeholder:text-black/30 text-black font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Budget & Timeline */}
                        <div>
                            <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-black text-cream flex items-center justify-center text-sm rounded-none">03</span>
                                Budget & Timeline
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-black mb-4 uppercase tracking-wide">Estimated Budget</label>
                                    <div className="space-y-3">
                                        {["<$5k", "$5k - $10k", "$10k - $25k", "$25k - $50k", "$50k+"].map((range) => (
                                            <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`w-6 h-6 border-2 border-black flex items-center justify-center ${budget === range ? "bg-black" : "bg-white"}`}>
                                                    {budget === range && <CheckCircle2 className="w-4 h-4 text-white" />}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="budget"
                                                    value={range}
                                                    checked={budget === range}
                                                    onChange={() => setBudget(range)}
                                                    className="hidden"
                                                />
                                                <span className="font-bold text-black group-hover:translate-x-1 transition-transform">{range}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Expected Timeline</label>
                                    <select className="w-full bg-white border-2 border-black p-4 focus:outline-none focus:shadow-neo transition-all text-black font-medium appearance-none cursor-pointer">
                                        <option>Select a timeline...</option>
                                        <option>ASAP (Rush)</option>
                                        <option>1 - 2 Months</option>
                                        <option>3 - 6 Months</option>
                                        <option>Flexible</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-8 border-t-2 border-black/10">
                            <button className="w-full bg-black text-white text-xl font-bold py-6 border-2 border-black hover:bg-white hover:text-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-3 group uppercase tracking-widest">
                                Submit Project Brief
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
