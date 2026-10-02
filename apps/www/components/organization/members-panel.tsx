"use client";

import axios, { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modal-store";
import { SlidePanel } from "@/components/ui/slide-panel";
import {
  Ellipsis,
  UserRoundPlus,
} from "lucide-react";
import { FaCrown} from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TbArrowsExchange } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { motion } from "motion/react";
import { BsTrash2Fill } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "sonner";


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
  const { orgRole } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);

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


  const handleRemoveMemberFromOrg = async (userId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/organization/remove-member?memberUserId=${userId}`,
        { withCredentials: true }
      )

      if (response.status !== 200) {
        const message =
          (response.data && (response.data.message || response.data.error)) ||
          "Failed to remove member from organization."
        toast.error(message)
        return
      }

      toast.success("Member removed from organization successfully.")
    } catch (error) {
      console.error(error)

      if (error instanceof AxiosError) {
        const status = error.response?.status
        const backendMessage =
          error.response?.data?.message || error.response?.data?.error

        if (status === 403) {
          toast.error("You do not have permission to remove a member from this organization.")
        } else if (status === 404) {
          toast.error("Member not found in this organization.")
        } else if (status === 500) {
          toast.error("Server error while removing member. Please try again later.")
        } else if (backendMessage) {
          toast.error(backendMessage)
        } else {
          toast.error("Failed to remove member from organization. Please try again.")
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.")
      }
    }
  }

  const handleChangeRole = async (memberId: string, newRole: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/organization/member/change?role=${newRole.toLowerCase().trim()}&memberUserId=${memberId}`,
        { memberId, role: newRole },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        const message =
          (response.data && (response.data.message || response.data.error)) ||
          "Failed to change member role.";
        toast.error(message);
        return;
      }

      setMembers((prev) =>
        prev.map((m) =>
          m.memberId === memberId ? { ...m, role: newRole } : m
        )
      );
      toast.success("Member role updated successfully.");
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const backendMessage =
          error.response?.data?.message || error.response?.data?.error;

        if (status === 403) {
          toast.error("You do not have permission to change roles.");
        } else if (backendMessage) {
          toast.error(backendMessage);
        } else {
          toast.error("Failed to change member role. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };


  return (
    <SlidePanel
      panelKey="members"
      title="Members"
      width={300}
      headerAction={
        orgRole === "org:admin" ? (
          <Button
            size={"icon-sm"}
            variant={"ghost"}
            onClick={() => openModal("invite")}
            className={"text-muted-foreground hover:text-foreground"}
          >
            <UserRoundPlus className="h-4 w-4" />
          </Button>
        ) : null
      }
    >
      <div className={cn("flex flex-col w-full h-full px-2 py-2 bg-neutral-100 dark:bg-[#0D0D0D]")}>
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

                {/* Ellipsis — visible only on hover, admin only, not on self */}
                {orgRole === "org:admin" && member.userId !== user?.id && (
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
                  <DropdownMenuContent
                    align="end"
                    side="bottom"
                    sideOffset={8}
                    className={cn(
                      "min-w-50 bg-[#0E0E0E]! border border-neutral-100 dark:border-neutral-900 shadow-none! rounded-2xl",
                    )}
                    onMouseLeave={() => setHoveredMenuItem(null)}
                  >
                    <DropdownMenuGroup className="space-y-1">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                          onMouseEnter={() => setHoveredMenuItem(`${member.memberId}-change-role`)}
                          className="relative text-[0.79rem] focus:bg-transparent! data-popup-open:bg-transparent! data-open:bg-transparent! cursor-pointer"
                        >
                          {hoveredMenuItem === `${member.memberId}-change-role` && (
                            <motion.div
                              layoutId="member-menu-hover"
                              className="absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-900"
                              transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                            />
                          )}
                          <span className="relative z-1 flex items-center gap-1.5 w-full">
                            <TbArrowsExchange size={20} className="text-neutral-400" />
                            Change role
                          </span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent
                          className="min-w-36 bg-[#0E0E0E]! border border-neutral-100 dark:border-neutral-900 shadow-none! rounded-2xl"
                          sideOffset={8}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                        >
                          <DropdownMenuRadioGroup
                            value={member.role}
                            onValueChange={(newRole) => handleChangeRole(member.userId, newRole as string)}
                          >
                            <DropdownMenuRadioItem
                              value="org:admin"
                              onMouseEnter={() => setHoveredMenuItem(`${member.memberId}-role-admin`)}
                              className="relative text-[0.79rem] cursor-pointer focus:bg-transparent!"
                            >
                              {hoveredMenuItem === `${member.memberId}-role-admin` && (
                                <motion.div
                                  layoutId="member-role-hover"
                                  className="absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-900"
                                  transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                                />
                              )}
                              <span className="relative z-1">Admin</span>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value="org:member"
                              onMouseEnter={() => setHoveredMenuItem(`${member.memberId}-role-member`)}
                              className="relative text-[0.79rem] cursor-pointer focus:bg-transparent!"
                            >
                              {hoveredMenuItem === `${member.memberId}-role-member` && (
                                <motion.div
                                  layoutId="member-role-hover"
                                  className="absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-900"
                                  transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                                />
                              )}
                              <span className="relative z-1">Member</span>
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuItem
                        variant="destructive"
                        onMouseEnter={() => setHoveredMenuItem(`${member.memberId}-remove`)}
                        className="relative text-[0.79rem] focus:bg-transparent!"
                      >
                        {hoveredMenuItem === `${member.memberId}-remove` && (
                          <motion.div
                            layoutId="member-menu-hover"
                            className="absolute inset-0 rounded-md bg-destructive/10"
                            transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                          />
                        )}
                        <span onClick={() => handleRemoveMemberFromOrg(member.userId)} className="relative z-1 flex items-center gap-1.5 w-full">
                          <BsTrash2Fill size={20} className=""/>
                          <p>Remove from organization</p>
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SlidePanel>
  );
}
