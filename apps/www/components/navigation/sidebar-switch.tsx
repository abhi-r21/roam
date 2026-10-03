"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "./app-sidebar";
import { AccountSidebar } from "./account-sidebar";

export function SidebarSwitch() {
  const pathname = usePathname();

  if (pathname.startsWith("/account")) {
    return <AccountSidebar />;
  }

  return <AppSidebar />;
}
