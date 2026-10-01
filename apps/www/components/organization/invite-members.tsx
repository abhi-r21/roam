"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useModalStore } from "@/stores/modal-store"
import { UserRoundPlus } from "lucide-react"


export function InviteMembers() {
    const open = useModalStore((s) => s.open)

    return <div className={cn("flex flex-col w-full h-full px-4 py-2.5")}>
        <div className="flex items-center justify-between w-full">
            <div>
            <h1 className="text-sm font-medium">Members</h1>
            <h2 className="text-sm text-muted-foreground">Manage team members and invitations.</h2>
            </div>
            <Button
                size={"xs"}
                className={cn(
                    "bg-blue-700! border border-blue-600! text-white tracking-tight cursor-pointer",
                )}
                onClick={() => open("invite")}
            >
                <UserRoundPlus />
                Invite
            </Button>
        </div>
    </div>
}

