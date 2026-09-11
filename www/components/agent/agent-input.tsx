"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mic,
  ArrowUp,
  Keyboard,
  Paperclip,
  Square,
} from "lucide-react";

type InputMode = "text" | "voice";
type VoiceState = "idle" | "listening" | "processing";

export function AgentInput({
  onSend,
  placeholder = "Ask anything...",
}: {
  onSend?: (message: string) => void;
  placeholder?: string;
}) {
  const [mode, setMode] = useState<InputMode>("text");
  const [value, setValue] = useState("");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasValue = value.trim().length > 0;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const maxHeight = 200;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value]);

  const handleSend = useCallback(() => {
    if (!hasValue) return;
    onSend?.(value.trim());
    setValue("");
    textareaRef.current?.focus();
  }, [hasValue, value, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoice = () => {
    if (mode === "voice") {
      if (voiceState === "listening") {
        setVoiceState("processing");
        setTimeout(() => {
          setVoiceState("idle");
          setMode("text");
        }, 1500);
      } else {
        setVoiceState("listening");
      }
    } else {
      setMode("voice");
      setVoiceState("listening");
    }
  };

  const switchToText = () => {
    setMode("text");
    setVoiceState("idle");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  return (
    <div className="w-full max-w-[720px] mx-auto">
      <AnimatePresence mode="wait">
        {mode === "voice" ? (
          <motion.div
            key="voice-mode"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-border/60 bg-background overflow-hidden"
          >
            <div className="flex items-center justify-center h-28 px-6">
              <AnimatePresence mode="wait">
                {voiceState === "listening" && (
                  <motion.div
                    key="waveform"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-[2.5px]"
                  >
                    {Array.from({ length: 32 }).map((_, i) => {
                      const center = 15.5;
                      const dist = Math.abs(i - center) / center;
                      const baseHeight = 6 + (1 - dist) * 20;
                      const maxH = baseHeight + 24 * (1 - dist);
                      return (
                        <motion.div
                          key={i}
                          className="w-[2.5px] rounded-full bg-foreground"
                          animate={{
                            height: [
                              `${baseHeight * 0.5}px`,
                              `${maxH}px`,
                              `${baseHeight * 0.7}px`,
                              `${maxH * 0.8}px`,
                              `${baseHeight * 0.5}px`,
                            ],
                            opacity: [0.4, 0.9, 0.5, 0.85, 0.4],
                          }}
                          transition={{
                            duration: 1.4 + Math.random() * 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.03,
                          }}
                        />
                      );
                    })}
                  </motion.div>
                )}
                {voiceState === "processing" && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium tracking-wide">
                      Processing
                    </span>
                  </motion.div>
                )}
                {voiceState === "idle" && (
                  <motion.p
                    key="idle-msg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-muted-foreground"
                  >
                    Tap mic to start listening
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between px-3 py-2.5 border-t border-border/40">
              <button
                onClick={switchToText}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
              >
                <Keyboard className="size-3.5" />
                <span>Keyboard</span>
              </button>

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={toggleVoice}
                className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all cursor-pointer ${voiceState === "listening"
                  ? "bg-foreground text-background"
                  : voiceState === "processing"
                    ? "bg-muted text-muted-foreground pointer-events-none"
                    : "bg-foreground text-background hover:opacity-90"
                  }`}
              >
                {voiceState === "listening" && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-foreground/25"
                    animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
                {voiceState === "listening" ? (
                  <Square className="size-4" fill="currentColor" />
                ) : (
                  <Mic className="size-4" />
                )}
              </motion.button>

              <div className="w-[72px]" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="text-mode"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`rounded-2xl border bg-[#101010] overflow-hidden transition-colors duration-200 ${isFocused
              ? "border-border shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_2px_12px_rgba(0,0,0,0.2)]"
              : "border-border/60"
              }`}
          >
            <div className="px-4 pt-3.5 pb-1">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                rows={1}
                className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none scrollbar-none min-h-[28px]"
              />
            </div>

            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-0.5">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground/70 hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
                  aria-label="Attach file"
                >
                  <Paperclip className="size-4" />
                </motion.button>
              </div>

              <div className="flex items-center gap-1">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={toggleVoice}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground/70 hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
                  aria-label="Voice input"
                >
                  <Mic className="size-4" />
                </motion.button>

                <AnimatePresence mode="wait">
                  {hasValue ? (
                    <motion.button
                      key="send-btn"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSend}
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground text-background cursor-pointer"
                      aria-label="Send"
                    >
                      <ArrowUp className="size-4" strokeWidth={2.5} />
                    </motion.button>
                  ) : (
                    <motion.div
                      key="send-placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/40 text-muted-foreground/30"
                    >
                      <ArrowUp className="size-4" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
