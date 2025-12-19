/**
 * PATH: src/app/(portal)/portal/page.tsx
 * PURPOSE: Client portal dashboard
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DashboardData {
  pendingDocuments: number;
  activeProjects: number;
  unreadMessages: number;
  upcomingDeadlines: Array<{
    title: string;
    date: string;
    type: string;
  }>;
  recentActivity: Array<{
    description: string;
    time: string;
  }>;
}

export default function PortalDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [user, setUser] = useState<{ first_name: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock data for demonstration
    setData({
      pendingDocuments: 3,
      activeProjects: 2,
      unreadMessages: 5,
      upcomingDeadlines: [
        { title: 'BAS Lodgement', date: '2024-01-28', type: 'tax' },
        { title: 'Annual Review Meeting', date: '2024-02-15', type: 'meeting' },
      ],
      recentActivity: [
        { description: 'Tax return submitted for review', time: '2 hours ago' },
        { description: 'New document uploaded: Q4 Financials', time: '1 day ago' },
        { description: 'Project "Annual Audit" completed', time: '3 days ago' },
      ],
    });
  }, []);

  const stats = data ? [
    { label: 'Pending Documents', value: data.pendingDocuments, icon: '📄', href: '/portal/documents' },
    { label: 'Active Projects', value: data.activeProjects, icon: '📋', href: '/portal/projects' },
    { label: 'Unread Messages', value: data.unreadMessages, icon: '💬', href: '/portal/messages' },
  ] : [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-3xl text-cream-100">
          Welcome back{user ? `, ${user.first_name}` : ''}
        </h1>
        <p className="text-slate-400 mt-2">
          Here&apos;s an overview of your account activity.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <div className="card group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className="text-3xl font-serif text-cream-100">{stat.value}</span>
                </div>
                <p className="text-sm text-slate-400 group-hover:text-copper-400 transition-colors">
                  {stat.label} →
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="font-serif text-xl text-cream-100 mb-4">Upcoming Deadlines</h2>
          {data?.upcomingDeadlines.length ? (
            <ul className="space-y-4">
              {data.upcomingDeadlines.map((deadline, index) => (
                <li key={index} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
                  <div>
                    <p className="text-sm font-medium text-cream-100">{deadline.title}</p>
                    <p className="text-xs text-slate-500">{deadline.type}</p>
                  </div>
                  <span className="text-sm text-copper-400">
                    {new Date(deadline.date).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">No upcoming deadlines</p>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h2 className="font-serif text-xl text-cream-100 mb-4">Recent Activity</h2>
          {data?.recentActivity.length ? (
            <ul className="space-y-4">
              {data.recentActivity.map((activity, index) => (
                <li key={index} className="flex items-start gap-3 py-2 border-b border-border-subtle last:border-0">
                  <div className="w-2 h-2 rounded-full bg-copper-500 mt-2" />
                  <div>
                    <p className="text-sm text-cream-100">{activity.description}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">No recent activity</p>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="font-serif text-xl text-cream-100 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/portal/documents/upload" className="btn btn-secondary text-center">
            📤 Upload Document
          </Link>
          <Link href="/portal/messages/new" className="btn btn-secondary text-center">
            ✉️ New Message
          </Link>
          <Link href="/portal/ask" className="btn btn-secondary text-center">
            🤖 Ask FSE AI
          </Link>
          <Link href="/portal/settings" className="btn btn-secondary text-center">
            ⚙️ Settings
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

