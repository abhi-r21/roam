"""
The Orchestrator Agent orchestrates the sub-agents.
"""

from langgraph.graph import END, START, StateGraph



from src.ai.nodes.classify import classify
from src.ai.state import State
from src.ai.agents.router import router


orchestrator = StateGraph(State)

orchestrator.add_node("classify", classify)
orchestrator.add_node("router", router)

orchestrator.add_edge(START, "classify")
orchestrator.add_edge("classify", "router")
orchestrator.add_edge("router", END)


orchestrator = orchestrator.compile()





