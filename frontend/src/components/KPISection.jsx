import React from 'react';
import KPICard from './KPICard';

export default function KPISection({ kpis }) {
  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const formatNumber = (val) => new Intl.NumberFormat('en-US').format(val);

  const kpiData = [
    { id: 'rev', title: 'Total Revenue', value: formatCurrency(kpis.total_revenue), change: kpis.revenue_growth || 0, type: 'currency' },
    { id: 'ord', title: 'Total Orders', value: formatNumber(kpis.total_orders), change: 0, type: 'number' },
    { id: 'aov', title: 'Average Order Value', value: formatCurrency(kpis.average_order_value), change: 0, type: 'currency' },
    { id: 'gwth', title: 'Revenue Growth', value: kpis.revenue_growth !== null ? `${kpis.revenue_growth >= 0 ? '+' : ''}${kpis.revenue_growth}%` : 'N/A', change: kpis.revenue_growth || 0, type: 'percent' }
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map(kpi => (
        <KPICard key={kpi.id} {...kpi} />
      ))}
    </section>
  );
}
