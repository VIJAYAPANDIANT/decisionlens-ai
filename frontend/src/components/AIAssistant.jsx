import React, { useState } from 'react';
import { MessageSquare, ArrowRight, Search, Loader2 } from 'lucide-react';
import { askAI } from '../services/api';

export default function AIAssistant() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAsk = async (q = question) => {
    if (!q.trim()) return;
    setQuestion(q);
    setIsLoading(true);
    setError(null);
    try {
      const res = await askAI(q);
      if (res.success) {
        setResponse(res);
      } else {
        setError(res.error?.message || "Failed to get AI answer.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Summarize my business performance.",
    "Why did revenue change?",
    "What is my strongest category?",
    "Which region performs best?"
  ];

  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col h-[600px] transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Ask DecisionLens AI</h3>
        <span className="text-xs text-blue-400 border border-blue-400/30 bg-blue-400/10 px-2 py-0.5 rounded-full ml-auto">
          AI Explanation
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4 custom-scrollbar">
        {!response && !isLoading && !error ? (
          <div className="text-center flex flex-col justify-center items-center opacity-70 h-full">
            <Search className="w-10 h-10 text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm">Ask questions about your business data...</p>
          </div>
        ) : null}

        {error && (
          <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/50 text-rose-400 text-sm text-center">
            {error}
          </div>
        )}

        {response && !isLoading && !error && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex flex-col items-end">
              <div className="p-3 rounded-t-xl rounded-bl-xl bg-blue-600/20 border border-blue-500/20 text-blue-100 max-w-[85%] text-sm">
                {question}
              </div>
            </div>
            
            <div className="flex flex-col items-start">
              <div className="p-4 rounded-t-xl rounded-br-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm leading-relaxed max-w-[95%] space-y-4">
                
                <p>{response.answer}</p>
                
                {response.evidence && response.evidence.length > 0 && (
                  <div className="pt-3 border-t border-slate-700">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Evidence</h4>
                    <ul className="space-y-2">
                      {response.evidence.map((ev, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-center justify-between bg-slate-900/50 p-2 rounded">
                          <span>{ev.label}</span>
                          <span className="font-bold text-white">{ev.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {response.recommendations && response.recommendations.length > 0 && (
                  <div className="pt-3 border-t border-slate-700">
                    <h4 className="text-xs font-semibold text-amber-400/80 uppercase tracking-wider mb-2">AI Recommendation</h4>
                    <ul className="space-y-1">
                      {response.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span> {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {response.limitations && response.limitations.length > 0 && (
                  <div className="pt-3 border-t border-slate-700">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Limitations</h4>
                    <ul className="space-y-1 text-slate-400 text-xs italic">
                      {response.limitations.map((lim, i) => (
                        <li key={i}>{lim}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10 opacity-70">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
            <p className="text-slate-400 text-sm">Analyzing verified context...</p>
          </div>
        )}
      </div>

      {!response && !isLoading && (
        <div className="space-y-2 mb-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider">Suggested Questions</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((sug, idx) => (
              <button 
                key={idx} 
                onClick={() => handleAsk(sug)} 
                className="text-left px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 transition-colors border border-slate-800"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="relative mt-auto">
        <input 
          type="text" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Ask AI about your data..." 
          disabled={isLoading}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
        />
        <button 
          onClick={() => handleAsk()}
          disabled={!question.trim() || isLoading} 
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 rounded-md text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
