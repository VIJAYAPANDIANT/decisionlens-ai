import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="p-6 rounded-xl bg-rose-950/20 border border-rose-900/50 flex flex-col items-center text-center max-w-lg mx-auto mt-12">
      <AlertTriangle className="w-10 h-10 text-rose-500 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
      <p className="text-slate-400 text-sm mb-6">
        {message || "We couldn't analyze your business data."}
      </p>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
