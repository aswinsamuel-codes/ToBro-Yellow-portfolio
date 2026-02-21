"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";

interface ServiceFlowchartProps {
    isOpen: boolean;
    onClose: () => void;
    service: {
        title: string;
        color: string;
        steps: { title: string; description: string }[];
    } | null;
}

export default function ServiceFlowchart({ isOpen, onClose, service }: ServiceFlowchartProps) {
    if (!service) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-[#F5F5F7] w-full max-w-4xl rounded-[32px] overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white">
                            <div>
                                <h3 className="text-2xl font-bold text-primary">{service.title} Process</h3>
                                <p className="text-secondary text-sm">How we deliver excellence.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5 text-primary" />
                            </button>
                        </div>

                        {/* Flowchart Content */}
                        <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh]">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                                {/* Connecting Line (Desktop) */}
                                <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-200 -z-10" />

                                {service.steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative group"
                                    >
                                        {/* Step Number/Icon */}
                                        <div
                                            className="w-16 h-16 rounded-2xl bg-white shadow-apple border border-black/5 flex items-center justify-center mb-6 mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300"
                                            style={{ color: service.color }}
                                        >
                                            <span className="text-xl font-bold">{index + 1}</span>
                                            {index < service.steps.length - 1 && (
                                                <div className="md:hidden absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-200" />
                                            )}
                                        </div>

                                        {/* Step Details */}
                                        <div className="text-center">
                                            <h4 className="text-lg font-bold text-primary mb-2">{step.title}</h4>
                                            <p className="text-sm text-secondary leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-white border-t border-black/5 flex justify-end">
                            <button onClick={onClose} className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
