import React from 'react';
import KPICard from './KPICard';
import { mockKPIs } from '../utils/mockData';

export default function KPISection() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockKPIs.map(kpi => (
        <KPICard key={kpi.id} {...kpi} />
      ))}
    </section>
  );
}
