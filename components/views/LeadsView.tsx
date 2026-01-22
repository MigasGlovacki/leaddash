"use client";

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Lead, LeadStatus } from '@/types/lead';
import LeadsTable from '@/components/LeadsTable';
import NewLeadModal from '@/components/NewLeadModal';
import EditLeadModal from '@/components/EditLeadModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

interface LeadsViewProps {
  leads: Lead[];
  addLead: (name: string, email: string, status: LeadStatus) => void;
  editLead: (id: number, name: string, email: string, status: LeadStatus) => void;
  removeLead: (id: number) => void;
}

export default function LeadsView({ leads, addLead, editLead, removeLead }: LeadsViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | LeadStatus>('All');

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
  };

  const handleDelete = (lead: Lead) => {
    setDeletingLead(lead);
  };

  const handleSaveEdit = (id: number, name: string, email: string, status: LeadStatus) => {
    editLead(id, name, email, status);
    setEditingLead(null);
  };

  const handleConfirmDelete = () => {
    if (deletingLead) {
      removeLead(deletingLead.id);
      setDeletingLead(null);
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = normalizedSearch
      ? lead.name.toLowerCase().includes(normalizedSearch) ||
        lead.email.toLowerCase().includes(normalizedSearch)
      : true;
    const matchesStatus = statusFilter === 'All' ? true : lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Lead Management</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200 dark:shadow-none cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Lead
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'All' | LeadStatus)}
            className="h-10 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Filters</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <LeadsTable 
          leads={filteredLeads} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <NewLeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addLead}
      />

      <EditLeadModal
        isOpen={editingLead !== null}
        lead={editingLead}
        onClose={() => setEditingLead(null)}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmModal
        isOpen={deletingLead !== null}
        lead={deletingLead}
        onClose={() => setDeletingLead(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
