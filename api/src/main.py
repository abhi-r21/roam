from fastapi import FastAPI
from pydantic import BaseModel

from src.agents.orchestrator import orchestrator
from src.state.yuvly_state import State

app = FastAPI(title="Yuvly Backend")

class QueryRequest(BaseModel):
    query: str


@app.get("/health")
def health():
    return { "status" : "OK" }

@app.post("/chat")
def chat(request: QueryRequest):
    result = orchestrator.invoke(
        State(messages=[request.query], tasks=None)
    )
    return {"tasks": result["tasks"]}