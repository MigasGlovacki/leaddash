"use client";

import { useState, useEffect } from 'react';
import { X, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutConfirmModal({ 
  isOpen, 
  onClose 
}: LogoutConfirmModalProps) {
  const router = useRouter();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Controla a animação de entrada
  useEffect(() => {
    if (isOpen) {
      // Pequeno delay para permitir que o navegador renderize o estado inicial
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Não renderiza nada se o modal está fechado
  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      router.push('/logout');
    }, 500);
  };

  return (
    <>
      {/* Overlay de fade na página inteira */}
      {isFadingOut && (
        <div className="fixed inset-0 z-[60] bg-white dark:bg-slate-950 transition-opacity duration-500 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]" />
      )}
      
      {/* Container principal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            isAnimating && !isFadingOut ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />
      
        {/* Modal */}
        <div 
          className={`relative bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-md mx-4 transition-all duration-300 ease-out ${
            isAnimating && !isFadingOut 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 dark:bg-rose-500/20 rounded-lg">
                <LogOut className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Confirmar Logout
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Tem certeza que deseja sair da sua conta?
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Não
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
