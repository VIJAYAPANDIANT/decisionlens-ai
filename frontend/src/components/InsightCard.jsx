import React from 'react';
import { CheckCircle2, AlertTriangle, Info, ArrowRight, Activity } from 'lucide-react';

export default function InsightCard({ insight, onViewEvidence }) {
  const getSeverityStyles = (sev) => {
    switch (sev) {
      case 'positive': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'warning': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'risk': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'neutral':
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const getSeverityIcon = (sev) => {
    switch (sev) {
      case 'positive': return <CheckCircle2 className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'risk': return <Activity className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-5 rounded-xl border border-slate-800 bg-slate-900 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700 h-full group">
      
      <div className="flex items-start justify-between mb-4">
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getSeverityStyles(insight.severity)}`}>
          {getSeverityIcon(insight.severity)}
          <span className="capitalize">{insight.severity}</span>
        </span>
        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded text-indigo-400 border border-indigo-500/20 bg-indigo-500/10">
          Verified from dataset
        </span>
      </div>

      <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
        {insight.title}
      </h3>
      
      <p className="text-slate-400 text-sm mb-6 line-clamp-3">
        {insight.description}
      </p>

      <div className="mt-auto pt-4 border-t border-slate-800/50 space-y-4">
        
        {/* Compact Evidence Preview */}
        <div className="grid grid-cols-2 gap-2">
          {insight.evidence.slice(0, 2).map((ev, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase truncate">{ev.label}</span>
              <span className="text-sm font-bold text-slate-200 truncate">{ev.value}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => onViewEvidence(insight)}
          className="w-full flex items-center justify-between px-3 py-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 border border-transparent hover:border-slate-700"
        >
          View Evidence
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
    </div>
  );
}
