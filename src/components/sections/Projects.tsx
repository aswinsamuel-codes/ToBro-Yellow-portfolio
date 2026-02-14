"use client";

import { motion } from "framer-motion";

export default function Projects() {
    return (
        <section id="projects" className="min-h-screen py-24 px-6 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 flex items-end justify-between"
                >
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">Selected Work</h2>
                    <span className="hidden md:block text-xl text-gray-500">(2023 - 2024)</span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[1, 2, 3, 4].map((item) => (
                        <motion.div
                            key={item}
                            className="aspect-video bg-white border-4 border-black shadow-neo flex items-center justify-center relative overflow-hidden group hover:shadow-neo-lg transition-all duration-200"
                            whileHover={{ scale: 0.98 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                                <div>
                                    <h4 className="text-2xl font-bold text-white">Project Name {item}</h4>
                                    <p className="text-white/80">Web Design / Development</p>
                                </div>
                            </div>
                            <span className="text-black/50 font-mono text-4xl">COMING SOON</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
