"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  Cog,
  LogOut,
  Monitor,
  MoonStar,
  Palette,
  Sun,
  UserRound,
} from "lucide-react";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useCallback } from "react";


const FOOTER_ITEMS = [
  {
    name: "Profile",
    icon: UserRound,
    route: "/account/profile",
  },
];

export function ProfileDropdown() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseLeave = useCallback(() => setHoveredItem(null), []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-between gap-1.5 cursor-pointer">
          <div  className="w-4 h-4 rounded-full bg-blue-500"/>
          <div className="text-[13px]">
            {user?.emailAddresses[0].emailAddress.split("@")[0]}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={12}
        alignOffset={-8}
        className={cn(
          "min-w-68 bg-background border border-neutral-100 dark:border-neutral-900 shadow-none! rounded-2xl",
        )}
        onMouseLeave={handleMouseLeave}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            onMouseEnter={() => setHoveredItem("profile-header")}
            onClick={() => router.push("/account/profile")}
            className={cn(
              "flex items-center justify-between py-3 text-[13px] cursor-pointer rounded-lg",
              "focus:bg-transparent! relative",
            )}
          >
            {hoveredItem === "profile-header" && (
              <motion.div
                layoutId="dropdown-hover-bg"
                className="absolute inset-0 rounded-lg bg-neutral-100 dark:bg-neutral-900"
                transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-[1] flex items-center justify-between w-full">
              <div className="flex flex-col">
                <p>yuvan</p>
                <p className="text-neutral-500!">
                  {user?.emailAddresses[0].emailAddress}
                </p>
              </div>
              <Button size={"icon-xs"} variant={"ghost"}>
                <Cog />
              </Button>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="space-y-1">
          {FOOTER_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                key={item.name}
                onMouseEnter={() => setHoveredItem(item.name)}
                onClick={() => router.push(item.route)}
                className="text-sm relative focus:bg-transparent!"
              >
                {hoveredItem === item.name && (
                  <motion.div
                    layoutId="dropdown-hover-bg"
                    className="absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-900"
                    transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                    style={{ zIndex: 0 }}
                  />
                )}
                <span className="relative z-1 flex items-center gap-1.5 w-full">
                  <Icon className="text-neutral-400" />
                  {item.name}
                </span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem
            onMouseEnter={() => setHoveredItem("theme")}
            className={cn(
              "text-sm flex items-center justify-between relative focus:bg-transparent!",
            )}
            onSelect={(e) => e.preventDefault()}
          >
            {hoveredItem === "theme" && (
              <motion.div
                layoutId="dropdown-hover-bg"
                className="absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-900"
                transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-[1] flex items-center justify-between w-full">
              <SelectTheme />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onMouseEnter={() => setHoveredItem("signout")}
            className="text-sm relative focus:bg-transparent!"
            onClick={() => {}}
          >
            {hoveredItem === "signout" && (
              <motion.div
                layoutId="dropdown-hover-bg"
                className="absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-900"
                transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-[1] flex items-center gap-1.5 w-full">
              {isSignedIn && (
                <>
                  <LogOut className="text-neutral-400" />
                  <SignOutButton />
                </>
              )}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const SelectTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="flex items-center gap-2">
        <Palette className="text-neutral-400" />
        <div>Theme</div>
      </div>

      <div
        className={cn(
          "rounded-full border border-border bg-background flex items-center gap-0.5 p-0.5 relative shrink-0",
        )}
      >
        {[
          {
            value: "system",
            icon: Monitor,
            label: "System",
          },
          { value: "light", icon: Sun, label: "Light" },
          {
            value: "dark",
            icon: MoonStar,
            label: "Dark",
          },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = theme === item.value;
          return (
            <div
              key={item.label}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setTheme(item.value);
              }}
              className="relative z-10 cursor-pointer rounded-full p-1"
            >
              {isActive && (
                <motion.div
                  layoutId="theme-indicator"
                  className="absolute inset-0 rounded-full border bg-background shadow-sm z-0"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              <Icon
                className={cn(
                  "relative z-10 transition-colors size-3",
                  isActive ? "text-foreground" : "text-neutral-400",
                )}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
