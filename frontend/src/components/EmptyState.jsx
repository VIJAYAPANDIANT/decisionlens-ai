import React from 'react';
import { FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function EmptyState({ onUpload }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 sm:p-12 text-center flex flex-col items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 shadow-xl shadow-slate-950">
        <FileSpreadsheet className="w-8 h-8 text-slate-400" />
      </div>
      
      <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
        No business data yet
      </h2>
      <p className="text-slate-400 text-lg max-w-md mb-8 leading-relaxed">
        Upload a CSV file to generate:
      </p>

      <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-left mb-10">
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Business KPIs
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Revenue trends
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI insights
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Evidence
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Recommendations
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> What-if scenarios
        </div>
      </div>

      <button 
        onClick={onUpload}
        className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-200 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-xl hover:shadow-white/10 hover:-translate-y-1 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      >
        <FileSpreadsheet className="w-5 h-5" />
        Upload Business Data
      </button>
    </section>
  );
}
