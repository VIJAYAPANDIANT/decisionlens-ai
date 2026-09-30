import React from 'react';
import { mockTransactions } from '../utils/mockData';
import { ArrowRight } from 'lucide-react';

export default function DataTable() {
  return (
    <section className="p-6 rounded-xl border border-slate-800 bg-slate-900 overflow-x-auto transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Business Data</h3>
        <button className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
          View all data <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
            <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Product</th>
            <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
            <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Region</th>
            <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Quantity</th>
            <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Revenue</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {mockTransactions.map((tx) => (
            <tr key={tx.id} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
              <td className="py-4 text-slate-400">{tx.date}</td>
              <td className="py-4 text-slate-200 font-medium">{tx.product}</td>
              <td className="py-4">
                <span className="px-2 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-md">
                  {tx.category}
                </span>
              </td>
              <td className="py-4 text-slate-300">{tx.region}</td>
              <td className="py-4 text-slate-400">{tx.quantity}</td>
              <td className="py-4 text-white font-medium">{tx.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
