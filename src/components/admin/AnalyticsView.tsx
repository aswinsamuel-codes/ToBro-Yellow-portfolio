"use client";

import { useState, useEffect } from "react";
import {
    BarChart3,
    TrendingUp,
    Users,
    CheckCircle2,
    Clock,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    Target
} from "lucide-react";

interface ProjectQuery {
    id: string;
    services: string[];
    budget: string;
    status: string;
    date: string;
}

export default function AnalyticsView({ queries }: { queries: ProjectQuery[] }) {
    const [stats, setStats] = useState({
        total: 0,
        booked: 0,
        pending: 0,
        completed: 0,
        rejected: 0,
        conversionRate: 0,
        serviceDistribution: {} as Record<string, number>,
        budgetDistribution: {} as Record<string, number>,
    });

    useEffect(() => {
        // Calculate Stats
        const total = queries.length;
        const booked = queries.filter((q: any) => q.status === "Booked").length;
        const completed = queries.filter((q: any) => q.status === "Completed").length;
        const pending = queries.filter((q: any) => q.status === "Pending").length;
        const rejected = queries.filter((q: any) => q.status === "Rejected").length;

        const conversionRate = total > 0 ? ((booked + completed) / total) * 100 : 0;

        const serviceDist: Record<string, number> = {};
        const budgetDist: Record<string, number> = {};

        queries.forEach((q: any) => {
            q.services?.forEach((s: string) => {
                serviceDist[s] = (serviceDist[s] || 0) + 1;
            });
            budgetDist[q.budget] = (budgetDist[q.budget] || 0) + 1;
        });

        setStats({
            total,
            booked,
            pending,
            completed,
            rejected,
            conversionRate,
            serviceDistribution: serviceDist,
            budgetDistribution: budgetDist
        });
    }, [queries]);

    const mostPopularService = Object.entries(stats.serviceDistribution)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
                <p className="text-gray-500">Real-time insights into your service demand and conversion.</p>
            </div>

            {/* Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Target className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> 12%
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Total Queries</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.total}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> 5%
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Conversion Rate</p>
                    <h3 className="text-2xl font-bold mt-1 text-[#1d1d1f] tracking-tight">{stats.conversionRate.toFixed(1)}%</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg animate-pulse">
                            Active
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Pending Review</p>
                    <h3 className="text-2xl font-bold mt-1 tracking-tight">{stats.pending}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                            Finalized
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Successful Bookings</p>
                    <h3 className="text-2xl font-bold mt-1 tracking-tight">{stats.booked + stats.completed}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Service Demand Breakdown */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">Service Popularity</h3>
                            <p className="text-sm text-gray-500">Distribution of project types requested</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                            <BarChart3 className="w-4 h-4" />
                            Live Data
                        </div>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(stats.serviceDistribution).map(([service, count]) => {
                            const percentage = (count / stats.total) * 100;
                            return (
                                <div key={service} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold text-gray-700">{service}</span>
                                        <span className="text-gray-500 font-mono">{count} Leads ({percentage.toFixed(0)}%)</span>
                                    </div>
                                    <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                        <div
                                            className="h-full bg-[#1d1d1f] rounded-full transition-all duration-1000"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        {Object.keys(stats.serviceDistribution).length === 0 && (
                            <div className="py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                                <p className="text-gray-400 font-medium">No service data available yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status & Highlights */}
                <div className="space-y-6">
                    <div className="bg-[#1d1d1f] p-8 rounded-3xl text-white shadow-xl shadow-gray-200">
                        <h3 className="font-bold text-lg mb-2">Primary Focus</h3>
                        <p className="text-gray-400 text-sm mb-6">Highest demand sector this month</p>

                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold">{mostPopularService}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-green-400">
                            <ArrowUpRight className="w-3 h-3" />
                            Market Leader
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-6">Status Breakdown</h3>
                        <div className="space-y-4">
                            {[
                                { label: "Pending", value: stats.pending, color: "bg-yellow-400" },
                                { label: "Booked", value: stats.booked, color: "bg-blue-500" },
                                { label: "Completed", value: stats.completed, color: "bg-green-500" },
                                { label: "Rejected", value: stats.rejected, color: "bg-red-400" }
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                        <span className="text-sm font-medium text-gray-600">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
