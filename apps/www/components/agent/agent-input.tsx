"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, AudioLines, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        exit={{ y: 60 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="mx-auto mb-2 flex w-full max-w-lg items-end gap-1.5"
      >
        <Button
          className={cn(
            "bg-background hover:bg-background/50 mb-[3px] size-10 shrink-0 rounded-full",
            "dark:border-neutral-900 dark:bg-[#101010] dark:text-neutral-100 dark:hover:border-[#101010] dark:hover:bg-[#101010]/50",
          )}
        >
          <Plus className="text-foreground" />
        </Button>

        <div className="bg-background flex min-h-10 flex-1 items-end rounded-[15px] border border-neutral-200 py-1.5 pr-1 pl-3 dark:border-neutral-900 dark:bg-[#101010]">
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
              "border-none bg-transparent! outline-none! focus:ring-0!",
              "my-auto resize-none p-0!",
              "min-h-[20px] leading-5",
              "placeholder:text-neutral-500",
              "rounded-none! caret-blue-500",
            )}
          />

          {!hasInput ? (
            <Button
              variant="ghost"
              className={cn(
                "mb-px ml-1.5 h-7 w-7 shrink-0 rounded-full",
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
                "mb-px ml-1.5 size-7 shrink-0 rounded-[12px] border-blue-400 bg-blue-500 px-4 text-white",
                "transition-opacity",
                !hasInput && "pointer-events-none ml-0 w-0 opacity-0",
              )}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
