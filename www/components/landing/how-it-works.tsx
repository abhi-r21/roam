"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "motion/react";
import { LuUserRound } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import Image from "next/image";

const steps = [
    {
      step: "STEP 1",
      title: "Tell Yuvly where you're going",
      description:
        "A trip idea, a date range, a place is all it takes to get started. No forms to fill out, no filters to configure, no dropdown menus to click through one by one. Just say where you want to go, and Yuvly takes it from there.",
      image: "/personal-step-1.png",
      mockup: "chat",
    },
    {
      step: "STEP 2",
      title: "It finds and books for you",
      description:
        "Flights and hotels picked to fit what you actually asked for, not just the cheapest option on the list. Yuvly compares, chooses, and books — confirmed and ready before you've opened a single tab. The itinerary lands in your hands, done.",
      image: "/personal-step-2.png",
      mockup: "chat",
    },
    {
      step: "STEP 3",
      title: "You never travel alone",
      description:
        "Delays, cancellations, a plan that shifts at the last minute — Yuvly's already on it before you have to ask. No calls, no waiting on hold, no sorting it out yourself. You're never traveling alone again — Yuvly's with you, every trip.",
      image: "/personal-step-3.png",
      mockup: "email",
    },
  ];

export function HowItWorks() {
  const [active, setActive] = useState<"personal" | "enterprise">("personal");

  return (
    <div className="max-w-7xl mx-auto mt-16 min-h-screen">
      <h3 className={cn("text-[40px] font-is text-center mx-auto")}>
        What it actually does
      </h3>

      <div className="max-w-full flex justify-center mt-2">
        <div className="relative inline-flex items-center rounded-full bg-[#F5F5F2] p-0 mx-auto">
          <Button
            size="xs"
            onClick={() => setActive("personal")}
            className={cn(
              "relative z-10 flex items-center gap-1.5 rounded-full bg-transparent font-medium shadow-none hover:bg-transparent px-4! py-3!  cursor-pointer",
              active === "personal"
                ? "text-neutral-950"
                : "text-neutral-400 hover:text-neutral-600",
            )}
          >
            <LuUserRound />
            Personal
          </Button>
          <Button
            size="xs"
            onClick={() => setActive("enterprise")}
            className={cn(
              "relative z-10 flex items-center gap-1.5 rounded-full bg-transparent font-medium shadow-none hover:bg-transparent px-4! py-3!  cursor-pointer",
              active === "enterprise"
                ? "text-neutral-950"
                : "text-neutral-400 hover:text-neutral-600",
            )}
          >
            <HiMiniBuildingStorefront />
            Enterprise
          </Button>

          <motion.div
            layout
            animate={{ x: active === "enterprise" ? "100%" : "0%" }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
            className="absolute inset-y-[2.5px] left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm"
          />
        </div>
      </div>

      <section className="w-full px-6 py-10 md:px-12 lg:px-20">
      {/* Header */}
      <p className="mx-auto max-w-2xl text-center text-sm mb-8  leading-relaxed text-gray-500">
      Not a tool you open — a buddy that's already planning, already booking, already handling it.
      </p>

      {/* Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col">
            {/* Card */}
            <div
              className="flex aspect-4/5 items-center justify-center p-6 shadow-lg relative rounded-3xl overflow-hidden"
            >
              <Image src={s.image} fill alt={s.image} className="object-cover"/>
            </div>

            {/* Caption */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-normal tracking-widest text-gray-400 font-mono">
                {s.step}
              </p>
              <h3 className="mb-3 text-[16px] font-medium text-gray-900">
                {s.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-gray-500">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="mx-auto mt-16 max-w-2xl text-center text-sm leading-relaxed text-gray-500">
      Yuvly's your travel buddy, and you talk to it in plain English. Every booking, every change, every trip — you'll always know where things stand.
      </p>
    </section>
    </div>
  );
}


function ChatMockup() {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <span className="text-sm text-gray-400">‹</span>
          <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5">
            <span className="text-sm">👻</span>
            <span className="text-sm font-semibold">Backdoor ›</span>
          </div>
          <span className="text-sm text-gray-400">📹</span>
        </div>
        <div className="flex-1 space-y-3 overflow-hidden p-4 text-[13px] leading-snug">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-500 px-3 py-2 text-white">
            Hi, I&apos;m looking for founding eng roles, help me out?
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2 text-gray-700">
            hey! founding eng is a great target — high ownership, messy problems,
            usually first or second hire on the technical side.
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gray-100 px-3 py-2 text-gray-700">
            drop your LinkedIn or a link to anything you&apos;ve built — I&apos;ll pull
            up your profile and figure out positioning.
          </div>
        </div>
      </div>
    );
  }
  
  function EmailMockup() {
    return (
      <div className="flex h-full flex-col">
        <div className="border-b border-gray-100 px-4 py-3">
          <p className="text-sm font-semibold text-gray-900">
            Show HN post – caching tool calls
          </p>
          <span className="mt-1 inline-block rounded bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
            Inbox · 2 messages
          </span>
        </div>
        <div className="flex-1 space-y-4 overflow-hidden p-4 text-[13px]">
          <div className="flex gap-2">
            <div className="h-6 w-6 shrink-0 rounded-full bg-gray-900 text-center text-[10px] leading-6 text-white">
              A
            </div>
            <div>
              <p className="font-semibold text-gray-900">You</p>
              <p className="text-gray-500">
                Saw the post this morning — the caching bit was the smartest
                take I&apos;ve read all week. Free for a 20-min chat?
              </p>
            </div>
          </div>
          <div className="flex gap-2 border-l-2 border-green-400 pl-2">
            <div className="h-6 w-6 shrink-0 rounded-full bg-purple-500 text-center text-[10px] leading-6 text-white">
              M
            </div>
            <div>
              <p className="font-semibold text-gray-900">Maya Park</p>
              <p className="text-gray-500">
                Ha — you actually read the post. Thursday 3pm PT works, sending
                an invite.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-green-50 p-2">
            <div className="rounded bg-white px-2 py-1 text-center text-[10px] font-bold text-gray-700 shadow-sm">
              TUE
              <br />
              14
            </div>
            <div>
              <p className="text-[12px] font-semibold text-green-700">
                ✓ Interview Scheduled
              </p>
              <p className="text-[11px] text-gray-500">Tomorrow · 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    );
  }