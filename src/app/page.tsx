import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
    return (
        <SmoothScroll>
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <About />
                <Services />
                <Projects />
                <Contact />
            </main>
        </SmoothScroll>
    );
}
