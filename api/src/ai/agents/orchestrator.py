"""Orchestrator Agent:
Coordinates complex multi-step travel workflows handed off from the top-level Yuvly agent.

Graph: START → decompose → router →(fan-out)→ [agents / sequential_dispatcher] → END
"""

import os
from typing import List

from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langgraph.graph import END, START, StateGraph
from langgraph.types import Command, Send
from pydantic import BaseModel, Field

from src.ai.state import TaskType, TaskStatus, Task, YuvlyState
from src.ai.helper import format_agent_roster
from src.ai.config import AVAILABLE_AGENTS
from src.ai.prompts import DECOMPOSE_PROMPT

load_dotenv()


class Decompose(BaseModel):
    """LLM structured output: the list of tasks produced by the decompose node."""
    tasks: List[Task] = Field(
        description="List of tasks, each assigned with a sub-agent"
    )


class SequentialTaskState(BaseModel):
    """Internal state passed to sequential_dispatcher via Send.
    Holds the ordered queue of tasks that must run one after another."""
    remaining: List[Task]



model = os.getenv("AI_MODEL")
llm = init_chat_model(model=model).with_structured_output(Decompose)



def decompose(state: YuvlyState) -> YuvlyState:
    """Breaks user query into ordered, atomic tasks with assigned sub-agents.
    Each task carries full context so sub-agents can act independently."""

    query: str = state.query
    agent_roster: str = format_agent_roster(AVAILABLE_AGENTS)
    valid_agent_names: str = ", ".join(AVAILABLE_AGENTS.keys())

    message = DECOMPOSE_PROMPT.format(
        agent_roster=agent_roster,
        valid_agent_names=valid_agent_names,
        query=query,
    )

    response = llm.invoke([message])

    if isinstance(response, Decompose):
        state.tasks = response.tasks
    elif isinstance(response, dict):
        state.tasks = response["tasks"]

    return state


def router(state: YuvlyState):
    """Splits tasks by type and fans out:
    - Parallel tasks: each dispatched concurrently via Send to its agent.
    - Sequential tasks: bundled into a single Send to sequential_dispatcher."""

    if not state.tasks:
        return Command(goto=END)

    parallel_tasks = [t for t in state.tasks if t.task_type == TaskType.PARALLEL]
    sequential_tasks = [t for t in state.tasks if t.task_type == TaskType.SEQUENTIAL]

    sends: list[Send] = []

    for task in parallel_tasks:
        sends.append(Send(task.agent_assigned, {"current_task": task}))

    if sequential_tasks:
        sends.append(Send("sequential_dispatcher", {"remaining": sequential_tasks}))

    if not sends:
        return Command(goto=END)

    return Command(goto=sends)


def sequential_dispatcher(state: SequentialTaskState):
    """Processes sequential tasks one at a time, in order.

    Since this node runs inside a Send branch, it executes all sequential
    tasks inline rather than trying to loop through the graph. Each task's
    agent will be called directly once the agent functions are implemented.

    Returns Command(update=...) to propagate task status back to YuvlyState."""

    
    for task in state.remaining:
        task.task_status = TaskStatus.PROCESSING
        
        return Command(goto=[Send(task.agent_assigned, {"current_task": task})])

    # Write updated task statuses back to parent YuvlyState
    return Command(update={"tasks": state.remaining})



def booking_agent(state):
    """TODO: Books flights, hotels, or activities."""
    return state


def schedule_agent(state):
    """TODO: Builds or modifies itineraries."""
    return state



orchestrator = StateGraph(YuvlyState)

orchestrator.add_node("decompose", decompose)
orchestrator.add_node("router", router)
orchestrator.add_node("sequential_dispatcher", sequential_dispatcher)
orchestrator.add_node("booking_agent", booking_agent)
orchestrator.add_node("schedule_agent", schedule_agent)

orchestrator.add_edge(START, "decompose")
orchestrator.add_edge("decompose", "router")

orchestrator = orchestrator.compile()