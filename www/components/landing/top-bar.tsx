"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";

export function Topbar() {
  const router = useRouter();
  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    const target = id.startsWith("#") ? id : `#${id}`;
    lenis?.scrollTo(target, { duration: 2 });
  };

  return (
    <div className="w-full max-w-360 mx-auto px-4 sm:px-6">
      <div className={cn("flex items-center justify-between w-full bg-[#FCFCFD]")}>
        <div className={cn("flex items-center relative")}>
          <Image src={"/yuvly_new.svg"} alt="logo" width={50} height={50} />
          <p className="font-sans text-2xl tracking-tighter font-medium absolute -right-11">
            Yuvly
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              "hidden sm:flex items-center gap-2",
              "text-sm tracking-normal font-normal",
            )}
          >
            <a href="#" className="cursor-pointer hover:bg-neutral-100 px-4 py-2 rounded-lg transition-all">Enterprise</a>
            <button onClick={() => scrollToSection("#how-it-works")} className="cursor-pointer hover:bg-neutral-100 px-4 py-2 rounded-lg transition-all">How it works</button>
            <button onClick={() => scrollToSection("#faq")} className="cursor-pointer hover:bg-neutral-100 px-4 py-2 rounded-lg transition-all">FAQ</button>
          </div>
          <Button
            size={"sm"}
            onClick={() => router.push("/waitlist")}
            className={cn("rounded-full cursor-pointer")}
          >
            Join waitlist
          </Button>
        </div>
      </div>
    </div>
  );
}
