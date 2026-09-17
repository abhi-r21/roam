"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Triangle } from "@/components/icons";
import { useAuth } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import { TbNavigationFilled } from "react-icons/tb";

export function Topbar() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  return (
    <header className="w-full px-4 py-4 sm:px-6 sm:py-5">
      <div className={cn("flex w-full items-center justify-between")}>
        <div className="flex items-center gap-2">
          <TbNavigationFilled />
        </div>

        {isSignedIn ? (
          <Button
            size="sm"
            className={cn("cursor-pointer rounded-full")}
            onClick={() => router.push("/ask")}
          >
            Open app
            <ChevronRight />
          </Button>
        ) : (
          <Button
            size="sm"
            className={cn("cursor-pointer rounded-full")}
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>
        )}
      </div>
    </header>
  );
}
