# DecisionLens AI

DecisionLens AI is an AI-powered business decision engine that allows users to upload business data (CSV/Excel), analyzes the data using deterministic Python calculations, generates traceable business insights, supports what-if scenarios, and provides AI-assisted explanations and recommendations.

## Tech Stack

**Frontend:**
React + Vite + Tailwind CSS + Recharts + Axios

**Backend:**
FastAPI + Pandas + NumPy

**AI:**
Google Gemini

## Project Structure

- `/frontend` - React application (Vite)
- `/backend` - FastAPI server and Pandas analysis
- `/sample-data` - Example business datasets for testing

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/VIJAYAPANDIANT/decisionlens-ai.git
cd decisionlens-ai
```

### 2. Configure GEMINI_API_KEY
Create a `.env` file in the backend directory:
```bash
cd backend
cp .env.example .env
```
Edit `.env` and add your Gemini API Key.

### 3. Start Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate # Mac/Linux
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### 4. Start Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.
The backend API and docs will run on `http://localhost:8000/docs`.
