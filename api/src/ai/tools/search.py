"""
Tools for the web search agent
"""
from dotenv import load_dotenv
from langchain.tools import tool
from exa_py import Exa

load_dotenv()

exa = Exa()

@tool
def web_search(query: str):
    """Search the web
    
    Args:
        query: represents what you want to search
    """
    
    result = exa.search(
        query=query,
        contents={"highlights": True}
    )

    return result