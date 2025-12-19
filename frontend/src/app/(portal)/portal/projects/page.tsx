/**
 * PATH: src/app/(portal)/portal/projects/page.tsx
 * PURPOSE: Project tracking page for client portal
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  name: string;
  type: string;
  status: 'draft' | 'pending' | 'in_progress' | 'review' | 'completed';
  due_date: string;
  progress: number;
}

const statusColors = {
  draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  in_progress: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  review: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-400 border-green-500/20',
};

const statusLabels = {
  draft: 'Draft',
  pending: 'Pending',
  in_progress: 'In Progress',
  review: 'Under Review',
  completed: 'Completed',
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Mock data
    setProjects([
      { id: 1, name: 'Annual Tax Return FY2024', type: 'Tax Filing', status: 'in_progress', due_date: '2024-03-31', progress: 65 },
      { id: 2, name: 'Q4 BAS Preparation', type: 'Tax Filing', status: 'review', due_date: '2024-01-28', progress: 90 },
      { id: 3, name: 'Financial Model Update', type: 'Financial Modelling', status: 'pending', due_date: '2024-02-15', progress: 20 },
      { id: 4, name: 'Entity Restructure', type: 'Corporate Structuring', status: 'completed', due_date: '2024-01-10', progress: 100 },
    ]);
  }, []);

  const activeProjects = projects.filter(p => p.status !== 'completed');
  const completedProjects = projects.filter(p => p.status === 'completed');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-cream-100">Projects</h1>
        <p className="text-slate-400 mt-2">
          Track the progress of your ongoing engagements.
        </p>
      </div>

      {/* Active Projects */}
      <section className="mb-12">
        <h2 className="text-lg font-medium text-cream-100 mb-4">Active Projects</h2>
        {activeProjects.length > 0 ? (
          <div className="space-y-4">
            {activeProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-medium text-cream-100">{project.name}</h3>
                    <p className="text-sm text-slate-500">{project.type}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                      {statusLabels[project.status]}
                    </span>
                    <span className="text-sm text-slate-400">
                      Due {new Date(project.due_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="relative">
                  <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-copper-500 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="absolute right-0 -top-6 text-xs text-slate-400">
                    {project.progress}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-8">
            <p className="text-slate-400">No active projects</p>
          </div>
        )}
      </section>

      {/* Completed Projects */}
      <section>
        <h2 className="text-lg font-medium text-cream-100 mb-4">Completed</h2>
        {completedProjects.length > 0 ? (
          <div className="space-y-3">
            {completedProjects.map((project) => (
              <div
                key={project.id}
                className="card flex items-center justify-between opacity-75"
              >
                <div>
                  <h3 className="font-medium text-cream-100">{project.name}</h3>
                  <p className="text-sm text-slate-500">{project.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors.completed}`}>
                  ✓ Completed
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-8">
            <p className="text-slate-400">No completed projects yet</p>
          </div>
        )}
      </section>
    </div>
  );
}

