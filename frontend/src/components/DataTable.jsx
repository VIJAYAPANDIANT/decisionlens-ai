import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function DataTable({ data, mapping }) {
  if (!data || data.length === 0) return null;

  // Find which columns actually exist in the preview data
  const sampleRow = data[0];
  const columns = Object.keys(sampleRow);

  return (
    <section className="p-6 rounded-xl border border-slate-800 bg-slate-900 overflow-x-auto transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Business Data</h3>
        <button className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
          View all data <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-800">
              {columns.map(col => (
                <th key={col} className="pb-3 pr-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                {columns.map(col => (
                  <td key={col} className="py-4 pr-4 text-slate-300 whitespace-nowrap">
                    {row[col] !== null ? String(row[col]) : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
