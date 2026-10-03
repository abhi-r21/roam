"use client";
import React, { useEffect } from "react";
import { useAnimate, motion, stagger, useInView } from "motion/react";

export function AnimatedText() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.5 });
  const text =
    "Travel was built for people to click. Roam is travel designed for agents. Sellers join once, and agents find, book, and manage trips directly. The entire trip, in one flow.";
  const words = text.split(" ");

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { opacity: 1, y: 0, filter: "blur(0px)" },
        { duration: 0.5, ease: "easeOut", delay: stagger(0.05) },
      );
    }
  }, [isInView, animate]);

  return (
    <section className="mx-auto flex h-screen max-w-7xl items-center justify-center py-20">
      <h1
        ref={scope}
        className="font-gp text-center text-[68px] leading-18 tracking-normal text-gray-200"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            className="mr-[0.25em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h1>
    </section>
  );
}
