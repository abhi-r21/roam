"""
Yuvly is the top-level agent, that does
basic stuff and interacts with user and 
for advance tasks it spawns a Orchestrator
that has bunch of sub-agents that gets the
tasks done.
"""

import os
from langchain.chat_models import init_chat_model
from langchain_core.messages import SystemMessage, ToolMessage

from langgraph.graph import START, END, StateGraph

from src.ai.state import YuvlyState
from src.ai.tools.search import web_search
from src.ai.tools.yuvly import is_complex



# Initailizing the llm, tools, and binding them
model = os.getenv('AI_MODEL', 'google_genai:gemini-3.6-flash')
tools = [web_search, is_complex]
tools_by_name = {tool.name: tool for tool in tools}
llm = init_chat_model(model).bind_tools(tools)



def llm_call(state: YuvlyState):
    """LLM decides to spawn sub-agents or handle itself"""

    return {
        "messages": [
            llm.invoke(
                [
                    SystemMessage(
                        content="""Your are called as Yuvly an AI travel buddy. You have bunch of agents like book agent, schedule agents as sub-agents. You can delegate the task to orchestrator agent if you feel the task is complex else handle yourself.
                        """
                    )
                ]
                + state.messages
            )
        ]
    }

def should_continue(state: YuvlyState):
    if state.messages[-1].tool_calls:
        return "tool_node"
    return END
    

def tool_node(state: YuvlyState):
    """Performs the tool calls"""

    results = []
    for tool_call in state.messages[-1].tool_calls:
        tool = tools_by_name[tool_call['name']]
        observation = tool.invoke(tool_call['args'])

        results.append(
            ToolMessage(
                content=observation,
                tool_call_id=tool_call["id"]
            )
        )
        print(f"observation: {observation}, tool_call: {tool}, result: {results}")

    return {"messages": results }


graph = StateGraph(YuvlyState)

graph.add_node("llm_call", llm_call)
graph.add_node("tool_node", tool_node)

graph.add_edge(START, "llm_call")
graph.add_conditional_edges(
    "llm_call",
    should_continue,
    ['tool_node', END]
)
graph.add_edge("tool_node", "llm_call")

agent = graph.compile()








