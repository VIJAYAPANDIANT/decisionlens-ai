import os
import json
import google.generativeai as genai
from pydantic import BaseModel
from typing import Dict, Any

class AskRequest(BaseModel):
    question: str
    analysis: Dict[str, Any]

def configure_gemini():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set in environment variables.")
    genai.configure(api_key=api_key)

def ask_business_question(request: AskRequest):
    configure_gemini()
    
    system_instruction = """You are a business data analysis assistant.
Use only the supplied verified analysis data.
Do not invent numbers, facts, causes, or sources.
If the supplied data does not support a conclusion, clearly say that there is insufficient evidence.
Every important numerical statement must come from the supplied analysis.
Separate observed facts from possible explanations.
Provide practical recommendations based on the available evidence.

You must respond exactly with a JSON object containing these keys:
"answer": string (A clear explanation answering the question)
"evidence": array of strings (Facts from the data supporting the answer)
"recommendations": array of strings (Actionable recommendations)
"limitations": array of strings (What is unknown or missing)
"""

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=system_instruction,
        generation_config={"response_mime_type": "application/json"}
    )
    
    prompt = f"Verified Analysis Context:\n{json.dumps(request.analysis, indent=2)}\n\nQuestion: {request.question}"
    
    try:
        response = model.generate_content(prompt)
        result = json.loads(response.text)
        return result
    except Exception as e:
        raise Exception(f"Gemini API error: {str(e)}")
