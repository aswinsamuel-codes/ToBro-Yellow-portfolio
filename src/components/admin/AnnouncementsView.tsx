import { useState, useEffect } from "react";
import { Megaphone, Save, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AnnouncementsView({ userRole }: { userRole?: string }) {
    const [text, setText] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [savedNotice, setSavedNotice] = useState<{ id?: string; text: string; active: boolean } | null>(null);

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

            if (data) {
                setSavedNotice(data);
                setText(data.text);
                setIsActive(data.active);
            } else {
                setSavedNotice(null);
                setText("");
                setIsActive(false);
            }
        };

        fetchAnnouncement();

        // Realtime sync for admin view
        const channel = supabase
            .channel('announcements-admin-sync')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'announcements' },
                () => fetchAnnouncement()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleSave = async () => {
        const { error } = await supabase
            .from('announcements')
            .upsert({
                id: savedNotice?.id || undefined,
                text,
                active: isActive,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error('Error saving announcement:', error);
            alert('Failed to save announcement.');
        } else {
            // Success - state will be updated by the fetch in useEffect if we had one, 
            // but for now we just update locally for speed
            setSavedNotice({ text, active: isActive });
        }
    };

    const handleDelete = async () => {
        if (!savedNotice?.id) return;

        const { error } = await supabase
            .from('announcements')
            .delete()
            .eq('id', savedNotice.id);

        if (error) {
            console.error('Error deleting announcement:', error);
            alert('Failed to delete.');
        } else {
            setSavedNotice(null);
            setText("");
            setIsActive(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Site Announcement</h2>
                <p className="text-gray-500">Manage the scrolling marquee on the public website.</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement Text</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        readOnly={userRole === "Staff"}
                        placeholder="e.g. Special Offer: 50% off Web Design until Friday!"
                        className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none ${userRole === "Staff" ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""}`}
                    />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-8">
                    <div className="flex items-center gap-3">
                        <Megaphone className={`w-5 h-5 ${isActive ? "text-green-600" : "text-gray-400"}`} />
                        <div>
                            <p className="font-semibold text-gray-900">Active Status</p>
                            <p className="text-xs text-gray-500">{isActive ? "Visible on website" : "Hidden from website"}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => userRole !== "Staff" && setIsActive(!isActive)}
                        disabled={userRole === "Staff"}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? "bg-green-500" : "bg-gray-300"} ${userRole === "Staff" ? "cursor-not-allowed" : ""}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                </div>

                {userRole === "Admin" && (
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            disabled={!text}
                            className="flex-1 bg-[#1d1d1f] text-white py-3 rounded-xl font-medium hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-4 h-4" />
                            Save & Post
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors border border-transparent hover:border-red-100"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Preview */}
            <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Preview</p>
                <div className="bg-gray-100 rounded-lg p-4 overflow-hidden relative">
                    {text ? (
                        <div className="bg-[#1d1d1f] text-white py-2 px-4 rounded text-sm text-center">
                            {text}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 italic text-sm">No text content</div>
                    )}
                </div>
            </div>
        </div>
    );
}
