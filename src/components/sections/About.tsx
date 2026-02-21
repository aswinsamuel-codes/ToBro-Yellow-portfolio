"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="py-32 px-6 relative z-10"
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-card p-8 md:p-20 relative overflow-hidden"
                >
                    {/* Background Detail */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="text-xs font-bold uppercase tracking-[0.3em] text-primary/40 mb-12 block"
                        >
                            Who We Are
                        </motion.span>

                        <div className="relative overflow-hidden mb-12">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ staggerChildren: 0.05 }}
                                className="text-4xl md:text-7xl font-bold leading-tight flex flex-wrap gap-x-4 gap-y-2"
                            >
                                {["We", "don't", "just", "build", "websites."].map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="inline-block"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.8, staggerChildren: 0.05 }}
                                className="text-4xl md:text-7xl font-bold leading-normal flex flex-wrap gap-x-4 gap-y-2 mt-2 text-black/20 py-4"
                            >
                                {["We", "build", "digital", "empires."].map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
                                        className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/40 pb-3"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>

                        <motion.p
                            className="mt-12 text-lg md:text-2xl text-black/60 leading-relaxed max-w-2xl"
                        >
                            At ToBro Agency, our vision is simple: <strong className="text-black">Your Progress, Our Priority.</strong>
                            We merge aesthetics with functionality to create products that stand out in a saturated market.
                            Clean code, bold design, and seamless user experiences.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
