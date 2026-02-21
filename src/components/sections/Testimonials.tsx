"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "ToBro Agency transformed our digital presence. The attention to detail and design quality is unmatched.",
        author: "Sarah Jenkins",
        role: "CEO, TechFlow",
    },
    {
        quote: "We saw a 200% increase in conversions after launching our new site. Highly recommend their services.",
        author: "Michael Chen",
        role: "Marketing Director, Omni",
    },
    {
        quote: "Professional, creative, and efficient. They understood our brand vision perfectly from day one.",
        author: "Elena Rodriguez",
        role: "Founder, Luxe Living",
    },
];

export default function Testimonials() {
    return (
        <section className="py-32 px-6 bg-[#F5F5F7]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight mb-4">Client Stories</h2>
                    <p className="text-secondary">What our partners say about working with us.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-white p-10 rounded-[32px] shadow-apple border border-white/50"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                                ))}
                            </div>
                            <p className="text-lg text-primary font-medium leading-relaxed mb-8">
                                "{item.quote}"
                            </p>
                            <div>
                                <h4 className="font-semibold text-primary">{item.author}</h4>
                                <span className="text-sm text-secondary">{item.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
