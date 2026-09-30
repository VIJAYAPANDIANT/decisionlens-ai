import pandas as pd

def analyze_region(df: pd.DataFrame, mapping: dict) -> list:
    if not mapping.get('region') or not mapping.get('revenue'):
        return []
        
    reg_col = mapping['region']
    rev_col = mapping['revenue']
    
    total_rev = df[rev_col].sum()
    if total_rev == 0:
        return []
        
    grouped = df.groupby(reg_col).agg(
        revenue=(rev_col, 'sum'),
        orders=(rev_col, 'count')
    ).reset_index()
    
    grouped['percentage'] = (grouped['revenue'] / total_rev) * 100
    grouped = grouped.sort_values('revenue', ascending=False)
    
    result = []
    # To compute growth per region, we need date. If date is available, we do the same chronological split per region
    growth_dict = {}
    if mapping.get('date'):
        date_col = mapping['date']
        valid_dates = df.dropna(subset=[date_col, rev_col])
        if not valid_dates.empty:
            valid_dates = valid_dates.sort_values(date_col)
            midpoint = len(valid_dates) // 2
            if midpoint > 0:
                first_half = valid_dates.iloc[:midpoint]
                second_half = valid_dates.iloc[midpoint:]
                
                fh_reg = first_half.groupby(reg_col)[rev_col].sum()
                sh_reg = second_half.groupby(reg_col)[rev_col].sum()
                
                for r in grouped[reg_col]:
                    rev_first = fh_reg.get(r, 0)
                    rev_second = sh_reg.get(r, 0)
                    if rev_first > 0:
                        growth_dict[r] = ((rev_second - rev_first) / rev_first) * 100
                    else:
                        growth_dict[r] = 0.0

    for _, row in grouped.iterrows():
        reg = str(row[reg_col])
        result.append({
            "region": reg,
            "revenue": round(float(row['revenue']), 2),
            "percentage": round(float(row['percentage']), 1),
            "orders": int(row['orders']),
            "growth": round(growth_dict.get(reg, 0.0), 1)
        })
        
    return result
