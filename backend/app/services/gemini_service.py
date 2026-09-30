import os
import json
import google.generativeai as genai
from pydantic import BaseModel, Field
from typing import List

class AskRequest(BaseModel):
    question: str = Field(..., max_length=1000, min_length=1)

def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
    genai.configure(api_key=api_key)
    # Use flash model for fast reasoning, configurable
    model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    return genai.GenerativeModel(model_name)

def generate_business_answer(question: str, context: dict) -> dict:
    model = get_gemini_client()
    if not model:
        raise ValueError("AI_NOT_CONFIGURED")
        
    # Simplify context to avoid token bloat
    safe_context = {
        'kpis': context.get('kpis', {}),
        'revenue_trend': context.get('revenue_trend', []),
        'top_categories': context.get('category_performance', [])[:5],
        'top_products': context.get('product_performance', [])[:5],
        'regional_performance': context.get('regional_performance', []),
        'deterministic_insights': [i['title'] + ': ' + i['description'] for i in context.get('insights', [])]
    }
    
    system_instruction = """
You are DecisionLens AI, a business decision intelligence assistant.
You must answer only using the verified business analysis provided in the context.
The numerical analysis was calculated by Pandas/NumPy and must be treated as authoritative.

Do not invent, estimate, alter, or hallucinate business metrics.
If the requested information is not available in the supplied analysis, explicitly say that the available dataset does not provide enough evidence.

When making a business observation:
1. State the observation.
2. Cite the relevant evidence from the supplied analysis.
3. Explain the likely interpretation without presenting unsupported assumptions as facts.
4. Provide a practical recommendation only when supported by the available evidence.
5. Clearly distinguish facts from assumptions.

Never claim that a recommendation is guaranteed to improve business performance.
Never invent missing data.

Return ONLY a valid JSON object with exactly this structure:
{
  "answer": "Detailed explanation...",
  "evidence": [
    {"label": "Metric Name", "value": "Metric Value"}
  ],
  "recommendations": ["Actionable advice..."],
  "limitations": ["Data caveats..."]
}
"""
    
    prompt = f"""{system_instruction}

VERIFIED BUSINESS ANALYSIS:
{json.dumps(safe_context, indent=2)}

USER QUESTION:
{question}
"""
    
    try:
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                temperature=0.1
            )
        )
        result = json.loads(response.text)
        return {
            "success": True,
            "answer": result.get("answer", ""),
            "evidence": result.get("evidence", []),
            "recommendations": result.get("recommendations", []),
            "limitations": result.get("limitations", [])
        }
    except Exception as e:
        return {
            "success": False,
            "error": {
                "code": "AI_SERVICE_ERROR",
                "message": "AI assistance is temporarily unavailable."
            }
        }
