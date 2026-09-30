def generate_insights(kpis: dict, categories: list, regions: list, products: list, quality: dict = None) -> list:
    insights = []
    
    # Data Quality Insight
    if quality and (quality.get('missing_values', 0) > 0 or quality.get('duplicate_rows', 0) > 0 or quality.get('data_quality_score', 100) < 95):
        score = quality.get('data_quality_score', 100)
        sev = "warning" if score > 80 else "risk"
        insights.append({
            "id": "insight-quality",
            "type": "data_quality",
            "title": "Data Quality Warning",
            "description": "The uploaded dataset contains missing or duplicate records that may affect some analysis.",
            "severity": sev,
            "confidence": "high",
            "evidence": [
                {"label": "Missing Values", "value": str(quality.get('missing_values', 0))},
                {"label": "Duplicate Rows", "value": str(quality.get('duplicate_rows', 0))},
                {"label": "Quality Score", "value": f"{score}%"}
            ],
            "source": {
                "analysis": "data_quality",
                "field": "score"
            },
            "recommendation": "Review incomplete or duplicate records before using the analysis for important decisions."
        })

    # Revenue Growth Insight
    growth = kpis.get('revenue_growth')
    if growth is not None:
        severity = 'positive' if growth >= 0 else 'warning'
        direction = 'increased' if growth >= 0 else 'decreased'
        current = kpis.get('total_revenue', 0)
        prev = current / (1 + (growth / 100)) if growth != -100 else 0
        
        insights.append({
            "id": "insight-growth",
            "type": "revenue_growth" if growth >= 0 else "revenue_decline",
            "title": "Revenue Growth",
            "description": f"Revenue {direction} by {abs(growth)}% compared with the previous period.",
            "severity": severity,
            "confidence": "medium", # Chronological split is an estimate
            "evidence": [
                {"label": "Revenue Change", "value": f"{'+' if growth >=0 else ''}{growth}%"},
                {"label": "Current Period", "value": f"${current:,.2f}"},
                {"label": "Previous Period", "value": f"${prev:,.2f}"}
            ],
            "source": {
                "analysis": "kpis",
                "field": "revenue_growth"
            },
            "recommendation": "Investigate the underlying drivers of this trend across categories and regions."
        })
        
    # Top Category
    if categories:
        top_cat = categories[0]
        insights.append({
            "id": "insight-top-category",
            "type": "category_performance",
            "title": "Top Performing Category",
            "description": f"{top_cat['category']} generated the highest revenue among available categories.",
            "severity": "positive",
            "confidence": "high",
            "evidence": [
                {"label": "Category", "value": top_cat['category']},
                {"label": "Revenue", "value": f"${top_cat['revenue']:,.2f}"},
                {"label": "Revenue Share", "value": f"{top_cat['percentage']}%"},
                {"label": "Orders", "value": str(top_cat['orders'])}
            ],
            "source": {
                "analysis": "category_performance",
                "field": "revenue"
            },
            "recommendation": "Review the products and customer activity contributing to this category's performance."
        })
        
    # Lowest Region
    if regions and len(regions) > 1:
        lowest_reg = regions[-1]
        # Only flag as warning if it's significantly lower than average, otherwise neutral
        avg_share = 100 / len(regions)
        sev = "warning" if lowest_reg['percentage'] < (avg_share * 0.5) else "neutral"
        insights.append({
            "id": "insight-lowest-region",
            "type": "regional_performance",
            "title": "Regional Performance Lag",
            "description": f"{lowest_reg['region']} generated the lowest revenue among available regions.",
            "severity": sev,
            "confidence": "high",
            "evidence": [
                {"label": "Region", "value": lowest_reg['region']},
                {"label": "Revenue", "value": f"${lowest_reg['revenue']:,.2f}"},
                {"label": "Revenue Share", "value": f"{lowest_reg['percentage']}%"},
                {"label": "Orders", "value": str(lowest_reg['orders'])}
            ],
            "source": {
                "analysis": "regional_performance",
                "field": "revenue"
            },
            "recommendation": "Analyze regional factors and consider targeted marketing or resource reallocation."
        })
        
    # Top Product
    if products:
        top_prod = products[0]
        insights.append({
            "id": "insight-top-product",
            "type": "product_performance",
            "title": "Top Performing Product",
            "description": f"{top_prod['product']} generated the highest revenue among products.",
            "severity": "positive",
            "confidence": "high",
            "evidence": [
                {"label": "Product", "value": top_prod['product']},
                {"label": "Revenue", "value": f"${top_prod['revenue']:,.2f}"},
                {"label": "Orders", "value": str(top_prod['orders'])}
            ],
            "source": {
                "analysis": "product_performance",
                "field": "revenue"
            },
            "recommendation": "Ensure adequate stock levels and consider cross-selling opportunities."
        })
        
    return insights
