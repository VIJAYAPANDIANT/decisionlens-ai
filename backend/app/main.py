from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import math
from dotenv import load_dotenv
import os
from app.services.gemini_service import ask_business_question, AskRequest

load_dotenv()

app = FastAPI(title="DecisionLens AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "DecisionLens AI"
    }

def find_column(columns, keywords):
    columns_lower = [str(c).lower() for c in columns]
    for keyword in keywords:
        for idx, col in enumerate(columns_lower):
            if keyword in col:
                return columns[idx]
    return None

@app.post("/api/analyze")
async def analyze_csv(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a CSV file.")
    
    contents = await file.read()
    if not contents:
        raise HTTPException(status_code=400, detail="Empty file uploaded.")
        
    try:
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading CSV: {str(e)}")
        
    if df.empty:
        raise HTTPException(status_code=400, detail="The CSV file is empty.")

    columns = list(df.columns)
    
    rev_col = find_column(columns, ['revenue', 'sales', 'amount', 'total'])
    qty_col = find_column(columns, ['quantity', 'qty', 'units'])
    date_col = find_column(columns, ['date', 'time', 'month', 'year'])
    cat_col = find_column(columns, ['category', 'segment', 'type', 'department'])
    prod_col = find_column(columns, ['product', 'item', 'name'])
    
    missing_vals = int(df.isnull().sum().sum())
    dup_rows = int(df.duplicated().sum())
    
    total_revenue = 0
    total_orders = len(df)
    average_order_value = 0
    growth_percentage = 0
    
    if rev_col and pd.api.types.is_numeric_dtype(df[rev_col]):
        total_revenue = float(df[rev_col].sum())
        if total_orders > 0:
            average_order_value = float(total_revenue / total_orders)
            
    revenue_trend = []
    if rev_col and date_col:
        try:
            df[date_col] = pd.to_datetime(df[date_col], errors='coerce')
            trend_df = df.dropna(subset=[date_col, rev_col])
            if not trend_df.empty:
                trend_df['month_year'] = trend_df[date_col].dt.strftime('%b %Y')
                monthly = trend_df.groupby('month_year')[rev_col].sum().reset_index()
                monthly['date_sort'] = pd.to_datetime(monthly['month_year'])
                monthly = monthly.sort_values('date_sort')
                
                revenue_trend = [{"name": row['month_year'], "revenue": float(row[rev_col])} for _, row in monthly.iterrows()]
                
                if len(revenue_trend) >= 2:
                    last = revenue_trend[-1]['revenue']
                    prev = revenue_trend[-2]['revenue']
                    if prev > 0:
                        growth_percentage = ((last - prev) / prev) * 100
        except Exception:
            pass 

    category_analysis = []
    if cat_col and rev_col:
        cat_df = df.groupby(cat_col)[rev_col].sum().reset_index()
        cat_df = cat_df.sort_values(rev_col, ascending=False).head(5)
        category_analysis = [{"category": str(row[cat_col]), "sales": float(row[rev_col])} for _, row in cat_df.iterrows()]
        
    top_products = []
    if prod_col and rev_col:
        prod_df = df.groupby(prod_col)[rev_col].sum().reset_index()
        prod_df = prod_df.sort_values(rev_col, ascending=False).head(5)
        top_products = [{"product": str(row[prod_col]), "sales": float(row[rev_col])} for _, row in prod_df.iterrows()]
        
    insights = []
    
    # 1. Revenue Trend Insight
    if len(revenue_trend) >= 2:
        last_item = revenue_trend[-1]
        prev_item = revenue_trend[-2]
        
        if growth_percentage < 0:
            insights.append({
                "severity": "high",
                "title": "Revenue Decline",
                "description": f"Revenue decreased by {abs(growth_percentage):.1f}% in the most recent period.",
                "evidence": [
                    {"label": f"Previous Revenue ({prev_item['name']})", "value": f"₹{prev_item['revenue']:,.0f}", "source": "Calculated from uploaded dataset (Pandas aggregation)"},
                    {"label": f"Current Revenue ({last_item['name']})", "value": f"₹{last_item['revenue']:,.0f}", "source": "Calculated from uploaded dataset (Pandas aggregation)"},
                    {"label": "Change", "value": f"{growth_percentage:.1f}%", "source": "Calculated metric"}
                ],
                "recommendation": "Investigate underperforming products and consider running promotional campaigns to stimulate sales."
            })
        elif growth_percentage > 0:
            insights.append({
                "severity": "low",
                "title": "Revenue Growth",
                "description": f"Revenue grew by {growth_percentage:.1f}% in the most recent period.",
                "evidence": [
                    {"label": f"Previous Revenue ({prev_item['name']})", "value": f"₹{prev_item['revenue']:,.0f}", "source": "Calculated from uploaded dataset (Pandas aggregation)"},
                    {"label": f"Current Revenue ({last_item['name']})", "value": f"₹{last_item['revenue']:,.0f}", "source": "Calculated from uploaded dataset (Pandas aggregation)"},
                    {"label": "Change", "value": f"+{growth_percentage:.1f}%", "source": "Calculated metric"}
                ],
                "recommendation": "Identify which channels drove this growth and allocate more budget to them."
            })
            
    # 2. Data Quality Insight
    if missing_vals > 0:
        insights.append({
            "severity": "medium",
            "title": "Data Quality Issue",
            "description": "Found missing values in the dataset which may affect analysis accuracy.",
            "evidence": [
                {"label": "Total Missing Values", "value": str(missing_vals), "source": "Pandas isnull() detection"},
                {"label": "Total Rows", "value": str(len(df)), "source": "Dataset row count"}
            ],
            "recommendation": "Review the source data and clean missing entries before finalizing reports."
        })
        
    # 3. Top Category Insight
    if category_analysis:
        top_cat = category_analysis[0]
        insights.append({
            "severity": "low",
            "title": "Top Performing Category",
            "description": f"{top_cat['category']} generated the highest revenue.",
            "evidence": [
                {"label": "Category", "value": top_cat['category'], "source": "Pandas category grouping"},
                {"label": "Revenue Generated", "value": f"₹{top_cat['sales']:,.0f}", "source": "Pandas sum aggregation"}
            ],
            "recommendation": "Ensure adequate inventory for this category and feature it prominently in marketing."
        })

    def clean_floats(obj):
        if isinstance(obj, float):
            return 0 if math.isnan(obj) else obj
        if isinstance(obj, dict):
            return {k: clean_floats(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [clean_floats(i) for i in obj]
        return obj

    response_data = {
        "dataset": {
            "filename": file.filename,
            "rows": len(df),
            "columns": len(columns),
            "column_names": columns
        },
        "data_quality": {
            "missing_values": missing_vals,
            "duplicate_rows": dup_rows
        },
        "kpis": {
            "total_revenue": total_revenue,
            "total_orders": total_orders,
            "average_order_value": average_order_value,
            "growth_percentage": round(growth_percentage, 1)
        },
        "category_analysis": category_analysis or [{"category": "All", "sales": total_revenue}],
        "top_products": top_products,
        "revenue_trend": revenue_trend or [{"name": "Overall", "revenue": total_revenue}],
        "insights": insights
    }
    
    return clean_floats(response_data)

@app.post("/api/ask")
def ask_gemini(request: AskRequest):
    try:
        return ask_business_question(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
