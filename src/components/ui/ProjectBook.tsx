import { ArrowRight } from "lucide-react";
import ProjectScene from "./ProjectScene";

interface ProjectBookProps {
    title: string;
    category: string;
    image: string; // Gradient class
    description: string;
    index: number;
}

export default function ProjectBook({ title, category, image, description, index }: ProjectBookProps) {
    return (
        <div className="group perspective-1000 w-full h-[400px] cursor-pointer">
            <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-[-180deg]">

                {/* Front Cover */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-r-2xl shadow-apple-card p-0 overflow-hidden flex flex-col justify-between border-l-4 border-l-white/20 bg-gray-900">

                    {/* Render the Scene - Background Layer */}
                    <ProjectScene title={title} image={image} />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                        {/* Spine Effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent rounded-l-sm" />

                        <div className="relative z-10">
                            <span className="text-white/80 text-sm font-medium uppercase tracking-widest mb-2 block">{category}</span>
                            <h3 className="text-3xl font-bold text-white max-w-[90%]">{title}</h3>
                        </div>

                        <div className="relative z-10 opacity-80">
                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowRight className="text-white w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Gloss/Texture Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-r-2xl z-20" />
                </div>

                {/* Inside Right (Visible when flipped) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-l-2xl bg-white shadow-apple-card p-8 flex flex-col justify-center border border-gray-100">
                    <h4 className="text-2xl font-bold text-primary mb-4">{title}</h4>
                    <p className="text-secondary leading-relaxed mb-8">
                        {description}
                    </p>

                    <div className="flex-1" /> {/* Spacer */}

                    <div className="w-full flex justify-end items-center gap-2 group/btn cursor-pointer">
                        <span className="text-secondary text-sm font-medium group-hover/btn:text-primary transition-colors">Know More</span>
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Page texture effect */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-100/50 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
