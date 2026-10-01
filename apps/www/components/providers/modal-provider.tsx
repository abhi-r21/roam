"use client";

import { InviteModal } from "@/components/organization/modals/invite-modal";

/**
 * ModalProvider — mount this once in your root layout.
 * It renders every modal that can be opened via the global store.
 * Each modal is responsible for reading its own open/close state.
 */
export function ModalProvider() {
  return (
    <>
      <InviteModal />
      {/* Add new modals here as they are created */}
    </>
  );
}
