"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Bell,
  Cog,
  ChevronRight,
  MessagesCircle,
  ScrollText,
  type LucideIcon,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { TbNavigationFilled } from "react-icons/tb";
import { motion, AnimatePresence } from "motion/react";
import { useSlidePanelStore } from "@/stores/slide-panel-store";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "./profile-dropdown";
import { useState, useCallback } from "react";

type SubItem = {
  icon: LucideIcon;
  label: string;
  route: string;
};

type NavItem = {
  icon: LucideIcon;
  label: string;
  route: string;
  subItems?: SubItem[];
  /** If set, clicking this item toggles a slide panel instead of navigating. */
  panelKey?: string;
};

const INTERACTION_GROUP_ITEMS: NavItem[] = [
  { icon: MessagesCircle, label: "Ask", route: "/ask" },
  {
    icon: Cog,
    label: "Settings",
    route: "/org/settings",
    subItems: [{ icon: ScrollText, label: "Policy", route: "/org/policy" }],
  },
];

const ORG_GROUP_ITEMS: NavItem[] = [
  { icon: Users, label: "Members", route: "/members", panelKey: "members" },
];

function ActiveDot() {
  return (
    <motion.div
      layoutId="active-tab-dot"
      className="absolute right-3.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-blue-500"
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
    />
  );
}

export function AppSidebar() {
  const router = useRouter();
  const pathName = usePathname();
  const { user } = useUser();
  const togglePanel = useSlidePanelStore((s) => s.toggle);

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseLeave = useCallback(() => setHoveredItem(null), []);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Check if any sub-item is active for a given parent
  const isSubItemActive = (item: NavItem) =>
    item.subItems?.some((sub) => pathName === sub.route) ?? false;

  return (
    <Sidebar variant="inset" className="bg-background select-none">
      <SidebarHeader className="bg-background">
        <div className={cn("flex items-center justify-between")}>
          <div className="flex items-center gap-0.5">
            <TbNavigationFilled size={16} />
            <div className={cn("flex flex-col")}>
              <h1 className="text-[15.5px] font-medium tracking-tight font-gp">
                Roam
              </h1>
            </div>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup onMouseLeave={handleMouseLeave}>
          <SidebarGroupLabel>Interaction</SidebarGroupLabel>
          {INTERACTION_GROUP_ITEMS.map((item) => {
            const { icon: Icon, label, route, subItems } = item;
            const hasSubItems = subItems && subItems.length > 0;
            const isExpanded = expandedItems[label] ?? isSubItemActive(item);
            const isActive = pathName === route && !isSubItemActive(item);

            return (
              <SidebarMenuItem key={label} className="relative">
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredItem(label)}
                >
                  {hoveredItem === label && (
                    <motion.div
                      layoutId="sidebar-hover-bg"
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
                  <SidebarMenuButton
                    onClick={() => {
                      if (hasSubItems) {
                        toggleExpanded(label);
                      } else if (item.panelKey) {
                        togglePanel(item.panelKey as any);
                      } else {
                        router.push(route);
                      }
                    }}
                    className={cn(
                      "relative z-[1] cursor-pointer hover:bg-transparent! active:bg-transparent!",
                      isActive || isSubItemActive(item)
                        ? "text-foreground"
                        : "text-neutral-500",
                    )}
                  >
                    <Icon />
                    {label}
                    {hasSubItems && (
                      <motion.div
                        className="ml-auto"
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    )}
                    {isActive && <ActiveDot />}
                  </SidebarMenuButton>
                </div>

                {/* Collapsible sub-items */}
                {hasSubItems && (
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <SidebarMenuSub>
                          {subItems.map((sub) => {
                            const SubIcon = sub.icon;
                            const isSubActive = pathName === sub.route;
                            return (
                              <SidebarMenuSubItem
                                key={sub.label}
                                className="relative"
                              >
                                <div
                                  className="relative"
                                  onMouseEnter={() =>
                                    setHoveredItem(`sub-${sub.label}`)
                                  }
                                >
                                  {hoveredItem === `sub-${sub.label}` && (
                                    <motion.div
                                      layoutId="sidebar-hover-bg"
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
                                  <SidebarMenuSubButton
                                    onClick={() => router.push(sub.route)}
                                    className={cn(
                                      "cursor-pointer relative z-[1] hover:bg-transparent! active:bg-transparent! hover:text-current! [&>svg]:text-current!",
                                      isSubActive
                                        ? "text-foreground"
                                        : "text-neutral-500",
                                    )}
                                  >
                                    <SubIcon
                                      className={
                                        isSubActive
                                          ? "text-foreground"
                                          : "text-neutral-500!"
                                      }
                                    />
                                    {sub.label}
                                    {isSubActive && <ActiveDot />}
                                  </SidebarMenuSubButton>
                                </div>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarGroup>

        {/* Organization details – panels only, no page navigation */}
        <SidebarGroup onMouseLeave={handleMouseLeave}>
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          {ORG_GROUP_ITEMS.map((item) => {
            const { icon: Icon, label } = item;

            return (
              <SidebarMenuItem key={label} className="relative">
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredItem(label)}
                >
                  {hoveredItem === label && (
                    <motion.div
                      layoutId="sidebar-hover-bg"
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
                  <SidebarMenuButton
                    onClick={() => {
                      if (item.panelKey) {
                        togglePanel(item.panelKey as any);
                      }
                    }}
                    className={cn(
                      "relative z-[1] cursor-pointer hover:bg-transparent! active:bg-transparent!",
                      "text-neutral-500",
                    )}
                  >
                    <Icon />
                    {label}
                  </SidebarMenuButton>
                </div>
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
