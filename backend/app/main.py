from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.analysis import router as analysis_router

app = FastAPI(title="DecisionLens AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router)

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "DecisionLens AI"
    }
