"use client";

import {
  Cog,
  LogOut,
  Monitor,
  MoonStar,
  Palette,
  Sun,
  UserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "../ui/button";

const FOOTER_ITEMS = [
  {
    name: "Profile",
    icon: UserRound,
    route: "/settings/profile",
  },
];

export function ProfileDropdown() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-between gap-1.5 cursor-pointer">
          <div className="bg-pink-500 w-4 h-4 rounded-full" />
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
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/account/settings")}
            className={cn(
              "flex items-center justify-between py-3 text-[13px] cursor-pointer rounded-lg",
              "hover:bg-neutral-900! [&:focus:not(:hover)]:bg-transparent!",
            )}
          >
            <div className="flex flex-col">
              <p>yuvan</p>
              <p className="text-neutral-500">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
            <Button size={"icon-xs"} variant={"ghost"}>
              <Cog />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="space-y-1">
          {FOOTER_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                key={item.name}
                onClick={() => router.push(item.route)}
                className="text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <Icon className="text-neutral-400" />
                {item.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem
            className={cn(
              "text-sm flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-900",
            )}
            onSelect={(e) => e.preventDefault()}
          >
            <SelectTheme />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
            onClick={() => {}}
          >
            {isSignedIn && (
              <>
                <LogOut className="text-neutral-400" />
                Sign Out
              </>
            )}
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
