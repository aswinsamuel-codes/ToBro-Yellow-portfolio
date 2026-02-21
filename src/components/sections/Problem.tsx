"use client";

import { motion } from "framer-motion";
import { Zap, MousePointerClick, Server } from "lucide-react";

const features = [
    {
        icon: <Zap className="w-8 h-8 text-gray-700" />,
        title: "Performance-Engineered",
        description: "Lightning-fast architecture built for scale and technical excellence.",
    },
    {
        icon: <MousePointerClick className="w-8 h-8 text-gray-700" />,
        title: "Conversion-Focused UX",
        description: "Designed to increase demos, trials, and product adoption.",
    },
    {
        icon: <Server className="w-8 h-8 text-gray-700" />,
        title: "Scalable Infrastructure",
        description: "Future-ready systems that grow with your product.",
    },
];

export default function Problem() {
    return (
        <section className="py-32 px-6 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] relative overflow-hidden">
            {/* Subtle Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='0.5'/%3E%3C/svg%3E")` }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-6"
                    >
                        Built for Scalable SaaS Growth.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto font-medium"
                    >
                        We engineer digital products that don't just look good—they perform, convert, and scale.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="glass-card p-10 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 active:scale-[0.98]"
                        >
                            <div className="mb-8 w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-[#1d1d1f]">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-lg">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
