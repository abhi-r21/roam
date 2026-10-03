"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuChevronUp, LuChevronDown } from "react-icons/lu";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Roam?",
    answer:
      "Roam is a travel platform designed for AI agents. Sellers join once, and agents can find, book, and manage trips directly - no human websites, no clicking.",
  },
  {
    question: "Do I need my own AI agent to use Roam?",
    answer:
      "No. Roam has its own agent that finds, books, and manages travel for you. If you already have an agent, it can use Roam too.",
  },
  {
    question: "How is Roam different from a booking site?",
    answer:
      "Booking sites were built for people to search and click. Roam is built for agents - they work with sellers directly, so bookings and changes don't break.",
  },
  {
    question: "What happens if something goes wrong on my trip?",
    answer:
      "Roam stays with the whole trip. If a plan breaks at 2am, your agent works to fix it - you're not left rebooking alone.",
  },
  {
    question: "Is my booking actually with the airline or hotel?",
    answer:
      "Yes. Roam connects you to the seller directly - bookings, changes, and support stay tied to them.",
  },
  {
    question: "I'm a travel seller. Why join Roam?",
    answer:
      "Join once, and every agent on Roam can find and book you. Agents become a new way to reach travelers, while you keep owning the trip.",
  },
  {
    question: "What can I book through Roam?",
    answer:
      "Flights, stays, and more - anything our sellers offer, all in one flow.",
  },
];

export function FAQs() {
  const [openIdex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIdex === index ? null : index);
  };
  return (
    <section id="faqs" className="mx-auto h-full max-w-7xl">
      <div className="flex justify-evenly gap-60 rounded-[35px] bg-neutral-900 py-40">
        <div className="relative mt-3">
          <h2 className="pl-15 font-sans text-4xl leading-11 font-semibold tracking-tight text-white">
            Frequently <br></br>Asked Question's
          </h2>
        </div>

        <div className="mr-10 divide-y border-white/10 pr-4">
          {faqs.map((faq, index) => {
            const isOpen = openIdex === index;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-[600px] items-center justify-between py-4 text-left"
                >
                  <span className="font-mono text-lg font-bold tracking-tight text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? (
                      <LuChevronUp className="size-5 text-white" />
                    ) : (
                      <LuChevronDown className="size-5 text-white" />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-base leading-7 text-white/75">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
