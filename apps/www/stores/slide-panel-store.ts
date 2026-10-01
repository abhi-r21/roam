"use client";

import { create } from "zustand";

// ─── Panel Registry ──────────────────────────────────────────────────────────
// Extend this interface via declaration merging to register new slide panels.
//
// Example (in members-panel.tsx):
//   declare module "@/stores/slide-panel-store" {
//     interface SlidePanelRegistry {
//       members: { organizationId?: string };
//     }
//   }
//
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SlidePanelRegistry {}

// ─── Store types ─────────────────────────────────────────────────────────────
type PanelKey = keyof SlidePanelRegistry;

interface SlidePanelState {
  /** Currently active panel key, or null if none is open. */
  activePanel: PanelKey | null;

  /** Data payload for the active panel. */
  panelData: unknown;

  /** Open a panel by key, optionally passing data. */
  open: <K extends PanelKey>(key: K, data?: SlidePanelRegistry[K]) => void;

  /** Close the active panel. */
  close: () => void;

  /** Toggle a panel — opens if closed, closes if already open. */
  toggle: <K extends PanelKey>(key: K, data?: SlidePanelRegistry[K]) => void;

  /** Check whether a given panel is open. */
  isOpen: (key: PanelKey) => boolean;

  /** Retrieve the data payload (type-safe). */
  getData: <K extends PanelKey>() => SlidePanelRegistry[K] | undefined;
}

export const useSlidePanelStore = create<SlidePanelState>((set, get) => ({
  activePanel: null,
  panelData: undefined,

  open: (key, data) => set({ activePanel: key as string as PanelKey, panelData: data ?? {} }),

  close: () => set({ activePanel: null, panelData: undefined }),

  toggle: (key, data) => {
    const state = get();
    if (state.activePanel === key) {
      set({ activePanel: null, panelData: undefined });
    } else {
      set({ activePanel: key as string as PanelKey, panelData: data ?? {} });
    }
  },

  isOpen: (key) => get().activePanel === key,

  getData: () => get().panelData as any,
}));

// ─── Convenience hook ────────────────────────────────────────────────────────
export function useSlidePanel<K extends PanelKey>(key: K) {
  const isOpen = useSlidePanelStore((s) => s.activePanel === key);
  const data = useSlidePanelStore(
    (s) => (s.activePanel === key ? s.panelData : undefined) as SlidePanelRegistry[K] | undefined,
  );
  const open = useSlidePanelStore((s) => s.open);
  const close = useSlidePanelStore((s) => s.close);
  const toggle = useSlidePanelStore((s) => s.toggle);

  return {
    isOpen,
    data,
    open: (d?: SlidePanelRegistry[K]) => open(key, d),
    close,
    toggle: (d?: SlidePanelRegistry[K]) => toggle(key, d),
  };
}
