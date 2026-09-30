import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPISection from './components/KPISection';
import RevenueChart from './components/RevenueChart';
import CategoryChart from './components/CategoryChart';
import RegionalPerformance from './components/RegionalPerformance';
import AIInsightSection from './components/AIInsightSection';
import AIAssistant from './components/AIAssistant';
import WhatIfSimulator from './components/WhatIfSimulator';
import DataTable from './components/DataTable';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import InsightsPage from './components/InsightsPage';
import WhatIfPage from './components/WhatIfPage';
import { uploadDataset } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10 MB.");
      return;
    }

    if (!file.name.endsWith('.csv')) {
      setError("Please upload a valid CSV file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await uploadDataset(file);
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const hasData = analysis !== null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header onUpload={handleUploadClick} disabled={isLoading} />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto custom-scrollbar">
          {error && (
            <ErrorState message={error} onRetry={() => setError(null)} />
          )}

          {!hasData && !isLoading && !error && (
            <EmptyState onUpload={handleUploadClick} />
          )}

          {isLoading && !error && (
            <LoadingState />
          )}

          {hasData && !isLoading && !error && (
            <div className="space-y-8 animate-in fade-in duration-500 pb-12">
              
              {/* Dataset Quality Info (Small top bar) */}
              <div className="flex items-center gap-6 px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-400">
                <span className="font-semibold text-slate-200">Dataset Quality:</span>
                <span>{analysis.dataset.rows.toLocaleString()} Rows</span>
                <span>{analysis.dataset.columns} Columns</span>
                <span className={analysis.data_quality.missing_values > 0 ? 'text-amber-400' : ''}>
                  {analysis.data_quality.missing_values} Missing Values
                </span>
                <span className={analysis.data_quality.duplicate_rows > 0 ? 'text-amber-400' : ''}>
                  {analysis.data_quality.duplicate_rows} Duplicate Rows
                </span>
                <span className={`font-semibold ${analysis.data_quality.data_quality_score > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {analysis.data_quality.data_quality_score}% Quality
                </span>
              </div>

              {activeTab === 'dashboard' && (
                <>
                  {/* KPIs */}
                  <KPISection kpis={analysis.kpis} />

                  {/* Charts */}
                  <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RevenueChart data={analysis.revenue_trend} />
                    <CategoryChart data={analysis.category_performance} />
                  </section>
                  
                  {/* Regional & Table */}
                  <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <RegionalPerformance data={analysis.regional_performance} />
                    </div>
                    <div className="lg:col-span-2">
                      <DataTable data={analysis.preview} mapping={analysis.column_mapping} />
                    </div>
                  </section>

                  {/* AI Insights (Top 3) */}
                  <AIInsightSection insights={analysis.insights} onViewAll={() => setActiveTab('insights')} />

                  {/* Assistant and Simulator */}
                  <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AIAssistant analysis={analysis} />
                    <WhatIfSimulator currentRevenue={analysis.kpis.total_revenue} onOpen={() => setActiveTab('what-if')} />
                  </section>
                </>
              )}

              {activeTab === 'insights' && (
                <InsightsPage insights={analysis.insights} onUpload={handleUploadClick} />
              )}

              {activeTab === 'what-if' && (
                <WhatIfPage currentRevenue={analysis?.kpis?.total_revenue} onUpload={handleUploadClick} />
              )}

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
