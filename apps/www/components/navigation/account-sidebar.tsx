"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "./profile-dropdown";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronLeft, FingerprintPattern, UserRound } from "lucide-react";
import { useState, useCallback } from "react";



const ACCOUNT = [
  { icon: UserRound, label: "Profile", route: "/account/profile" },
  { icon: FingerprintPattern, label: "Security", route: "/account/security" }
]

export function AccountSidebar() {
  const router = useRouter();
  const pathName = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseLeave = useCallback(() => setHoveredItem(null), []);

  return (
    <Sidebar variant="inset" className="bg-background select-none">
      <SidebarHeader className="bg-background">
        <Button
          variant={"ghost"}
          className={cn("justify-start")}
          onClick={() => router.push("/ask")}
        >
          <ChevronLeft />
          <div>Back</div>
        </Button>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup onMouseLeave={handleMouseLeave}>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          {ACCOUNT.map(({ icon: Icon, label, route }) => {
            const isActive = pathName === route;
            return (
              <SidebarMenuItem
                key={label}
                className="relative"
                onMouseEnter={() => setHoveredItem(label)}
              >
                {hoveredItem === label && (
                  <motion.div
                    layoutId="account-sidebar-hover-bg"
                    className="absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-900"
                    transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                    style={{ zIndex: 0 }}
                  />
                )}
                <SidebarMenuButton
                  onClick={() => router.push(route)}
                  className={cn(
                    "relative z-[1] cursor-pointer hover:bg-transparent! active:bg-transparent!",
                    isActive ? "text-foreground" : "text-neutral-500"
                  )}
                >
                  <Icon />
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-dot"
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-pink-500"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-background">
        <div className="flex items-center justify-between cursor-pointer">
          <ProfileDropdown />
          <div className="flex items-center gap-1.5">
            <Button
              variant={"outline"}
              size={"icon-xs"}
              className={"rounded-full"}
            >
              <Bell />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
