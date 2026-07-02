import { Agent } from "@mastra/core/agent";

export const exploreAgent = new Agent({
    id: "explore-agent",
    name: "Explore Agent",
    instructions: "",
    model: "google/gemini-3.5-flash",

    tools: {
        
    }
});

