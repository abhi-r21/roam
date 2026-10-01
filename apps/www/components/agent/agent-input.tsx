"use client";

import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, AudioLines, Plus } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const MAX_LINES = 6;

const SPRING_CONFIG = { stiffness: 500, damping: 30, mass: 0.5 };
const REDUCED_MOTION_CONFIG = { stiffness: 10000, damping: 100, mass: 0.1 };

/**
 * Measures the caret (x, y) position inside a textarea by using a hidden
 * mirror div that replicates the textarea's styling. We insert text up to
 * the caret index, append a zero-width marker span, and read its offset.
 */
function useTextareaCaret(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  value: string,
) {
  const caretX = useMotionValue(0);
  const caretY = useMotionValue(0);
  const caretOpacity = useMotionValue(0);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? REDUCED_MOTION_CONFIG
    : SPRING_CONFIG;
  const springX = useSpring(caretX, springConfig);
  const springY = useSpring(caretY, springConfig);

  const syncMirrorStyles = useCallback(() => {
    const textarea = textareaRef.current;
    const mirror = mirrorRef.current;
    if (!textarea || !mirror) return;

    const styles = window.getComputedStyle(textarea);

    // Copy all relevant text-layout properties from the textarea to the mirror
    const properties = [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "fontStyle",
      "letterSpacing",
      "lineHeight",
      "textTransform",
      "wordSpacing",
      "textIndent",
      "whiteSpace",
      "wordWrap",
      "overflowWrap",
      "wordBreak",
      "tabSize",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
      "boxSizing",
    ] as const;

    for (const prop of properties) {
      (mirror.style as any)[prop] = styles[prop];
    }

    // Match the textarea's width exactly so wrapping matches
    mirror.style.width = `${textarea.clientWidth}px`;
  }, [textareaRef]);

  const updateCaret = useCallback(() => {
    const textarea = textareaRef.current;
    const mirror = mirrorRef.current;
    const marker = markerRef.current;
    if (!textarea || !mirror || !marker) return;

    const isFocused = document.activeElement === textarea;
    if (!isFocused) {
      caretOpacity.set(0);
      return;
    }

    const selectionStart = textarea.selectionStart ?? 0;
    const selectionEnd = textarea.selectionEnd ?? 0;
    const hasSelection = selectionStart !== selectionEnd;

    if (hasSelection) {
      caretOpacity.set(0);
      return;
    }

    syncMirrorStyles();

    const caretIndex = selectionStart;
    const textBeforeCaret = value.slice(0, caretIndex);
    const textAfterCaret = value.slice(caretIndex);

    // Build mirror content: text before caret, then marker, then rest
    // Using textContent for the text parts and appendChild for the marker
    mirror.textContent = "";

    const beforeNode = document.createTextNode(textBeforeCaret);
    mirror.appendChild(beforeNode);
    mirror.appendChild(marker);
    const afterNode = document.createTextNode(textAfterCaret || " ");
    mirror.appendChild(afterNode);

    // Read the marker's position relative to the mirror
    const mirrorRect = mirror.getBoundingClientRect();
    const markerRect = marker.getBoundingClientRect();

    const x = markerRect.left - mirrorRect.left;
    const y = markerRect.top - mirrorRect.top - textarea.scrollTop;

    caretX.set(x);
    caretY.set(y);
    caretOpacity.set(1);
  }, [textareaRef, value, caretX, caretY, caretOpacity, syncMirrorStyles]);

  // Update caret position when value changes
  useEffect(() => {
    requestAnimationFrame(updateCaret);
  }, [value, updateCaret]);

  // Listen for selection changes, scroll, resize
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleSelectionChange = () => {
      if (document.activeElement !== textarea) return;
      requestAnimationFrame(updateCaret);
    };

    const handleScroll = () => {
      if (document.activeElement === textarea) {
        updateCaret();
      }
    };

    const handleFontsReady = () => {
      if (document.activeElement === textarea) {
        updateCaret();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    textarea.addEventListener("scroll", handleScroll);
    document.fonts.addEventListener("loadingdone", handleFontsReady);
    void document.fonts.ready.then(handleFontsReady);

    const resizeObserver = new ResizeObserver(() => {
      if (document.activeElement === textarea) {
        updateCaret();
      }
    });
    resizeObserver.observe(textarea);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      textarea.removeEventListener("scroll", handleScroll);
      document.fonts.removeEventListener("loadingdone", handleFontsReady);
      resizeObserver.disconnect();
    };
  }, [textareaRef, updateCaret]);

  return {
    springX,
    springY,
    caretOpacity,
    mirrorRef,
    markerRef,
    updateCaret,
  };
}

export function AgentInput() {
  const [value, setValue] = useState("");
  const [isMultiLine, setIsMultiLine] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasInput = value.trim().length > 0;

  const {
    springX,
    springY,
    caretOpacity,
    mirrorRef,
    markerRef,
    updateCaret,
  } = useTextareaCaret(textareaRef, value);

  // Auto-resize textarea
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "20");
    const maxHeight = lineHeight * MAX_LINES;

    const naturalHeight = el.scrollHeight;
    el.style.height = `${Math.min(naturalHeight, maxHeight)}px`;
    el.style.overflowY = naturalHeight > maxHeight ? "auto" : "hidden";

    // Detect multi-line: if the content height exceeds a single line
    setIsMultiLine(naturalHeight > lineHeight + 4);
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
        className={cn("flex gap-1.5 max-w-lg w-full mb-2 mx-auto", isMultiLine ? "items-end" : "items-center")}
      >
        <Button
          className={cn(
            "rounded-full size-10 shrink-0 mb-[3px] bg-background hover:bg-background/50",
            "dark:bg-[#101010] dark:text-neutral-100 dark:border-neutral-900 dark:hover:bg-[#101010]/50 dark:hover:border-[#101010]",
          )}
        >
          <Plus className="text-foreground" />
        </Button>

        <div className={cn("flex flex-1 bg-background dark:bg-[#101010] rounded-[15px] pl-3 pr-1 py-1.5 min-h-10 border-neutral-200 border dark:border-neutral-900", isMultiLine ? "items-end" : "items-center")}>
          <div className="relative flex-1">
            <Textarea
              ref={textareaRef}
              rows={1}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                requestAnimationFrame(() => updateCaret());
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (hasInput) {
                    setValue("");
                  }
                }
              }}
              onFocus={() => requestAnimationFrame(() => updateCaret())}
              onBlur={() => caretOpacity.set(0)}
              placeholder="Ask roam..."
              style={{ caretColor: "transparent" }}
              className={cn(
                "bg-transparent! border-none outline-none! focus:ring-0! focus-visible:ring-0! focus-visible:border-none!",
                "resize-none p-0! my-auto",
                "min-h-[20px] leading-5",
                "placeholder:text-neutral-500",
                "rounded-none!",
              )}
            />

            {/* Smooth animated caret */}
            <motion.div
              className="pointer-events-none absolute top-0 left-0 w-[1.5px] h-[1em] rounded-full bg-blue-500"
              style={{
                x: springX,
                y: springY,
                opacity: caretOpacity,
                lineHeight: "inherit",
              }}
              aria-hidden
            />

            {/* Hidden mirror div for measuring caret position */}
            <div
              ref={mirrorRef}
              aria-hidden
              className="pointer-events-none invisible absolute top-0 left-0 overflow-hidden whitespace-pre-wrap break-words"
              style={{ height: 0 }}
            >
              <span ref={markerRef} style={{ display: "inline" }}>
                &#8203;
              </span>
            </div>
          </div>

          {!hasInput ? (
            <Button
              variant="ghost"
              className={cn(
                "rounded-full h-7 w-7 shrink-0 ml-1.5 mb-px",
                "transition-opacity",
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
                "rounded-[12px] size-7 shrink-0 ml-1.5 mb-px px-4 bg-blue-800 border-blue-700 text-white",
                "transition-opacity",
                !hasInput && "opacity-0 pointer-events-none w-0 ml-0",
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
