"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const links = [
  {
    name: "Enterprise",
    href: "#"
  },
  {
    name: "How it works",
    href: "#"
  },
  {
    name: "FAQ",
    href: "#"
  }
]

export function Topbar() {
  const router = useRouter();

  return (
    <div className="w-full max-w-360 mx-auto">
      <div className={cn("flex items-center justify-between w-full bg-[#FCFCFD]")}>
        <div className={cn("flex items-center relative")}>
          <Image src={"/yuvly_new.svg"} alt="logo" width={50} height={50} />
          <p className="font-sans text-2xl tracking-tighter font-medium absolute -right-11">
            Yuvly
          </p>
        </div>

        <div
          className={cn(
            "flex items-center gap-2",
            "text-sm tracking-normal font-normal",
          )}
        >
          {links.map(link => <a key={link.name} className="cursor-pointer hover:bg-neutral-100 px-4 py-2 rounded-lg transition-all">{link.name}</a>)}
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
