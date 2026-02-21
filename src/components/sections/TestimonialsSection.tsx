"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, MessageSquareQuote } from "lucide-react";

interface Testimonial {
    id: string;
    clientName: string;
    role: string;
    industry: string;
    feedback: string;
    impact: string;
    rating: number;
    themeColor: string;
}

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const load = () => {
            const stored = localStorage.getItem("siteTestimonials");
            if (stored) setTestimonials(JSON.parse(stored));
            else setTestimonials([]);
        };
        load();
        const interval = setInterval(load, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="testimonials" className="py-32 px-6 bg-[#1d1d1f]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-bold mb-8 text-white tracking-tight"
                    >
                        Client <span className="text-white/40 italic">Impact</span>
                    </motion.h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">
                        Real-world results from the custom software solutions we've engineered.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.length > 0 ? (
                        testimonials.map((t, index) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="group h-full flex flex-col rounded-[40px] overflow-hidden"
                                style={{ backgroundColor: t.themeColor }}
                            >
                                <div className="p-10 flex-1 flex flex-col text-white">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-[10px] uppercase font-bold tracking-[0.2em]">
                                            {t.industry}
                                        </div>
                                        <div className="flex gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < t.rating ? "text-white fill-white" : "text-white/30"}`} />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-2xl font-bold leading-tight mb-8">
                                        "{t.feedback}"
                                    </p>

                                    <div className="mt-auto pt-8 border-t border-white/20">
                                        <p className="text-xs uppercase tracking-[0.15em] text-white/60 mb-3 font-bold">The Solution & Impact</p>
                                        <p className="text-sm font-medium leading-relaxed text-white/90">
                                            {t.impact}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-black/10 p-10 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-white text-lg leading-none">{t.clientName}</h4>
                                        <span className="text-xs text-white/50 font-medium uppercase tracking-wider mt-1 block">{t.role}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40">
                                        <MessageSquareQuote className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center bg-white/5 rounded-[40px] border border-white/10">
                            <p className="text-white/20 font-bold text-lg uppercase tracking-widest">New Partnerships Brewing</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
