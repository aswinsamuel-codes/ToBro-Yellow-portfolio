"use client";

import { motion } from "framer-motion";
import BackgroundScene from "../3d/BackgroundScene";

const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom * 0.2,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <BackgroundScene />

            <div className="z-10 text-center px-4 max-w-5xl">
                <motion.h1
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={contentVariants}
                    className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-black to-black/60"
                >
                    Your Progress, <br /> Our Priority.
                </motion.h1>

                <motion.p
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={contentVariants}
                    className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    We build digital experiences that define the future.
                    Premium design, cutting-edge technology, and strategic growth for modern startups.
                </motion.p>

                <motion.div
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={contentVariants}
                >
                    <a
                        href="#contact"
                        className="inline-block border border-black/20 hover:border-black/60 bg-black/5 hover:bg-black/10 px-8 py-4 rounded-full text-sm uppercase tracking-widest backdrop-blur-sm transition-all duration-300 text-black"
                    >
                        Start a Project
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 animate-bounce"
            >
                <span className="text-xs uppercase tracking-widest text-black/30">Scroll</span>
            </motion.div>
        </section>
    );
}
