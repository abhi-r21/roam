"use client";

import { Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Security() {
  return (
    <main className="flex h-full w-full flex-col">
      <div className="mx-auto max-w-7xl py-2.5">
        <h1 className="mx-auto tracking-normal">Security</h1>
      </div>
      <Separator />
      {/* Main Area */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-16 overflow-scroll pt-10">
        <div className="w-full">
          <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-normal uppercase">
            password
          </h2>
          <div className="flex w-full items-center justify-between">
            <p className="text-sm tracking-tight">***************</p>
            <Button size={"xs"} variant={"outline"}>
              Update
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-normal uppercase">
            passkeys
          </h2>
          <div className="flex w-full items-center justify-between">
            <p className="text-sm tracking-tight">
              Add a passkey to sign in without entering a password.
            </p>
            <Button size={"xs"} variant={"outline"}>
              + Add passkey
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-normal uppercase">
            two-step verification
          </h2>
          <div className="flex w-full items-center justify-between">
            <p className="text-sm tracking-tight">
              Add an extra layer of security to your account.
            </p>
            <Button size={"xs"} variant={"outline"}>
              + Add two-step
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-normal uppercase">
            active devices
          </h2>
          <div className="mt-4 flex w-full items-start justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Monitor size={16} />
                <p className="text-sm">Windows</p>

                <span className="bg-muted rounded-md px-2 py-0.5 text-xs">
                  This device
                </span>
              </div>

              <p className="text-muted-foreground text-sm">Firefox 156.0</p>

              <p className="text-muted-foreground text-sm">Chennai, India</p>

              <p className="text-muted-foreground text-sm">Today at 12:02 PM</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-normal uppercase">
            delete account
          </h2>
          <div className="flex w-full items-center justify-between">
            <p className="text-sm tracking-tight">
              Permanently delete your account and all associated data.
            </p>
            <Button size={"xs"} variant={"destructive"} className="">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
