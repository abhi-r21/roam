import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="w-full px-4 py-4 sm:px-6 sm:py-5">
      <div className={cn("flex w-full items-center justify-between")}>
        <div className="flex items-center gap-2">
          <Image
            src={"/oneworks-avatar-dog-256 (3).svg"}
            alt="Yuvi logo"
            width={40}
            height={40}
            loading="eager"
          />
          <p className="font-gp text-2xl font-medium tracking-tighter">
            Yuvi
          </p>
        </div>

        <Button
          size="sm"
          className={cn("cursor-pointer rounded-full")}
        >
          Get Started
        </Button>
      </div>
    </header>
  );
}
