"use client";

import { motion } from "framer-motion";
import { Layers, ShoppingBag, MapPin, ArrowRight } from "lucide-react";

const brands = [
    {
        icon: <Layers className="w-6 h-6 text-[#1d1d1f]" />,
        title: "For SaaS Founders",
        description: "High-performance digital experiences designed to increase demos, trials, and product adoption.",
    },
    {
        icon: <ShoppingBag className="w-6 h-6 text-[#1d1d1f]" />,
        title: "For E-Commerce Brands",
        description: "Conversion-focused storefronts engineered to boost revenue and customer retention.",
    },
    {
        icon: <MapPin className="w-6 h-6 text-[#1d1d1f]" />,
        title: "For Local Businesses",
        description: "Authority-driven websites that turn local traffic into consistent inquiries.",
    },
];

export default function AmbitiousBrands() {
    return (
        <section className="py-24 px-6 bg-gradient-to-br from-[#f0f0f5] to-[#e1e1e6] relative overflow-hidden">
            {/* Subtle Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='0.5'/%3E%3C/svg%3E")` }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-4 block"
                    >
                        Founder-Led. Detail-Obsessed.
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-6"
                    >
                        Built for Ambitious Brands.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        We partner with founders and business owners who take growth seriously. Every project is hands-on, strategic, and built to scale.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {brands.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
                        >
                            {/* Silver Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-50" />

                            <div className="mb-6 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#1d1d1f] group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-base">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <a href="/start-project" className="inline-flex items-center gap-2 text-[#1d1d1f] font-semibold text-lg hover:gap-3 transition-all duration-300 group">
                        Start Your Growth Journey
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
