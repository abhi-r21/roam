"""
Tools for Yuvly agent
"""

from langchain.tools import tool
from langchain_core.messages.tool import ToolMessage
from langgraph.types import Command


@tool
def hand_off_to_orchestrator(query: str, tool_call_id: str) -> Command:
    """Hand off to the Orchestrator for multi-step planning, booking,
    or coordination across flights/hotels/calendar."""

    return Command(
        goto="orchestrator",
        update={
            "messages": [
                ToolMessage(content=f"Handing off: {query}", tool_call_id=tool_call_id)
            ],
            "handoff_task": query,
        }
    )