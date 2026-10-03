'use client'

import { create } from 'zustand'

// ─── Modal Registry ──────────────────────────────────────────────────────────
// Extend this interface in each modal's file via declaration merging to get
// type-safe `data` when opening a modal.
//
// Example (in invite-modal.tsx):
//   declare module "@/stores/modal-store" {
//     interface ModalRegistry {
//       invite: { organizationId?: string };
//     }
//   }
//
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModalRegistry {}

// ─── Store types ─────────────────────────────────────────────────────────────
type ModalKey = keyof ModalRegistry

type OpenModal = {
  [K in ModalKey]: { key: K; data: ModalRegistry[K] }
}[ModalKey]

interface ModalState {
  /** Currently open modals keyed by their registry name. */
  openModals: Map<string, unknown>

  /** Open a modal by key, optionally passing data. */
  open: <K extends ModalKey>(key: K, data?: ModalRegistry[K]) => void

  /** Close a modal by key. */
  close: (key: ModalKey) => void

  /** Close every open modal. */
  closeAll: () => void

  /** Check whether a given modal is open. */
  isOpen: (key: ModalKey) => boolean

  /** Retrieve the data payload for an open modal. */
  getData: <K extends ModalKey>(key: K) => ModalRegistry[K] | undefined
}

export const useModalStore = create<ModalState>((set, get) => ({
  openModals: new Map(),

  open: (key, data) =>
    set(state => {
      const next = new Map(state.openModals)
      next.set(key as string, data ?? {})
      return { openModals: next }
    }),

  close: key =>
    set(state => {
      const next = new Map(state.openModals)
      next.delete(key as string)
      return { openModals: next }
    }),

  closeAll: () => set({ openModals: new Map() }),

  isOpen: key => get().openModals.has(key as string),

  getData: key => get().openModals.get(key as string) as any,
}))

// ─── Convenience hook ────────────────────────────────────────────────────────
// Returns { isOpen, data, open, close } scoped to a single modal key.
export function useModal<K extends ModalKey>(key: K) {
  const isOpen = useModalStore(s => s.openModals.has(key as string))
  const data = useModalStore(
    s => s.openModals.get(key as string) as ModalRegistry[K] | undefined
  )
  const open = useModalStore(s => s.open)
  const close = useModalStore(s => s.close)

  return {
    isOpen,
    data,
    open: (d?: ModalRegistry[K]) => open(key, d),
    close: () => close(key),
  }
}
