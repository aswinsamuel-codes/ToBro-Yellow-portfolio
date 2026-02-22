"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AnnouncementBanner() {
    const [announcement, setAnnouncement] = useState<{ text: string; active: boolean } | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchAnnouncement = async () => {
            const { data, error } = await supabase
                .from('announcements')
                .select('*')
                .maybeSingle();

            if (error) {
                console.error('Error fetching announcement:', error);
                return;
            }
            setAnnouncement(data);
        };

        fetchAnnouncement();

        // Realtime subscription
        const channel = supabase
            .channel('announcement-sync')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'announcements' },
                () => fetchAnnouncement()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
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
