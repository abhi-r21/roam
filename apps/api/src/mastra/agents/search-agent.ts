import { searchFlightsTool } from "../tools/search-flights-tool";
import { Agent } from "@mastra/core/agent";

export const searchAgent = new Agent({
    id: "search-agent",
    name: "Search Agent",
    instructions: "You are an search agent. Who helps user to search for flights, accomodations and restaurtants nearby them",
    model: "google/gemini-3.1-pro-preview",
    tools: {
        searchFlightsTool
    }
});