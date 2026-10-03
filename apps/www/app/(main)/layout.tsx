import { cn } from "@/lib/utils";
import { SidebarSwitch } from "@/components/navigation/sidebar-switch";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-background!">
      <SidebarSwitch />
      <SidebarInset className="overflow-hidden border-x border-t shadow-none!">
        <main className={cn("h-full w-full bg-neutral-50 dark:bg-neutral-950")}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
