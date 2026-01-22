"use client";

import { useEffect } from 'react';
import { LogOut } from 'lucide-react';

export default function LogoutPage() {
  useEffect(() => {
    // Simular logout - limpar dados se necessário
    // Aqui você pode adicionar lógica para limpar tokens, sessões, etc.
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-rose-100 dark:bg-rose-500/20 rounded-full">
            <LogOut className="w-12 h-12 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Você saiu da conta
        </h1>
        
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Você foi desconectado com sucesso. Obrigado por usar o LeadDash!
        </p>
        
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Para fazer login novamente, acesse a página inicial.
          </p>
        </div>
      </div>
    </div>
  );
}
