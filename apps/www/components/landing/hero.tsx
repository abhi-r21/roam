"use client";

import { Topbar } from "./top-bar";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, AudioLines, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { LuAlignCenter } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

const MAX_LINES = 6;

function AgentInput() {
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
      <motion.div className="bg-background mx-auto flex min-h-14 w-[700px] items-center justify-center rounded-[15px] border border-neutral-200 py-1.5 pr-3 pl-6 dark:border-neutral-900 dark:bg-[#101010]">
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
      </motion.div>
    </AnimatePresence>
  );
}

const links = [
  {
    href: "#home",
    label: "Home",
    className: "text-white hover:text-black",
  },
  {
    href: "/pageone",
    label: "How it works",
    className: "text-white hover:text-black",
  },
  {
    href: "#pricing",
    label: "Pricing",
    className: "text-white hover:text-black",
  },
  {
    href: "#Upcoming",
    label: "Cooming soon",
    className: "text-white hover:text-black",
  },
  {
    href: "#faqs",
    label: "FAQ's",
    className: "text-white hover:text-black",
  },
];

function Menu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [hl, setHl] = useState({ index: 0, visible: false, animate: false });
  const showHighlight = (index: number) =>
    setHl((h) => ({ index, visible: true, animate: h.visible }));
  const hideHighlight = () =>
    setHl((h) => ({ ...h, visible: false, animate: false }));

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    // Fixed-size slot that holds the closed "Menu" pill in the layout (128 x 56)
    <div className="relative h-12 w-28">
      {/* Glass-blur backdrop: blurs everything behind the open menu, click to close */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-white/10 backdrop-blur-md transition-opacity duration-500 motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* One element that morphs: pill (128x56) -> panel (450x600) */}
      <div
        id="main-menu"
        className={`absolute z-50 overflow-hidden border transition-[width,height,top,right,border-radius,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
          isOpen
            ? "-top-4 -right-1 h-[400px] max-h-[calc(100vh-2rem)] w-[300px] max-w-[calc(100vw-2rem)] rounded-[50px] bg-neutral-900 shadow-lg"
            : "top-0 right-0 h-12 w-28 rounded-[24px] border-white/10 bg-neutral-900 shadow-none"
        }`}
      >
        {/* Closed state: the Menu button. Hamburger icon is static (no icon animation). */}
        <button
          type="button"
          onClick={openMenu}
          aria-label="Open Menu"
          aria-expanded={isOpen}
          aria-controls="main-menu"
          tabIndex={isOpen ? -1 : 0}
          className={`font-gp absolute top-0 right-0 flex h-12 w-28 items-center justify-center gap-1.5 text-sm text-white transition-opacity ${
            isOpen
              ? "pointer-events-none opacity-0 duration-150"
              : "opacity-100 delay-300 duration-200"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Menu
        </button>

        {/* Open state: close button + links */}
        <div
          aria-hidden={!isOpen}
          className={`absolute inset-0 transition-opacity ${
            isOpen
              ? "opacity-100 delay-200 duration-300"
              : "pointer-events-none opacity-0 duration-150"
          }`}
        >
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close Menu"
            tabIndex={isOpen ? 0 : -1}
            className="absolute top-[26px] right-[31px] flex h-10 w-10 items-center justify-center rounded-full border text-white"
          >
            <RxCross2 />
          </button>

          <nav className="flex justify-center pt-18">
            <div className="relative w-50" onMouseLeave={hideHighlight}>
              {/* One hover box that slides between links (each link row is 70px tall) */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-0 left-0 h-[40px] w-full rounded-xl bg-gray-100/10 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
                  hl.visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transform: `translateY(${hl.index * 40}px)` }}
              />

              {links.map(({ href, label, className }, index) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  onMouseEnter={() => showHighlight(index)}
                  onFocus={() => showHighlight(index)}
                  onBlur={hideHighlight}
                  tabIndex={isOpen ? 0 : -1}
                  className={`relative flex h-[40px] w-full items-center justify-center text-[20px] whitespace-nowrap ${className}`}
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Menu;

export function Hero() {
  return (
    <section id="home" className="bg-neutral-950 px-10">
      <div className="flex items-center justify-center">
        <Topbar />
      </div>
      <div className="shadow-input min-h-screen rounded-[50px] bg-neutral-900 p-10">
        <div className="space-y-5">
          <div className="flex justify-end">
            <Menu />
          </div>
          <h1 className="font-gp text-foreground mx-auto flex max-w-xs items-center justify-center gap-2 text-center text-3xl leading-10 font-medium tracking-tight sm:max-w-2xl sm:text-6xl sm:leading-16">
            Hello, Roam here
          </h1>

          <h2 className="mx-auto max-w-lg text-center text-white/80">
            An AI travel agent you can hire to automate the travel desk for your
            agency and company.
          </h2>

          <div className="shadow-input relative mx-auto h-[500px] max-w-3xl overflow-hidden rounded-[40px]">
            <img
              src="/images/RoamOne.jpg"
              className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-110"
            />

            {/* Input button */}
            <div className="relative top-6 left-1/2 flex -translate-x-1/2 items-center justify-center text-white">
              <AgentInput />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
