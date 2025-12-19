/**
 * PATH: src/app/(admin)/admin/clients/page.tsx
 * PURPOSE: Client management page for admin
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Client {
  id: number;
  company_name: string;
  status: 'lead' | 'onboarding' | 'active' | 'paused' | 'churned';
  industry: string;
  health_score: number;
  projects_count: number;
  created_at: string;
}

const statusColors = {
  lead: 'bg-purple-500/10 text-purple-400',
  onboarding: 'bg-yellow-500/10 text-yellow-400',
  active: 'bg-green-500/10 text-green-400',
  paused: 'bg-orange-500/10 text-orange-400',
  churned: 'bg-red-500/10 text-red-400',
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Mock data
    setClients([
      { id: 1, company_name: 'TechStart Pty Ltd', status: 'active', industry: 'Technology', health_score: 85, projects_count: 3, created_at: '2023-06-15' },
      { id: 2, company_name: 'Retail Solutions', status: 'onboarding', industry: 'Retail', health_score: 70, projects_count: 1, created_at: '2024-01-12' },
      { id: 3, company_name: 'Green Build Co', status: 'active', industry: 'Construction', health_score: 92, projects_count: 2, created_at: '2023-09-20' },
      { id: 4, company_name: 'Digital Agency X', status: 'active', industry: 'Marketing', health_score: 78, projects_count: 4, created_at: '2023-03-10' },
      { id: 5, company_name: 'Food Delivery Co', status: 'paused', industry: 'Food & Beverage', health_score: 45, projects_count: 1, created_at: '2023-11-05' },
      { id: 6, company_name: 'Consulting Partners', status: 'lead', industry: 'Professional Services', health_score: 0, projects_count: 0, created_at: '2024-01-18' },
    ]);
  }, []);

  const filteredClients = clients.filter(client => {
    if (filter !== 'all' && client.status !== filter) return false;
    if (search && !client.company_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-cream-100">Clients</h1>
          <p className="text-slate-400 mt-2">
            Manage your client relationships and track health scores.
          </p>
        </div>
        <Link href="/admin/clients/new" className="btn btn-primary">
          ➕ Add Client
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input flex-1 sm:max-w-xs"
        />
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'active', 'onboarding', 'lead', 'paused'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                ${filter === status
                  ? 'bg-copper-500 text-background'
                  : 'bg-surface border border-border-subtle text-slate-400 hover:border-copper-500'
                }
              `}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Company</th>
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Industry</th>
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Health</th>
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Projects</th>
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Joined</th>
                <th className="text-right py-4 px-4 text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border-subtle last:border-0 hover:bg-surface-elevated transition-colors"
                >
                  <td className="py-4 px-4">
                    <Link href={`/admin/clients/${client.id}`} className="text-sm font-medium text-cream-100 hover:text-copper-400">
                      {client.company_name}
                    </Link>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[client.status]}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-400">{client.industry}</td>
                  <td className="py-4 px-4">
                    {client.health_score > 0 ? (
                      <span className={`text-sm font-medium ${getHealthColor(client.health_score)}`}>
                        {client.health_score}%
                      </span>
                    ) : (
                      <span className="text-sm text-slate-500">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-400">{client.projects_count}</td>
                  <td className="py-4 px-4 text-sm text-slate-500">
                    {new Date(client.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link href={`/admin/clients/${client.id}`} className="text-copper-400 hover:text-copper-300 text-sm">
                      View →
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No clients found</p>
          </div>
        )}
      </div>
    </div>
  );
}

