"use client";

import { motion } from "framer-motion";


const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom * 0.15,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#f0f0f5] to-[#e1e1e6]">
            {/* Soft Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='0.5'/%3E%3C/svg%3E")` }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen max-w-7xl mx-auto px-6 text-center pt-32 pb-20">
                <div className="max-w-4xl">
                    <motion.h1
                        className="text-4xl md:text-7xl font-bold mb-8 text-[#1d1d1f] leading-[1.1] md:leading-[1.2] tracking-tight flex flex-col items-center justify-center"
                    >
                        <div className="overflow-hidden py-1">
                            <motion.span
                                initial={{ y: "110%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.22, 1, 0.3, 1],
                                    delay: 0.1
                                }}
                                className="block"
                            >
                                Helping Modern Brands
                            </motion.span>
                        </div>
                        <div className="overflow-hidden py-1">
                            <motion.span
                                initial={{ y: "110%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.22, 1, 0.3, 1],
                                    delay: 0.2
                                }}
                                className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-black"
                            >
                                Build Digital Authority.
                            </motion.span>
                        </div>
                    </motion.h1>

                    <motion.p
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        className="text-xl text-gray-600 mb-12 leading-relaxed font-normal max-w-2xl mx-auto"
                    >
                        High-performance websites, growth-driven marketing, and SEO systems designed for scalable brands.
                    </motion.p>

                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="/start-project"
                            className="w-full sm:w-auto text-center bg-[#1d1d1f] text-white px-8 py-4 font-medium text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-black transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            Start a Project
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                        <a
                            href="#contact"
                            className="w-full sm:w-auto text-center px-8 py-4 text-[#1d1d1f] border border-gray-300 hover:border-gray-500 rounded-full font-medium text-lg transition-all bg-transparent hover:bg-gray-50"
                        >
                            Book a Strategy Call
                        </a>
                    </motion.div>
                </div>
            </div>

            <div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-300 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-semibold">Scroll</span>
            </div>
        </section>
    );
}
