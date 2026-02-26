"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
    LayoutDashboard,
    Users,
    CheckCircle2,
    XCircle,
    Clock,
    Briefcase,
    Search,
    Filter,
    ChevronDown,
    MoreVertical,
    Mail,
    Calendar,
    DollarSign,
    FileText,
    LogOut,
    Megaphone,
    UserCog,
    MessageSquareQuote,
    ExternalLink,
    BarChart3,
    Info,
    Trash2,
    Eye
} from "lucide-react";

import ClientsView from "@/components/admin/ClientsView";
import UsersView from "@/components/admin/UsersView";
import AnnouncementsView from "@/components/admin/AnnouncementsView";
import TestimonialsView from "@/components/admin/TestimonialsView";
import AnalyticsView from "@/components/admin/AnalyticsView";
import VisitorsView from "@/components/admin/VisitorsView";

// Mock Data Types
type QueryStatus = "Pending" | "Booked" | "Completed" | "Rejected" | "Upcoming";

interface ProjectQuery {
    id: string;
    name: string;
    email: string;
    company: string;
    services: string[];
    description: string;
    budget: "Basic" | "Professional" | "High End";
    timeline: string;
    status: QueryStatus;
    date: string;
}


// Live Data Only

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"Dashboard" | "Clients" | "Users" | "Announcements" | "Testimonials" | "Analytics" | "Visitors">("Dashboard");
    const [queries, setQueries] = useState<ProjectQuery[]>([]);
    const [filterStatus, setFilterStatus] = useState<QueryStatus | "All">("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedQuery, setSelectedQuery] = useState<ProjectQuery | null>(null);
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated");
        if (!isAuthenticated) {
            router.push("/admin/login");
            return;
        }

        setUserEmail(sessionStorage.getItem("adminEmail") || "melvin@tobro.com");
        setUserRole(sessionStorage.getItem("adminRole") || "Admin");

        const fetchQueries = async () => {
            const { data, error } = await supabase
                .from('queries')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching queries:', error);
                return;
            }

            const formattedQueries: ProjectQuery[] = data.map(q => ({
                id: q.id,
                name: q.name || "N/A",
                email: q.email || "N/A",
                company: q.message?.includes("Company: ") ? q.message.split('\n')[0].replace("Company: ", "") : "N/A",
                services: q.service ? q.service.split(', ') : [],
                description: q.message || "",
                budget: q.budget || "Basic",
                timeline: q.message?.includes("Timeline: ") ? q.message.split('Timeline: ')[1] : "N/A",
                status: (q.status || "Pending") as QueryStatus,
                date: q.created_at ? q.created_at.split('T')[0] : ""
            }));

            setQueries(formattedQueries);
        };

        fetchQueries();

        // Realtime subscription
        const channel = supabase
            .channel('queries-changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'queries' },
                () => fetchQueries()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem("isAdminAuthenticated");
        sessionStorage.removeItem("adminEmail");
        sessionStorage.removeItem("adminRole");
        router.push("/admin/login");
    };

    // Calculate Stats
    const stats = {
        total: queries.length,
        pending: queries.filter((q: ProjectQuery) => q.status === "Pending").length,
        booked: queries.filter((q: ProjectQuery) => q.status === "Booked").length,
        completed: queries.filter((q: ProjectQuery) => q.status === "Completed").length,
        rejected: queries.filter((q: ProjectQuery) => q.status === "Rejected").length,
        upcoming: queries.filter((q: ProjectQuery) => q.status === "Upcoming").length,
    };

    const filteredQueries = queries.filter((q: ProjectQuery) => {
        const matchesStatus = filterStatus === "All" || q.status === filterStatus;
        const matchesSearch =
            q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (q.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusColor = (status: QueryStatus) => {
        switch (status) {
            case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "Booked": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Completed": return "bg-green-100 text-green-700 border-green-200";
            case "Rejected": return "bg-red-100 text-red-700 border-red-200";
            case "Upcoming": return "bg-purple-100 text-purple-700 border-purple-200";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar (Simplified) */}
            <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col fixed h-full z-40">
                <div className="flex items-center gap-2 mb-12">
                    <span className="text-2xl font-bold tracking-tight text-[#1d1d1f]">ToBro.</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-md uppercase tracking-wide">Admin</span>
                </div>

                <nav className="space-y-1 flex-1">
                    <button
                        onClick={() => setActiveTab("Dashboard")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "Dashboard" ? "bg-[#1d1d1f] text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </button>

                    <button
                        onClick={() => setActiveTab("Analytics")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "Analytics" ? "bg-[#1d1d1f] text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                        <BarChart3 className="w-5 h-5" />
                        Analytics
                    </button>
                    <button
                        onClick={() => setActiveTab("Clients")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "Clients" ? "bg-[#1d1d1f] text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                        <Users className="w-5 h-5" />
                        Clients
                    </button>
                    {userRole === "Admin" && (
                        <button
                            onClick={() => setActiveTab("Users")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "Users" ? "bg-[#1d1d1f] text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                        >
                            <UserCog className="w-5 h-5" />
                            Users & Roles
                        </button>
                    )}
                    <button
                        onClick={() => setActiveTab("Announcements")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "Announcements" ? "bg-[#1d1d1f] text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                        <Megaphone className="w-5 h-5" />
                        Announcements
                    </button>
                    <button
                        onClick={() => setActiveTab("Testimonials")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "Testimonials" ? "bg-[#1d1d1f] text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                        <MessageSquareQuote className="w-5 h-5" />
                        Testimonials
                    </button>
                    <button
                        onClick={() => setActiveTab("Visitors")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === "Visitors" ? "bg-[#1d1d1f] text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                        <Eye className="w-5 h-5" />
                        Visitors
                    </button>

                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <button
                            onClick={() => router.push("/")}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                            View Website
                        </button>
                    </div>
                </nav>

                <div className="mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        Log Out
                    </button>
                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ${userRole === "Admin" ? "bg-blue-600 shadow-blue-200" : "bg-purple-600 shadow-purple-200"}`}>
                            {userEmail.split('@')[0].substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">
                                {userEmail === "melvin@tobro.com" ? "Melvin Philip" : userEmail.split('@')[0]}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-0 md:ml-64 p-8">
                {activeTab === "Dashboard" && (
                    <>
                        <header className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Project Queries</h1>
                                <p className="text-gray-500">Manage incoming project requests</p>
                            </div>
                            {userRole === "Staff" && (
                                <div className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-100 flex items-center gap-2">
                                    <Info className="w-4 h-4" />
                                    VIEW ONLY MODE
                                </div>
                            )}
                            <div className="flex gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search queries..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                                    />
                                </div>
                            </div>
                        </header>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                            <StatCard title="Pending" value={stats.pending} icon={Clock} color="text-yellow-600" bg="bg-yellow-50" />
                            <StatCard title="Booked" value={stats.booked} icon={Briefcase} color="text-blue-600" bg="bg-blue-50" />
                            <StatCard title="Upcoming" value={stats.upcoming} icon={Calendar} color="text-purple-600" bg="bg-purple-50" />
                            <StatCard title="Completed" value={stats.completed} icon={CheckCircle2} color="text-green-600" bg="bg-green-50" />
                            <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="text-red-600" bg="bg-red-50" />
                        </div>

                        {/* Queries Table */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="font-semibold text-lg">Recent Queries</h2>
                                <div className="flex gap-2">
                                    {["All", "Pending", "Booked"].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setFilterStatus(status as any)}
                                            className={`px-3 py-1 text-sm rounded-full transition-colors ${filterStatus === status
                                                ? "bg-gray-900 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Client</th>
                                            <th className="px-6 py-4">Service</th>
                                            <th className="px-6 py-4">Budget</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredQueries.map((query) => (
                                            <tr key={query.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-semibold text-xs text-blue-700">
                                                            {query.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">{query.name}</div>
                                                            <div className="text-xs text-gray-500">{query.company || "No Company"}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {query.services.slice(0, 2).map((s, i) => (
                                                            <span key={i} className="px-2 py-0.5 bg-gray-100 rounded-md text-xs text-gray-600">
                                                                {s}
                                                            </span>
                                                        ))}
                                                        {query.services.length > 2 && (
                                                            <span className="px-2 py-0.5 bg-gray-100 rounded-md text-xs text-gray-600">
                                                                +{query.services.length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{query.budget}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{query.date}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(query.status)}`}>
                                                        {query.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => setSelectedQuery(query)}
                                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                        >
                                                            View Details
                                                        </button>
                                                        {userRole === "Admin" && (
                                                            <button
                                                                onClick={async () => {
                                                                    if (confirm("Delete this query?")) {
                                                                        const { error } = await supabase
                                                                            .from('queries')
                                                                            .delete()
                                                                            .eq('id', query.id);

                                                                        if (error) {
                                                                            console.error('Error deleting query:', error);
                                                                            alert('Failed to delete query.');
                                                                        }
                                                                    }
                                                                }}
                                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "Clients" && <ClientsView queries={queries} />}
                {activeTab === "Users" && userRole === "Admin" && <UsersView />}
                {activeTab === "Announcements" && <AnnouncementsView userRole={userRole} />}
                {activeTab === "Testimonials" && <TestimonialsView userRole={userRole} />}
                {activeTab === "Analytics" && <AnalyticsView queries={queries} />}
                {activeTab === "Visitors" && <VisitorsView />}
            </main>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedQuery && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedQuery(null)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 p-8 overflow-y-auto"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <h2 className="text-2xl font-bold">Project Details</h2>
                                <button onClick={() => setSelectedQuery(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <XCircle className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Profile Header */}
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
                                        {selectedQuery.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{selectedQuery.name}</h3>
                                        <p className="text-gray-500">{selectedQuery.company}</p>
                                        <a href={`mailto:${selectedQuery.email}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1">
                                            <Mail className="w-3 h-3" /> {selectedQuery.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Status Control */}
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Status</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Pending", "Booked", "Upcoming", "Completed", "Rejected"].map((status) => (
                                            <button
                                                key={status}
                                                onClick={async () => {
                                                    if (userRole === "Staff") return;
                                                    const { error } = await supabase
                                                        .from('queries')
                                                        .update({ status: status })
                                                        .eq('id', selectedQuery.id);

                                                    if (error) {
                                                        console.error('Error updating status:', error);
                                                        alert('Failed to update status.');
                                                    } else {
                                                        setSelectedQuery({ ...selectedQuery, status: status as QueryStatus });
                                                    }
                                                }}
                                                disabled={userRole === "Staff"}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${selectedQuery.status === status
                                                    ? getStatusColor(status as QueryStatus)
                                                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 border border-gray-100 rounded-xl">
                                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                                            <DollarSign className="w-4 h-4" />
                                            <span className="text-xs font-medium">Budget</span>
                                        </div>
                                        <p className="font-semibold">{selectedQuery.budget}</p>
                                    </div>
                                    <div className="p-4 border border-gray-100 rounded-xl">
                                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs font-medium">Timeline</span>
                                        </div>
                                        <p className="font-semibold">{selectedQuery.timeline}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-gray-500 mb-3">
                                        <FileText className="w-4 h-4" />
                                        <span className="text-xs font-medium uppercase tracking-wider">Project Description</span>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed">
                                        {selectedQuery.description}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-gray-500 mb-3">
                                        <Filter className="w-4 h-4" />
                                        <span className="text-xs font-medium uppercase tracking-wider">Required Services</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedQuery.services.map((service) => (
                                            <span key={service} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div >
    );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
