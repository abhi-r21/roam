"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

import {
  useAuth,
  useOrganizationCreationDefaults,
  useOrganizationList,
  useUser,
} from "@clerk/nextjs";

import { X } from "lucide-react";
import { BsCursorFill } from "react-icons/bs";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function CreateOrganization() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { isLoaded, createOrganization, setActive } = useOrganizationList();
  const { data: defaults, isLoading: isLoadingDefaults } = useOrganizationCreationDefaults();


  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (defaults?.form.name) {
      setOrganizationName(defaults.form.name);
    }
  }, [defaults?.form.name]);

  // Clean up the object URL when the component unmounts or when the logo changes
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  useEffect(() => {
    if (!error) return;

    const t = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(t);
  }, [error]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError("Logo must be under 10 MB.");
      // Reset the input so the same file can be re-selected after fixing
      e.target.value = "";
      return;
    }

    setError(null);
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  if (!isLoaded || isLoadingDefaults) {
    return <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>;
  }

  const advisory = defaults?.advisory;
  const showWarning = advisory?.code === "organization_already_exists";
  const existingOrgName = advisory?.meta?.organization_name;
  const existingOrgDomain = advisory?.meta?.organization_domain;

  const handleCreateOrganization = async () => {
    if (!organizationName) {
      setError("Please enter organization name.");
      return;
    }

    try {
      setLoading(true)
      const newOrganization = await createOrganization?.({
        name: organizationName,
      });
      await setActive({ organization: newOrganization.id });

      if (logo) {
        await newOrganization?.setLogo({ file: logo });
      }
      setOrganizationName("");
      setLogo(null);
      setLogoPreview(null);

      router.push("/ask");
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full relative")}>
      <div className="flex items-end justify-between tracking-tight">
        <div className="flex flex-col">
          <h1 className="text-sm">Create Organization</h1>
          <h2 className="text-neutral-400 text-sm">
            Enter your organization details.
          </h2>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
        />

        <div className="relative w-16 h-16">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-full border rounded-xl border-dashed tracking-tight cursor-pointer overflow-hidden"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Organization logo preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center gap-1 h-full w-full">
                <BsCursorFill size={14} />
                <p className="text-[0.80rem]">Logo</p>
              </div>
            )}
          </div>

          {logoPreview && (
            <Button
              size={"icon-xs"}
              onClick={(e) => {
                e.stopPropagation();
                setLogo(null);
                setLogoPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs leading-none cursor-pointer hover:bg-red-600 transition-colors"
            >
              <X />
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        <Input
          required
          autoFocus
          type="text"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.currentTarget.value)}
          placeholder="Organization Name"
          className={cn("bg-transparent! border-none focus:ring-0! p-0")}
        />

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ y: 5, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: 5, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              className="text-[0.8rem] text-red-500"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showWarning && (
            <motion.p
              initial={{ y: 5, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: 5, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.2, ease: "easeIn" }}
              className="text-[0.8rem] text-red-500"
            >
              An organization "{existingOrgName}" already exists for the domain
              "{existingOrgDomain}".
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Button
        size={"sm"}
        onClick={handleCreateOrganization}
        className={cn(
          "mt-10 bg-blue-800! border border-blue-700! text-white  tracking-tight",
        )}
      >
        {loading && <Spinner />}
        <p className={cn(loading && "invisible")}>Create Organization</p>
      </Button>

      <p className="mt-6 text-sm text-center tracking-tight">
        You are signed in as{" "}
        <span className="font-medium">
          {user?.emailAddresses[0].emailAddress}.
        </span>{" "}
        <span
          className="hover:underline cursor-pointer transition-all ml-px"
          onClick={() => signOut()}
        >
          Logout
        </span>
      </p>
    </div>
  );
}
