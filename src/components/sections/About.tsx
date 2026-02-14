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
            className="min-h-screen flex items-center justify-center py-20 px-6 relative"
        >
            <div className="max-w-4xl mx-auto text-center md:text-left">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-sm uppercase tracking-widest text-black mb-8 block"
                >
                    Who We Are
                </motion.span>

                <div className="relative overflow-hidden">
                    <motion.h2
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-bold leading-tight"
                    >
                        We don't just build websites. <br />
                        <span className="text-black/50">We build digital empires.</span>
                    </motion.h2>
                </div>

                <motion.p
                    style={{ y }}
                    className="mt-12 text-xl md:text-2xl text-black/60 leading-relaxed max-w-2xl"
                >
                    At ToBro Agency, our vision is simple: <strong className="text-black">Your Progress, Our Priority.</strong>
                    We merge aesthetics with functionality to create products that stand out in a saturated market.
                    Clean code, bold design, and seamless user experiences.
                </motion.p>
            </div>
        </section>
    );
}
