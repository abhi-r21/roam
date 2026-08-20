"""
Web Search tool for agents. This enables
to search the web in real-time and get insights
about the query 
"""

import os
from dotenv import load_dotenv
from langchain.tools import tool
from browserbase import Browserbase


load_dotenv()

bb = Browserbase(api_key=os.environ["BROWSERBASE_API_KEY"])

@tool
def search(query: str) -> list:
    """Search the web and return a list of results.

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
    
    search_results = []
    for result in response.results:
        search_results.append({
            "title": result.title,
            "url": result.url,
        })

    print(f"search_results_formatted: {search_results}")

    return search_results

@tool
def fetch(url: str) -> str:
    """Fetch the full content of a web page as markdown.

    Use this after search when a snippet isn't enough — e.g. you need
    exact details, current prices, or content that only shows on the
    page itself. Don't use this as a first step; search first to find
    the right URL.

    Args:
        url: The full URL to fetch, e.g. from a prior search result having the url key.
    """

    print(f"inside fetch tool, {url}")

    response = bb.fetch_api.create(url=url)
    return response.content
