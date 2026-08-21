from fastapi import FastAPI
from langchain_core.messages import HumanMessage
from pydantic import BaseModel


# pyrefly: ignore [missing-import]
from src.ai.agents.yuvly import yuvly_agent

app = FastAPI(title="Yuvly Backend")

class QueryRequest(BaseModel):
    query: str


@app.get("/health")
def health():
    return { "status" : "OK" }

@app.post("/chat")
def chat(request: QueryRequest):
    messages = [HumanMessage(content=request.query)]
    result = yuvly_agent.invoke({ "messages": messages })

    last_message = result["messages"][-1]
    return { "response": last_message.content }
