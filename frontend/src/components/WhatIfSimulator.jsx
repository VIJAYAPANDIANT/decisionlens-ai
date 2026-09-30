import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export default function WhatIfSimulator() {
  const [salesIncrease, setSalesIncrease] = useState(10);
  
  const currentRevenue = 124580;
  const projectedRevenue = currentRevenue * (1 + salesIncrease / 100);
  const estimatedChange = projectedRevenue - currentRevenue;

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">What-If Simulator</h3>
      </div>
      <p className="text-slate-400 text-sm mb-6">Explore how business changes could affect your results.</p>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-medium text-slate-300">Sales Change</label>
          <span className={`px-3 py-1 bg-indigo-500/10 ${salesIncrease >= 0 ? 'text-emerald-400' : 'text-rose-400'} border border-indigo-500/20 rounded-md font-semibold text-sm`}>
            {salesIncrease > 0 ? '+' : ''}{salesIncrease}%
          </span>
        </div>
        <input 
          type="range" 
          min="-50" 
          max="100" 
          value={salesIncrease} 
          onChange={(e) => setSalesIncrease(Number(e.target.value))}
          className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>-50%</span>
          <span>0%</span>
          <span>+100%</span>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="flex justify-between items-center p-4 rounded-lg bg-slate-950 border border-slate-800">
          <span className="text-slate-400 text-sm">Current Revenue</span>
          <span className="text-white font-bold">{formatCurrency(currentRevenue)}</span>
        </div>
        <div className="flex justify-between items-center p-4 rounded-lg bg-slate-950 border border-indigo-900/50 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500"></div>
          <span className="text-indigo-200 text-sm font-medium">Projected Revenue</span>
          <span className="text-indigo-400 font-bold text-lg">{formatCurrency(projectedRevenue)}</span>
        </div>
        <div className="flex justify-between items-center p-3">
          <span className="text-slate-500 text-sm">Estimated Change</span>
          <span className={`${estimatedChange >= 0 ? 'text-emerald-400' : 'text-rose-400'} font-semibold text-sm`}>
            {estimatedChange > 0 ? '+' : ''}{formatCurrency(estimatedChange)}
          </span>
        </div>
      </div>
      
      <button className="mt-6 w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
        Run Scenario
      </button>
    </div>
  );
}
