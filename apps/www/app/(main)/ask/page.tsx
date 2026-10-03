import { AgentInput } from "@/components/agent/agent-input";
import { useTheme } from "next-themes";

export default function AskPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <div className="h-full flex-1"></div>
      <div className="w-full max-w-2xl">
        <AgentInput />
      </div>
    </div>
  );
}
