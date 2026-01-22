"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MetricsView from '@/components/views/MetricsView';
import LeadsView from '@/components/views/LeadsView';
import ProductsView from '@/components/views/ProductsView';
import SettingsView from '@/components/views/SettingsView';
import { BarChart3, Users, Package, Settings } from 'lucide-react';
import { Lead, LeadStatus } from '@/types/lead';

// Helper function to format date
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Initial lead data
const initialLeads: Lead[] = [
  { 
    id: 1, 
    name: "Ana Silva", 
    email: "ana.silva@email.com", 
    status: "New", 
    date: "Jan 15, 2024",
    createdAt: new Date('2024-01-15')
  },
  { 
    id: 2, 
    name: "Carlos Rocha", 
    email: "carlos.r@email.com", 
    status: "In Progress", 
    date: "Jan 14, 2024",
    createdAt: new Date('2024-01-14')
  },
  { 
    id: 3, 
    name: "Beatriz Costa", 
    email: "bia.costa@tech.com", 
    status: "Converted", 
    date: "Jan 12, 2024",
    createdAt: new Date('2024-01-12')
  },
  { 
    id: 4, 
    name: "João Mendes", 
    email: "joao.m@dev.io", 
    status: "Lost", 
    date: "Jan 10, 2024",
    createdAt: new Date('2024-01-10')
  },
  { 
    id: 5, 
    name: "Fernanda Lima", 
    email: "fer.lima@design.com", 
    status: "New", 
    date: "Jan 09, 2024",
    createdAt: new Date('2024-01-09')
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('metrics');
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const addLead = (name: string, email: string, status: LeadStatus = "New") => {
    const now = new Date();
    const newLead: Lead = {
      id: Date.now(),
      name,
      email,
      status,
      date: formatDate(now),
      createdAt: now
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const editLead = (id: number, name: string, email: string, status: LeadStatus) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id 
        ? { ...lead, name, email, status }
        : lead
    ));
  };

  const removeLead = (id: number) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'metrics':
        return <MetricsView leads={leads} />;
      case 'leads':
        return <LeadsView leads={leads} addLead={addLead} editLead={editLead} removeLead={removeLead} />;
      case 'products':
        return <ProductsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <MetricsView leads={leads} />;
    }
  };

  const MobileNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-2 flex justify-around items-center z-50 pb-4">
      {[
        { id: 'metrics', icon: BarChart3, label: 'Metrics' },
        { id: 'leads', icon: Users, label: 'Leads' },
        { id: 'products', icon: Package, label: 'Products' },
        { id: 'settings', icon: Settings, label: 'Settings' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${activeTab === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-16 md:pb-0">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto h-screen scroll-smooth">
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
           {/* Mobile Header */}
           <div className="md:hidden mb-6 flex items-center justify-between">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">LeadDash</h1>
           </div>

          {/* Content Area */}
          {renderContent()}
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
