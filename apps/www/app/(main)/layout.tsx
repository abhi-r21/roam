import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <main className={cn("w-full h-full")}>
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
}