import React from 'react';
import { UploadCloud, Bell, User } from 'lucide-react';

export default function Header({ onUpload }) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="h-full px-8 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Business Overview</h1>
          <p className="text-xs text-slate-400 hidden sm:block">AI-powered insights from your business data</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onUpload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-900/20"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Upload Data</span>
          </button>
          
          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-950"></span>
          </button>
          
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center cursor-pointer hover:border-slate-500 transition-colors">
            <User className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
