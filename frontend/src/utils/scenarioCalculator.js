export function calculateRevenueScenario(currentRevenue, percentage) {
  if (currentRevenue === null || currentRevenue === undefined) return null;
  
  // Clamp percentage between -20 and 50
  const safePercentage = Math.max(-20, Math.min(50, Number(percentage) || 0));
  
  const projectedRevenue = currentRevenue * (1 + safePercentage / 100);
  const estimatedChange = projectedRevenue - currentRevenue;

  return {
    currentRevenue,
    percentage: safePercentage,
    projectedRevenue,
    estimatedChange
  };
}
