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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Triangle } from "@/components/icons";
import { Cog, MessagesCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";


const INTERACTION_GROUP_ITEMS = [
  { icon: MessagesCircle, label: "Ask", route: "/ask" },
  { icon: Cog, label: "Settings", route: "/settings" }
]

export function AppSidebar() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Sidebar variant="inset" className="bg-background">
      <SidebarHeader className="bg-background">
        <div className={cn("flex items-center justify-between")}>
          <div className="flex items-center">
            <Triangle size={25}/>
            <div className={cn("flex flex-col")}>
              <h1 className="text-[14px] font-medium tracking-tight">Roam</h1>
            </div>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel>Interaction</SidebarGroupLabel>
          {INTERACTION_GROUP_ITEMS.map(({ icon: Icon, label, route }) => {
            const isActive = pathName === route;
            return (
              <SidebarMenuItem key={label} className="relative">
                <SidebarMenuButton
                  onClick={() => router.push(route)}
                  className={cn(
                    "relative hover:bg-neutral-900 cursor-pointer",
                    isActive ? "text-neutral-100" : "text-neutral-500"
                  )}
                >
                  <Icon />
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-dot"
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-blue-500"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-background"></SidebarFooter>
    </Sidebar>
  );
}
