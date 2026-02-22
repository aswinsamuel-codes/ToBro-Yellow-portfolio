"use client";

import { useState, useEffect } from "react";
import { MessageSquareQuote, Trash2, Save, Star, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Testimonial {
    id: string;
    clientName: string;
    role: string;
    industry: string;
    feedback: string;
    impact: string;
    rating: number;
    themeColor: string;
    date: string;
}

const PRESET_COLORS = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Rose", value: "#f43f5e" },
    { name: "Emerald", value: "#10b981" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Slate", value: "#475569" },
];

export default function TestimonialsView({ userRole }: { userRole?: string }) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [form, setForm] = useState({
        clientName: "",
        role: "",
        industry: "",
        feedback: "",
        impact: "",
        rating: 5,
        themeColor: "#3b82f6",
    });
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching testimonials:', error);
                return;
            }

            const formatted: Testimonial[] = data.map(t => ({
                id: t.id,
                clientName: t.client_name,
                role: t.role || "",
                industry: t.industry || "",
                feedback: t.feedback,
                impact: t.impact || "",
                rating: t.rating || 5,
                themeColor: t.theme_color || "#3b82f6",
                date: t.created_at ? t.created_at.split('T')[0] : ""
            }));

            setTestimonials(formatted);
        };

        fetchTestimonials();

        // Realtime subscription
        const channel = supabase
            .channel('admin-testimonials-sync')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'testimonials' },
                () => fetchTestimonials()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.name === "rating" ? parseInt(e.target.value) : e.target.value;
        setForm(prev => ({ ...prev, [e.target.name]: value }));
    };

    const handleSave = async () => {
        if (!form.clientName || !form.feedback) return;

        const { error } = await supabase
            .from('testimonials')
            .insert([{
                client_name: form.clientName,
                role: form.role,
                industry: form.industry,
                feedback: form.feedback,
                impact: form.impact,
                rating: form.rating,
                theme_color: form.themeColor,
            }]);

        if (error) {
            console.error('Error saving testimonial:', error);
            alert('Failed to save testimonial.');
            return;
        }

        setForm({
            clientName: "",
            role: "",
            industry: "",
            feedback: "",
            impact: "",
            rating: 5,
            themeColor: "#3b82f6"
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this testimonial?")) return;

        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting testimonial:', error);
            alert('Failed to delete.');
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Elite Testimonials</h2>
                <p className="text-gray-500">Curate colorful client feedback and emphasize software impact.</p>
            </div>

            {/* Form - Only for Admin */}
            {userRole === "Admin" && (
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Client Name *</label>
                            <input
                                name="clientName"
                                value={form.clientName}
                                onChange={handleChange}
                                placeholder="e.g. John Doe"
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Role / Company</label>
                            <input
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                placeholder="e.g. Business Owner"
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Industry / Field</label>
                            <input
                                name="industry"
                                value={form.industry}
                                onChange={handleChange}
                                placeholder="e.g. Real Estate"
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Client Feedback *</label>
                        <textarea
                            name="feedback"
                            value={form.feedback}
                            onChange={handleChange}
                            rows={3}
                            placeholder="What general praise did they give?"
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none resize-none text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Software Impact / What You Made *</label>
                        <textarea
                            name="impact"
                            value={form.impact}
                            onChange={handleChange}
                            rows={3}
                            placeholder="What specific software/solution did you build and how did it help?"
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 outline-none resize-none text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Card Theme Color</label>
                            <div className="flex flex-wrap gap-2">
                                {PRESET_COLORS.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => setForm(prev => ({ ...prev, themeColor: color.value }))}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${form.themeColor === color.value ? "border-black scale-110 shadow-md" : "border-transparent hover:scale-105"}`}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setForm(prev => ({ ...prev, rating: num }))}
                                        className={`p-2 rounded-lg border transition-all ${form.rating >= num ? "bg-yellow-50 border-yellow-200 text-yellow-500" : "bg-gray-50 border-gray-100 text-gray-300 hover:border-gray-200"}`}
                                    >
                                        <Star className={`w-5 h-5 ${form.rating >= num ? "fill-current" : ""}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={!form.clientName || !form.feedback || !form.impact}
                        className="w-full bg-[#1d1d1f] text-white py-4 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/5"
                    >
                        {isSaved ? (
                            <span className="text-green-400 font-bold">✓ Published Successfully!</span>
                        ) : (
                            <>
                                <Save className="w-4 h-4" /> Publish Elite Testimonial
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* List */}
            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <MessageSquareQuote className="w-4 h-4" /> Gallery of Success ({testimonials.length})
                </h3>

                {testimonials.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-400 text-sm">
                        No testimonials added yet. Make your impact visible!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {testimonials.map(t => (
                            <div key={t.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between shadow-sm group hover:border-gray-300 transition-colors">
                                <div className="flex items-center gap-4 flex-1">
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold"
                                        style={{ backgroundColor: t.themeColor }}
                                    >
                                        {t.clientName.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 truncate">{t.clientName}</p>
                                        <p className="text-xs text-gray-500 truncate">{t.role} · {t.industry}</p>
                                        <div className="flex gap-0.5 mt-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < t.rating ? "text-yellow-400 fill-current" : "text-gray-200"}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {userRole === "Admin" && (
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
