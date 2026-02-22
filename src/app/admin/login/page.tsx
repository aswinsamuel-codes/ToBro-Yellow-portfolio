"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        setTimeout(() => {
            // Load users from localStorage
            const storedUsers: any[] = JSON.parse(localStorage.getItem("adminUsers") || "[]");

            // Check for match
            const user = storedUsers.find(u => u.email === email && u.password === password);

            if (user) {
                sessionStorage.setItem("isAdminAuthenticated", "true");
                sessionStorage.setItem("adminRole", user.role);
                sessionStorage.setItem("adminEmail", user.email);
                router.push("/admin");
            } else if (email === "melvin@tobro.com" && password === "admin123") {
                // Hardcoded fallback for the main admin if storage is empty
                sessionStorage.setItem("isAdminAuthenticated", "true");
                sessionStorage.setItem("adminRole", "Admin");
                sessionStorage.setItem("adminEmail", "melvin@tobro.com");
                router.push("/admin");
            } else {
                setError("Invalid email or password. Please try again.");
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
                <div className="p-8 bg-black text-white text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Admin Access</h1>
                    <p className="text-gray-400 text-sm mt-2">Enter your credentials to continue</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white font-medium py-3 rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
                            <ArrowRight className="w-4 h-4 rotate-180" /> Return to Website
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
