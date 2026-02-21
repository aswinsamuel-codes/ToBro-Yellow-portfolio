"use client";

import { useState, useEffect } from "react";
import { UserPlus, Shield, User, Trash2 } from "lucide-react";

interface UserData {
    id: string;
    email: string;
    password?: string; // Stored for demo purposes
    role: "Admin" | "Staff";
    createdAt: string;
}

export default function UsersView() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"Admin" | "Staff">("Staff");
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);

    useEffect(() => {
        // Load users from localStorage or mocks
        const storedUsers = JSON.parse(localStorage.getItem("adminUsers") || "[]");

        // Mock default if empty
        if (storedUsers.length === 0) {
            const defaultUsers: UserData[] = [
                { id: "1", email: "melvin@tobro.com", password: "admin123", role: "Admin", createdAt: "2024-01-01" },
                { id: "2", email: "staff@tobro.com", password: "staff123", role: "Staff", createdAt: "2024-02-15" }
            ];
            setUsers(defaultUsers);
            localStorage.setItem("adminUsers", JSON.stringify(defaultUsers));
        } else {
            setUsers(storedUsers);
        }

        // Determine current user role from session
        const sessionEmail = localStorage.getItem("adminEmail");
        const sessionRole = localStorage.getItem("adminRole") as "Admin" | "Staff";

        if (sessionEmail && sessionRole) {
            setCurrentUser({ id: "session", email: sessionEmail, role: sessionRole, createdAt: "" });
        } else {
            // Fallback for demo if session info is missing
            setCurrentUser({ id: "1", email: "melvin@tobro.com", role: "Admin", createdAt: "" });
        }
    }, []);

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: UserData = {
            id: Date.now().toString(),
            email,
            password,
            role,
            createdAt: new Date().toISOString().split('T')[0]
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("adminUsers", JSON.stringify(updatedUsers));

        // Reset form
        setEmail("");
        setPassword("");
        setRole("Staff");
    };

    const handleDeleteUser = (id: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            const updated = users.filter(u => u.id !== id);
            setUsers(updated);
            localStorage.setItem("adminUsers", JSON.stringify(updated));
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    <p className="text-gray-500">Manage team access and permissions.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create User Form */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-blue-600" />
                        Add New User
                    </h3>

                    <form onSubmit={handleCreateUser} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="user@company.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setRole("Staff")}
                                    className={`p-2 rounded-lg text-sm font-medium border ${role === "Staff" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-200 text-gray-600"}`}
                                >
                                    Staff
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("Admin")}
                                    className={`p-2 rounded-lg text-sm font-medium border ${role === "Admin" ? "bg-purple-50 border-purple-500 text-purple-700" : "border-gray-200 text-gray-600"}`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={currentUser?.role !== "Admin"}
                            className="w-full bg-[#1d1d1f] text-white py-3 rounded-xl font-medium hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {currentUser?.role === "Admin" ? "Create User" : "Admin Only"}
                        </button>
                    </form>
                </div>

                {/* Users List */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-lg text-gray-900">Current Users</h3>
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        {users.map((user, i) => (
                            <div key={user.id} className={`p-4 flex items-center justify-between ${i !== users.length - 1 ? "border-b border-gray-100" : ""}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.role === "Admin" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}>
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{user.email}</p>
                                        <p className="text-xs text-gray-500">Created: {user.createdAt}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === "Admin" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                                        {user.role}
                                    </span>
                                    {currentUser?.role === "Admin" && (
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
