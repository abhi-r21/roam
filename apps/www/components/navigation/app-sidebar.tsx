import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return <Sidebar variant="inset">
    <SidebarHeader>
      <SidebarTrigger />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>

      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
    </SidebarFooter>
  </Sidebar>
}