"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { IoChatbubbles } from "react-icons/io5";
import { toast } from "sonner";

export function Hero() {
    return (
        <div className="max-w-3xl w-full mx-auto pt-32 px-4 sm:px-6 z-10">
            <h1 className="font-medium text-3xl sm:text-6xl max-w-xs sm:max-w-2xl mx-auto text-center font-gp leading-10 sm:leading-16 tracking-tight">
                Hey there, I'm Yuvly.
            </h1>

            <h2 className="text-center text-neutral-500 mt-8 max-w-sm md:max-w-md mx-auto tracking-tight text-lg">
            your travel buddy — I plan it, book it, fix it when things go sideways.
            </h2>

            <div className="min-w-full">
                <motion.button
                    onClick={() => toast("Yuvly here!", {
                        description: "Hey, thanks for stopping by — I'm still in active build. Join the waitlist and I'll be ready to handle your travel the moment I ship.",
                        style: {
                            background: "black",
                            color: "white",
                            borderColor: "black",
                            padding: "15px",
                            fontSize: "14px",
                            borderRadius: "20px",
                            fontWeight: "normal"
                        },
                        duration: 5000,
                    })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{
                        ease: "easeOut",
                        duration: 0.2
                    }}
                    className={cn(
                        "flex items-center gap-2",
                        "rounded-full mt-8 px-6 py-3 text-[17px] font-medium",
                        "bg-neutral-950 text-white cursor-pointer tracking-tight mx-auto",
                    )}
                >
                    <IoChatbubbles size={30} />
                    Tap on Yuvly
                </motion.button>
            </div>
        </div>
    );
}


