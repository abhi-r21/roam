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
        <div className="flex cursor-pointer items-center justify-between gap-1.5">
          <div className="h-4 w-4 rounded-full bg-blue-500" />
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
          "bg-background min-w-68 rounded-2xl border border-neutral-100 shadow-none! dark:border-neutral-900",
        )}
        onMouseLeave={handleMouseLeave}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            onMouseEnter={() => setHoveredItem("profile-header")}
            onClick={() => router.push("/account/profile")}
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-lg py-3 text-[13px]",
              "relative focus:bg-transparent!",
            )}
          >
            {hoveredItem === "profile-header" && (
              <motion.div
                layoutId="dropdown-hover-bg"
                className="absolute inset-0 rounded-lg bg-neutral-100 dark:bg-neutral-900"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                  mass: 0.8,
                }}
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-[1] flex w-full items-center justify-between">
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
                className="relative text-sm focus:bg-transparent!"
              >
                {hoveredItem === item.name && (
                  <motion.div
                    layoutId="dropdown-hover-bg"
                    className="absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-900"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.8,
                    }}
                    style={{ zIndex: 0 }}
                  />
                )}
                <span className="relative z-1 flex w-full items-center gap-1.5">
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
              "relative flex items-center justify-between text-sm focus:bg-transparent!",
            )}
            onSelect={(e) => e.preventDefault()}
          >
            {hoveredItem === "theme" && (
              <motion.div
                layoutId="dropdown-hover-bg"
                className="absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-900"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                  mass: 0.8,
                }}
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-[1] flex w-full items-center justify-between">
              <SelectTheme />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onMouseEnter={() => setHoveredItem("signout")}
            className="relative text-sm focus:bg-transparent!"
            onClick={() => {}}
          >
            {hoveredItem === "signout" && (
              <motion.div
                layoutId="dropdown-hover-bg"
                className="absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-900"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                  mass: 0.8,
                }}
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-[1] flex w-full items-center gap-1.5">
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
          "border-border bg-background relative flex shrink-0 items-center gap-0.5 rounded-full border p-0.5",
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
                  className="bg-background absolute inset-0 z-0 rounded-full border shadow-sm"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              <Icon
                className={cn(
                  "relative z-10 size-3 transition-colors",
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
