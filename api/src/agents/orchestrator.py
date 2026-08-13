"""
The Orchestrator Agent orchestrates the sub-agents.
And gets the work done.
"""



from src.nodes.classifier import generate_tasks
from src.state.yuvly_state import State
from langgraph.graph import END, START, StateGraph


orchestrator = StateGraph(State)

orchestrator.add_node("generate_tasks", generate_tasks)

orchestrator.add_edge(START, "generate_tasks")
orchestrator.add_edge("generate_tasks", END)


orchestrator = orchestrator.compile()





