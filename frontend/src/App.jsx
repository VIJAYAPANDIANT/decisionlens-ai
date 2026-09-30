import React, { useState, useRef } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UploadCloud, FileSpreadsheet, TrendingDown, TrendingUp, AlertTriangle, Lightbulb, MessageSquare, ArrowRight, Activity, Search, ChevronRight, ChevronDown, Zap, Loader2 } from 'lucide-react';

export default function App() {
  const [salesIncrease, setSalesIncrease] = useState(5);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  
  // Dashboard State
  const [dashboardData, setDashboardData] = useState(null);
  
  // AI Assistant State
  const [questionText, setQuestionText] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [askError, setAskError] = useState(null);

  // Insights State
  const [expandedInsightIndex, setExpandedInsightIndex] = useState(null);

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setUploadError('Please upload a valid CSV file.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setDashboardData(response.data);
    } catch (err) {
      console.error(err);
      setUploadError(err.response?.data?.detail || 'Failed to analyze file. Ensure backend is running.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAskQuestion = async (q = questionText) => {
    if (!q || !dashboardData) return;
    setIsAsking(true);
    setAskError(null);
    setAiResponse(null);
    setQuestionText(q);

    try {
      const response = await axios.post('http://localhost:8000/api/ask', {
        question: q,
        analysis: dashboardData
      });
      setAiResponse(response.data);
    } catch (err) {
      console.error(err);
      setAskError(err.response?.data?.detail || 'Failed to get answer from AI.');
    } finally {
      setIsAsking(false);
    }
  };

  const currentRevenue = dashboardData ? dashboardData.kpis.total_revenue : 0;
  const projectedRevenue = currentRevenue * (1 + salesIncrease / 100);
  const estimatedIncrease = projectedRevenue - currentRevenue;

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  const formatNumber = (val) => new Intl.NumberFormat('en-IN').format(val);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 pb-12">
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
          
          <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
          <button 
            onClick={handleUploadClick}
            disabled={isUploading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            <span className="hidden sm:inline">{isUploading ? 'Analyzing...' : 'Upload Data'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        
        {uploadError && (
          <div className="p-4 rounded-lg bg-rose-950/50 border border-rose-900/50 flex items-center gap-3 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm font-medium">{uploadError}</p>
          </div>
        )}

        {!dashboardData && !isUploading && (
          <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Turn Business Data Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Decisions</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mb-8 leading-relaxed">
              "See the Data. Understand the Insight. Make Better Decisions."<br/>
              Analyze business data, discover evidence-backed insights, simulate scenarios, and generate actionable recommendations.
            </p>
            <button 
              onClick={handleUploadClick}
              className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-200 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <FileSpreadsheet className="w-5 h-5" />
              Upload CSV
            </button>
          </section>
        )}

        {isUploading && (
          <div className="flex flex-col items-center justify-center py-20 opacity-70">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <h2 className="text-xl font-medium text-white">Analyzing Data...</h2>
            <p className="text-slate-400 mt-2">Processing rows, calculating KPIs, and generating insights.</p>
          </div>
        )}

        {dashboardData && (
          <>
            {/* KPI Dashboard */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-sm font-medium">Total Revenue</span>
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">{formatCurrency(dashboardData.kpis.total_revenue)}</div>
              </div>
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-sm font-medium">Orders / Rows</span>
                  <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-bold text-white">{formatNumber(dashboardData.kpis.total_orders)}</div>
              </div>
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-sm font-medium">Avg Order Value</span>
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">{formatCurrency(dashboardData.kpis.average_order_value)}</div>
              </div>
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-sm font-medium">Growth</span>
                  {dashboardData.kpis.growth_percentage >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-rose-400" />
                  )}
                </div>
                <div className={`text-2xl font-bold ${dashboardData.kpis.growth_percentage >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {dashboardData.kpis.growth_percentage > 0 ? '+' : ''}{dashboardData.kpis.growth_percentage}%
                </div>
              </div>
            </section>

            {/* Charts */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
                <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dashboardData.revenue_trend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        itemStyle={{ color: '#e2e8f0' }}
                        formatter={(value) => [formatCurrency(value), "Revenue"]}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
                <h3 className="text-lg font-semibold text-white mb-6">Sales by Category</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData.category_analysis}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="category" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        cursor={{fill: '#1e293b'}}
                        formatter={(value) => [formatCurrency(value), "Sales"]}
                      />
                      <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* AI Insights */}
            {dashboardData.insights.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl font-bold text-white">AI Insights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dashboardData.insights.map((insight, idx) => {
                    const isCritical = insight.severity === 'high';
                    const isWarning = insight.severity === 'medium';
                    const isExpanded = expandedInsightIndex === idx;
                    
                    const borderColor = isCritical ? 'border-rose-900/30' : isWarning ? 'border-amber-900/30' : 'border-emerald-900/30';
                    const bgColor = isCritical ? 'bg-rose-950/10' : isWarning ? 'bg-amber-950/10' : 'bg-emerald-950/10';
                    const barColor = isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500';
                    const textColor = isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400';
                    const hoverBorder = isCritical ? 'hover:border-rose-800/50' : isWarning ? 'hover:border-amber-800/50' : 'hover:border-emerald-800/50';

                    return (
                      <div key={idx} className={`p-5 rounded-xl border ${borderColor} ${bgColor} flex flex-col gap-3 relative overflow-hidden group ${hoverBorder} transition-colors`}>
                        <div className={`absolute top-0 left-0 w-1 h-full ${barColor}`}></div>
                        <div className={`flex items-center gap-2 ${textColor}`}>
                          {isCritical || isWarning ? <AlertTriangle className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                          <span className="text-xs font-bold uppercase tracking-wider">{insight.severity}</span>
                        </div>
                        <h4 className="text-white font-semibold text-lg">{insight.title}</h4>
                        <p className="text-slate-400 text-sm mb-2">{insight.description}</p>
                        
                        {isExpanded && (
                          <div className="mt-2 space-y-4 animate-in fade-in slide-in-from-top-2">
                            <div className="space-y-2">
                              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Evidence</h5>
                              <div className="bg-slate-900/50 rounded-lg p-3 space-y-3">
                                {insight.evidence.map((ev, eIdx) => (
                                  <div key={eIdx} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-slate-300">{ev.label}</span>
                                      <span className="text-white font-bold">{ev.value}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500">Source: {ev.source}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recommendation</h5>
                              <p className="text-sm text-slate-300">{insight.recommendation}</p>
                            </div>
                          </div>
                        )}

                        <button 
                          onClick={() => setExpandedInsightIndex(isExpanded ? null : idx)}
                          className={`mt-auto flex items-center gap-1 text-sm font-medium ${textColor} hover:opacity-80 w-fit pt-2`}
                        >
                          {isExpanded ? 'Hide Evidence' : 'View Evidence'} 
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Assistant and Simulator */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col h-[500px]">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">AI Business Assistant</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4 custom-scrollbar">
                  {!aiResponse && !isAsking && (
                    <div className="text-center flex flex-col justify-center items-center opacity-70 h-full">
                      <Search className="w-10 h-10 text-slate-600 mb-3" />
                      <p className="text-slate-400 text-sm">Ask your business data anything...</p>
                    </div>
                  )}

                  {isAsking && (
                    <div className="flex flex-col items-center justify-center h-full opacity-70">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
                      <p className="text-sm text-slate-400">Gemini is analyzing...</p>
                    </div>
                  )}

                  {askError && (
                    <div className="p-4 rounded-lg bg-rose-950/50 border border-rose-900/50 text-rose-400 text-sm">
                      {askError}
                    </div>
                  )}

                  {aiResponse && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                        <p className="text-white text-sm leading-relaxed">{aiResponse.answer}</p>
                      </div>
                      
                      {aiResponse.evidence?.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Evidence</h4>
                          <ul className="space-y-1">
                            {aiResponse.evidence.map((ev, i) => (
                              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span> {ev}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {aiResponse.recommendations?.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Recommendations</h4>
                          <ul className="space-y-1">
                            {aiResponse.recommendations.map((rec, i) => (
                              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                <span className="text-emerald-500 mt-1">•</span> {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {aiResponse.limitations?.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Limitations</h4>
                          <ul className="space-y-1">
                            {aiResponse.limitations.map((lim, i) => (
                              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                <span className="text-amber-500 mt-1">•</span> {lim}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {!aiResponse && !isAsking && (
                  <div className="space-y-2 mb-4">
                    <button onClick={() => handleAskQuestion("Why did revenue decline?")} className="w-full text-left px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 transition-colors border border-slate-700">
                      "Why did revenue decline?"
                    </button>
                    <button onClick={() => handleAskQuestion("Which category performed best?")} className="w-full text-left px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 transition-colors border border-slate-700">
                      "Which category performed best?"
                    </button>
                    <button onClick={() => handleAskQuestion("What are the biggest business risks?")} className="w-full text-left px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 transition-colors border border-slate-700">
                      "What are the biggest business risks?"
                    </button>
                    <button onClick={() => handleAskQuestion("What should we investigate next?")} className="w-full text-left px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-300 transition-colors border border-slate-700">
                      "What should we investigate next?"
                    </button>
                  </div>
                )}

                <div className="relative mt-auto">
                  <input 
                    type="text" 
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                    placeholder="Ask about your data..." 
                    disabled={isAsking}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                  />
                  <button 
                    onClick={() => handleAskQuestion()} 
                    disabled={isAsking || !questionText} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-md text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

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

            {/* Recent Analysis */}
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
                  <tr className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 flex items-center gap-3 text-slate-200">
                      <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                      {dashboardData.dataset.filename}
                    </td>
                    <td className="py-4 text-slate-400">{formatNumber(dashboardData.dataset.rows)}</td>
                    <td className="py-4 text-slate-400">Just now</td>
                    <td className="py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
