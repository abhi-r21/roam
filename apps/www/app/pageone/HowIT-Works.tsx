"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { LuAlignCenter } from "react-icons/lu";
import Menu from "@/components/landing/hero";

type Step = {
  title: string;
  description: string;
  image: string;
  alt: string;
};
const STEPS: Step[] = [
  {
    title: "Create your organization",
    description: "Set up your company and invite the team in minutes.",
    image: "/images/",
    alt: "",
  },
  {
    title: "Set your travel policy",
    description:
      "Add your own or generate one. Roam applies it to every booking, automatically.",
    image: "/images/",
    alt: "",
  },
  {
    title: "Connect your chat",
    description:
      "Bring Roam into Slack or iMessage. Your team plans travel where they already talk.",
    image: "/images/iMessage.jpg",
    alt: "",
  },
  {
    title: "Plan, book, manage",
    description:
      "Every trip handled end to end - bookings, changes, and 2am fixes included.",
    image: "/images/Depatures.jpg",
    alt: "Depatures",
  },
];

function StepText({
  step,
  index,
  active,
  onActive,
  reduceMotion,
}: {
  step: Step;
  index: number;
  active: boolean;
  onActive: (index: number) => void;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center py-12 md:min-h-[80vh] md:py-0"
    >
      <div className="relative mb-8 aspect-4/3 overflow-hidden rounded-2xl bg-zinc-200 md:hidden dark:bg-zinc-800">
        <Image
          src={step.image}
          alt={step.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <motion.div
        animate={{ opacity: active ? 1 : 0.35 }}
        transition={{ duration: reduceMotion ? 0 : 0.4 }}
      >
        <span className="block text-6xl font-semibold text-zinc-300 tabular-nums md:text-7xl dark:text-zinc-700">
          {index + 1}
        </span>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-50">
          {step.title}
        </h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}
export default function SeeHowItWorks() {
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);

  return (
    <section
      id="Howitworks"
      className="mx-auto min-h-screen max-w-5xl bg-neutral-950 py-10"
    >
      <div className="flex justify-end">
        <button className="mb-10 flex items-center justify-center text-sm text-white">
          <Menu />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-gp text-6xl font-semibold tracking-tight">
          How it Works
        </h1>
        <p className="mt-5 max-w-3xl text-center align-middle text-lg text-zinc-600 dark:text-zinc-400">
          Four steps, a few minutes. Set up your organization, add your travel
          policy, and connect the tools your team already uses. Change anything
          later - there's nothing to get wrong.
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pt-12 pb-24 md:grid-cols-2 md:pb-32">
        {/* Pinned image panel (desktop only) */}
        <div className="relative hidden md:block">
          <div className="sticky top-24 flex flex-col gap-5">
            <div
              className="shadow-input relative aspect-4/5 max-h-[600px] w-full overflow-hidden rounded-[60px] bg-zinc-200 dark:bg-zinc-800"
              aria-live="polite"
            >
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: reduceMotion ? 1 : active === i ? 1 : 1.04,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.6,
                    ease: "easeOut",
                  }}
                  aria-hidden={active !== i}
                >
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </motion.div>
              ))}
            </div>

            {/* Progress bars: one per step */}
            <div className="flex gap-2" aria-hidden="true">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
                >
                  <motion.div
                    className="h-full origin-left rounded-full bg-zinc-900 dark:bg-zinc-50"
                    initial={false}
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling steps */}
        <div>
          {STEPS.map((step, i) => (
            <StepText
              key={step.title}
              step={step}
              index={i}
              active={active === i}
              onActive={setActive}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto flex h-fit max-w-7xl items-center justify-center">
        <div className="font-gp text-[200px] font-extrabold tracking-normal text-white">
          RoamAI
        </div>
      </div>
    </section>
  );
}
