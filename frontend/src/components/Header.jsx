import React from 'react';
import { UploadCloud, Menu, CheckCircle2 } from 'lucide-react';

export default function Header({ onUpload, disabled, onMenuClick, analysisStatus }) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="h-full px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 mr-1 text-slate-400 hover:text-white md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              DecisionLens AI
            </h1>
          </div>
          {analysisStatus !== "No dataset uploaded" ? (
            <div className="hidden sm:flex items-center gap-1.5 ml-4 px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
              <CheckCircle2 className="w-3 h-3" />
              Analysis Ready
            </div>
          ) : (
            <div className="hidden sm:block ml-4 text-xs text-slate-500 font-medium">
              No dataset uploaded
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-400 truncate max-w-[120px] sm:max-w-none mr-2">
            {analysisStatus !== "No dataset uploaded" ? analysisStatus : ''}
          </div>
          
          <button 
            onClick={onUpload}
            disabled={disabled}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-900/20 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Upload CSV</span>
            <span className="sm:hidden">Upload</span>
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-help-modal'))}
            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
            title="How it works"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
