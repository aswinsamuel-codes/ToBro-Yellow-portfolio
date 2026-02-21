"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, Save, Image, FolderOpen } from "lucide-react";

interface UpcomingProject {
    id: string;
    title: string;
    category: string;
    description: string;
    gradient: string;
    date: string;
}

const GRADIENT_OPTIONS = [
    { label: "Midnight", value: "bg-gradient-to-br from-gray-800 to-gray-900" },
    { label: "Forest", value: "bg-gradient-to-br from-emerald-700 to-emerald-900" },
    { label: "Ocean", value: "bg-gradient-to-br from-blue-700 to-blue-900" },
    { label: "Sunset", value: "bg-gradient-to-br from-orange-600 to-red-800" },
    { label: "Purple", value: "bg-gradient-to-br from-purple-800 to-indigo-900" },
    { label: "Gold", value: "bg-gradient-to-br from-yellow-600 to-orange-700" },
];

export default function UploadProjectView() {
    const [projects, setProjects] = useState<UpcomingProject[]>([]);
    const [form, setForm] = useState({
        title: "",
        category: "",
        description: "",
        gradient: GRADIENT_OPTIONS[0].value,
    });
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("upcomingProjects");
        if (stored) setProjects(JSON.parse(stored));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        if (!form.title || !form.category || !form.description) return;

        const newProject: UpcomingProject = {
            id: Date.now().toString(),
            ...form,
            date: new Date().toISOString().split("T")[0],
        };

        const updated = [newProject, ...projects];
        setProjects(updated);
        localStorage.setItem("upcomingProjects", JSON.stringify(updated));

        setForm({ title: "", category: "", description: "", gradient: GRADIENT_OPTIONS[0].value });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
    };

    const handleDelete = (id: string) => {
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
        localStorage.setItem("upcomingProjects", JSON.stringify(updated));
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Upload Project</h2>
                <p className="text-gray-500">Add a project to the public Upcoming Projects section.</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Project Name *</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. FinTech Dashboard"
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Category *</label>
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="e.g. SaaS Web App, E-Commerce"
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Project Description *</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe the project, its goals and key features..."
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Card Theme</label>
                    <div className="flex gap-3 flex-wrap">
                        {GRADIENT_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setForm(prev => ({ ...prev, gradient: opt.value }))}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${form.gradient === opt.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                            >
                                <span className={`w-4 h-4 rounded-full ${opt.value} inline-block`} />
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={!form.title || !form.category || !form.description}
                    className="w-full bg-[#1d1d1f] text-white py-3 rounded-xl font-medium hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaved ? (
                        <span className="text-green-400 font-medium">✓ Published to Upcoming Projects!</span>
                    ) : (
                        <>
                            <Upload className="w-4 h-4" /> Publish Project
                        </>
                    )}
                </button>
            </div>

            {/* Existing Projects List */}
            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4" /> Published Projects ({projects.length})
                </h3>

                {projects.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-400 text-sm">
                        No projects uploaded yet. Add your first one above.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {projects.map(p => (
                            <div key={p.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${p.gradient} flex items-center justify-center`}>
                                        <Image className="w-5 h-5 text-white/60" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{p.title}</p>
                                        <p className="text-xs text-gray-500">{p.category} · {p.date}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
