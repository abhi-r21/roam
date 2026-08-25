"""Plan Agent plans the entire iternary
request for the user.
"""



import os
from dotenv import load_dotenv

from langchain.chat_models import init_chat_model
from langchain_core.messages import AIMessage, ToolMessage
from langchain_core.messages import SystemMessage

from langgraph.graph import StateGraph, START, END

from src.ai.tools.search import search
from src.ai.state import YuvlyState
from src.ai.prompts.plan import PLAN_AGENT_SYSTEM_PROMPT

load_dotenv()

# initialize the model and setup it.
model = os.getenv('AI_MODEL')
tools = [search]
tools_by_name = { tool.name: tool for tool in tools }
llm = init_chat_model(model).bind_tools(tools)

def call_llm(state: YuvlyState):
    """Plan agent, plans the trip for the user"""
    messages = [SystemMessage(PLAN_AGENT_SYSTEM_PROMPT), *state.messages]

    response = llm.invoke(messages)
    return { "messages": [response] }

def call_tools(state: YuvlyState) :
    """Tool node to execute tool calls made by the Plan Agent"""
    last_message = state.messages[-1]

    if not isinstance(last_message, AIMessage) or not last_message.tool_calls:
        return END

    output: list[ToolMessage] = []

    for tool_call in last_message.tool_calls:
        tool = tools_by_name[tool_call['name']]
        result = tool.invoke(tool_call['args'])

        output.append(
            ToolMessage(
                content=str(result),
                name=tool_call['name'],
                tool_call_id=tool_call['id']
            )
        )


    return { "messages": output }



plan_graph = StateGraph(YuvlyState)

plan_graph.add_node("call_llm", call_llm)
plan_graph.add_node("call_tools", call_tools)


plan_graph.add_edge(START, "call_llm")
plan_graph.add_edge("call_llm", "call_tools")

plan_agent = plan_graph.compile()



# For a planning a trip
# first where we are heading, major thing is iternary that what to visit and when
# A valid planning trip would have
    # 1. Destination
    # 2. timeline
    # 3. budget
    # 4. From place


# Ideal user query -> Plan a trip to SF for 10 days and keep it under $10k budget and give me the ideal plan.
# 1. Find places to visit step-by-step by geolocation so the user doesnt travel in zigzag way (basically finding places to visit at xyz)
# arraning them in an order to visit day-by-day or however
# booking flights, hotels if necessary
# Scheduling it
# yep ideal ai message showing whats done.


# Highlevel working of plan agent is search, filter, arrange.