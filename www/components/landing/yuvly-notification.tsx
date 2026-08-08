"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Bubble = {
    text: string;
    positionClass: string;
    delay: number;
    hideOnMobile?: boolean;
};

const bubbles: Bubble[] = [
    { text: "plan my trip to SF next month ✈️", positionClass: "top-[12%] left-[24%] sm:top-[8%] sm:left-[18%]", delay: 0.3 },
    { text: "book the cheapest flight under $400", positionClass: "top-[14%] left-[56%]", delay: 3.6, hideOnMobile: true },
    { text: "find me a hotel near the venue", positionClass: "top-[74%] left-[14%] sm:top-[42%] sm:left-[10%]", delay: 2.9 },
    { text: "rebook me if my flight gets delayed", positionClass: "top-[46%] left-[42%] sm:top-[48%] sm:left-[50%]", delay: 1.1 },
    { text: "cool places to visit in SF", positionClass: "top-[72%] left-[28%]", delay: 2.3, hideOnMobile: true },
];

function MessageBubble({ text, positionClass, delay, hideOnMobile }: Bubble) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay,
            }}
            style={{ position: "absolute" }}
            className={cn(
                "relative max-w-[180px] sm:max-w-[260px] rounded-2xl bg-blue-500 px-4 py-3 text-[15px] leading-snug text-white shadow-lg",
                positionClass,
                hideOnMobile && "hidden sm:block",
            )}
        >
            {text}
            <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    className="absolute -bottom-[9px] right-2 -scale-x-100"
                >
                    <path d="M0 0 L20 0 L4 13 Q0 14 0 8 Z" fill="#3b82f6" />
                </svg>
        </motion.div>
    );
}

export function FloatingMessageBubbles() {
    return (
        <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative h-72 sm:h-[420px] w-full max-w-200">
                {bubbles.map((b, i) => (
                    <MessageBubble key={i} {...b} />
                ))}
            </div>
        </div>
    );
}