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
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center",
                scrolled ? "glass-nav py-3" : "bg-transparent py-5"
            )}
        >
            <Link href="/" className="text-xl font-semibold tracking-tight text-primary transition-opacity hover:opacity-70">
                ToBro<span className="text-secondary">.</span>
            </Link>

            <div className="hidden md:flex gap-10 absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-[13px] font-medium text-secondary hover:text-primary transition-colors tracking-wide"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            <button className="hidden md:block bg-accent text-white hover:bg-accent-hover text-[13px] font-medium px-4 py-1.5 rounded-full transition-all shadow-sm active:scale-95">
                Book a Call
            </button>

            <button className="md:hidden text-primary">
                Menu
            </button>
        </motion.nav>
    );
}
