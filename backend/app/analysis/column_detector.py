import pandas as pd

def detect_columns(df: pd.DataFrame) -> dict:
    mapping = {}
    
    candidates = {
        'date': ['date', 'order_date', 'transaction_date', 'purchase_date'],
        'revenue': ['revenue', 'sales', 'sales_amount', 'total_sales', 'amount', 'total_amount'],
        'quantity': ['quantity', 'qty', 'units', 'units_sold'],
        'product': ['product', 'product_name', 'item', 'item_name'],
        'category': ['category', 'product_category', 'type'],
        'region': ['region', 'area', 'territory', 'location'],
        'customer_type': ['customer_type', 'customer_segment', 'segment']
    }
    
    for key, cands in candidates.items():
        found = None
        for cand in cands:
            for col in df.columns:
                if cand == str(col).lower().strip():
                    found = col
                    break
            if found:
                break
        mapping[key] = found
        
    return mapping
