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
import { mockRevenueTrend, mockCategoryData, mockRegionalData } from './utils/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hasData, setHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    // In a real app, this would trigger file input click
    // fileInputRef.current?.click();
    
    // For demo purposes, we will simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasData(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header onUpload={handleUploadClick} />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto custom-scrollbar">
          {!hasData && !isLoading && (
            <EmptyState onUpload={handleUploadClick} />
          )}

          {isLoading && (
            <LoadingState />
          )}

          {hasData && !isLoading && (
            <div className="space-y-8 animate-in fade-in duration-500">
              
              {/* KPIs */}
              <KPISection />

              {/* Charts */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart data={mockRevenueTrend} />
                <CategoryChart data={mockCategoryData} />
              </section>
              
              {/* Regional */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <RegionalPerformance data={mockRegionalData} />
                </div>
                <div className="lg:col-span-2">
                  <DataTable />
                </div>
              </section>

              {/* AI Insights */}
              <AIInsightSection />

              {/* Assistant and Simulator */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AIAssistant />
                <WhatIfSimulator />
              </section>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
