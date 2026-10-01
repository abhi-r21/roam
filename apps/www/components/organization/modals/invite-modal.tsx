"use client";

import axios from "axios";
import { cn } from "@/lib/utils";

import {
  type ClipboardEvent,
  useRef,
  useState
} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { AppleSwitch } from "@/components/unlumen-ui/apple-switch";
import { useModal } from "@/stores/modal-store";

import { Plus } from "lucide-react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";

// ─── Register this modal in the global type registry ─────────────────────────
declare module "@/stores/modal-store" {
  interface ModalRegistry {
    invite: { organizationId?: string };
  }
}


type InviteRole = "member" | "admin";

type InviteRow = {
  id: string;
  email: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmail(value: string) {
  return emailPattern.test(value.trim());
}

export function InviteModal() {
  const { isOpen, close, data } = useModal("invite");
  const nextRowId = useRef(1);
  const [role, setRole] = useState<InviteRole>("member");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<InviteRow[]>([
    { id: "invite-0", email: "" },
  ]);

  const addEmailRow = () => {
    setRows((current) => [
      ...current,
      { id: `invite-${nextRowId.current++}`, email: "" },
    ]);
  };

  const updateRow = (id: string, email: string) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, email } : row)),
    );
  };

  const removeRow = (id: string) => {
    setRows((current) => current.filter((row) => row.id !== id));
  };

  const handlePaste = (
    event: ClipboardEvent<HTMLInputElement>,
    rowId: string,
  ) => {
    const emails = event.clipboardData
      .getData("text")
      .split(/[\s,;]+/)
      .map((email) => email.trim().toLowerCase())
      .filter(isEmail);

    if (emails.length === 0) return;

    event.preventDefault();
    setRows((current) => {
      const rowIndex = current.findIndex((row) => row.id === rowId);
      if (rowIndex === -1) return current;

      const existingEmails = new Set(
        current
          .filter((row) => row.id !== rowId)
          .map((row) => row.email.toLowerCase()),
      );
      const uniqueEmails = emails.filter(
        (email, index) =>
          !existingEmails.has(email) && emails.indexOf(email) === index,
      );
      if (uniqueEmails.length === 0) return current;

      const [firstEmail, ...remainingEmails] = uniqueEmails;
      const pastedRows = remainingEmails.map((email) => ({
        id: `invite-${nextRowId.current++}`,
        email,
      }));

      return [
        ...current.slice(0, rowIndex),
        { ...current[rowIndex], email: firstEmail },
        ...pastedRows,
        ...current.slice(rowIndex + 1),
      ];
    });
  };

  const hasValidEmail = rows.some((row) => isEmail(row.email));

  const handleSend = async () => {
    if (rows.length === 0) {
      return
    }
    console.log("in send");

    try {
      setLoading(true)
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/invite`,
        {
          invitations: rows.map((row) => ({ role, emailAddress: row.email })),
        },
        {
          withCredentials: true
        }
      );
      const { message } = response.data
      toast.success(message)
      close()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className={cn("p-0 gap-0 overflow-hidden bg-neutral-900")}>
        <div className="px-4 rounded-b-2xl bg-neutral-950 py-4 border-b">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Invite Members</p>
              <p className="text-muted-foreground text-xs">
                Add members by entering or pasting emails at once.
              </p>
            </div>
          </div>

          <div className="flex flex-col mt-6 h-full no-scrollbar min-h-[30vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between w-full">
              <p className="tracking-tight text-neutral-400">
                Role set to{" "}
                <span className="capitalize text-white">{role}</span>
              </p>
              <div className="flex shrink-0 items-center justify-end gap-2">
                <AppleSwitch
                  checked={role === "member"}
                  onCheckedChange={(checked) =>
                    setRole(checked ? "member" : "admin")
                  }
                  size="sm"
                  tone="accent"
                  aria-label={`Invite new users as ${role}`}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 h-full max-h-[30vh] overflow-y-auto no-scrollbar">
              {rows.map((row) => (
                <div key={row.id} className="flex items-center gap-x-2">
                  <Input
                    type="email"
                    value={row.email}
                    onChange={(event) => updateRow(row.id, event.target.value)}
                    onPaste={(event) => handlePaste(event, row.id)}
                    className="text-sm! focus:ring-0! border-none"
                    placeholder="New email"
                    aria-label="Email address"
                  />
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="destructive"
                    onClick={() => removeRow(row.id)}
                    aria-label={`Remove ${row.email || "email row"}`}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                size={"xs"}
                variant={"ghost"}
                onClick={addEmailRow}
              >
                <Plus />
                Add email
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center px-4 gap-x-2 py-2 bg-neutral-900">
          <Button
            size={"xs"}
            className={"flex-1 bg-neutral-800! border-neutral-700"}
            variant={"outline"}
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            size={"xs"}
            type="button"
            disabled={!hasValidEmail}
            onClick={handleSend}
            className={"flex-1 bg-blue-700! border border-blue-600! text-white relative"}
          >
            {loading && <Spinner className={cn("absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2")} />}
            <p className={cn(loading && "invisible")}>Send</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

