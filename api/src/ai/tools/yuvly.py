"""
Tools for Yuvly agent
"""

import os
from langchain.tools import tool
from langchain.chat_models import init_chat_model
from pydantic import BaseModel, Field

class IsComplexOutput(BaseModel):
    is_complex: bool = Field(
        description="Indicates whether that user query is complex or not. Spit out Either True or False"
    )


model = os.getenv('AI_MODEL', 'google_genai:gemini-3.6-flash')

@tool
def is_complex(query: str) -> bool:
    """Decide whether User task is complex
    or not.
    """
    
    llm = init_chat_model(model).with_structured_output(IsComplexOutput)

    prompt = f"""User Query: {query}. I want you to flag whether the user query is complex or not. By which the Yuvly agent would be
        able to figure out to delgate the task to sub-agents via Orchestrator. The sub-agents consists a booking_agent, explore_agent,
        guide_agent, schedule_agent.
    """

    output = llm.invoke(prompt)

    return output.is_complex

