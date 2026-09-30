import pandas as pd

def analyze_category(df: pd.DataFrame, mapping: dict) -> list:
    if not mapping.get('category') or not mapping.get('revenue'):
        return []
        
    cat_col = mapping['category']
    rev_col = mapping['revenue']
    
    total_rev = df[rev_col].sum()
    if total_rev == 0:
        return []
        
    grouped = df.groupby(cat_col).agg(
        revenue=(rev_col, 'sum'),
        orders=(rev_col, 'count')
    ).reset_index()
    
    grouped['percentage'] = (grouped['revenue'] / total_rev) * 100
    grouped = grouped.sort_values('revenue', ascending=False)
    
    result = []
    for _, row in grouped.iterrows():
        result.append({
            "category": str(row[cat_col]),
            "revenue": round(float(row['revenue']), 2),
            "percentage": round(float(row['percentage']), 1),
            "orders": int(row['orders'])
        })
        
    return result
