import { AgentInput } from "@/components/agent/agent-input";

export default function AskPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="flex flex-col items-center gap-3 mb-10">
                <h1 className="text-4xl font-gp tracking-tight text-foreground">
                    Hey yoo, lets plan a trip to SF?
                </h1>
            </div>
            <div className="w-full max-w-2xl">
                <AgentInput placeholder="Plan a trip, ask about visas..." />
            </div>
        </div>
    );
}