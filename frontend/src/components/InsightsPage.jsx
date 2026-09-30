import React, { useState, useMemo } from 'react';
import { Search, FileSpreadsheet } from 'lucide-react';
import InsightCard from './InsightCard';
import EvidencePanel from './EvidencePanel';

export default function InsightsPage({ insights, onUpload }) {
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInsights = useMemo(() => {
    if (!insights) return [];
    let result = insights;
    
    if (filter !== 'all') {
      result = result.filter(i => i.severity === filter);
    }
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(i => 
        i.title.toLowerCase().includes(q) || 
        i.description.toLowerCase().includes(q) ||
        i.evidence.some(e => e.value.toLowerCase().includes(q) || e.label.toLowerCase().includes(q))
      );
    }
    
    return result;
  }, [insights, filter, searchQuery]);

  const stats = useMemo(() => {
    if (!insights) return { total: 0, positive: 0, warning: 0, risk: 0, neutral: 0 };
    return insights.reduce((acc, i) => {
      acc.total++;
      acc[i.severity]++;
      return acc;
    }, { total: 0, positive: 0, warning: 0, risk: 0, neutral: 0 });
  }, [insights]);

  if (!insights || insights.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 text-center">
        <FileSpreadsheet className="w-12 h-12 text-slate-700 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">No evidence-backed insights yet.</h2>
        <p className="text-slate-400 mb-6 max-w-md">Upload a business dataset with sufficient data to generate insights.</p>
        <button 
          onClick={onUpload}
          className="bg-white text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
        >
          Upload Data
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">AI Business Insights</h1>
        <p className="text-slate-400">Evidence-backed observations generated from your verified business analysis.</p>
      </div>

      {/* Summary Stats */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-wrap items-center gap-8">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Insights</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="h-10 w-px bg-slate-800 hidden sm:block"></div>
        <div>
          <p className="text-sm font-semibold text-emerald-500/80 uppercase tracking-wider mb-1">Positive</p>
          <p className="text-3xl font-bold text-emerald-400">{stats.positive}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-500/80 uppercase tracking-wider mb-1">Warning</p>
          <p className="text-3xl font-bold text-amber-400">{stats.warning}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-rose-500/80 uppercase tracking-wider mb-1">Risk</p>
          <p className="text-3xl font-bold text-rose-400">{stats.risk}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-500/80 uppercase tracking-wider mb-1">Neutral / Opp.</p>
          <p className="text-3xl font-bold text-blue-400">{stats.neutral}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
          {['all', 'positive', 'neutral', 'warning', 'risk'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredInsights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredInsights.map(insight => (
            <InsightCard 
              key={insight.id} 
              insight={insight} 
              onViewEvidence={setSelectedInsight}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500">
          No insights match your current filters.
        </div>
      )}

      {selectedInsight && (
        <EvidencePanel 
          insight={selectedInsight} 
          onClose={() => setSelectedInsight(null)} 
        />
      )}
    </div>
  );
}
