"""
Yuvly is the top-level agent, that does
basic stuff and interacts with user and 
for advance tasks it spawns a Orchestrator
that has bunch of sub-agents that gets the
tasks done.
"""

import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain_core.messages import SystemMessage, ToolMessage

from langgraph.graph import START, END, StateGraph
from langgraph.types import Command


from src.ai.agents.orchestrator import orchestrator
from src.ai.tools.yuvly import hand_off_to_orchestrator
from src.ai.state import YuvlyState
from src.ai.tools.search import fetch, search


load_dotenv()

# Initailizing the llm, tools, and binding them
model = os.getenv('AI_MODEL')
tools = [search, hand_off_to_orchestrator]
tools_by_name = {tool.name: tool for tool in tools}
llm = init_chat_model(model).bind_tools(tools)


SYSTEM_PROMPT = """You are Yuvly, an AI travel companion.

Handle simple, single-shot requests yourself — flight lookups, hotel
lookups, general questions — using the search tool.

For complex task you can call hand_off_to_orchestrator tool for handing
it to Orchestrator agent which gets the task done by using sub-agents.
"""


# LLM call Node
def call_model(state: YuvlyState):
    """"""
    messages = [SystemMessage(content=SYSTEM_PROMPT), *state.messages]
    response = llm.invoke(messages)

    return { "messages": [response] }

# Tool calling Node
def call_tools(state: YuvlyState):
    """"""
    last_message = state.messages[-1]
    output = []

    for tool_call in last_message.tool_calls:
        tool = tools_by_name[tool_call['name']]
        result = tool.invoke(tool_call['args'])

        if isinstance(result, Command):
            return result

        output.append(
            ToolMessage(
                content=str(result),
                name=tool_call['name'],
                tool_call_id=tool_call['id']
            )
        )

    return { "messages": output }

def route_after_model(state: YuvlyState):
    last_message = state.messages[-1]

    if not getattr(last_message, "tool_calls", None):
        return END

    if state.iterations >= 10:
        return END
    
    return "call_tools"



graph = StateGraph(YuvlyState)

graph.add_node("call_model", call_model)
graph.add_node("call_tools", call_tools, destinations=["call_model", "orchestrator"])
graph.add_node("orchestrator", orchestrator)

graph.add_edge(START, "call_model")
graph.add_conditional_edges(
    "call_model", route_after_model, {"call_tools": "call_tools", END: END }
)
graph.add_edge("call_tools", "call_model")
graph.add_edge("orchestrator", END)


yuvly_agent = graph.compile()