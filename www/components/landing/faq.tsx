"use client"

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Plus } from "lucide-react";
import { LuUserRound } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { enterpriseFAQs, FAQItem, personalFAQs } from "@/config/faq";


export function FAQ() {
    const [active, setActive] = useState<"personal" | "enterprise">("personal");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = active === "personal" ? personalFAQs : enterpriseFAQs;
    const handleToggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };


    return (
        <div className={cn("max-w-7xl mx-auto mt-16 min-h-160 h-full")}>
            <h3 className={cn("text-[40px] font-is tracking-tight text-center mx-auto")}>
                Questions, answered.
            </h3>
            {/* Toggle b/w Personal and Enterprise btns*/}
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
                        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                        className="absolute inset-y-[2.5px] left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm"
                    />
                </div>
            </div>
            
            {/* QnA Render */}
            <div className="mt-12 mx-auto">
                <div className="border-t border-neutral-200 min-w-2xl max-w-2xl w-full">
                    {faqs.map((item, index) => (
                        <FAQAccordionItem
                            key={`${active}-${index}`}
                            item={item}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}


function FAQAccordionItem({
    item,
    isOpen,
    onToggle,
}: {
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-neutral-200 min-w-full tracking-tight">
            <button
                onClick={onToggle}
                className="flex min-w-full items-center justify-between py-4 text-left cursor-pointer"
            >
                <span className="text-[16px] text-neutral-900">{item.question}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                    className="ml-4 shrink-0 text-neutral-500"
                >
                    <Plus size={15} />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                        animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                        exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.7 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-neutral-500 leading-relaxed pr-10 text-sm">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}