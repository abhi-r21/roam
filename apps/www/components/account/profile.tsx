"use client";

import { cn } from "@/lib/utils";
import { ChangeEvent, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { AnimatePresence, motion } from "motion/react";

import { FcGoogle } from "react-icons/fc";
import { Ellipsis, Plus } from "lucide-react";

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

export function Profile() {
  const { user } = useUser();
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);

  const handleUpdateAvatar = () => {
    setShowEditAvatar((p) => !p);
  };

  const handleEditUsername = () => {
    setShowEditUsername((p) => !p);
  };

  return (
    <main className="flex flex-col w-full h-full">
      <div className="py-2.5 max-w-7xl mx-auto">
        <h1 className="tracking-normal mx-auto">Profile Details</h1>
      </div>
      <Separator />
      {/* Main Area */}
      <div className="overflow-scroll flex-1 flex flex-col items-center w-full pt-10 gap-16 max-w-7xl mx-auto">
        {/* Avatar Section */}
        <AnimatePresence>
          {showEditAvatar ? (
            <EditAvatar onCancel={handleUpdateAvatar} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className="w-full"
            >
              <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">
                AVATAR
              </h2>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={user?.imageUrl}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col text-sm tracking-tight text-neutral-400">
                    <p>This is your avatar.</p>
                    <p>Upload a custom avatar from your files.</p>
                  </div>
                </div>
                <Button
                  size={"xs"}
                  variant={"ghost"}
                  onClick={handleUpdateAvatar}
                >
                  Update
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Username section  */}
        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">
            username
          </h2>
          {showEditUsername ? (
            <EditUsername onCancel={handleEditUsername} />
          ) : (
            <div className="w-full flex items-center justify-between">
              <p className="text-sm">{user?.username ?? "No username"}</p>
              <Button
                size={"xs"}
                variant={"ghost"}
                onClick={handleEditUsername}
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        {/* Email Addresses Section */}
        <div className="w-full flex flex-col">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">
            email address
          </h2>
          <div className="w-full flex flex-col">
            {user && user.emailAddresses && (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                  <Badge variant={"secondary"} className="text-xs">
                    Primary
                  </Badge>
                </div>
                <Button size={"icon"} variant={"ghost"}>
                  <Ellipsis />
                </Button>
              </div>
            )}
          </div>

          <div className="w-full mt-3">
            <div className="flex items-center gap-1.5">
              <Button
                size={"xs"}
                variant={"ghost"}
                className={"-pl-3 cursor-not-allowed!"}
              >
                <Plus />
                <p>Add email address</p>
              </Button>
              <Badge variant={"destructive"} className="text-[11px]">
                Coming soon
              </Badge>
            </div>
          </div>
        </div>

        {/*  Phone Number Section */}
        <div className="w-full flex flex-col">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">
            phone number
          </h2>
          <div className="w-full flex items-center justify-between">
            <p className="text-sm font-sans">
              {user?.phoneNumbers[0]?.phoneNumber ?? "No phonenumber"}
            </p>
            <Button size={"icon"} variant={"ghost"}>
              <Ellipsis />
            </Button>
          </div>

          <div className="w-full mt-3">
            <div className="flex items-center gap-1.5">
              <Button
                size={"xs"}
                variant={"ghost"}
                className={"-pl-3 cursor-not-allowed!"}
              >
                <Plus />
                <p>Add phone number</p>
              </Button>
              <Badge variant={"destructive"} className="text-[11px]">
                Coming soon
              </Badge>
            </div>
          </div>
        </div>

        {/* Connected Accounts  */}
        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">
            connected accounts
          </h2>
          <div className="flex flex-col">
            {user && user.externalAccounts && user.externalAccounts.map((acc) => {
              return <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {acc.provider === "google" && <FcGoogle size={15} />}
                  <p className="text-sm capitalize">{acc.provider}</p>
                  <Badge variant={"secondary"} className="text-xs">{acc.emailAddress}</Badge>
                </div>
                <div>
                  <Button size={"xs"} variant={"destructive"}>
                    Remove
                  </Button>
                </div>
              </div>
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

interface EditAvatarProps extends EditProps { }
interface EditUserNameProps extends EditProps { }

function EditAvatar(props: EditAvatarProps) {
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState<string | Blob | File | null>(
    null,
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 1024 * 1024 * 10) {
      return;
    }

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (user) {
      await user.setProfileImage({ file: profileImage });
    }
  };

  // TODO: should also remove the image from clerk.
  const handleOnRemove = () => {
    if (previewImage || profileImage) {
      setPreviewImage(null);
      setProfileImage(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: "linear",
      }}
      className="flex flex-col gap-1.5 w-full"
    >
      <h2 className="text-xs uppercase font-medium tracking-normal mb-2 text-muted-foreground">
        AVATAR
      </h2>
      <div className={cn("w-full flex items-end justify-between")}>
        <div className="flex items-center gap-4">
          <img
            src={previewImage ?? user?.imageUrl}
            className="w-12 h-12 rounded-full object-cover object-top"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <>
                <Button
                  size={"xs"}
                  variant={"outline"}
                  onClick={handleOnUpload}
                >
                  Upload
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
              <Button
                size={"xs"}
                variant={"destructive"}
                onClick={handleOnRemove}
                disabled={!user?.hasImage && !profileImage}
              >
                Remove
              </Button>
            </div>

            <p className="text-xs text-muted-foreground tracking-tight">
              Recommended size 1:1, up to 10MB.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size={"xs"} variant={"outline"} onClick={props.onCancel}>
            Cancel
          </Button>
          <Button size={"xs"} onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function EditUsername(props: EditUserNameProps) {
  const { user } = useUser();
  const [username, setUsername] = useState<string>("");

  const handleSave = async () => {
    if (!username) {
      return;
    }

    await user?.updateMetadata({
      unsafeMetadata: {
        username,
      },
    });
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div className={cn("flex items-center justify-between")}>
      <div className="flex items-center rounded-lg border border-neutral-100 dark:border-neutral-800 overflow-hidden">
        <p className="text-sm text-muted-foreground px-4">heyroam.xyz/</p>
        <Separator orientation="vertical" />
        <Input
          placeholder="bob"
          className={cn("border-none focus:ring-0! rounded-none")}
          onChange={handleUsernameChange}
        />
      </div>

      <div className="flex items-center gap-1.5">
        <Button size={"xs"} variant={"ghost"} onClick={props.onCancel}>
          Cancel
        </Button>

        <Button size={"xs"} onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
