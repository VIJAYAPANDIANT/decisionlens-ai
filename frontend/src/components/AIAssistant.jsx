import React, { useState } from 'react';
import { MessageSquare, ArrowRight, Search } from 'lucide-react';
import { mockAIResponse } from '../utils/mockData';

export default function AIAssistant() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);

  const handleAsk = () => {
    if (!question.trim()) return;
    // TEMPORARY MOCK RESPONSE
    setResponse(mockAIResponse);
  };

  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 flex flex-col h-[500px] transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Ask DecisionLens AI</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4 custom-scrollbar">
        {!response ? (
          <div className="text-center flex flex-col justify-center items-center opacity-70 h-full">
            <Search className="w-10 h-10 text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm">Ask questions about your business data...</p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex flex-col items-end">
              <div className="p-3 rounded-t-xl rounded-bl-xl bg-blue-600/20 border border-blue-500/20 text-blue-100 max-w-[85%] text-sm">
                {question}
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="p-4 rounded-t-xl rounded-br-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm leading-relaxed max-w-[95%]">
                <p className="mb-4">{response.answer}</p>
                <div className="pt-3 border-t border-slate-700">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Evidence</h4>
                  <ul className="space-y-1">
                    {response.evidence.map((ev, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span> {ev}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!response && (
        <div className="space-y-2 mb-4">
          <button onClick={() => setQuestion("Why did revenue change?")} className="w-full text-left px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-sm text-slate-300 transition-colors border border-slate-800">
            "Why did revenue change?"
          </button>
        </div>
      )}

      <div className="relative mt-auto">
        <input 
          type="text" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Ask AI about your data..." 
          className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
        <button 
          onClick={handleAsk}
          disabled={!question.trim()} 
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 rounded-md text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
