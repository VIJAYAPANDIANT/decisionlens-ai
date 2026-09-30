import React, { useState } from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { calculateRevenueScenario } from '../utils/scenarioCalculator';

export default function WhatIfSimulator({ currentRevenue, onOpen }) {
  const [salesIncrease, setSalesIncrease] = useState(10);
  
  const scenario = calculateRevenueScenario(currentRevenue, salesIncrease);
  
  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700 h-[600px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">What-If Simulator</h3>
        </div>
      </div>
      
      <p className="text-slate-400 text-sm mb-6">Explore how business changes could affect your results.</p>

      <div className="mb-6 bg-slate-950 p-4 rounded-lg border border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-medium text-slate-300">Sales Change</label>
          <span className={`px-2 py-0.5 bg-indigo-500/10 ${salesIncrease >= 0 ? 'text-emerald-400' : 'text-rose-400'} border border-indigo-500/20 rounded font-semibold text-xs`}>
            {salesIncrease > 0 ? '+' : ''}{salesIncrease}%
          </span>
        </div>
        <input 
          type="range" 
          min="-20" 
          max="50" 
          value={salesIncrease} 
          onChange={(e) => setSalesIncrease(Number(e.target.value))}
          className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
          <span>-20%</span>
          <span>0%</span>
          <span>+50%</span>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/30">
          <span className="text-slate-400 text-sm">Current Revenue</span>
          <span className="text-white font-bold">{formatCurrency(scenario.currentRevenue)}</span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-indigo-900/10 border border-indigo-900/30">
          <span className="text-indigo-300 text-sm font-medium">Scenario Revenue</span>
          <span className="text-indigo-400 font-bold text-lg">{formatCurrency(scenario.projectedRevenue)}</span>
        </div>
      </div>
      
      <button 
        onClick={onOpen}
        className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-indigo-400 text-sm font-semibold transition-colors border border-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        Open Simulator <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
