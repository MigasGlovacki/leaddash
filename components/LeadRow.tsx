"use client";

import { useState } from 'react';
import { Lead } from '@/types/lead';
import { MoreHorizontal } from 'lucide-react';
import LeadActionsMenu from './LeadActionsMenu';

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    "New": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    "In Progress": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    "Converted": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    "Lost": "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400",
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles["New"]}`}>
      {status}
    </span>
  );
};

interface LeadRowProps {
  lead: Lead;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function LeadRow({ lead, onEdit, onDelete }: LeadRowProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasActions = !!(onEdit && onDelete);

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{lead.name}</td>
      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{lead.email}</td>
      <td className="px-6 py-4">
        <StatusBadge status={lead.status} />
      </td>
      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{lead.date}</td>
      <td className="px-6 py-4 text-right">
        {hasActions ? (
          <div className="relative inline-block">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Lead actions"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
            <LeadActionsMenu
              lead={lead}
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onEdit={onEdit!}
              onDelete={onDelete!}
            />
          </div>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </td>
    </tr>
  );
}
