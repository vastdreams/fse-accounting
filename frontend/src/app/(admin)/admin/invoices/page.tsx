/**
 * PATH: src/app/(admin)/admin/invoices/page.tsx
 * PURPOSE: Invoice management page for admin
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Invoice {
  id: string;
  number: string;
  client_name: string;
  amount: number;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  due_date: string;
  created_at: string;
}

const statusColors = {
  draft: 'bg-slate-500/10 text-slate-400',
  open: 'bg-yellow-500/10 text-yellow-400',
  paid: 'bg-green-500/10 text-green-400',
  void: 'bg-red-500/10 text-red-400',
  uncollectible: 'bg-red-500/10 text-red-400',
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock data
    setInvoices([
      { id: 'inv_001', number: 'FSE-2024-001', client_name: 'TechStart Pty Ltd', amount: 250000, status: 'paid', due_date: '2024-01-15', created_at: '2024-01-01' },
      { id: 'inv_002', number: 'FSE-2024-002', client_name: 'Retail Solutions', amount: 85000, status: 'open', due_date: '2024-02-01', created_at: '2024-01-12' },
      { id: 'inv_003', number: 'FSE-2024-003', client_name: 'Green Build Co', amount: 420000, status: 'paid', due_date: '2024-01-20', created_at: '2024-01-05' },
      { id: 'inv_004', number: 'FSE-2024-004', client_name: 'Digital Agency X', amount: 175000, status: 'open', due_date: '2024-02-10', created_at: '2024-01-18' },
      { id: 'inv_005', number: 'FSE-2024-005', client_name: 'Food Delivery Co', amount: 65000, status: 'void', due_date: '2024-01-25', created_at: '2024-01-10' },
    ]);
  }, []);

  const filteredInvoices = filter === 'all' 
    ? invoices 
    : invoices.filter(inv => inv.status === filter);

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(cents / 100);
  };

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const outstandingAmount = invoices
    .filter(inv => inv.status === 'open')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-cream-100">Invoices</h1>
          <p className="text-slate-400 mt-2">
            Manage billing and track payments.
          </p>
        </div>
        <Link href="/admin/invoices/new" className="btn btn-primary">
          ➕ Create Invoice
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-slate-400">Total Revenue (Paid)</p>
          <p className="text-2xl font-serif text-green-400 mt-1">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-400">Outstanding</p>
          <p className="text-2xl font-serif text-yellow-400 mt-1">{formatCurrency(outstandingAmount)}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-400">Total Invoices</p>
          <p className="text-2xl font-serif text-cream-100 mt-1">{invoices.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'open', 'paid', 'draft', 'void'].map((status) => (
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

      {/* Invoices Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Invoice</th>
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Client</th>
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Amount</th>
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase">Due Date</th>
                <th className="text-right py-4 px-4 text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
                <motion.tr
                  key={invoice.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border-subtle last:border-0 hover:bg-surface-elevated transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-cream-100">{invoice.number}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-400">{invoice.client_name}</td>
                  <td className="py-4 px-4 text-sm font-medium text-cream-100">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-400">
                    {new Date(invoice.due_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-slate-400 hover:text-cream-100 text-sm" title="View">
                        👁️
                      </button>
                      <button className="text-slate-400 hover:text-cream-100 text-sm" title="Download PDF">
                        📥
                      </button>
                      {invoice.status === 'open' && (
                        <button className="text-copper-400 hover:text-copper-300 text-sm" title="Send Reminder">
                          📧
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No invoices found</p>
          </div>
        )}
      </div>
    </div>
  );
}

