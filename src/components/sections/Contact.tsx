"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="min-h-screen py-24 px-6 flex items-center justify-center relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/20 rounded-full blur-[100px] -z-10" />

            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Left Side: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="text-black uppercase tracking-widest text-sm mb-4 block">Get in Touch</span>
                    <h2 className="text-5xl md:text-7xl font-bold mb-8">Let's build something <br /> extraordinary.</h2>
                    <p className="text-black/70 text-lg mb-12">
                        Have an idea? We'd love to hear about it. Reach out to us and let's start the conversation.
                    </p>

                    <div className="flex gap-6">
                        {[<Instagram key="i" />, <Linkedin key="l" />, <Twitter key="t" />].map((icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-12 h-12 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-cream transition-all duration-200 shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 border-4 border-black shadow-neo"
                >
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-white border-2 border-black p-3 focus:outline-none focus:shadow-neo transition-all placeholder:text-black/30 text-black font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Email</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full bg-white border-2 border-black p-3 focus:outline-none focus:shadow-neo transition-all placeholder:text-black/30 text-black font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Tell us about your project..."
                                className="w-full bg-white border-2 border-black p-3 focus:outline-none focus:shadow-neo transition-all resize-none placeholder:text-black/30 text-black font-medium"
                            />
                        </div>

                        <button className="w-full bg-black text-white font-bold py-4 border-2 border-black hover:bg-white hover:text-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 group uppercase tracking-widest">
                            Send Message
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
