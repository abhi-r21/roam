"""
Classify Node takes the User Query and classifies
them into list of tasks that should be performed by
the sub-agents.
"""

import os
from typing import List
from dotenv import load_dotenv

from src.ai.config import AVAILABLE_AGENTS
from src.ai.state import State, Task
from pydantic import BaseModel, Field
from langchain.chat_models import init_chat_model

load_dotenv()


# Shape of the output produced by the Classify Node
class Classify(BaseModel):
    tasks: List[Task] = Field(
        description="List of tasks, each assigned with a sub-agent"
    )


# Use base model here, or maybe pro
model = os.getenv('AI_MODEL', 'google_genai:gemini-3.6-flash')

llm = init_chat_model(model=model).with_structured_output(Classify)

# Helper fn
def format_agent_roster(agents: dict) -> str:
    return "\n".join(f"- {name}: {desc}" for name, desc in agents.items())


def classify(state: State) -> State:
    query = state.query

    agent_roster = format_agent_roster(AVAILABLE_AGENTS)
    valid_agent_names = ", ".join(AVAILABLE_AGENTS.keys())

    classify_prompt = f"""You are the task classifier for Yuvly, an AI travel buddy that plans and books travel directly — for individual 
        consumers and for businesses autopiloting company travel — with no travel agency middleman.

        Break the user's query into an ordered list of tasks needed to fulfill it. Each task must be assigned to exactly one of the following sub-agents:

        {agent_roster}

        Rules:
        - agent_assigned must be one of: {valid_agent_names}. Never invent a new agent name.
        - Order tasks the way they'd actually need to happen — search before booking, booking before scheduling.
        - Only include booking_agent if the user clearly wants something purchased/reserved now, not just researched or compared.
        - If the query is already specific enough to book directly (exact flight, exact hotel, exact dates), you may skip straight to booking_agent without a search task.
        - Keep each task description specific enough for the sub-agent to act on without re-reading the original query — include destination, dates, and any other constraints inline.
        - Do not invent tasks the query didn't ask for. Don't add a scheduling task if the user didn't ask to build or change an itinerary.

        User query: {query}
    """

    response = llm.invoke(classify_prompt)

    if isinstance(response, Classify):
        state.tasks = response.tasks
    elif isinstance(response, dict):
        state.tasks = response.get("tasks")

    return state

