from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class DatasetInfo(BaseModel):
    filename: str
    rows: int
    columns: int

class ColumnMapping(BaseModel):
    date: Optional[str] = None
    revenue: Optional[str] = None
    quantity: Optional[str] = None
    product: Optional[str] = None
    category: Optional[str] = None
    region: Optional[str] = None
    customer_type: Optional[str] = None

class DataQuality(BaseModel):
    missing_values: int
    duplicate_rows: int
    data_quality_score: float

class KPIs(BaseModel):
    total_revenue: float
    total_orders: int
    average_order_value: float
    revenue_growth: Optional[float] = None

class InsightEvidence(BaseModel):
    category: Optional[str] = None
    region: Optional[str] = None
    product: Optional[str] = None
    revenue: Optional[float] = None
    percentage: Optional[float] = None
    current_revenue: Optional[float] = None
    previous_revenue: Optional[float] = None
    change_percentage: Optional[float] = None

class Insight(BaseModel):
    id: str
    type: str
    title: str
    description: str
    severity: str
    evidence: InsightEvidence

class AnalysisResponse(BaseModel):
    success: bool
    dataset: DatasetInfo
    column_mapping: ColumnMapping
    data_quality: DataQuality
    kpis: KPIs
    revenue_trend: List[Dict[str, Any]]
    category_performance: List[Dict[str, Any]]
    product_performance: List[Dict[str, Any]]
    regional_performance: List[Dict[str, Any]]
    customer_performance: List[Dict[str, Any]]
    insights: List[Insight]
    preview: List[Dict[str, Any]]
