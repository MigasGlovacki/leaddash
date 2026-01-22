"use client";

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Lead } from '@/types/lead';
import LeadRow from '@/components/LeadRow';

const data = [
  { name: 'Jan', leads: 400, sales: 240 },
  { name: 'Feb', leads: 300, sales: 139 },
  { name: 'Mar', leads: 200, sales: 980 },
  { name: 'Apr', leads: 278, sales: 390 },
  { name: 'May', leads: 189, sales: 480 },
  { name: 'Jun', leads: 239, sales: 380 },
  { name: 'Jul', leads: 349, sales: 430 },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:bg-slate-50 hover:dark:bg-slate-900 transition-all duration-300 ease-in-out"
      style={{ 
        opacity: isHovered ? 1 : 0.85,
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className="text-emerald-500 font-medium flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          {change}
        </span>
        <span className="text-slate-400 ml-2">vs. last month</span>
      </div>
    </div>
  );
};

interface MetricsViewProps {
  leads: Lead[];
}

export default function MetricsView({ leads }: MetricsViewProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Ordenar leads por data de criação (mais recente primeiro) e pegar os 5 primeiros
  const recentLeads = [...leads]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Leads" 
          value="2,543" 
          change="+12.5%" 
          icon={Users} 
          color="bg-indigo-500"
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$ 45.2k" 
          change="+8.2%" 
          icon={DollarSign} 
          color="bg-emerald-500"
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.2%" 
          change="+2.4%" 
          icon={Activity} 
          color="bg-rose-500"
        />
        <StatCard 
          title="Active Leads" 
          value="573" 
          change="+1.2%" 
          icon={Users} 
          color="bg-amber-500"
        />
      </div>

      {/* Recent Leads */}
      {recentLeads.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Leads</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Last 5 registered leads</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentLeads.map((lead) => (
                  <LeadRow key={lead.id} lead={lead} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Sales Performance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} />
                <XAxis dataKey="name" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px', 
                    color: '#fff' 
                  }}
                  cursor={{ fill: isDark ? '#334155' : '#f1f5f9', opacity: 0.3 }}
                />
                <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Recent Activity or Secondary Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Traffic Source</h3>
          <div className="space-y-4">
            {['Instagram', 'Google Ads', 'Referral', 'Linkedin'].map((source, i) => (
              <div key={source} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'][i]}`} />
                  <span className="text-sm font-medium">{source}</span>
                </div>
                <span className="text-sm text-slate-500">{[45, 32, 15, 8][i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
