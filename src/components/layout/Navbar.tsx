"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { throttle } from "@/lib/utils";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hasBanner, setHasBanner] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Throttle scroll handler to 16ms (60fps)
        const handleScroll = throttle(() => {
            setScrolled(window.scrollY > 50);
        }, 16);

        const checkBanner = async () => {
            const { data, error } = await supabase
                .from('announcements')
                .select('active')
                .maybeSingle();

            if (!error && data) {
                setHasBanner(data.active);
            } else {
                setHasBanner(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        checkBanner();

        // Realtime sync for banner presence
        const channel = supabase
            .channel('navbar-announcement-sync')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'announcements' },
                () => checkBanner()
            )
            .subscribe();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            supabase.removeChannel(channel);
        };
    }, []);

    if (pathname?.startsWith("/admin")) return null;

    return (
        <nav
            className={`fixed left-0 right-0 z-[999] transition-all duration-500 will-change-transform ${hasBanner ? "top-10" : "top-0"} ${scrolled ? "glass-nav-active py-3" : "glass-nav py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 will-change-auto">
                    <span className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                        ToBro<span className="text-gray-400">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {["About", "Services", "Work", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <Link
                    href="#contact"
                    className="hidden md:block bg-[#1d1d1f] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-black hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] border border-transparent hover:border-gray-700 will-change-auto"
                >
                    Book a Call
                </Link>

                {/* Mobile Menu Toggle (Simple placeholder for now) */}
                <button className="md:hidden text-black will-change-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>
        </nav>
    );
}
