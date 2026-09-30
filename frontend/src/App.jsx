import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UploadCloud, FileSpreadsheet, TrendingDown, TrendingUp, AlertTriangle, Lightbulb, MessageSquare, ArrowRight, Activity, Search, ChevronRight, Zap } from 'lucide-react';

const MOCK_REVENUE_DATA = [
  { month: 'Jan', revenue: 65 },
  { month: 'Feb', revenue: 78 },
  { month: 'Mar', revenue: 90 },
  { month: 'Apr', revenue: 81 },
  { month: 'May', revenue: 85 },
  { month: 'Jun', revenue: 72 },
  { month: 'Jul', revenue: 82.4 },
];

const MOCK_CATEGORY_DATA = [
  { category: 'Electronics', sales: 45 },
  { category: 'Software', sales: 28 },
  { category: 'Services', sales: 15 },
  { category: 'Hardware', sales: 12 },
];

const MOCK_RECENT_ANALYSIS = [
  { id: 1, name: 'Q2_Sales_Export.csv', rows: '12,450', date: '2026-09-29', status: 'Completed' },
  { id: 2, name: 'Customer_Churn_2025.csv', rows: '8,192', date: '2026-09-25', status: 'Completed' },
  { id: 3, name: 'Inventory_Levels_Q3.csv', rows: '3,421', date: '2026-09-20', status: 'Completed' },
];

export default function App() {
  const [salesIncrease, setSalesIncrease] = useState(5);
  const currentRevenue = 8240000; // 82.4L
  const projectedRevenue = currentRevenue * (1 + salesIncrease / 100);
  const estimatedIncrease = projectedRevenue - currentRevenue;

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* 1. Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">DecisionLens AI</span>
            </div>
            <div className="hidden md:flex items-center gap-3 border-l border-slate-700 pl-4">
              <span className="text-sm font-medium text-slate-400">AI Decision Engine</span>
              <span className="px-2 py-1 text-xs font-semibold bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                PS-04
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Upload Data</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        
        {/* 2. Hero / Empty State */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 sm:p-12 text-center flex flex-col items-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Turn Business Data Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Decisions</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-8 leading-relaxed">
            "See the Data. Understand the Insight. Make Better Decisions."<br/>
            Analyze business data, discover evidence-backed insights, simulate scenarios, and generate actionable recommendations.
          </p>
          <button className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-200 px-6 py-3 rounded-lg font-semibold transition-colors">
            <FileSpreadsheet className="w-5 h-5" />
            Upload CSV
          </button>
        </section>

        {/* 3. KPI Dashboard */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Revenue', value: '₹82.4L', trend: 'down', icon: Activity, color: 'text-blue-400' },
            { title: 'Orders', value: '6,821', trend: 'up', icon: FileSpreadsheet, color: 'text-indigo-400' },
            { title: 'Average Order Value', value: '₹1,208', trend: 'up', icon: Zap, color: 'text-amber-400' },
            { title: 'Growth', value: '-8.4%', trend: 'down', icon: TrendingDown, color: 'text-red-400' }
          ].map((kpi, i) => (
            <div key={i} className="p-5 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-3">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-sm font-medium">{kpi.title}</span>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-bold text-white">{kpi.value}</div>
            </div>
          ))}
        </section>

        {/* 4 & 5. Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
            <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend (Lakhs)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
            <h3 className="text-lg font-semibold text-white mb-6">Sales by Category (%)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_CATEGORY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="category" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    cursor={{fill: '#1e293b'}}
                  />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* 6. AI Insights */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">AI Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-rose-900/30 bg-rose-950/10 flex flex-col gap-3 relative overflow-hidden group hover:border-rose-800/50 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Critical</span>
              </div>
              <h4 className="text-white font-semibold text-lg">Revenue Decline</h4>
              <p className="text-slate-400 text-sm mb-2">Revenue decreased by 8.4% compared to the previous period.</p>
              <button className="mt-auto flex items-center gap-1 text-sm font-medium text-rose-400 hover:text-rose-300 w-fit">
                View Evidence <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-5 rounded-xl border border-amber-900/30 bg-amber-950/10 flex flex-col gap-3 relative overflow-hidden group hover:border-amber-800/50 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Warning</span>
              </div>
              <h4 className="text-white font-semibold text-lg">Inventory Risk</h4>
              <p className="text-slate-400 text-sm mb-2">3 products are approaching their reorder threshold.</p>
              <button className="mt-auto flex items-center gap-1 text-sm font-medium text-amber-400 hover:text-amber-300 w-fit">
                View Evidence <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 rounded-xl border border-emerald-900/30 bg-emerald-950/10 flex flex-col gap-3 relative overflow-hidden group hover:border-emerald-800/50 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <div className="flex items-center gap-2 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Opportunity</span>
              </div>
              <h4 className="text-white font-semibold text-lg">Growth Opportunity</h4>
              <p className="text-slate-400 text-sm mb-2">Electronics generated the highest revenue across all segments.</p>
              <button className="mt-auto flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 w-fit">
                View Evidence <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 7 & 8. Assistant and Simulator */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Assistant */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col h-[400px]">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">AI Business Assistant</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-4 text-center flex flex-col justify-center items-center opacity-70">
              <Search className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-slate-400 text-sm">Ask your business data anything...</p>
            </div>

            <div className="space-y-2 mb-4">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 transition-colors border border-slate-700">
                "Why did revenue decline?"
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 transition-colors border border-slate-700">
                "Which product is performing best?"
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 transition-colors border border-slate-700">
                "What are my biggest risks?"
              </button>
            </div>

            <div className="relative">
              <input 
                type="text" 
                placeholder="Type your question..." 
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-md text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* What-If Simulator */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-semibold text-white">What-If Simulator</h3>
            </div>
            <p className="text-slate-400 text-sm mb-8">Simulate how changes in key metrics affect overall performance.</p>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-slate-300">Sales Increase</label>
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md font-semibold text-sm">
                  +{salesIncrease}%
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={salesIncrease} 
                onChange={(e) => setSalesIncrease(Number(e.target.value))}
                className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex justify-between items-center p-4 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-sm">Current Revenue</span>
                <span className="text-white font-bold">{formatCurrency(currentRevenue)}</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-slate-950 border border-indigo-900/50 relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500"></div>
                <span className="text-indigo-200 text-sm font-medium">Projected Revenue</span>
                <span className="text-indigo-400 font-bold text-lg">{formatCurrency(projectedRevenue)}</span>
              </div>
              <div className="flex justify-between items-center p-3">
                <span className="text-slate-500 text-sm">Estimated Increase</span>
                <span className="text-emerald-400 font-semibold text-sm">+{formatCurrency(estimatedIncrease)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Recent Analysis */}
        <section className="p-6 rounded-xl border border-slate-800 bg-slate-900 overflow-x-auto">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Analysis</h3>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Dataset Name</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Rows</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Analyzed Date</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {MOCK_RECENT_ANALYSIS.map((item) => (
                <tr key={item.id} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 flex items-center gap-3 text-slate-200">
                    <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                    {item.name}
                  </td>
                  <td className="py-4 text-slate-400">{item.rows}</td>
                  <td className="py-4 text-slate-400">{item.date}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
