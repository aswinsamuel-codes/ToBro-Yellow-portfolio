"use client";

import { BarChart3, Leaf, Image as ImageIcon } from "lucide-react";

interface ProjectSceneProps {
    title: string;
    image: string; // We'll use this for the background gradient
}

export default function ProjectScene({ title, image }: ProjectSceneProps) {
    // FinTech Scene
    if (title.includes("FinTech")) {
        return (
            <div className={`absolute inset-0 w-full h-full ${image.startsWith('/') ? 'bg-gray-900' : image} overflow-hidden`}>
                {/* Abstract Chart Background */}
                <div className="absolute inset-x-8 bottom-0 flex items-end justify-between gap-2 h-1/2 opacity-20">
                    <div className="w-full bg-white rounded-t-sm h-[40%]" />
                    <div className="w-full bg-white rounded-t-sm h-[70%]" />
                    <div className="w-full bg-white rounded-t-sm h-[50%]" />
                    <div className="w-full bg-white rounded-t-sm h-[80%]" />
                    <div className="w-full bg-white rounded-t-sm h-[60%]" />
                </div>

                {/* Floating Card */}
                <div className="absolute top-1/3 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                        <div className="h-2 w-20 bg-white/20 rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-full bg-white/10 rounded-full" />
                        <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                    </div>
                </div>
            </div>
        );
    }

    // EcoStream Scene
    if (title.includes("EcoStream")) {
        return (
            <div className={`absolute inset-0 w-full h-full ${image.startsWith('/') ? 'bg-emerald-900' : image} overflow-hidden`}>
                {/* Nature Patterns */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-8 border-white/10" />
                <div className="absolute top-20 -left-10 w-32 h-32 rounded-full border-8 border-white/5" />

                {/* App Interface Mockup */}
                <div className="absolute inset-x-12 top-1/4 bottom-0 bg-white rounded-t-[2rem] shadow-2xl p-4 overflow-hidden transform translate-y-4">
                    <div className="flex justify-between items-center mb-6">
                        <Leaf className="text-emerald-500 w-6 h-6" />
                        <div className="w-8 h-8 rounded-full bg-gray-100" />
                    </div>
                    <div className="w-full h-32 bg-emerald-100 rounded-2xl mb-4 flex items-center justify-center">
                        <span className="text-emerald-800 font-bold text-2xl">-24%</span>
                    </div>
                    <div className="space-y-3">
                        <div className="h-3 w-3/4 bg-gray-100 rounded-full" />
                        <div className="h-3 w-1/2 bg-gray-100 rounded-full" />
                    </div>
                </div>
            </div>
        );
    }

    // Lumina Scene (Gallery)
    return (
        <div className={`absolute inset-0 w-full h-full ${image.startsWith('/') ? 'bg-indigo-900' : image} overflow-hidden`}>
            {/* Masonry Grid */}
            <div className="absolute inset-0 p-6 grid grid-cols-2 gap-4 opacity-40 transform -rotate-12 scale-125">
                <div className="bg-white/20 rounded-lg h-32" />
                <div className="bg-white/10 rounded-lg h-48 translate-y-8" />
                <div className="bg-white/30 rounded-lg h-40 -translate-y-4" />
                <div className="bg-white/10 rounded-lg h-32" />
            </div>

            {/* Featured Piece */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500">
                    <ImageIcon className="w-10 h-10 text-white mb-2" />
                    <div className="text-white font-medium text-xs tracking-widest uppercase">Lumina</div>
                </div>
            </div>
        </div>
    );
}
