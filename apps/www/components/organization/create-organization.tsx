"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { BsCursorFill } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CreateOrganization() {
  const { user } = useUser();

  return (
    <div className={cn("flex flex-col gap-2 w-full relative")}>
      <div className="flex items-end justify-between tracking-tight">
        <div className="flex flex-col">
          <h1 className="text-sm">Create Organization</h1>
          <h2 className="text-neutral-400 text-sm">
            Enter your organization details.
          </h2>
        </div>

        <div className="w-16 h-16 border rounded-xl border-dashed tracking-tight cursor-pointer">
            <div className="flex items-center justify-center gap-1 h-full w-full">
                <BsCursorFill size={14} />
                <p className="text-[0.80rem]">Logo</p>
            </div>
        </div>
      </div>

      <div className="mt-6">
        <Input
          required
          autoFocus
          type="text"
          placeholder="Organization Name"
          className={cn("bg-transparent! border-none focus:ring-0! p-0")}
        />
      </div>

      <Button
        size={"sm"}
        className={cn("mt-10 bg-blue-800! border border-blue-700! text-white tracking-tight")}
      >
        Create Organization
      </Button>

      <p className="mt-6 text-sm text-center tracking-tight">
        Your are signed as{" "}
        <span className="font-medium">
          {user?.emailAddresses[0].emailAddress}.
        </span>{" "}
        <span className="hover:underline cursor-pointer transition-all ml-px">
        Logout
        </span>
      </p>
    </div>
  );
}
