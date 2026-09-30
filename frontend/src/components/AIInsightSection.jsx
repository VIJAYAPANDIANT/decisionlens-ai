import React, { useState } from 'react';
import { Lightbulb, ArrowRight, Search, FileSpreadsheet } from 'lucide-react';
import InsightCard from './InsightCard';
import EvidencePanel from './EvidencePanel';

export default function AIInsightSection({ insights, onViewAll }) {
  const [selectedInsight, setSelectedInsight] = useState(null);

  if (!insights || insights.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white">Business Insights</h2>
          <span className="text-sm text-slate-500 ml-2 hidden sm:inline">- Evidence-backed observations from your dataset</span>
        </div>
        {insights.length > 3 && onViewAll && (
          <button 
            onClick={onViewAll}
            className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            View all {insights.length} insights <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.slice(0, 3).map((insight) => (
          <InsightCard 
            key={insight.id} 
            insight={insight} 
            onViewEvidence={setSelectedInsight}
          />
        ))}
      </div>

      {selectedInsight && (
        <EvidencePanel 
          insight={selectedInsight} 
          onClose={() => setSelectedInsight(null)} 
        />
      )}
    </section>
  );
}
