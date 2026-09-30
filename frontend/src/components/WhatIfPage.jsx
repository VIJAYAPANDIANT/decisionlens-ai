import React, { useState } from 'react';
import { Activity, ArrowRight, RotateCcw } from 'lucide-react';
import { calculateRevenueScenario } from '../utils/scenarioCalculator';

export default function WhatIfPage({ currentRevenue, onUpload }) {
  const [salesIncrease, setSalesIncrease] = useState(10);
  const [inputVal, setInputVal] = useState("10");
  
  if (currentRevenue === null || currentRevenue === undefined) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 text-center">
        <Activity className="w-12 h-12 text-slate-700 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">No verified business data available.</h2>
        <p className="text-slate-400 mb-6">Upload a CSV before running a scenario.</p>
        <button 
          onClick={onUpload}
          className="bg-white text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
        >
          Upload Data
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= -20 && val <= 50) {
      setSalesIncrease(val);
    }
  };

  const handlePreset = (val) => {
    setSalesIncrease(val);
    setInputVal(String(val));
  };

  const scenario = calculateRevenueScenario(currentRevenue, salesIncrease);
  
  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  
  const maxAxis = Math.max(scenario.currentRevenue, scenario.projectedRevenue) * 1.1 || 100;
  const currentWidth = (scenario.currentRevenue / maxAxis) * 100;
  const projectedWidth = (scenario.projectedRevenue / maxAxis) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-3">
          <Activity className="w-8 h-8 text-indigo-400" />
          What-If Simulator
        </h1>
        <p className="text-slate-400">Test simple business scenarios using your verified data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Controls Column */}
        <div className="space-y-8">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Current Business</h3>
            <div className="flex justify-between items-end">
              <p className="text-slate-300">Verified Revenue</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(currentRevenue)}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-indigo-900/50 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Scenario Assumption</h3>
              <button 
                onClick={() => handlePreset(10)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
            
            <div className="mb-6">
              <label className="text-sm font-medium text-slate-300 block mb-3">Sales Change (%)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="-20" 
                  max="50" 
                  value={salesIncrease} 
                  onChange={handleInputChange}
                  className="flex-1 accent-indigo-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <input 
                  type="number"
                  min="-20"
                  max="50"
                  value={inputVal}
                  onChange={handleInputChange}
                  className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Allowed range: -20% to +50%</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-2">Presets:</p>
              <div className="flex flex-wrap gap-2">
                {[-10, 0, 5, 10, 20].map(p => (
                  <button 
                    key={p}
                    onClick={() => handlePreset(p)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold border ${salesIncrease === p ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'}`}
                  >
                    {p > 0 ? '+' : ''}{p}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="space-y-8">
          
          <div className="bg-slate-900 border border-emerald-900/30 rounded-xl p-6 shadow-xl shadow-emerald-900/5">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
                Scenario Result
              </span>
              <span className="text-xs text-slate-500">Illustrative calculation</span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-slate-400 mb-1">Current Revenue</p>
                <p className="text-xl font-semibold text-slate-200">{formatCurrency(scenario.currentRevenue)}</p>
              </div>
              <div>
                <p className="text-sm text-indigo-300 mb-1">Scenario Revenue</p>
                <p className="text-2xl font-bold text-indigo-400">{formatCurrency(scenario.projectedRevenue)}</p>
              </div>
            </div>
            
            <div className="mb-8 bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p className="text-sm text-slate-400 mb-1">Estimated Change</p>
              <p className={`text-xl font-bold ${scenario.estimatedChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {scenario.estimatedChange > 0 ? '+' : ''}{formatCurrency(scenario.estimatedChange)}
              </p>
            </div>

            {/* Visual Comparison */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Current</span>
                  <span className="text-slate-300">{formatCurrency(scenario.currentRevenue)}</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3">
                  <div className="bg-slate-500 h-3 rounded-full transition-all duration-500" style={{ width: `${currentWidth}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-indigo-400">Scenario</span>
                  <span className="text-indigo-400 font-semibold">{formatCurrency(scenario.projectedRevenue)}</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3">
                  <div className="bg-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: `${projectedWidth}%` }}></div>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Traceable Calculation</h3>
            <div className="font-mono text-sm text-slate-300 bg-slate-950 p-4 rounded-lg border border-slate-800/50">
              <p className="text-slate-500 mb-2">// Current Revenue × (1 + Sales Change / 100)</p>
              <p>
                {formatCurrency(scenario.currentRevenue)} × (1 + {scenario.percentage} / 100)
              </p>
              <p className="mt-2 text-indigo-400 font-bold border-t border-slate-800 pt-2">
                = {formatCurrency(scenario.projectedRevenue)}
              </p>
            </div>
            <p className="text-xs text-amber-500/80 mt-4 italic">
              * This is not a forecast or guarantee of future performance. It is a deterministic scenario simulation based solely on the selected assumption.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
