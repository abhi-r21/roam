"use client";

import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modal-store";
import { SlidePanel } from "@/components/ui/slide-panel";
import {
  Ellipsis,
  UserRoundPlus,
  ShieldCheck,
  UserX,
} from "lucide-react";
import { FaCrown } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";


declare module "@/stores/slide-panel-store" {
  interface SlidePanelRegistry {
    members: { organizationId?: string };
  }
}

interface Member {
  memberId: string;
  orgId: string;
  emailAddress: string;
  userId: string;
  imageUrl: string;
  role: string;
}

export function MembersPanel() {
  const openModal = useModalStore((s) => s.open);
  const { user } = useUser();
  const [members, setMembers] = useState<Member[]>([]);

  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) => {
      const aIsAdmin = a.role === "org:admin" ? 0 : 1;
      const bIsAdmin = b.role === "org:admin" ? 0 : 1;
      if (aIsAdmin !== bIsAdmin) return aIsAdmin - bIsAdmin;

      const aIsCurrentUser = a.userId === user?.id ? 0 : 1;
      const bIsCurrentUser = b.userId === user?.id ? 0 : 1;
      return aIsCurrentUser - bIsCurrentUser;
    });
  }, [members, user?.id]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/organization/members", { withCredentials: true });
        const res = response.data?.data?.members;
        setMembers(Array.isArray(res) ? res : []);
      } catch (error) {

      }
    }

    fetchMembers()
  }, [])

  return (
    <SlidePanel
      panelKey="members"
      title="Members"
      width={300}
      headerAction={
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          onClick={() => openModal("invite")}
          className={"text-muted-foreground hover:text-foreground"}
        >
          <UserRoundPlus className="h-4 w-4" />
        </Button>
      }
    >
      <div className={cn("flex flex-col w-full h-full px-2 py-2 bg-[#0E0E0E]")}>
        <div className={cn("flex flex-col gap-0.5")}>
          {sortedMembers.map((member) => {
            const displayName = member.emailAddress.split("@")[0];
            const isAdmin = member.role === "org:admin";

            return (
              <div
                key={member.memberId}
                className="group/member flex items-center justify-between w-full rounded-md px-2 py-1.5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {/* Avatar */}
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={displayName}
                      className="w-6 h-6 rounded-full shrink-0 object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-900 shrink-0" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-sm truncate">{displayName}</span>
                      {isAdmin && (
                        <Tooltip>
                          <TooltipTrigger>
                            <FaCrown className="text-yellow-500 shrink-0" size={12} />
                          </TooltipTrigger>
                          <TooltipContent
                            showArrow={false}
                            className="bg-popover text-popover-foreground text-[10px] px-2 py-0.5 rounded-md border border-border shadow-sm"
                            sideOffset={6}
                          >
                            Admin
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ellipsis — visible only on hover */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        size={"icon-xs"}
                        variant={"ghost"}
                        className="opacity-0 group-hover/member:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                      />
                    }
                  >
                    <Ellipsis className="h-3.5 w-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" side="bottom" sideOffset={4}>
                    {/* Extra member data */}
                    <div className="px-1.5 py-1.5">
                      <p className="text-xs font-medium truncate">{member.emailAddress}</p>
                      <p className="text-[10px] text-muted-foreground capitalize">
                        {member.role.replace("org:", "")}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <ShieldCheck className="h-4 w-4" />
                      Change role
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      <UserX className="h-4 w-4" />
                      Remove member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      </div>
    </SlidePanel>
  );
}
