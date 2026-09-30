export const mockKPIs = [
  { id: 'rev', title: 'Total Revenue', value: ',580', change: 12.8, type: 'currency' },
  { id: 'ord', title: 'Total Orders', value: '3,842', change: 5.2, type: 'number' },
  { id: 'aov', title: 'Average Order Value', value: '.43', change: -1.2, type: 'currency' },
  { id: 'gwth', title: 'Revenue Growth', value: '+12.8%', change: 12.8, type: 'percent' }
];

export const mockRevenueTrend = [
  { name: 'Jan', revenue: 65000 },
  { name: 'Feb', revenue: 72000 },
  { name: 'Mar', revenue: 68000 },
  { name: 'Apr', revenue: 85000 },
  { name: 'May', revenue: 92000 },
  { name: 'Jun', revenue: 110400 },
  { name: 'Jul', revenue: 118000 },
  { name: 'Aug', revenue: 124580 }
];

export const mockCategoryData = [
  { category: 'Electronics', revenue: 38420 },
  { category: 'Clothing', revenue: 28500 },
  { category: 'Home', revenue: 22100 },
  { category: 'Beauty', revenue: 19560 },
  { category: 'Sports', revenue: 16000 }
];

export const mockRegionalData = [
  { region: 'South', revenue: ',300', growth: 15.2 },
  { region: 'North', revenue: ',800', growth: 8.4 },
  { region: 'East', revenue: ',600', growth: 5.7 },
  { region: 'West', revenue: ',880', growth: -2.1 }
];

export const mockInsights = [
  {
    id: 1,
    title: 'Revenue Growth',
    description: 'Revenue increased by 12.8% compared with the previous period.',
    evidence: [
      { label: 'Revenue', value: ',580' },
      { label: 'Previous', value: ',400' },
      { label: 'Change', value: '+12.8%' }
    ],
    source: 'Pandas aggregation on Revenue column',
    impact: 'Positive',
    recommendation: 'Continue monitoring the strongest-performing categories.'
  },
  {
    id: 2,
    title: 'Category Opportunity',
    description: 'Electronics generated the highest revenue contribution.',
    evidence: [
      { label: 'Electronics Revenue', value: ',420' }
    ],
    source: 'Grouped sum by Category',
    impact: 'High',
    recommendation: 'Evaluate inventory and marketing allocation for Electronics.'
  },
  {
    id: 3,
    title: 'Regional Risk',
    description: 'West region shows declining revenue.',
    evidence: [
      { label: 'West Revenue', value: ',880' },
      { label: 'Growth', value: '-2.1%' }
    ],
    source: 'Period-over-period comparison by Region',
    impact: 'Medium',
    recommendation: 'Investigate product demand and customer activity in the West.'
  }
];

export const mockTransactions = [
  { id: 1, date: '2026-08-10', product: 'Smartphone Z', category: 'Electronics', region: 'South', quantity: 2, revenue: ',600' },
  { id: 2, date: '2026-08-11', product: 'Mechanical Keyboard', category: 'Electronics', region: 'North', quantity: 5, revenue: '' },
  { id: 3, date: '2026-08-12', product: 'Running Shoes', category: 'Sports', region: 'West', quantity: 1, revenue: '' },
  { id: 4, date: '2026-08-12', product: 'Coffee Maker', category: 'Home', region: 'East', quantity: 1, revenue: '' },
  { id: 5, date: '2026-08-13', product: 'Face Serum', category: 'Beauty', region: 'South', quantity: 3, revenue: '' }
];

export const mockAIResponse = {
  answer: 'Revenue increased primarily due to stronger performance in Electronics and the South region.',
  evidence: [
    'Electronics revenue increased by 15% to ,420',
    'South region showed positive growth of 15.2%'
  ]
};
