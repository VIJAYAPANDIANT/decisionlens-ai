import React from 'react';
import { ArrowRight, FileSpreadsheet, Database, ShieldCheck, Sparkles, LineChart, Lock, Zap, BarChart2 } from 'lucide-react';

export default function LandingPage({ onEnterApp, onViewProcess }) {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden font-sans">
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">DecisionLens AI</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onEnterApp} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Sign In
          </button>
          <button onClick={onEnterApp} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-900/20">
            Open Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8">
            <Sparkles className="w-3.5 h-3.5" /> AI-Powered Business Intelligence Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
            Turn Raw Data into Decisions.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Explain Trends with AI.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            DecisionLens AI converts standard business CSVs into deterministic KPIs, visualizes trends, generates traceable evidence, and uses Google Gemini AI to explain business outcomes—without hallucination.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={onEnterApp}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-xl hover:shadow-indigo-900/30 hover:-translate-y-0.5"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onViewProcess}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:-translate-y-0.5"
            >
              View Architecture
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800"><Database className="w-3.5 h-3.5 text-emerald-400"/> Pandas/NumPy Engine</span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800"><LineChart className="w-3.5 h-3.5 text-blue-400"/> Recharts Streaming</span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800"><Sparkles className="w-3.5 h-3.5 text-purple-400"/> Google Gemini AI</span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800"><Zap className="w-3.5 h-3.5 text-amber-400"/> FastAPI Backend</span>
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="bg-[#04081c] border-y border-slate-800/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Complete End-to-End Workflow</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">From Raw CSV to AI Decision Intelligence</h3>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">See how DecisionLens automates business analysis from start to end without requiring manual data science scripting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Data Ingestion', desc: 'Drag and drop your business data CSV. We instantly validate schema, calculate missing rows, and ensure data integrity.', icon: <FileSpreadsheet className="w-6 h-6 text-blue-400"/> },
              { num: '02', title: 'Deterministic Math', desc: 'Process the data via Pandas and NumPy. Calculate strict business KPIs, revenue trends, and category performance automatically.', icon: <Database className="w-6 h-6 text-emerald-400"/> },
              { num: '03', title: 'Traceability Engine', desc: 'Generate business insights mapped directly to the mathematical evidence. Every metric remains 100% transparent and traceable.', icon: <ShieldCheck className="w-6 h-6 text-amber-400"/> },
              { num: '04', title: 'AI Explanation', desc: 'Pass the verified context to Google Gemini AI to provide natural language explanations and strategic business recommendations.', icon: <Sparkles className="w-6 h-6 text-purple-400"/> }
            ].map((step, i) => (
              <div key={i} className="bg-[#020617] border border-slate-800 p-8 rounded-2xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                <div className="text-xs font-bold text-slate-600 mb-6 font-mono">{step.num}</div>
                <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{step.desc}</p>
                <div className="absolute bottom-6 left-8">{step.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Core Capabilities</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Built for Business Leaders & Data Analysts</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Instant KPI Dashboards', desc: 'Transform CSVs into gorgeous, responsive dashboards featuring revenue trends, regional mapping, and category breakdowns instantly.', icon: <BarChart2 className="w-5 h-5 text-blue-400"/> },
            { title: 'Deterministic What-If', desc: 'Simulate business scenarios safely. Model revenue adjustments using strict algebraic math rather than unpredictable ML models.', icon: <LineChart className="w-5 h-5 text-emerald-400"/> },
            { title: 'Traceable Evidence', desc: 'Never blindly trust an AI. One-click access to the exact numerical data points that generated an insight or recommendation.', icon: <ShieldCheck className="w-5 h-5 text-purple-400"/> },
            { title: 'Grounded AI Q&A', desc: 'Ask natural language questions about your business. Gemini responds using strictly the verified context window to prevent hallucination.', icon: <Sparkles className="w-5 h-5 text-indigo-400"/> },
            { title: 'Privacy & Security', desc: 'Your CSV data is processed efficiently in memory and never permanently stored in a database. Architecture guarantees privacy.', icon: <Lock className="w-5 h-5 text-amber-400"/> },
            { title: 'Zero-Setup Deployment', desc: 'No PostgreSQL, no Docker, no complicated microservices. Runs cleanly with Vite and FastAPI for immediate value.', icon: <Zap className="w-5 h-5 text-rose-400"/> }
          ].map((feat, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-center border-t border-slate-800/50">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Analyzing Business Data with DecisionLens Today</h2>
        <p className="text-slate-400 mb-10 max-w-xl mx-auto">Upload a business sales CSV and experience automated, evidence-backed AI decision intelligence.</p>
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={onEnterApp}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg text-sm font-semibold transition-all hover:shadow-xl hover:shadow-indigo-900/30"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={onEnterApp}
            className="flex items-center justify-center bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white px-8 py-3 rounded-lg text-sm font-semibold transition-all"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-[#020617] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
              <BarChart2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-200 tracking-tight">DecisionLens AI</span>
            <span className="text-xs text-slate-500 ml-2">© 2026 All rights reserved.</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-[11px] font-mono text-slate-500">
            <span className="hover:text-slate-300 transition-colors cursor-default">React 18</span>
            <span className="hover:text-slate-300 transition-colors cursor-default">FastAPI 0.110</span>
            <span className="hover:text-slate-300 transition-colors cursor-default">Pandas 2.2</span>
            <span className="hover:text-slate-300 transition-colors cursor-default">Gemini AI 1.5</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
