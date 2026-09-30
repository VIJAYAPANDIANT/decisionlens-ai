def generate_insights(kpis: dict, categories: list, regions: list, products: list) -> list:
    insights = []
    
    # 1. Revenue Growth Insight
    growth = kpis.get('revenue_growth')
    if growth is not None:
        severity = 'positive' if growth >= 0 else 'negative'
        direction = 'increased' if growth >= 0 else 'decreased'
        impact = 'High' if abs(growth) > 10 else 'Medium' if abs(growth) > 5 else 'Low'
        
        # Calculate theoretical previous revenue based on growth formula
        # growth = (current - prev) / prev  =>  prev = current / (1 + growth)
        current = kpis['total_revenue']
        prev = current / (1 + (growth / 100)) if growth != -100 else 0
        
        insights.append({
            "id": "insight-growth",
            "type": "revenue_growth",
            "title": "Revenue Growth",
            "description": f"Revenue {direction} by {abs(growth)}% compared with the previous period.",
            "severity": severity,
            "impact": impact,
            "source": "Period-over-period chronological split",
            "evidence": {
                "label": "Revenue Change",
                "value": f"{'+' if growth >=0 else ''}{growth}%",
                "current_revenue": round(current, 2),
                "previous_revenue": round(prev, 2)
            }
        })
        
    # 2. Top Category
    if categories:
        top_cat = categories[0]
        insights.append({
            "id": "insight-top-category",
            "type": "category_performance",
            "title": "Top Performing Category",
            "description": f"{top_cat['category']} generated the highest revenue among categories.",
            "severity": "positive",
            "impact": "High",
            "source": "Grouped sum by Category",
            "evidence": {
                "label": f"{top_cat['category']} Revenue",
                "value": f"${top_cat['revenue']:,.2f}",
                "percentage": top_cat['percentage']
            }
        })
        
    # 3. Lowest Region
    if regions and len(regions) > 1:
        lowest_reg = regions[-1]
        insights.append({
            "id": "insight-lowest-region",
            "type": "regional_performance",
            "title": "Regional Risk",
            "description": f"{lowest_reg['region']} generated the lowest revenue among available regions.",
            "severity": "negative",
            "impact": "Medium",
            "source": "Grouped sum by Region",
            "evidence": {
                "label": f"{lowest_reg['region']} Revenue",
                "value": f"${lowest_reg['revenue']:,.2f}",
                "percentage": lowest_reg['percentage']
            }
        })
        
    # 4. Top Product
    if products:
        top_prod = products[0]
        insights.append({
            "id": "insight-top-product",
            "type": "product_performance",
            "title": "Top Product",
            "description": f"{top_prod['product']} generated the highest revenue among products.",
            "severity": "positive",
            "impact": "High",
            "source": "Grouped sum by Product",
            "evidence": {
                "label": f"{top_prod['product']} Revenue",
                "value": f"${top_prod['revenue']:,.2f}"
            }
        })
        
    # For UI compatibility with previous mock format, remap evidence to list
    final_insights = []
    for ins in insights:
        ev_list = []
        ev_dict = ins['evidence']
        
        if 'label' in ev_dict and 'value' in ev_dict:
            ev_list.append({"label": ev_dict['label'], "value": ev_dict['value']})
        
        if 'current_revenue' in ev_dict and 'previous_revenue' in ev_dict:
            ev_list.append({"label": "Current Period", "value": f"${ev_dict['current_revenue']:,.2f}"})
            ev_list.append({"label": "Previous Period", "value": f"${ev_dict['previous_revenue']:,.2f}"})
            
        if 'percentage' in ev_dict:
            ev_list.append({"label": "Contribution", "value": f"{ev_dict['percentage']}%"})
            
        final_insights.append({
            "id": ins['id'],
            "title": ins['title'],
            "description": ins['description'],
            "evidence": ev_list,
            "source": ins['source'],
            "impact": ins['impact'],
            "recommendation": "Review these metrics to optimize future performance." # generic for now
        })
        
    return final_insights
