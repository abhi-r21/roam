from enum import Enum
from typing import Annotated, List, Optional
from pydantic import BaseModel, Field
from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages


class TaskType(str, Enum):
    PARALLEL = "parallel"
    SEQUENTIAL = "sequential"

class TaskStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    PROCESSING = "processing"


class Task(BaseModel):
    task: str = Field(description="Actual task description")
    task_type: TaskType = Field(description="Type of the task: parallel or sequential") 
    task_status: TaskStatus = Field(default=TaskStatus.PENDING, description="Status of the task")
    agent_assigned: str = Field(description="Name of the sub-agent assigned to this task")


class YuvlyState(BaseModel):
    query: str    
    messages: Annotated[List[AnyMessage], add_messages]
    iterations: int = 0
    
    # Orchestrator Writes to this state and maintains in order to spawn sub-agents
    tasks: Optional[List[Task]] = Field(
        default=None,
        description="List of tasks, each assigned with a sub-agent and its status and type"
    )
