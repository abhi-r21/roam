from typing import Annotated, List, Optional
from pydantic import BaseModel, Field
from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages


class YuvlyState(BaseModel):
    messages: Annotated[List[AnyMessage], add_messages]


class Task(BaseModel):
    task: str = Field(description="Actual task description")
    agent_assigned: str = Field(description="Name of the sub-agent assigned to this task")


class State(BaseModel):
    messages: list[str] | None
    tasks: Optional[List[Task]] = Field(
        default=None,
        description="List of tasks, each assigned with a sub-agent"
    )
    agent_findings: str | None