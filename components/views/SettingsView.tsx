"use client";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { User, Moon, Sun, Save, Bell, Shield } from 'lucide-react';
import { useThemeTransition } from '@/components/ThemeTransitionContext';

export default function SettingsView() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { triggerTransition } = useThemeTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!showToast) return;
    const timeoutId = window.setTimeout(() => setShowToast(false), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [showToast]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    triggerTransition(newTheme, setTheme);
  };

  const handleSave = () => {
    setShowToast(true);
  };

  return (
    <>
      <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Settings</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Profile Section */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500" />
            User Profile
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Miguel Silva" 
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input 
                  type="email" 
                  defaultValue="miguel@leaddash.com" 
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio</label>
              <textarea 
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all h-24 resize-none"
                defaultValue="Full Stack Developer passionate about UI/UX."
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-500" />
            Preferences
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                  {mounted && theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-medium">Appearance</p>
                  <p className="text-sm text-slate-500">Toggle between light and dark mode</p>
                </div>
              </div>
              <button 
                onClick={toggleTheme}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                {mounted && theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-slate-500">Receive alerts for new leads</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:border-slate-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-200 dark:shadow-none hover:translate-y-[-1px] cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>

      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-slate-900/90 px-4 py-2 text-sm text-white shadow-lg transition-all duration-200 ${showToast ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-2'}`}
      >
        Settings saved successfully
      </div>
    </>
  );
}
