import React from 'react';
import { LayoutDashboard, Database, Lightbulb, Activity, Settings, BarChart2 } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'data', label: 'Data', icon: Database },
    { id: 'insights', label: 'AI Insights', icon: Lightbulb },
    { id: 'what-if', label: 'What-If Simulator', icon: Activity }
  ];

  return (
    <div className="w-64 h-screen border-r border-slate-800 bg-slate-950 flex flex-col hidden md:flex sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">DecisionLens AI</span>
        </div>
        <div className="text-xs font-medium text-slate-500 uppercase tracking-widest pl-11">Decision Intelligence</div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-all">
          <Settings className="w-4 h-4 text-slate-500" />
          Settings
        </button>
      </div>
    </div>
  );
}
