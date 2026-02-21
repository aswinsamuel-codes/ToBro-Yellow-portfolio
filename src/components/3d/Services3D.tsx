"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { Group } from "three";
import ServiceCard from "./ServiceCard";
import ServiceFlowchart from "../ui/ServiceFlowchart";
import * as THREE from "three";

const services = [
    {
        title: "Web Development",
        description: "High-performance websites built with Next.js.",
        icon: "💻",
        color: "#0071E3",
        steps: [
            { title: "Discovery", description: "We analyze your business goals, target audience, and technical requirements." },
            { title: "Architecture", description: "Planning the database, API structure, and frontend component system." },
            { title: "Development", description: "Writing clean, scalable code using Next.js, React, and Tailwind CSS." },
            { title: "Launch & Support", description: "Deploying to production, performance monitoring, and ongoing maintenance." }
        ]
    },
    {
        title: "App Development",
        description: "Native and cross-platform mobile apps.",
        icon: "📱",
        color: "#34C759",
        steps: [
            { title: "Concept", description: "Refining your app idea into a tangible product roadmap." },
            { title: "UI/UX Design", description: "Creating intuitive wireframes and beautiful high-fidelity prototypes." },
            { title: "Engineering", description: "Building the app using React Native or Flutter for cross-platform efficiency." },
            { title: "Store Submission", description: "Handling the complex process of getting your app on the App Store and Google Play." }
        ]
    },
    {
        title: "Digital Marketing",
        description: "Strategies to grow your brand reach.",
        icon: "📈",
        color: "#FF2D55",
        steps: [
            { title: "Audit", description: "Analyzing your current digital footprint and competitors." },
            { title: "Strategy", description: "Defining channels, content pillars, and ad spend allocation." },
            { title: "Execution", description: "Launching campaigns across Social, Search, and Email." },
            { title: "Optimization", description: "Continuous A/B testing and data analysis to maximize ROI." }
        ]
    },
    {
        title: "UI/UX Design",
        description: "Intuitive interfaces designed for humans.",
        icon: "🎨",
        color: "#AF52DE",
        steps: [
            { title: "User Research", description: "Understanding user needs through interviews and data analysis." },
            { title: "Wireframing", description: "Sketching the structural layout of the application." },
            { title: "Prototyping", description: "Creating interactive mockups to test user flows." },
            { title: "Visual Design", description: "Applying your brand identity to create a stunning interface." }
        ]
    },
    {
        title: "SEO Optimization",
        description: "Rank higher on search engines.",
        icon: "🔍",
        color: "#FF9500",
        steps: [
            { title: "Keyword Research", description: "Identifying high-value search terms for your niche." },
            { title: "On-Page SEO", description: "Optimizing content, meta tags, and site structure." },
            { title: "Technical SEO", description: " improving site speed, mobile-friendliness, and crawlability." },
            { title: "Backlinking", description: "Building authority through high-quality external links." }
        ]
    }
];

function FlippingCard({ service, onClick }: { service: any, onClick: () => void }) {
    const groupRef = useRef<Group>(null);

    // Animate rotation when service changes
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Continuous gentle float
            const t = state.clock.elapsedTime;
            groupRef.current.position.y = Math.sin(t) * 0.1;

            // Initial spin on mount/key change is handled by React key remounting 
            // or we can animate a value here.
            // We'll let the Spring/Transition happen via the Key prop in the parent Canvas, 
            // triggering a fresh mount with initial rotation?
            // Or we can just lerp to 0 from 180?

            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, delta * 3);
        }
    });

    // Reset rotation on init
    // We can't useLayoutEffect safely in SSR without checks, but useFrame handles the lerp target.
    // We just need to set the initial rotation to Math.PI when the key changes.
    // But we can't easily access the "previous" instance state here.

    // Actually simpler: Just render the card.
    return (
        <group ref={groupRef} rotation={[0, Math.PI / 2, 0]}>
            {/* Start rotated 90deg or 180deg to flip in? */}
            <ServiceCard
                position={[0, 0, 0]}
                {...service}
                onClick={onClick}
            />
        </group>
    );
}

export default function Services3D() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedService, setSelectedService] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance
    useEffect(() => {
        if (!isPaused && !selectedService) {
            const timer = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % services.length);
            }, 2000);
            return () => clearInterval(timer);
        }
    }, [isPaused, selectedService]);

    return (
        <div className="h-[90vh] w-full relative bg-[#F5F5F7] overflow-hidden flex flex-col md:flex-row">

            {/* Left Sidebar (Desktop) / Top Bar (Mobile) - Navigation */}
            <div className="w-full md:w-1/3 p-8 md:p-12 z-10 flex flex-col justify-center h-full bg-linear-to-r from-[#F5F5F7] to-transparent">
                <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-semibold text-primary tracking-tight">Our Expertise</h2>
                    <p className="text-secondary mt-2">Services designed for impact.</p>
                </div>

                <div className="space-y-4">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-4 ${i === activeIndex ? 'bg-white shadow-apple scale-105' : 'hover:bg-white/50'}`}
                            onClick={() => { setActiveIndex(i); setIsPaused(true); }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <span className="text-2xl">{s.icon}</span>
                            <div>
                                <h3 className={`font-bold ${i === activeIndex ? 'text-primary' : 'text-secondary'}`}>{s.title}</h3>
                                {i === activeIndex && (
                                    <div className="mt-1">
                                        <p className="text-xs text-secondary line-clamp-1">{s.description}</p>
                                        <p className="text-[10px] text-blue-600 font-medium mt-1 animate-pulse italic">Click to know more &rarr; to view what&apos;s inside</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side - 3D Single Card View */}
            <div className="w-full md:w-2/3 h-[50vh] md:h-full relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}>

                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
                    <ambientLight intensity={0.7} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <Environment preset="city" />
                    <Stars radius={50} depth={50} count={500} factor={4} saturation={0} fade speed={1} />

                    {/* Key changes trigger remount and lerp animation in Child */}
                    <FlippingCard
                        key={activeIndex}
                        service={services[activeIndex]}
                        onClick={() => setSelectedService(services[activeIndex] as any)}
                    />
                </Canvas>
            </div>

            {/* Flowchart Modal Overlay */}
            <ServiceFlowchart
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />
        </div>
    );
}
