import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ToBro Agency | Your Progress, Our Priority",
    description: "Modern 3D animated website for ToBro Agency.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "antialiased bg-cream text-black overflow-x-hidden")}>
                {children}
            </body>
        </html>
    );
}
