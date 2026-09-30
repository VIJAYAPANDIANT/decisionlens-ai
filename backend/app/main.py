from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

from .routes.analysis import router as analysis_router
from .routes.ask import router as ask_router

app = FastAPI(title="DecisionLens AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router)
app.include_router(ask_router)

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "DecisionLens AI"
    }
