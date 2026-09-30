import pandas as pd

def analyze_product(df: pd.DataFrame, mapping: dict) -> list:
    if not mapping.get('product') or not mapping.get('revenue'):
        return []
        
    prod_col = mapping['product']
    rev_col = mapping['revenue']
    
    grouped = df.groupby(prod_col).agg(
        revenue=(rev_col, 'sum'),
        orders=(rev_col, 'count')
    ).reset_index()
    
    grouped = grouped.sort_values('revenue', ascending=False).head(10)
    
    result = []
    for _, row in grouped.iterrows():
        result.append({
            "product": str(row[prod_col]),
            "revenue": round(float(row['revenue']), 2),
            "orders": int(row['orders'])
        })
        
    return result
