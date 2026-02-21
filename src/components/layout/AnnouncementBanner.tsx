"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AnnouncementBanner() {
    const [announcement, setAnnouncement] = useState<{ text: string; active: boolean } | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Poll for changes (simple way to sync across tabs/updates without context for now)
        const checkAnnouncement = () => {
            const stored = localStorage.getItem("siteAnnouncement");
            if (stored) {
                setAnnouncement(JSON.parse(stored));
            } else {
                setAnnouncement(null);
            }
        };

        checkAnnouncement();
        const interval = setInterval(checkAnnouncement, 2000); // Check every 2s
        return () => clearInterval(interval);
    }, []);

    // Don't show on admin pages
    if (pathname?.startsWith("/admin")) return null;

    if (!announcement || !announcement.active) return null;

    return (
        <div className="fixed top-0 left-0 w-full z-[60] bg-[#1d1d1f] text-white h-10 flex items-center overflow-hidden">
            <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                className="whitespace-nowrap font-medium text-sm tracking-wide"
            >
                {announcement.text} &nbsp; &bull; &nbsp; {announcement.text} &nbsp; &bull; &nbsp; {announcement.text}
            </motion.div>
        </div>
    );
}
