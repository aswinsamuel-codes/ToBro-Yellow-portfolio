"use client";

import { useState, useEffect } from "react";
import { Search, Mail, Calendar, Briefcase, CheckCircle2, Clock, MapPin } from "lucide-react";

interface ProjectQuery {
    id: string;
    name: string;
    email: string;
    company: string;
    services: string[];
    description: string;
    budget: string;
    timeline: string;
    status: string;
    date: string;
}

interface Client {
    email: string;
    name: string;
    company: string;
    queries: ProjectQuery[];
}

export default function ClientsView({ queries }: { queries: ProjectQuery[] }) {
    const [clients, setClients] = useState<Client[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    useEffect(() => {
        // Aggregate queries into unique clients by email
        const clientMap = new Map<string, Client>();

        queries.forEach(q => {
            if (!clientMap.has(q.email)) {
                clientMap.set(q.email, {
                    email: q.email,
                    name: q.name,
                    company: q.company,
                    queries: []
                });
            }
            clientMap.get(q.email)?.queries.push(q);
        });

        setClients(Array.from(clientMap.values()));
    }, [queries]);

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Client List */}
                <div className="lg:col-span-1 space-y-4">
                    {filteredClients.length === 0 && (
                        <p className="text-gray-500 text-center py-8">No clients found.</p>
                    )}
                    {filteredClients.map((client) => (
                        <div
                            key={client.email}
                            onClick={() => setSelectedClient(client)}
                            className={`p-4 bg-white rounded-xl border cursor-pointer transition-all hover:shadow-md ${selectedClient?.email === client.email ? "border-blue-500 ring-1 ring-blue-500 bg-blue-50/50" : "border-gray-200"}`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-bold text-gray-600">
                                    {client.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                                    <p className="text-xs text-gray-500">{client.company || "No Company"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Mail className="w-3 h-3" />
                                {client.email}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Client Details */}
                <div className="lg:col-span-2">
                    {selectedClient ? (
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-100">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-[#1d1d1f] flex items-center justify-center text-2xl font-bold text-white">
                                        {selectedClient.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h2>
                                        <p className="text-gray-500 text-lg">{selectedClient.company}</p>
                                        <div className="flex items-center gap-2 mt-2 text-blue-600">
                                            <Mail className="w-4 h-4" />
                                            <span>{selectedClient.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-2xl font-bold text-gray-900">{selectedClient.queries.length}</span>
                                    <span className="text-sm text-gray-500">Total Projects</span>
                                </div>
                            </div>

                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-gray-400" />
                                Project History
                            </h3>

                            <div className="space-y-4">
                                {selectedClient.queries.map((query) => (
                                    <div key={query.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${query.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' :
                                                        query.status === 'Booked' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                            query.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200' :
                                                                'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                        }`}>
                                                        {query.status}
                                                    </span>
                                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" /> {query.date}
                                                    </span>
                                                </div>
                                                <h4 className="font-semibold text-gray-900 text-sm">
                                                    {query.services.join(", ")}
                                                </h4>
                                            </div>
                                            <div className="text-right text-xs font-semibold text-gray-600">
                                                {query.budget}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            {query.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                            <UsersIcon className="w-12 h-12 mb-4 opacity-50" />
                            <p>Select a client to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function UsersIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    )
}
