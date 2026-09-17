import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <SidebarProvider className="bg-background!">
        <AppSidebar />
        <SidebarInset className="border overflow-hidden">
            <main className={cn("w-full h-full bg-neutral-100 dark:bg-neutral-950")}>
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
}
