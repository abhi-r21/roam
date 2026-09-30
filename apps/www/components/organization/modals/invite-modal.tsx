"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AppleSwitch } from "@/components/unlumen-ui/apple-switch";
import { cn } from "@/lib/utils";
import { Plus, UserRoundPlus } from "lucide-react";
import { useState } from "react";

export function InviteModal() {
  const [enabled, setEnabled] = useState(false);
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            size={"xs"}
            className={cn(
              "bg-blue-700! border border-blue-600! text-white  tracking-tight cursor-pointer",
            )}
          >
            <UserRoundPlus />
            Invite
          </Button>
        }
      />

      <DialogContent className={cn("p-0 gap-0 overflow-hidden bg-neutral-900")}>
        <div className="px-4 rounded-b-2xl bg-neutral-950 py-4 border-b">
          <div>
            <p className="font-medium">Invite Members</p>
            <p className="text-muted-foreground text-xs">
              Add members by entering or pasting emails at once.
            </p>
          </div>

          <div className="flex flex-col mt-6 h-full no-scrollbar min-h-[30vh] overflow-y-auto">
            <div className="flex-1 flex flex-col gap-2 h-full">
              <div className="flex items-center gap-x-3 justify-between">
                <Input
                  className="text-sm! focus:ring-0! border-none"
                  placeholder="New email"
                />
                <AppleSwitch
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  size="sm"
                  tone="accent"
                />
              </div>
              <div className="flex items-center gap-x-3 justify-between">
                <Input
                  className="text-sm! focus:ring-0! border-none"
                  placeholder="New email"
                />
                <AppleSwitch
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  size="sm"
                  tone="accent"
                />
              </div>
              <div className="flex items-center gap-x-3 justify-between">
                <Input
                  className="text-sm! focus:ring-0! border-none"
                  placeholder="New email"
                />
                <AppleSwitch
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  size="sm"
                  tone="accent"
                />
              </div>
              <Button size={"xs"} variant={"ghost"}>
                <Plus />
                Add email
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center px-4 gap-x-2 py-2 bg-neutral-900">
          <Button
            size={"xs"}
            className={"flex-1 bg-neutral-800! border-neutral-700"}
            variant={"outline"}
          >
            Cancel
          </Button>
          <Button
            size={"xs"}
            className={"flex-1 bg-blue-700! border border-blue-600! text-white"}
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
