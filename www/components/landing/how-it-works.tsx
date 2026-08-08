"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { LuUserRound } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { enterpriseFooter, enterpriseHeader, enterpriseSteps, personalFooter, personalHeader, personalSteps } from "@/config/steps";



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
                            {active === 'personal' ? personalHeader : enterpriseHeader }
                        </p>

                        {/* Grid */}
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                            {steps.map((s, i) => (
                                <div key={i} className="flex flex-col">
                                    {/* Card */}
                                    <div
                                        className="flex aspect-4/5 items-center justify-center p-6 shadow-lg relative rounded-3xl overflow-hidden"
                                    >
                                        <Image src={s.image} fill alt={s.image} sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" loading="eager" />
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