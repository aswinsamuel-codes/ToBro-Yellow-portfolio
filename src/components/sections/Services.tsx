"use client";

import { motion } from "framer-motion";
import { Code, Layout, TrendingUp, PenTool } from "lucide-react";

const services = [
    {
        icon: <Code className="w-8 h-8" />,
        title: "Software Development",
        description: "Custom software solutions tailored to scale your business operations.",
    },
    {
        icon: <Layout className="w-8 h-8" />,
        title: "Website Development",
        description: "High-performance, 3D animated, and responsive websites.",
    },
    {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "Digital Marketing",
        description: "Data-driven strategies to boost your online presence and ROI.",
    },
    {
        icon: <PenTool className="w-8 h-8" />,
        title: "Content & Branding",
        description: "Compelling storytelling and visual identity design.",
    },
];

export default function Services() {
    return (
        <section id="services" className="min-h-screen py-24 px-6 bg-transparent">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 text-black">Our Expertise</h2>
                    <div className="h-1 w-20 bg-black" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
                            className="group p-8 border-4 border-black bg-white shadow-neo hover:shadow-neo-lg hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 cursor-pointer"
                        >
                            <div className="mb-6 text-black group-hover:text-black/80 transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-black">{service.title}</h3>
                            <p className="text-black/70 leading-relaxed group-hover:text-black/90">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
