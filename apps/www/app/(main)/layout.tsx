import { cn } from "@/lib/utils";
import { SidebarSwitch } from "@/components/navigation/sidebar-switch";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <SidebarProvider className="bg-background!">
        <SidebarSwitch />
        <SidebarInset className="border-t border-x shadow-none! overflow-hidden">
            <main className={cn("w-full h-full bg-neutral-50 dark:bg-neutral-950")}>
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
}
