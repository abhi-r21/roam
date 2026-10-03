"use client";
import Link from "next/link";

export function HowItWorks() {
  return (
    <section className="mx-auto h-full max-w-7xl">
      <div className="flex items-center justify-center gap-30 py-30">
        <img
          src={"/images/RoamTwo.jpg"}
          className="shadow-input inset-0 z-0 h-100 w-100 rounded-[60px] object-cover transition-transform duration-500 ease-out hover:scale-110"
        />
        <span className="flex-col items-center justify-center space-y-5 text-white">
          <h1 className="font-gp max-w-sm text-4xl font-bold tracking-tight">
            Every seller, One connection.
          </h1>
          <h2 className="max-w-sm text-[18px] tracking-wide text-neutral-500">
            No more sites, no more clicking. Roam brings travel sellers and
            agents together in one place.
          </h2>
          <Link
            href={"/pageone"}
            className="font-sans font-bold hover:underline"
          >
            See how it works
          </Link>
        </span>
      </div>
    </section>
  );
}
