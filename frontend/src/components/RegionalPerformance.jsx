import React from 'react';
import { TrendingUp, TrendingDown, MapPin } from 'lucide-react';

export default function RegionalPerformance({ data }) {
  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Regional Performance</h3>
        <p className="text-sm text-slate-400">Geographic revenue distribution</p>
      </div>
      
      <div className="space-y-4">
        {data.map((region, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-slate-300 font-medium truncate">{region.region}</span>
            </div>
            
            <div className="text-right flex items-center gap-4 ml-4">
              <span className="text-white font-bold whitespace-nowrap">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(region.revenue)}
              </span>
              <span className={`flex items-center justify-end w-16 flex-shrink-0 text-sm font-semibold ${region.growth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {region.growth >= 0 ? '+' : ''}{region.growth}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
