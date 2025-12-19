/**
 * PATH: src/app/(admin)/admin/page.tsx
 * PURPOSE: Admin dashboard overview
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DashboardStats {
  totalClients: number;
  activeProjects: number;
  pendingDocuments: number;
  monthlyRevenue: number;
  clientsThisMonth: number;
  projectsCompleted: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    // Mock data
    setStats({
      totalClients: 127,
      activeProjects: 34,
      pendingDocuments: 18,
      monthlyRevenue: 85400,
      clientsThisMonth: 5,
      projectsCompleted: 12,
    });
  }, []);

  const mainStats = stats ? [
    { label: 'Total Clients', value: stats.totalClients, icon: '👥', change: `+${stats.clientsThisMonth} this month`, href: '/admin/clients' },
    { label: 'Active Projects', value: stats.activeProjects, icon: '📋', change: `${stats.projectsCompleted} completed`, href: '/admin/projects' },
    { label: 'Pending Documents', value: stats.pendingDocuments, icon: '📄', change: 'Needs attention', href: '/admin/documents' },
    { label: 'Monthly Revenue', value: `$${(stats.monthlyRevenue / 1000).toFixed(1)}k`, icon: '💰', change: '+12% vs last month', href: '/admin/invoices' },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-cream-100">Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Welcome to FSE Admin. Here&apos;s your business overview.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mainStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <div className="card group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="text-2xl font-serif text-cream-100">{stat.value}</span>
                </div>
                <p className="text-sm text-slate-400 group-hover:text-copper-400 transition-colors">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Clients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-cream-100">Recent Clients</h2>
            <Link href="/admin/clients" className="text-sm text-copper-400 hover:text-copper-300">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-3 text-xs font-medium text-slate-500 uppercase">Company</th>
                  <th className="text-left py-3 text-xs font-medium text-slate-500 uppercase">Status</th>
                  <th className="text-left py-3 text-xs font-medium text-slate-500 uppercase">Projects</th>
                  <th className="text-left py-3 text-xs font-medium text-slate-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'TechStart Pty Ltd', status: 'active', projects: 3, date: '2024-01-15' },
                  { name: 'Retail Solutions', status: 'onboarding', projects: 1, date: '2024-01-12' },
                  { name: 'Green Build Co', status: 'active', projects: 2, date: '2024-01-08' },
                  { name: 'Digital Agency X', status: 'active', projects: 4, date: '2024-01-05' },
                ].map((client, index) => (
                  <tr key={index} className="border-b border-border-subtle last:border-0">
                    <td className="py-3 text-sm text-cream-100">{client.name}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        client.status === 'active' 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-slate-400">{client.projects}</td>
                    <td className="py-3 text-sm text-slate-500">
                      {new Date(client.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h2 className="font-serif text-xl text-cream-100 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/clients/new" className="btn btn-primary w-full justify-start">
              ➕ Add New Client
            </Link>
            <Link href="/admin/projects/new" className="btn btn-secondary w-full justify-start">
              📋 Create Project
            </Link>
            <Link href="/admin/invoices/new" className="btn btn-secondary w-full justify-start">
              💳 Send Invoice
            </Link>
            <Link href="/admin/documents/templates" className="btn btn-secondary w-full justify-start">
              📄 Document Templates
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Pending Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card mt-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-cream-100">Pending Tasks</h2>
          <span className="text-xs bg-copper-500/10 text-copper-400 px-2 py-1 rounded-full">8 items</span>
        </div>
        <div className="space-y-3">
          {[
            { task: 'Review tax return for TechStart Pty Ltd', due: 'Today', priority: 'high' },
            { task: 'Send engagement letter to Retail Solutions', due: 'Tomorrow', priority: 'medium' },
            { task: 'Complete BAS for Green Build Co', due: 'Jan 28', priority: 'high' },
            { task: 'Follow up on outstanding invoice #1042', due: 'Jan 25', priority: 'low' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 py-2 border-b border-border-subtle last:border-0">
              <input type="checkbox" className="w-4 h-4 rounded border-border accent-copper-500" />
              <div className="flex-1">
                <p className="text-sm text-cream-100">{item.task}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                item.priority === 'high' 
                  ? 'bg-red-500/10 text-red-400' 
                  : item.priority === 'medium'
                  ? 'bg-yellow-500/10 text-yellow-400'
                  : 'bg-slate-500/10 text-slate-400'
              }`}>
                {item.due}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

