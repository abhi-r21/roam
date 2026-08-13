"""
Classifier Node takes the User Query and classifies
them into list of tasks that should be performed by
the sub-agents.
"""


from dotenv import load_dotenv
from pydantic import BaseModel, Field
from src.state.yuvly_state import State
from langchain.chat_models import init_chat_model

load_dotenv()

class ClassifierOutput(BaseModel):
    tasks: list[str] = Field(description="List of tasks")

llm = init_chat_model("google_genai:gemini-3.6-flash").with_structured_output(ClassifierOutput)

def generate_tasks(state: State):
    query = state.messages[-1]

    prompt = f"""
        Break the user's query into an ordered list of tasks (search, book, schedule) needed to fulfill it.

        User query: {query}
    """

    response = llm.invoke(prompt)

    state.tasks = response.tasks
    return state