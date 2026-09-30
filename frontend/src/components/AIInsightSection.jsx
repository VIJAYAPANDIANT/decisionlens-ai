import React from 'react';
import { Lightbulb } from 'lucide-react';
import InsightCard from './InsightCard';

export default function AIInsightSection({ insights }) {
  if (!insights || insights.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-amber-400" />
        <h2 className="text-xl font-bold text-white">Data Insights</h2>
        <span className="text-sm text-slate-500 ml-2 hidden sm:inline">- Deterministic observations from your business data</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </section>
  );
}
