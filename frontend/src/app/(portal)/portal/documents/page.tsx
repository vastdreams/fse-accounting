/**
 * PATH: src/app/(portal)/portal/documents/page.tsx
 * PURPOSE: Document management page for client portal
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Document {
  id: number;
  name: string;
  category: string;
  status: 'uploaded' | 'pending_signature' | 'signed';
  size_bytes: number;
  created_at: string;
}

const statusColors = {
  uploaded: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  pending_signature: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  signed: 'bg-green-500/10 text-green-400 border-green-500/20',
};

const statusLabels = {
  uploaded: 'Uploaded',
  pending_signature: 'Awaiting Signature',
  signed: 'Signed',
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filter, setFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Mock data
    setDocuments([
      { id: 1, name: 'Q4 2023 Financials.pdf', category: 'financial', status: 'uploaded', size_bytes: 2450000, created_at: '2024-01-15' },
      { id: 2, name: 'Service Agreement.pdf', category: 'contract', status: 'pending_signature', size_bytes: 156000, created_at: '2024-01-10' },
      { id: 3, name: 'Tax Return FY2023.pdf', category: 'tax', status: 'signed', size_bytes: 890000, created_at: '2023-12-20' },
      { id: 4, name: 'Bank Statement Dec.pdf', category: 'financial', status: 'uploaded', size_bytes: 340000, created_at: '2024-01-05' },
    ]);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const filteredDocs = filter === 'all' 
    ? documents 
    : documents.filter(d => d.status === filter);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsUploading(false);
    
    alert('Document uploaded successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-cream-100">Documents</h1>
          <p className="text-slate-400 mt-2">
            Manage and sign your documents securely.
          </p>
        </div>
        
        <label className="btn btn-primary cursor-pointer">
          📤 Upload Document
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
          />
        </label>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'uploaded', 'pending_signature', 'signed'].map((status) => (
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
            {status === 'all' ? 'All Documents' : statusLabels[status as keyof typeof statusLabels]}
          </button>
        ))}
      </div>

      {/* Document List */}
      {isUploading ? (
        <div className="card text-center py-12">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-slate-400">Uploading document...</p>
        </div>
      ) : filteredDocs.length > 0 ? (
        <div className="space-y-3">
          {filteredDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-copper-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-copper-400">📄</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-cream-100 truncate">{doc.name}</p>
                <p className="text-xs text-slate-500">
                  {formatBytes(doc.size_bytes)} • {new Date(doc.created_at).toLocaleDateString('en-AU')}
                </p>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[doc.status]}`}>
                {statusLabels[doc.status]}
              </span>
              
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-cream-100 transition-colors" title="Download">
                  ⬇️
                </button>
                {doc.status === 'pending_signature' && (
                  <button className="p-2 text-copper-400 hover:text-copper-300 transition-colors" title="Sign">
                    ✍️
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">📂</div>
          <p className="text-slate-400">No documents found</p>
        </div>
      )}
    </div>
  );
}

