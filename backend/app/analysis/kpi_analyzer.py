import pandas as pd

def calculate_kpis(df: pd.DataFrame, mapping: dict) -> dict:
    if not mapping.get('revenue'):
        return {
            "total_revenue": 0.0,
            "total_orders": len(df),
            "average_order_value": 0.0,
            "revenue_growth": None
        }
        
    rev_col = mapping['revenue']
    total_revenue = float(df[rev_col].sum())
    total_orders = len(df)
    aov = total_revenue / total_orders if total_orders > 0 else 0.0
    
    growth = None
    if mapping.get('date'):
        date_col = mapping['date']
        # Ensure we have valid dates
        valid_dates = df.dropna(subset=[date_col])
        if not valid_dates.empty:
            # Sort by date
            valid_dates = valid_dates.sort_values(date_col)
            # Find the latest date
            latest = valid_dates[date_col].max()
            
            # Simple month-over-month if spanning multiple months
            # Or just split dataset in half chronologically if short
            # Let's do a simple chronological split for generic robust growth calculation
            midpoint = len(valid_dates) // 2
            if midpoint > 0:
                first_half = valid_dates.iloc[:midpoint]
                second_half = valid_dates.iloc[midpoint:]
                
                rev_first = first_half[rev_col].sum()
                rev_second = second_half[rev_col].sum()
                
                if rev_first > 0:
                    growth = ((rev_second - rev_first) / rev_first) * 100
                    
    return {
        "total_revenue": round(total_revenue, 2),
        "total_orders": total_orders,
        "average_order_value": round(aov, 2),
        "revenue_growth": round(growth, 1) if growth is not None else None
    }
