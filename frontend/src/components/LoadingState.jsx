import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 opacity-70">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
      <h2 className="text-xl font-medium text-white">Analyzing Data...</h2>
      <p className="text-slate-400 mt-2">Processing rows, calculating KPIs, and generating insights.</p>
    </div>
  );
}
