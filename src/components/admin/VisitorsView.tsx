"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Eye } from "lucide-react";

interface Visitor {
    id: number;
    ip_address: string;
    user_agent: string;
    page_path: string;
    action: string;
    referrer: string;
    visited_at: string;
}

export default function VisitorsView() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchVisitors();
        // Refresh data every 30 seconds
        const interval = setInterval(fetchVisitors, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchVisitors = async () => {
        try {
            const response = await fetch("/api/track-visitor?limit=500");
            const data = await response.json();
            if (data.visitors) {
                setVisitors(data.visitors);
            }
            setError("");
        } catch (err) {
            setError("Failed to load visitors");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const uniqueIPs = new Set(visitors.map(v => v.ip_address)).size;
    const todayVisitors = visitors.filter(v => 
        new Date(v.visited_at).toDateString() === new Date().toDateString()
    ).length;

    const getBrowserName = (userAgent: string) => {
        if (!userAgent) return "Unknown";
        if (userAgent.includes("Chrome")) return "Chrome";
        if (userAgent.includes("Firefox")) return "Firefox";
        if (userAgent.includes("Safari")) return "Safari";
        if (userAgent.includes("Edge")) return "Edge";
        if (userAgent.includes("Opera")) return "Opera";
        return "Other";
    };

    const formatIP = (ip: string) => {
        return ip || "N/A";
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Visitor Analytics</h2>
                <p className="text-gray-500">Track and analyze website visitor data</p>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 mb-2">Total Visitors</p>
                    <p className="text-3xl font-bold text-gray-900">{visitors.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 mb-2">Unique IPs</p>
                    <p className="text-3xl font-bold text-gray-900">{uniqueIPs}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 mb-2">Today's Visits</p>
                    <p className="text-3xl font-bold text-gray-900">{todayVisitors}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filter === "all"
                            ? "bg-[#1d1d1f] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    All Visitors
                </button>
                <button
                    onClick={() => setFilter("today")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filter === "today"
                            ? "bg-[#1d1d1f] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    Today
                </button>
            </div>

            {/* Visitors Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    </div>
                ) : visitors.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No visitor data yet. Visitors will appear here as they access the website.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">IP Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Browser</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Page</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Visited At</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visitors.map((visitor, index) => (
                                    <tr key={visitor.id} className={index !== visitors.length - 1 ? "border-b border-gray-100" : ""}>
                                        <td className="px-6 py-4 text-sm font-mono text-gray-900">{formatIP(visitor.ip_address)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                                {getBrowserName(visitor.user_agent)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{visitor.page_path}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{formatTime(visitor.visited_at)}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setExpandedId(expandedId === visitor.id ? null : visitor.id)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <Eye className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* User Agent Details */}
            {expandedId && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-semibold mb-4">Detailed Information</h3>
                    {visitors.find(v => v.id === expandedId) && (
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-gray-500">Full User Agent</p>
                                <p className="font-mono text-gray-900 break-all">{visitors.find(v => v.id === expandedId)?.user_agent}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Referrer</p>
                                <p className="text-gray-900">{visitors.find(v => v.id === expandedId)?.referrer || "Direct"}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
