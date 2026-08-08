"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { LuUserRound } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { HiMiniBuildingStorefront } from "react-icons/hi2";

const personalSteps = [
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

const enterpriseSteps = [
    {
        step: "STEP 1",
        title: "Yuvly plugs into your company",
        description:
            "Connects to Slack and calendars from day one — no new dashboard, no separate portal to figure out. A mention or a calendar invite is enough for Yuvly to start working.",
        image: "/enterprise-step-1.png",
        mockup: "chat",
    },
    {
        step: "STEP 2",
        title: "It runs travel on autopilot",
        description:
            "Trips get built from context — a Slack mention, a calendar invite, an offsite in motion. Every traveler gets booked within policy, automatically, no manual checking required.",
        image: "/enterprise-step-2.png",
        mockup: "chat",
    },
    {
        step: "STEP 3",
        title: "You stay in control, without the work",
        description:
            "Spend stays within budget by default, nothing to chase down after. Anything outside policy waits for one approval, and every booking stays visible in one place.",
        image: "/enterprise-step-3.png",
        mockup: "email",
    },
];

const personalHeader = "Not a tool you open — a buddy that's already planning, already booking, already handling it."
const personalFooter = "Yuvly's your travel buddy, and you talk to it in plain English. Every booking, every change, every trip — you'll always know where things stand."

const enterpriseHeader = "One system running travel for your whole company — booking, policy, and approvals, without a portal in sight."
const enterpriseFooter = "Yuvly runs your company's travel, and someone still holds the wheel. Every booking, every approval, every dollar — visible in one place, all the time."

export function HowItWorks() {
    const [active, setActive] = useState<"personal" | "enterprise">("personal");

    const steps = active === "personal" ? personalSteps : enterpriseSteps

    return (
        <div id="how-it-works" className="max-w-7xl mx-auto mt-16 min-h-screen px-4 sm:px-6">
            <h3 className={cn("text-[34px] sm:text-[40px] font-is text-center mx-auto")}>
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
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, filter: "blur(8px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(8px)" }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                        {/* Header */}
                        <p className="mx-auto max-w-2xl text-center text-sm mb-8  leading-relaxed text-gray-500">
                            {active === 'personal' ? personalHeader : enterpriseHeader}
                        </p>

                        {/* Grid */}
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                            {steps.map((s, i) => (
                                <div key={i} className="flex flex-col">
                                    {/* Card */}
                                    <div
                                        className="flex aspect-4/5 items-center justify-center p-6 shadow-lg relative rounded-3xl overflow-hidden"
                                    >
                                        <Image src={s.image} fill alt={s.image} sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
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
                        {active === 'personal' ? personalFooter : enterpriseFooter }
                        </p>
                    </motion.div>
                </AnimatePresence>
            </section>
        </div>
    );
}