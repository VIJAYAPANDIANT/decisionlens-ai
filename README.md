# DecisionLens AI

**An AI decision engine that transforms business data into traceable insights, scenario analysis, and actionable recommendations.**

## 1. Problem
Business leaders are often overwhelmed by raw data in spreadsheets. It takes too much time to calculate key performance indicators (KPIs), identify meaningful trends, and translate those numbers into actionable decisions. Relying purely on AI chat models to read spreadsheets directly often leads to hallucinations, where the AI invents data that doesn't exist, breaking trust in the system.

## 2. Solution
**DecisionLens AI** solves this by strictly separating deterministic data processing from AI explanation. The application uses Pandas/NumPy to calculate verified KPIs, trends, and deterministic insights. These verified calculations form a secure, traceable "context window" that grounds the Gemini AI model, allowing users to ask natural language questions and simulate business scenarios with absolute confidence in the underlying numbers.

## 3. Key Features
- **Instant Business Dashboards:** Upload a standard sales CSV and instantly view revenue, orders, AOV, and performance breakdowns.
- **Traceable Insights:** Deterministic backend rules generate insights with a transparent "evidence panel" showing exactly which data points support the claim.
- **Grounded AI Assistant:** Ask questions about your business. Google Gemini is provided only with the verified context, preventing hallucinated numbers.
- **What-If Simulator:** Model "what-if" revenue scenarios (e.g., +10% sales) using transparent, deterministic frontend mathematics.

## 4. How It Works
1. **Upload:** User uploads a `.csv` dataset.
2. **Analysis:** The FastAPI backend uses Pandas to clean the data, calculate KPIs, and generate evidence-backed insights.
3. **Review:** The React frontend visualizes the results on a beautiful SaaS-style dashboard.
4. **Chat & Simulate:** The user interacts with the AI Assistant to interpret the data, and uses the What-If Simulator to forecast scenario outcomes.

## 5. Architecture
```text
User
 |
 v
React + Vite Dashboard
 |
 v
FastAPI Backend
 |
 +----------------------+
 |                      |
 v                      v
Pandas / NumPy       Gemini API
 |                      |
 v                      |
Verified Analysis <-----+
 |
 +------------+
 |            |
 v            v
Insights    What-If
 |
 v
Evidence-backed Decisions
```

*Architecture Principle: Pandas/NumPy = numerical truth. Gemini = explanation and recommendations.*

## 6. Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Recharts, Axios, Lucide React
- **Backend:** Python, FastAPI, Pandas, NumPy, Uvicorn, Python-Dotenv
- **AI Integration:** Google Gemini API (`google-generativeai`)

## 7. Project Structure
```text
decisionlens-ai/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── .env.example
│
├── sample-data/
│   └── sales_data.csv
│
├── .gitignore
└── README.md
```

## 8. Local Setup

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- A Google Gemini API Key

### Clone the repository
```bash
git clone https://github.com/VIJAYAPANDIANT/decisionlens-ai.git
cd decisionlens-ai
```

## 9. Environment Variables
You need to configure the environment variables for both the frontend and backend.

**Frontend:**
```bash
cd frontend
cp .env.example .env
# Edit .env and set VITE_API_URL=http://localhost:8000
```

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env and set your GEMINI_API_KEY and FRONTEND_URL=http://localhost:5173
```

## 10. Running Frontend
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run at http://localhost:5173*

## 11. Running Backend
```bash
cd backend
# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
python -m uvicorn app.main:app --reload --port 8000
```
*The backend API will run at http://localhost:8000*

## 12. Sample Dataset
A fully compatible dataset is provided in `sample-data/sales_data.csv`. 
Use this dataset to test the complete DecisionLens AI workflow!

## 13. API Endpoints

### `GET /api/health`
- **Purpose:** Check if the backend is running.
- **Response:** `{"status": "ok", "service": "DecisionLens AI"}`

### `POST /api/analyze`
- **Purpose:** Uploads and analyzes a CSV file using Pandas.
- **Request:** `multipart/form-data` with a `file` field.
- **Response:** A comprehensive JSON object containing dataset shape, KPIs, data quality metrics, category/regional breakdowns, and deterministic insights.

### `POST /api/ask`
- **Purpose:** Ask the Gemini AI a question grounded in the current analysis context.
- **Request:** JSON `{"question": "Why did revenue change?"}`
- **Response:** A structured JSON object containing `answer`, `evidence`, `recommendations`, and `limitations`.
- **Error:** Returns `AI_NOT_CONFIGURED` if the Gemini API key is missing, ensuring graceful frontend fallback.

## 14. Gemini AI Architecture
Gemini is used strictly as an **Explanation Engine**. The prompt architecture provides Gemini with an extremely condensed, aggregated context object (the output of the Pandas analysis). Gemini is instructed to format its response strictly into JSON and cite evidence natively found in the context object. 

## 15. What-If Calculation
The What-If Simulator is completely deterministic and operates in the frontend. 
**Formula:** `Projected Revenue = Current Revenue × (1 + Sales Change / 100)`
It intentionally avoids complex ML forecasting to maintain maximum transparency and predictability for business leaders.

## 16. Deployment
The project is built to be easily deployed on standard PAAS providers.

**Frontend (Vercel/Netlify):**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Env Variable:** `VITE_API_URL` pointing to the deployed backend URL.

**Backend (Render/Railway):**
- **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Env Variables:** `GEMINI_API_KEY` and `FRONTEND_URL` pointing to the deployed frontend domain.

## 17. Testing
- **E2E:** Upload the sample CSV, verify KPIs appear, open the Evidence Panel for an insight, and chat with the AI Assistant.
- **Data Quality:** Try modifying the CSV to remove the `Revenue` column, or add empty rows, to see how the system gracefully handles and visualizes data quality warnings.

## 18. Hackathon Information
- **Hackathon:** Build Fast with AI 2026
- **Track:** PS-04 — AI Decision Engine for Business Data
- **Goal:** Create a business dashboard prioritizing verifiable data analysis over raw LLM hallucination.

## 19. AI Tools Disclosure
The following AI tools were utilized during the development of this project:
- **Antigravity:** Used as an autonomous coding agent to assist with scaffolding, component styling, Pandas logic, and environment configuration.
- **Google Gemini API:** Used as the core product AI functionality (the Grounded AI Assistant).

## 20. Team
- VIJAYAPANDIANT (Solo Developer / Antigravity assisted)
