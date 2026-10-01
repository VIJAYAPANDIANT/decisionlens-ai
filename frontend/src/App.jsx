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
import ComparePage from './components/ComparePage';
import ProcessPage from './components/ProcessPage';
import LandingPage from './components/LandingPage';
import HowItWorksModal from './components/HowItWorksModal';
import { uploadDataset } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  
  // Primary Dataset
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Secondary Dataset (for comparison)
  const [analysisB, setAnalysisB] = useState(null);
  const [isLoadingB, setIsLoadingB] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  React.useEffect(() => {
    const handleOpenHelp = () => setIsHelpOpen(true);
    window.addEventListener('open-help-modal', handleOpenHelp);
    return () => window.removeEventListener('open-help-modal', handleOpenHelp);
  }, []);
  
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

  const handleFileChangeB = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10 MB.");
      return;
    }

    if (!file.name.endsWith('.csv')) {
      setError("Please upload a valid CSV file for comparison.");
      return;
    }

    setIsLoadingB(true);
    setError(null);

    try {
      const data = await uploadDataset(file);
      setAnalysisB(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingB(false);
    }
  };

  const hasData = analysis !== null;

  if (activeTab === 'landing') {
    return (
      <LandingPage 
        onEnterApp={() => setActiveTab('dashboard')} 
        onViewProcess={() => setActiveTab('process')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex print:bg-slate-950">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }} 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-h-screen min-w-0 print:block print:min-h-0 print:w-full">
        <Header 
          onUpload={handleUploadClick} 
          disabled={isLoading} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          analysisStatus={hasData ? analysis.dataset.filename : "No dataset uploaded"}
        />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto custom-scrollbar print:overflow-visible print:h-auto print:p-0 print:block">
          {error && (
            <ErrorState message={error} onRetry={() => setError(null)} />
          )}

          {!hasData && !isLoading && !error && activeTab !== 'process' && (
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

              {activeTab === 'compare' && (
                <ComparePage 
                  analysisA={analysis} 
                  analysisB={analysisB} 
                  onUploadB={handleFileChangeB} 
                  onClearB={() => setAnalysisB(null)}
                  isLoading={isLoadingB}
                />
              )}

              {activeTab === 'process' && (
                <ProcessPage />
              )}

            </div>
          )}
          
          {/* Allow ProcessPage to render even if there is no data uploaded yet, so users can read docs before uploading! */}
          {!hasData && !isLoading && !error && activeTab === 'process' && (
             <div className="space-y-8 animate-in fade-in duration-500 pb-12 mt-8">
               <ProcessPage />
             </div>
          )}

        </main>
      </div>

      <HowItWorksModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
