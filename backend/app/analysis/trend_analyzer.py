import pandas as pd

def analyze_trend(df: pd.DataFrame, mapping: dict) -> list:
    if not mapping.get('date') or not mapping.get('revenue'):
        return []
        
    date_col = mapping['date']
    rev_col = mapping['revenue']
    
    valid_df = df.dropna(subset=[date_col, rev_col]).copy()
    if valid_df.empty:
        return []
        
    # Format to YYYY-MM
    valid_df['period'] = valid_df[date_col].dt.strftime('%Y-%m')
    
    trend = valid_df.groupby('period')[rev_col].sum().reset_index()
    trend = trend.sort_values('period')
    
    result = []
    # Convert 'YYYY-MM' back to short month names for display if preferred, or keep as is.
    # We will use short month name if year is same, else YYYY-MM
    for _, row in trend.iterrows():
        result.append({
            "name": pd.to_datetime(row['period']).strftime('%b %Y'),
            "revenue": round(float(row[rev_col]), 2)
        })
        
    return result
