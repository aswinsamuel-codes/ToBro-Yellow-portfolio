"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center",
                scrolled ? "bg-yellow-400 border-b-4 border-black shadow-neo" : "bg-transparent"
            )}
        >
            <Link href="/" className="text-2xl font-bold tracking-tighter text-black">
                TOBRO<span className="text-black/50">.</span>
            </Link>

            <div className="hidden md:flex gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="relative group text-sm font-medium tracking-wide text-black/70 hover:text-black transition-colors"
                    >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}
            </div>

            <button className="md:hidden text-black uppercase text-sm font-bold border-2 border-black px-4 py-2 hover:bg-black hover:text-yellow-400 transition-all shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                Menu
            </button>
        </motion.nav>
    );
}
