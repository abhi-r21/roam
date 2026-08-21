"""
Web Search tool for agents. This enables
to search the web in real-time and get insights
about the query 
"""

import os
from dotenv import load_dotenv
from langchain.tools import tool
from browserbase import Browserbase
from pydantic import BaseModel


class SearchResult(BaseModel):
    id: str
    title: str
    url: str
    image: str | None = None
    favicon: str | None = None
    content: dict[str, object] | str = ""


load_dotenv()

bb = Browserbase(api_key=os.environ["BROWSERBASE_API_KEY"])

@tool
def search(query: str) -> list[SearchResult]:
    """Search the web and return list of search results.

    Each result includes title, URL, and a short snippet. Use this first
    to find candidate pages, then call fetch on a specific URL if you
    need the full page content rather than just the snippet.

    Args:
        query: The search query. Keep it short and specific — 3-8 words
            works better than a full sentence. Max 100 characters.
    """

    print("inside search tool")

    response = bb.search.web(
        query=query,
        num_results=5
    )

    print(f"search_tool response: {response}, resutls: {response.results}")
    
    search_results: list[SearchResult] = []

    for result in response.results:

        search_results.append(
            SearchResult(
                id=result.id,
                title=result.title,
                url=result.url,
                image=result.image,
                favicon=result.favicon,
                content=""
            )
        )

    print(f"search_results_formatted: {search_results}")

    # For each search result we gonna fetch the content
    for search_result in search_results:
        response = bb.fetch_api.create(
            url=search_result.url,
            format="markdown",
        )

        print(f"response.content {response.content}")
        search_result.content = response.content
    
    return search_results
    
