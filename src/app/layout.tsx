import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true });

export const metadata: Metadata = {
    title: "ToBro Agency | Your Progress, Our Priority",
    description: "Modern 3D animated website for ToBro Agency.",
};

import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import AdminShortcutListener from "@/components/layout/AdminShortcutListener";
import VisitorTracker from "@/components/layout/VisitorTracker";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "antialiased bg-gray-50 text-gray-900 overflow-x-hidden")}>
                <VisitorTracker />
                <AdminShortcutListener />
                <AnnouncementBanner />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
