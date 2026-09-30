import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CategoryChart({ data }) {
  const formatCurrency = (val) => `$${(val / 1000)}k`;

  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/50 hover:border-slate-700">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Sales by Category</h3>
        <p className="text-sm text-slate-400">Revenue distribution</p>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="category" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              cursor={{fill: '#1e293b'}}
              formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
            />
            <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
