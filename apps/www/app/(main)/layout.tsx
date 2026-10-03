import { cn } from '@/lib/utils'
import { SidebarSwitch } from '@/components/navigation/sidebar-switch'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { MembersPanel } from '@/components/organization/members-panel'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider className="bg-background!">
      <SidebarSwitch />
      <SidebarInset className="border-t border-x shadow-none! overflow-hidden flex-row!">
        <div
          className={cn(
            'flex-1 min-w-0 flex flex-col bg-neutral-50 dark:bg-neutral-950'
          )}
        >
          {children}
        </div>
        <MembersPanel />
      </SidebarInset>
    </SidebarProvider>
  )
}
