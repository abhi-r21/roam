"""
Decompose Node:
Breaks the user's travel query from YuvlyState into an ordered list of
atomic tasks for sub-agents to execute.

Each Task has:
1. task: self-contained description with all needed context (origin, dates, etc.)
2. agent_assigned: sub-agent responsible (e.g. 'booking_agent')
3. task_type: 'parallel' (independent, can run concurrently) or 'sequential' (depends on prior tasks)
4. task_status: 'pending' | 'processing' | 'completed'
"""

import os
from typing import List

from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain_core.prompts import SystemMessagePromptTemplate
from pydantic import BaseModel, Field

from src.ai.config import AVAILABLE_AGENTS
from src.ai.state import Task, YuvlyState

load_dotenv()


# Shape of the output produced by the Decompose Node
class Decompose(BaseModel):
    tasks: List[Task] = Field(
        description="List of tasks, each assigned with a sub-agent"
    )


# Use base model here, or maybe pro
model = os.getenv("AI_MODEL")

llm = init_chat_model(model=model).with_structured_output(Decompose)

DECOMPOSE_PROMPT = SystemMessagePromptTemplate.from_template(
    template="""You are the task decomposer for Yuvly, an AI travel buddy that plans and books travel directly for individual travelers — flights, hotels, and itineraries — with no travel agency middleman.

Break the user's query into an ordered list of atomic tasks needed to fulfill it. Each task must be assigned to exactly one of the following sub-agents:

{agent_roster}

Rules:
- agent_assigned must be one of: {valid_agent_names}. Never invent a new agent name.
- Order tasks in actual execution order: a task must appear after every task it depends on. Independent tasks can appear in any order relative to each other.
- task_type is "parallel" if the task has no dependency on any other task in the list and could run concurrently with them; "sequential" if it depends on a prior task's output (e.g. booking depends on search, scheduling depends on booking).
- Always set task_status to "pending" — no task has started yet.
- Only include booking_agent if the user clearly wants something purchased/reserved now, not just researched or compared.
- If the query is already specific enough to book directly (exact flight, exact hotel, exact dates), skip straight to booking_agent without a search task.
- Keep each task description self-contained — include origin, destination, dates, and any other preferences inline — so the sub-agent can act without re-reading the original query.
- Do not invent tasks the query didn't ask for. Don't add a scheduling task if the user didn't ask to build or change an itinerary.

User query: {query}
"""
)


# Helper fn
def format_agent_roster(agents: dict) -> str:
    return "\n".join(f"- {name}: {desc}" for name, desc in agents.items())


def decompose(state: YuvlyState) -> YuvlyState:
    query: str = state.query

    agent_roster: str = format_agent_roster(AVAILABLE_AGENTS)
    valid_agent_names: str = ", ".join(AVAILABLE_AGENTS.keys())

    message = DECOMPOSE_PROMPT.format(
        agent_roster=agent_roster,
        valid_agent_names=valid_agent_names,
        query=query,
    )

    response = llm.invoke([message])

    # Orchestrator using decompose node to write to tasks field in the YuvlyState
    if isinstance(response, Decompose):
        state.tasks = response.tasks
    elif isinstance(response, dict):
        state.tasks = response["tasks"]

    return state