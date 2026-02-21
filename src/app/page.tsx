import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";

// Lazy-load all below-fold sections — keeps initial bundle tiny & Hero fast
const About = dynamic(() => import("@/components/sections/About"), { ssr: false });
const Services = dynamic(() => import("@/components/sections/Services"), {
    ssr: false,
    loading: () => <div className="py-32 bg-[#F5F5F7] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" /></div>,
});
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), { ssr: false });
const AmbitiousBrands = dynamic(() => import("@/components/sections/AmbitiousBrands"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });


export default function Home() {
    return (
        <SmoothScroll>
            <main className="relative z-10">
                <Hero />
                <Problem />
                <About />
                <Services />
                <WhyChooseUs />
                <TestimonialsSection />
                <AmbitiousBrands />
                <Contact />
            </main>
            <Footer />
        </SmoothScroll>
    );
}
