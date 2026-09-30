"use client"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { UserRoundPlus } from "lucide-react"
import { InviteModal } from "./modals/invite-modal"
import { Input } from "../ui/input"

export function InviteMembers() {
    return <div className={cn("flex flex-col w-full h-full px-4 py-2.5")}>
        <div className="flex items-center justify-between w-full">
            <div>
            <h1 className="text-sm font-medium">Members</h1>
            <h2 className="text-sm text-muted-foreground">Manage team members and invitations.</h2>
            </div>

            <InviteModal />
        </div>
    </div>
}
