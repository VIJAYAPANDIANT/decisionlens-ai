import pandas as pd
from typing import Tuple

def clean_data(df: pd.DataFrame, mapping: dict) -> Tuple[pd.DataFrame, dict]:
    original_rows = len(df)
    
    # Remove completely empty rows
    df = df.dropna(how='all')
    
    # Calculate quality metrics before further cleaning
    missing_values = int(df.isna().sum().sum())
    duplicate_rows = int(df.duplicated().sum())
    
    # Clean up columns based on mapping
    if mapping.get('revenue'):
        rev_col = mapping['revenue']
        if df[rev_col].dtype == object:
            df[rev_col] = df[rev_col].astype(str).str.replace(r'[$,]', '', regex=True)
        df[rev_col] = pd.to_numeric(df[rev_col], errors='coerce')
        df = df.dropna(subset=[rev_col])
        
    if mapping.get('date'):
        date_col = mapping['date']
        df[date_col] = pd.to_datetime(df[date_col], errors='coerce')
        
    if mapping.get('quantity'):
        qty_col = mapping['quantity']
        df[qty_col] = pd.to_numeric(df[qty_col], errors='coerce').fillna(1)
        
    final_rows = len(df)
    
    # Simple deterministic score
    score = 100.0
    if original_rows > 0:
        score -= (missing_values / (original_rows * len(df.columns))) * 50
        score -= (duplicate_rows / original_rows) * 20
        score -= ((original_rows - final_rows) / original_rows) * 30
        
    score = max(0.0, min(100.0, score))
    
    quality = {
        "missing_values": missing_values,
        "duplicate_rows": duplicate_rows,
        "data_quality_score": round(score, 1)
    }
    
    return df, quality
