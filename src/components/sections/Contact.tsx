"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Instagram, Linkedin, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.from('queries').insert([{
            name: formData.name,
            email: formData.email,
            message: formData.message,
            service: "General Inquiry",
            budget: "Basic",
        }]);

        if (error) {
            console.error('Error saving query:', error);
            alert('Failed to send message. Please try again.');
            return;
        }

        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
    };

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
                    <span className="text-gray-900 uppercase tracking-widest text-sm mb-4 block">Get in Touch</span>
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900">Let's build something <br /> extraordinary.</h2>
                    <p className="text-gray-600 text-lg mb-12">
                        Have an idea? We'd love to hear about it. Reach out to us and let's start the conversation.
                    </p>

                    <div className="flex gap-6">
                        {[
                            { icon: <Instagram />, href: "https://www.instagram.com/tobro.agency?igsh=MTIyaGR1dnFydzY5Yw==" },
                            { icon: <Linkedin />, href: "https://www.linkedin.com/in/tobroagency" }
                        ].map((item, i) => (
                            <a
                                key={i}
                                href={item.href}
                                target={item.href !== "#" ? "_blank" : undefined}
                                rel={item.href !== "#" ? "noopener noreferrer" : undefined}
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 border border-gray-200"
                            >
                                {item.icon}
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
                    className="bg-white p-8 rounded-2xl shadow-professional border border-gray-100 relative overflow-hidden"
                >
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-8 text-center"
                        >
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <Check className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                            <p className="text-gray-500">Thanks for reaching out. We'll get back to you shortly.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-6 text-sm font-medium text-gray-900 hover:text-black underline"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Name</label>
                            <input
                                type="text"
                                required
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Email</label>
                            <input
                                type="email"
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Message</label>
                            <textarea
                                rows={4}
                                required
                                placeholder="Tell us about your project..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none placeholder:text-gray-400 text-gray-900 font-medium"
                            />
                        </div>

                        <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-professional hover:shadow-professional-hover hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group uppercase tracking-widest">
                            Send Message
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
