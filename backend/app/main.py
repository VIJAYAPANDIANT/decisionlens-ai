from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

from .routes.analysis import router as analysis_router
from .routes.ask import router as ask_router

import os

app = FastAPI(title="DecisionLens AI API")

# Default to localhost for development, allow override for production
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
origins = [frontend_url]
# Allow specific deployed frontend domains if comma separated
if "," in frontend_url:
    origins = [url.strip() for url in frontend_url.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
