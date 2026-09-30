import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Activity } from 'lucide-react';

export default function KPICard({ title, value, change, type }) {
  const isPositive = change >= 0;
  
  const getIcon = () => {
    if (title.toLowerCase().includes('revenue')) return <DollarSign className="w-5 h-5" />;
    if (title.toLowerCase().includes('order')) return <ShoppingCart className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
  };

  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
      <div className="flex items-center justify-between text-slate-400">
        <span className="text-sm font-medium">{title}</span>
        <div className="p-2 rounded-lg bg-slate-800">
          {getIcon()}
        </div>
      </div>
      
      <div>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        <div className="flex items-center gap-2 text-sm">
          <div className={`flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
          <span className="text-slate-500">vs previous period</span>
        </div>
      </div>
    </div>
  );
}
