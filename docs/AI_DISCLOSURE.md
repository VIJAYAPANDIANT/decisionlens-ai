# AI Tools Disclosure

## Development
AI-assisted development tools were used during implementation. Specifically, an autonomous coding agent (Antigravity) was used to assist with project scaffolding, component styling, Pandas logic, and environment configuration.

## Product Features
The **Google Gemini API** is used for grounded business-data question answering and recommendations.

### Important Architecture Distinction
DecisionLens AI enforces a strict architectural boundary to prevent LLM hallucinations:

```
Pandas/NumPy (Deterministic Backend)
    ↓
Verified Business Analysis (Numerical Truth)
    ↓
Compact Analysis Context (JSON Payload)
    ↓
Gemini (LLM)
    ↓
Explanation / Recommendation
```

**Gemini does NOT serve as the numerical source of truth.** It is used strictly as an explanation engine that cites the verified math calculated by Python.
