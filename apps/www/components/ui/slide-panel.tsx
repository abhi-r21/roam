"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { SidebarToggleIcon } from "@/components/unlumen-ui/sidebar-toggle-icon";
import { useSlidePanelStore, type SlidePanelRegistry } from "@/stores/slide-panel-store";

type PanelKey = keyof SlidePanelRegistry;

interface SlidePanelProps {
  /** Which panel key this instance listens to. */
  panelKey: PanelKey;
  /** Panel content. */
  children: React.ReactNode;
  /** Optional title shown in the panel header. */
  title?: string;
  /** Optional subtitle / description. */
  subtitle?: string;
  /** Additional className for the panel container. */
  className?: string;
  /** Width of the panel in pixels. Defaults to 380. */
  width?: number;
  /** Whether to show the default header with close button. Defaults to true. */
  showHeader?: boolean;
  /** Optional header action (e.g., an "Invite" button). */
  headerAction?: React.ReactNode;
}

export function SlidePanel({
  panelKey,
  children,
  title,
  subtitle,
  className,
  width = 380,
  showHeader = true,
  headerAction,
}: SlidePanelProps) {
  const isOpen = useSlidePanelStore((s) => s.activePanel === panelKey);
  const close = useSlidePanelStore((s) => s.close);

  // Close on Escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    },
    [isOpen, close],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key={`${String(panelKey)}-panel`}
          className={cn("shrink-0 overflow-hidden", className)}
          initial={{ width: 0 }}
          animate={{ width }}
          exit={{ width: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 36,
            mass: 0.8,
          }}
        >
          {/* Inner container — fixed width so content doesn't reflow during animation */}
          <div
            className="h-full flex flex-col border-l border-border/50 bg-neutral-100 dark:bg-[#0D0D0D]"
            style={{ width: `${width}px` }}
          >
            {/* Header */}
            {showHeader && (
              <div className="flex items-center justify-between px-3 py-2.5 shrink-0">
                <div className="flex flex-col min-w-0">
                  {title && (
                    <h2 className="text-sm font-medium tracking-tight">{title}</h2>
                  )}
                </div>
                <div className="flex items-center shrink-0">
                  {headerAction}
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={close}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <SidebarToggleIcon isOpen={isOpen}/>
                  </Button>
                </div>
              </div>
            )}

            {/* Body */}
            <motion.div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
