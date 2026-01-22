"use client";

import { Package, Tag, AlertCircle } from 'lucide-react';

const products = [
  { id: 1, name: "Enterprise License", price: 499.00, stock: 15, category: "Software" },
  { id: 2, name: "Premium Consulting", price: 1200.00, stock: 5, category: "Service" },
  { id: 3, name: "Basic Package", price: 99.00, stock: 100, category: "Software" },
  { id: 4, name: "Initial Setup", price: 250.00, stock: 0, category: "Service" },
  { id: 5, name: "API Access Token", price: 50.00, stock: 999, category: "Digital" },
  { id: 6, name: "24/7 Support", price: 150.00, stock: 20, category: "Add-on" },
];

export default function ProductsView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight">Product Catalog</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (  
          <div key={product.id} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-500 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Package className="w-6 h-6" />
              </div>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full text-slate-600 dark:text-slate-300">
                {product.category}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{product.name}</h3>
            <p className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">
              $ {product.price.toFixed(2)}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center text-sm text-slate-500">
                <Tag className="w-4 h-4 mr-2" />
                <span className={product.stock === 0 ? "text-rose-500 font-medium" : ""}>
                  {product.stock === 0 ? "Out of Stock" : `${product.stock} units`}
                </span>
              </div>
              {product.stock < 10 && product.stock > 0 && (
                <span className="flex items-center text-xs text-amber-500 font-medium">
                  <AlertCircle className="w-3 h-3 mr-1" /> Low
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
