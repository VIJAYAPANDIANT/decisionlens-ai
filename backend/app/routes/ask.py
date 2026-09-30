from fastapi import APIRouter
from ..services.gemini_service import AskRequest, generate_business_answer

router = APIRouter()

# In-memory store for MVP session context
_session_store = {}

def update_session_context(context: dict):
    _session_store['latest_analysis'] = context

@router.post("/api/ask")
async def ask_ai(request: AskRequest):
    context = _session_store.get('latest_analysis')
    
    if not context:
        return {
            "success": False,
            "error": {
                "code": "NO_DATASET",
                "message": "Upload a business dataset before asking DecisionLens AI questions."
            }
        }
        
    try:
        response = generate_business_answer(request.question, context)
        return response
    except ValueError as e:
        if str(e) == "AI_NOT_CONFIGURED":
            return {
                "success": False,
                "error": {
                    "code": "AI_NOT_CONFIGURED",
                    "message": "AI assistance is not configured."
                }
            }
        return {
            "success": False,
            "error": {
                "code": "AI_SERVICE_ERROR",
                "message": "AI assistance is temporarily unavailable."
            }
        }
