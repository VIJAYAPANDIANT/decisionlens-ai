import React from 'react';
import { UploadCloud, FileSpreadsheet, TrendingUp, Lightbulb, MessageSquare, Activity, Search, LayoutDashboard, Settings } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">DecisionLens AI</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-1 border-l border-slate-800 pl-6 ml-2">
              <a href="#" className="px-3 py-2 rounded-md bg-slate-900 text-white text-sm font-medium flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </a>
              <a href="#" className="px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 text-sm font-medium flex items-center gap-2 transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </a>
            </nav>
          </div>
          
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-lg shadow-blue-900/20 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Upload Data</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Dashboard Placeholder Header */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Business Overview</h1>
          <p className="text-slate-400 text-sm mt-1">See the Data. Understand the Insight. Make Better Decisions.</p>
        </div>

        {/* KPI Dashboard Placeholders */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-sm font-medium">Metric {i}</span>
                <Activity className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-2xl font-bold text-slate-500">---</div>
            </div>
          ))}
        </section>

        {/* Charts Placeholders */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend (Placeholder)</h3>
            <div className="h-72 w-full flex items-center justify-center border border-slate-800/50 rounded-lg bg-slate-950/50">
              <TrendingUp className="w-8 h-8 text-slate-700" />
            </div>
          </div>
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-6">Sales by Category (Placeholder)</h3>
            <div className="h-72 w-full flex items-center justify-center border border-slate-800/50 rounded-lg bg-slate-950/50">
              <Activity className="w-8 h-8 text-slate-700" />
            </div>
          </div>
        </section>

        {/* AI Insights Placeholder */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">AI Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-3 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-700"></div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Insight Placeholder</span>
                </div>
                <h4 className="text-slate-400 font-semibold text-lg">Upload data to see insights</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Assistant and Simulator */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col h-[500px] transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">AI Business Assistant</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-4 text-center flex flex-col justify-center items-center opacity-70">
              <Search className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-slate-400 text-sm">Ask your business data anything...</p>
            </div>

            <div className="relative mt-auto">
              <input 
                type="text" 
                placeholder="Upload data to chat..." 
                disabled
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-4 pr-10 py-3 text-sm text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-semibold text-white">WHAT-IF SIMULATOR</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">Upload data to simulate how changes affect revenue.</p>
            
            <div className="mt-auto p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center h-32">
              <span className="text-slate-600 text-sm">Awaiting data...</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
