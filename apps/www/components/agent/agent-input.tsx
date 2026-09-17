"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, AudioLines, Plus } from "lucide-react";

const MAX_LINES = 6;

export function AgentInput() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasInput = value.trim().length > 0;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "20");
    const maxHeight = lineHeight * MAX_LINES;

    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value]);

  return (
    <div className="flex items-end gap-1.5 max-w-lg w-full mb-2 mx-auto">
      <Button className={cn("rounded-full size-10 shrink-0 mb-[3px] ", "dark:bg-[#101010] dark:text-neutral-100 dark:border-neutral-900 dark:hover:bg-[#101010]/50 dark:hover:border-[#101010]")}>
        <Plus />
      </Button>

      <div className="flex items-end flex-1 bg-[#101010] rounded-[15px] pl-3 pr-1 py-1.5 min-h-10 border border-neutral-900">
        <Textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (hasInput) {
                setValue("");
              }
            }
          }}
          placeholder="Ask roam..."
          className={cn(
            "bg-transparent! border-none outline-none! focus:ring-0!",
            "resize-none p-0! my-auto",
            "min-h-[20px] leading-5",
            "placeholder:text-neutral-500",
            "rounded-none!",
          )}
        />

        {!hasInput ? (
          <Button
            variant="ghost"
            className={cn(
              "rounded-full h-7 w-7 shrink-0 ml-1.5 mb-px",
              "transition-opacity",
              // !hasInput && "opacity-0 pointer-events-none w-0 ml-0",
            )}
          >
            <AudioLines />
          </Button>
        ) : (
          <Button
            size="icon"
            variant={hasInput ? "default" : "ghost"}
            disabled={!hasInput}
            className={cn(
              "rounded-[12px] size-7 shrink-0 ml-1.5 mb-px px-4 bg-blue-500 border-blue-400 text-white",
              "transition-opacity",
              !hasInput && "opacity-0 pointer-events-none w-0 ml-0",
            )}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
