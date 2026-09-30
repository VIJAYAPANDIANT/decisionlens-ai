from fastapi import APIRouter, UploadFile, File
from ..analysis.data_loader import load_csv
from ..analysis.column_detector import detect_columns
from ..analysis.data_cleaner import clean_data
from ..analysis.kpi_analyzer import calculate_kpis
from ..analysis.trend_analyzer import analyze_trend
from ..analysis.category_analyzer import analyze_category
from ..analysis.product_analyzer import analyze_product
from ..analysis.regional_analyzer import analyze_region
from ..analysis.insight_generator import generate_insights
from ..utils.errors import raise_invalid_csv
import numpy as np

router = APIRouter()

@router.post("/api/analyze")
async def analyze_dataset(file: UploadFile = File(...)):
    # 1. Load CSV
    df = await load_csv(file)
    
    # 2. Detect Columns
    mapping = detect_columns(df)
    
    # Check if revenue exists
    if not mapping.get('revenue'):
        raise_invalid_csv("No revenue or sales column was detected. Please upload a business dataset containing revenue or sales information.")
        
    # 3. Clean Data & Get Quality
    df, quality = clean_data(df, mapping)
    
    if df.empty:
        raise_invalid_csv("After cleaning, no valid rows remained for analysis.")
        
    # 4. Calculate KPIs
    kpis = calculate_kpis(df, mapping)
    
    # 5. Calculate Breakdowns
    trends = analyze_trend(df, mapping)
    categories = analyze_category(df, mapping)
    products = analyze_product(df, mapping)
    regions = analyze_region(df, mapping)
    
    # 6. Generate Insights
    insights = generate_insights(kpis, categories, regions, products)
    
    # 7. Generate Preview
    # Convert NaNs to None for JSON serialization
    preview_df = df.head(10).replace({np.nan: None})
    
    # Format preview dates to string if they are timestamps
    if mapping.get('date'):
        date_col = mapping['date']
        preview_df[date_col] = preview_df[date_col].dt.strftime('%Y-%m-%d')
        
    preview = preview_df.to_dict(orient='records')
    
    return {
        "success": True,
        "dataset": {
            "filename": file.filename,
            "rows": len(df),
            "columns": len(df.columns)
        },
        "column_mapping": mapping,
        "data_quality": quality,
        "kpis": kpis,
        "revenue_trend": trends,
        "category_performance": categories,
        "product_performance": products,
        "regional_performance": regions,
        "customer_performance": [], # Customer not fully implemented in mock
        "insights": insights,
        "preview": preview
    }
