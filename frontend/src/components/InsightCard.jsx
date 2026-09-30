import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, TrendingUp } from 'lucide-react';

export default function InsightCard({ insight }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isCritical = insight.impact === 'High';
  const isWarning = insight.impact === 'Medium';
  
  const borderColor = isCritical ? 'border-rose-900/30' : isWarning ? 'border-amber-900/30' : 'border-emerald-900/30';
  const bgColor = isCritical ? 'bg-rose-950/10' : isWarning ? 'bg-amber-950/10' : 'bg-emerald-950/10';
  const barColor = isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500';
  const textColor = isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400';
  const hoverBorder = isCritical ? 'hover:border-rose-800/50' : isWarning ? 'hover:border-amber-800/50' : 'hover:border-emerald-800/50';

  return (
    <div className={`p-6 rounded-xl border ${borderColor} ${bgColor} flex flex-col gap-3 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-950/50 ${hoverBorder}`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${barColor}`}></div>
      <div className={`flex items-center gap-2 ${textColor}`}>
        {isCritical || isWarning ? <AlertTriangle className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
        <span className="text-xs font-bold uppercase tracking-wider">{insight.impact} IMPACT</span>
      </div>
      <h4 className="text-white font-semibold text-lg">{insight.title}</h4>
      <p className="text-slate-400 text-sm mb-2">{insight.description}</p>
      
      {isExpanded && (
        <div className="mt-2 space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="space-y-2">
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Evidence</h5>
            <div className="bg-slate-900/50 rounded-lg p-3 space-y-3">
              {insight.evidence.map((ev, eIdx) => (
                <div key={eIdx} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">{ev.label}</span>
                    <span className="text-white font-bold">{ev.value}</span>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-800/50">
                <span className="text-[10px] text-slate-500 uppercase">Source: {insight.source}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recommendation</h5>
            <p className="text-sm text-slate-300">{insight.recommendation}</p>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`mt-auto flex items-center gap-1 text-sm font-medium ${textColor} hover:opacity-80 w-fit pt-2 outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm transition-all`}
      >
        {isExpanded ? 'Hide Evidence' : 'View Evidence'} 
        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
}
