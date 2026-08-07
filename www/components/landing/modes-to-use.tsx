"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { LuUserRound } from "react-icons/lu";
import { HiMiniBuildingStorefront } from "react-icons/hi2";

export function ModesToUse() {
    const [active, setActive] = useState<"personal" | "enterprise">("personal");

    return (
        <div className={cn("max-w-7xl mx-auto mt-16 min-h-140 h-full")}>
            <h3 className={cn("text-[40px] font-is mx-auto text-center")}>
                It operates in two modes
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

            <AnimatePresence mode="wait">
                {active === "personal" ? (
                    <motion.div
                        key="personal"
                        initial={{ opacity: 0, filter: "blur(8px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(8px)" }}
                        transition={{ duration: 0.2 }}
                        className="max-w-2xl mt-20 tracking-tight font-normal text-xl text-center flex flex-col gap-10 leading-7.5">
                        <p>
                            Ask Yuvly to take you to SF or any place around the globe — it plans
                            the trip, books your flights and hotel, and puts everything
                            together, no forms or endless tabs to compare.
                        </p>
                        <p>
                            Plans change. Yuvly handles that too — rebooking around a delay,
                            shifting a hotel date, sorting a cancellation — so you're not stuck
                            on hold with an airline.
                        </p>
                        <p>You never travel alone from now on, Yuvly is always with you.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="enterprise"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl mt-20 tracking-tight font-normal text-xl text-center flex flex-col gap-10 leading-7.5">
                        <p>
                            Ask Yuvly to book the team's trip to SF or any place around the globe. It plans for every traveler, books within policy, and keeps finance in the loop — no portal, no spreadsheets, no chasing receipts.
                        </p>
                        <p>
                            One approval, not one per ticket — spend stays visible, and anything outside policy waits for a human first.
                        </p>
                        <p>Your company travel on autopilot — a person still holds the wheel.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
