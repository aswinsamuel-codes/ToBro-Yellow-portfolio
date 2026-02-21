"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Shield, Users, Smartphone, Target } from "lucide-react";

const features = [
    {
        icon: <Zap className="w-6 h-6 text-accent" />,
        title: "Lightning Fast Performance",
        description: "Optimized for speed. We build websites that load in under a second.",
    },
    {
        icon: <Shield className="w-6 h-6 text-accent" />,
        title: "Enterprise Grade Security",
        description: "Bank-level encryption and security best practices to protect your data.",
    },
    {
        icon: <Users className="w-6 h-6 text-accent" />,
        title: "User-Centric Design",
        description: "Interfaces designed for humans, focused on conversion and usability.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-semibold text-primary mb-8 tracking-tight leading-tight">
                            Why Innovative Brands <br /> Choose ToBro.
                        </h2>
                        <p className="text-xl text-secondary mb-12 leading-relaxed">
                            We don't just deliver code. We deliver results. Our approach combines aesthetic excellence with technical rigor.
                        </p>

                        <div className="space-y-8">
                            {features.map((feature, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-primary mb-1">{feature.title}</h3>
                                        <p className="text-secondary">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="aspect-square bg-[#1d1d1f] rounded-[40px] flex flex-col justify-between p-10 relative overflow-hidden shadow-2xl border border-white/10 group"
                    >
                        {/* Subtle Grain/Noise Overlay */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='0.5'/%3E%3C/svg%3E")` }}
                        />

                        {/* Soft Silver Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500/50 to-transparent" />

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">Built for Performance.</h3>

                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="p-2 rounded-full bg-white/5">
                                        <Zap className="w-5 h-5 text-yellow-400" />
                                    </div>
                                    <span className="font-medium">90+ Lighthouse Performance</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="p-2 rounded-full bg-white/5">
                                        <Shield className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <span className="font-medium">Secure & Scalable Architecture</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="p-2 rounded-full bg-white/5">
                                        <Smartphone className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <span className="font-medium">Fully Responsive Systems</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="p-2 rounded-full bg-white/5">
                                        <Target className="w-5 h-5 text-green-400" />
                                    </div>
                                    <span className="font-medium">Conversion-Focused UX</span>
                                </li>
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="relative z-10 mt-auto">
                            <p className="text-sm text-gray-300 font-bold mb-4 border-t border-white/10 pt-4">
                                Engineered with modern frameworks and best-in-class development standards.
                            </p>
                            <div className="flex flex-wrap gap-3 text-xs font-bold text-white uppercase tracking-wider">
                                <span>Next.js</span>
                                <span className="text-gray-500">•</span>
                                <span>React</span>
                                <span className="text-gray-500">•</span>
                                <span>Webflow</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
