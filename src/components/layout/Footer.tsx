"use client";

import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github, Lock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-xl font-semibold tracking-tight text-primary mb-6 block">
                            ToBro<span className="text-secondary">.</span>
                        </Link>
                        <p className="text-secondary text-sm leading-relaxed max-w-xs">
                            Premium digital experiences for forward-thinking brands. We build the future.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-secondary">
                            <li><Link href="#" className="hover:text-accent transition-colors">Web Development</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">App Design</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">SEO Optimization</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Brand Strategy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-secondary">
                            <li><Link href="#" className="hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-secondary">
                        &copy; {new Date().getFullYear()} ToBro Agency. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-xs text-secondary">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
