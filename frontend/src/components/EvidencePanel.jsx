import React from 'react';
import { X, CheckCircle2, AlertTriangle, Info, Map, Tag, BarChart3, TrendingUp, ShieldAlert, Package } from 'lucide-react';

const sourceIcons = {
  category_performance: <Tag className="w-4 h-4" />,
  regional_performance: <Map className="w-4 h-4" />,
  product_performance: <Package className="w-4 h-4" />,
  kpis: <TrendingUp className="w-4 h-4" />,
  data_quality: <ShieldAlert className="w-4 h-4" />
};

const sourceLabels = {
  category_performance: 'Category Performance Analysis',
  regional_performance: 'Regional Performance Analysis',
  product_performance: 'Product Performance Analysis',
  kpis: 'Business KPI Analysis',
  data_quality: 'Data Quality Assessment'
};

export const formatInsightSource = (sourceObj) => {
  if (!sourceObj || !sourceObj.analysis) return "General Analysis";
  return sourceLabels[sourceObj.analysis] || sourceObj.analysis.replace('_', ' ');
};

export default function EvidencePanel({ insight, onClose }) {
  if (!insight) return null;

  const getSeverityIcon = (sev) => {
    switch (sev) {
      case 'positive': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'risk': return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg">
              {getSeverityIcon(insight.severity)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">{insight.title}</h2>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Verified from dataset
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Observation</h3>
            <p className="text-lg text-slate-200 leading-relaxed font-medium">
              {insight.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Supporting Data</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {insight.evidence.map((ev, idx) => (
                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">{ev.label}</p>
                  <p className="text-lg font-bold text-white">{ev.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Source Analysis</h3>
              <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 text-sm">
                {sourceIcons[insight.source?.analysis] || <BarChart3 className="w-4 h-4" />}
                {formatInsightSource(insight.source)}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Analysis Limitations</h3>
              <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                {insight.source?.analysis === 'kpis' && (
                  <li>Does not establish causal relationships.</li>
                )}
                <li>Calculations based only on available dataset columns.</li>
                <li>External market factors are not considered.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-semibold text-amber-500 uppercase tracking-wider flex items-center gap-2">
              Deterministic Recommendation
            </h3>
            <p className="text-slate-300">
              {insight.recommendation}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
