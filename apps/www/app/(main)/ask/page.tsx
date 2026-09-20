import { AgentInput } from "@/components/agent/agent-input";
import { useTheme } from "next-themes";

export default function AskPage() {

    return (
        <div className="flex flex-col items-center justify-center px-4 h-full">
            <div className="flex-1 h-full">

            </div>
            <div className="w-full max-w-2xl">
                <AgentInput />
            </div>
        </div>
    );
}
