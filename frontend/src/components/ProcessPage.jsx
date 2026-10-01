import React from 'react';
import { Database, BrainCircuit, Activity, LineChart, FileSpreadsheet, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProcessPage() {
  const steps = [
    {
      id: 1,
      title: "1. Data Upload & Ingestion",
      icon: <FileSpreadsheet className="w-6 h-6 text-blue-400" />,
      color: "bg-blue-500/10 border-blue-500/20",
      description: "Users upload raw business data in CSV format. The frontend securely transmits this to the backend for processing.",
      features: ["CSV Parsing", "Schema Validation", "File Size Checking"]
    },
    {
      id: 2,
      title: "2. Deterministic Analysis (Pandas & NumPy)",
      icon: <Database className="w-6 h-6 text-emerald-400" />,
      color: "bg-emerald-500/10 border-emerald-500/20",
      description: "Instead of relying on AI to do math, the backend uses strictly deterministic Python libraries to calculate KPIs, aggregate revenue, and flag data quality issues.",
      features: ["KPI Calculation", "Data Cleaning", "Trend Aggregation", "100% Mathematical Accuracy"]
    },
    {
      id: 3,
      title: "3. Traceable Evidence Generation",
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      color: "bg-amber-500/10 border-amber-500/20",
      description: "The backend generates specific insights and attaches exact numerical evidence to them, creating a completely transparent and verifiable context window.",
      features: ["Confidence Scoring", "Severity Tracking", "Evidence Linking"]
    },
    {
      id: 4,
      title: "4. Grounded AI Explanation (Gemini)",
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      color: "bg-purple-500/10 border-purple-500/20",
      description: "Google Gemini is passed ONLY the verified Pandas analysis. It acts as an explanation engine to answer questions based on the math, completely preventing data hallucination.",
      features: ["Context-Bound Prompts", "Actionable Recommendations", "No Invented Metrics"]
    },
    {
      id: 5,
      title: "5. What-If Business Simulation",
      icon: <LineChart className="w-6 h-6 text-rose-400" />,
      color: "bg-rose-500/10 border-rose-500/20",
      description: "Users can run scenario projections. This module uses isolated algebraic formulas in the frontend to model outcomes safely, without unpredictable machine learning variance.",
      features: ["Live Calculation", "Mathematical Determinism", "Scenario Testing"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <BrainCircuit className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
        <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">The DecisionLens Architecture</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          How we transform raw CSVs into highly accurate, AI-powered business decisions without sacrificing numerical trust.
        </p>
      </div>

      <div className="space-y-6 relative">
        {/* Connecting Line */}
        <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-800 hidden sm:block"></div>

        {steps.map((step, index) => (
          <div key={step.id} className="relative flex flex-col sm:flex-row gap-6 group">
            {/* Timeline Node */}
            <div className="hidden sm:flex flex-col items-center z-10">
              <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center bg-slate-950 shadow-xl transition-transform duration-300 group-hover:scale-110 ${step.color}`}>
                {step.icon}
              </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 bg-slate-900 border border-slate-800 p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
              <div className="sm:hidden w-12 h-12 rounded-xl border flex items-center justify-center mb-4 bg-slate-950 shadow-lg ${step.color}">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">{step.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {step.features.map((feature, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-indigo-900/10 border border-indigo-900/30 flex items-center justify-between text-indigo-200">
        <div className="font-medium text-sm">
          Core Principle: "Math for Calculation. AI for Explanation."
        </div>
        <ArrowRight className="w-5 h-5 text-indigo-400" />
      </div>
    </div>
  );
}
