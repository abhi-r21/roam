from typing import List, Optional
from pydantic import BaseModel, Field

class Task(BaseModel):
    task: str = Field(description="Actual task description")
    agent_assigned: str = Field(description="Name of the sub-agent assigned to this task")


class State(BaseModel):
    messages: list[str] | None
    tasks: Optional[List[Task]] = Field(
        default=None,
        description="List of tasks, each assigned with a sub-agent"
    )
