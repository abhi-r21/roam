"use client";

import { cn } from "@/lib/utils";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { AnimatePresence, motion } from "motion/react";

import { FcGoogle } from "react-icons/fc";
import { AppleIcon, Ellipsis, Loader, Mail, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbBrandGithub } from "react-icons/tb";

const EXTERNAL_ACCOUNTS_ICON = {
  google: FcGoogle,
  apple: AppleIcon,
  github: TbBrandGithub,
};

export function Profile() {
  const { user } = useUser();
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);

  const userImage = useMemo(() => user?.imageUrl, [user]);

  const handleUpdateAvatar = () => {
    setShowEditAvatar((p) => !p);
  };

  const handleEditUsername = () => {
    setShowEditUsername((p) => !p);
  };

  return (
    <main className="flex h-full w-full flex-col">
      <div className="mx-auto max-w-7xl py-2.5">
        <h1 className="mx-auto tracking-normal">Profile Details</h1>
      </div>
      <Separator />
      {/* Main Area */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-14 overflow-scroll px-10 pt-16">
        {/* Avatar Section */}
        <div className="w-full">
          <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-normal uppercase">
            AVATAR
          </h2>
          <div className="flex w-full items-start gap-4">
            <AnimatePresence mode="wait">
              {showEditAvatar ? (
                <motion.div
                  key="edit-avatar"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex-1"
                >
                  <EditAvatar onCancel={handleUpdateAvatar} />
                </motion.div>
              ) : (
                <motion.div
                  key="view-avatar"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-1 items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={userImage}
                      className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
                    />
                    <div className="flex flex-col text-[13.5px] tracking-tight text-neutral-500 dark:text-neutral-400">
                      <p>This is your avatar.</p>
                      <p>Upload a custom avatar from your files.</p>
                    </div>
                  </div>
                  <Button size={"xs"} onClick={handleUpdateAvatar}>
                    Update
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Separator className={"bg-neutral-200 dark:bg-neutral-900"} />
        {/* Username section  */}
        <div className="w-full">
          <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-normal uppercase">
            username
          </h2>
          <div>
            <EditUsername onCancel={handleEditUsername} />
          </div>
        </div>

        <Separator className={"bg-neutral-200 dark:bg-neutral-900"} />
        {/* Email Addresses Section */}
        <div className="flex w-full flex-col">
          <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-normal uppercase">
            email address
          </h2>
          <div className="flex w-full flex-col">
            {user && user.emailAddresses && (
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                  <Badge variant={"lime"} className="text-xs">
                    Primary
                  </Badge>
                </div>
                <Button size={"icon"} variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </div>
            )}
          </div>

          <div className="mt-3 w-full">
            <div className="flex items-center gap-1.5">
              <Button
                size={"xs"}
                variant={"ghost"}
                className={"-pl-3 cursor-not-allowed!"}
              >
                <Plus />
                <p>Add email address</p>
              </Button>
            </div>
          </div>
        </div>
        <Separator className={"bg-neutral-200 dark:bg-neutral-900"} />
        {/*  Phone Number Section */}
        <div className="flex w-full flex-col">
          <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-normal uppercase">
            phone number
          </h2>
          <div className="flex w-full items-center justify-between">
            <p className="font-sans text-sm">
              {user?.phoneNumbers[0]?.phoneNumber ?? "No phonenumber"}
            </p>
            <Button size={"icon"} variant={"ghost"}>
              <Ellipsis />
            </Button>
          </div>

          <div className="mt-3 w-full">
            <div className="flex items-center gap-1.5">
              <Button
                size={"xs"}
                variant={"ghost"}
                className={"-pl-3 cursor-not-allowed!"}
              >
                <Plus />
                <p>Add phone number</p>
              </Button>
            </div>
          </div>
        </div>
        <Separator className={"bg-neutral-200 dark:bg-neutral-900"} />
        {/* Connected Accounts  */}
        <div className="w-full">
          <h2 className="text-muted-foreground mb-3 text-xs font-medium tracking-normal uppercase">
            connected accounts
          </h2>
          <div className="flex flex-col">
            {user &&
              user.externalAccounts &&
              user.externalAccounts.map((acc) => {
                return (
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {acc.provider === "google" && <FcGoogle size={15} />}
                      <p className="text-sm capitalize">{acc.provider}</p>
                      <Badge variant={"secondary"} className="text-xs">
                        {acc.emailAddress}
                      </Badge>
                    </div>
                    <div>
                      <Button size={"xs"} variant={"destructive"}>
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}

interface EditProps {
  onCancel: () => void;
}

interface EditAvatarProps extends EditProps {}
interface EditUserNameProps extends EditProps {}

function EditAvatar({ onCancel }: EditAvatarProps) {
  const { user } = useUser();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setuploading] = useState<boolean>(false);
  const [removing, setRemoving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      return;
    }

    // Clean up previous preview URL
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!user || !profileImage) return;
    setuploading(true);

    await user.setProfileImage({
      file: profileImage,
    });

    // Clear local preview after Clerk has updated the image
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    setProfileImage(null);
    setPreviewImage(null);

    setuploading(false);
    onCancel();
  };

  const handleOnRemove = async () => {
    setRemoving(true);
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    setProfileImage(null);
    setPreviewImage(null);

    if (user?.hasImage) {
      await user.setProfileImage({
        file: null,
      });
    }
    setRemoving(false);
  };

  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex items-center gap-4">
        {/* Image preview */}
        <img
          src={previewImage ?? user?.imageUrl}
          alt="Profile"
          className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
        />

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Button size="xs" variant="outline" onClick={handleOnUpload}>
              Upload
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="hidden"
            />

            <Button
              size="xs"
              variant="destructive"
              onClick={handleOnRemove}
              disabled={!user?.hasImage && !profileImage}
            >
              {removing ? <Loader className="animate-spin" /> : "Remove"}
            </Button>
          </div>

          <p className="text-muted-foreground text-xs tracking-tight">
            Recommended size 1:1, up to 10MB.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="xs" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button size="xs" onClick={handleSave} disabled={!profileImage}>
          {uploading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

function EditUsername({ onCancel }: EditUserNameProps) {
  const { user } = useUser();
  const [username, setUsername] = useState<string>(user?.username ?? "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      if (!username) {
        return;
      }
      setLoading(true);

      await user?.update({
        username: username.trim().toLowerCase(),
      });
    } catch (error) {
      console.log("error", error);
      setError("Failed to update username");
    } finally {
      setLoading(false);
      onCancel();
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div className={cn("flex items-center justify-between")}>
      <div className="flex items-center overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
        <p className="text-muted-foreground px-4 text-sm">heyroam.xyz/</p>
        <Separator orientation="vertical" />
        <Input
          placeholder="bob"
          className={cn("rounded-none border-none focus:ring-0!")}
          onChange={handleUsernameChange}
          value={username}
        />
      </div>

      <div className="flex items-center gap-1.5">
        <AnimatePresence>
          {username && (
            <motion.div
              initial={{ filter: "blur(5px)" }}
              animate={{ filter: "blur(0px)" }}
              exit={{ filter: "blur(5px)" }}
              transition={{
                duration: 0.1,
                ease: "easeIn",
              }}
            >
              <Button
                size={"xs"}
                variant={"ghost"}
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          size={"xs"}
          onClick={handleSave}
          disabled={!username || loading}
        >
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}
