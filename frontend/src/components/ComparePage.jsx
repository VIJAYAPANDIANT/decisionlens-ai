import React, { useRef } from 'react';
import { UploadCloud, ArrowRightLeft, X, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ComparePage({ analysisA, analysisB, onUploadB, onClearB, isLoading }) {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const formatNumber = (val) => new Intl.NumberFormat('en-US').format(val);

  // If no second dataset is uploaded yet, show an empty state for comparison
  if (!analysisB) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={onUploadB}
          accept=".csv"
          className="hidden"
        />
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
          <ArrowRightLeft className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Compare Datasets</h2>
        <p className="text-slate-400 max-w-md mb-8">
          Upload a second CSV dataset (like Q2 Sales or another region) to compare KPIs and performance side-by-side against your current data.
        </p>
        <button 
          onClick={handleUploadClick}
          disabled={isLoading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-900/20"
        >
          {isLoading ? 'Analyzing...' : (
            <>
              <UploadCloud className="w-5 h-5" />
              Upload Second Dataset
            </>
          )}
        </button>
      </div>
    );
  }

  // Calculate variances
  const revA = analysisA.kpis.total_revenue || 0;
  const revB = analysisB.kpis.total_revenue || 0;
  const revDiff = revB - revA;
  const revDiffPct = revA !== 0 ? (revDiff / revA) * 100 : 0;

  const ordA = analysisA.kpis.total_orders || 0;
  const ordB = analysisB.kpis.total_orders || 0;
  const ordDiff = ordB - ordA;
  const ordDiffPct = ordA !== 0 ? (ordDiff / ordA) * 100 : 0;

  // Prepare combined category data for chart
  const categoriesA = analysisA.category_performance || [];
  const categoriesB = analysisB.category_performance || [];
  
  // Merge categories
  const allCatNames = [...new Set([...categoriesA.map(c => c.category), ...categoriesB.map(c => c.category)])];
  const combinedCategoryData = allCatNames.map(catName => {
    const a = categoriesA.find(c => c.category === catName);
    const b = categoriesB.find(c => c.category === catName);
    return {
      name: catName,
      DatasetA: a ? a.revenue : 0,
      DatasetB: b ? b.revenue : 0
    };
  }).sort((a, b) => (b.DatasetA + b.DatasetB) - (a.DatasetA + a.DatasetB)).slice(0, 10); // Top 10

  const ComparisonMetric = ({ title, valA, valB, diff, diffPct, formatFn }) => {
    const isPositive = diff >= 0;
    return (
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900 flex flex-col">
        <span className="text-slate-400 text-sm font-medium mb-4">{title}</span>
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs text-slate-500 mb-1 truncate max-w-[120px]">{analysisA.dataset.filename || 'Dataset A'}</div>
            <div className="text-xl font-semibold text-white">{formatFn(valA)}</div>
          </div>
          <div className="text-slate-600 font-medium px-2">VS</div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1 truncate max-w-[120px]">{analysisB.dataset.filename || 'Dataset B'}</div>
            <div className="text-xl font-semibold text-white">{formatFn(valB)}</div>
          </div>
        </div>
        <div className={`mt-auto pt-4 border-t border-slate-800 flex items-center justify-between text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          <div className="flex items-center gap-1">
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{isPositive ? '+' : ''}{diffPct.toFixed(1)}%</span>
          </div>
          <span>{isPositive ? '+' : ''}{formatFn(diff)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
          <div>
            <h2 className="text-lg font-bold text-white">Dataset Comparison</h2>
            <p className="text-xs text-slate-400">
              Comparing <strong>{analysisA.dataset.filename || 'Dataset A'}</strong> vs <strong>{analysisB.dataset.filename || 'Dataset B'}</strong>
            </p>
          </div>
        </div>
        <button 
          onClick={onClearB}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" /> Clear Comparison
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComparisonMetric 
          title="Total Revenue Comparison" 
          valA={revA} 
          valB={revB} 
          diff={revDiff} 
          diffPct={revDiffPct} 
          formatFn={formatCurrency} 
        />
        <ComparisonMetric 
          title="Total Orders Comparison" 
          valA={ordA} 
          valB={ordB} 
          diff={ordDiff} 
          diffPct={ordDiffPct} 
          formatFn={formatNumber} 
        />
      </div>

      <div className="p-6 rounded-xl border border-slate-800 bg-slate-900">
        <h3 className="text-base font-semibold text-white mb-6">Category Revenue Comparison (Top 10)</h3>
        {combinedCategoryData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={combinedCategoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="DatasetA" name={analysisA.dataset.filename || 'Dataset A'} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="DatasetB" name={analysisB.dataset.filename || 'Dataset B'} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-slate-500 text-sm">
            No category data available for comparison.
          </div>
        )}
      </div>
    </div>
  );
}
