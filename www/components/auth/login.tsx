"use client";

import Image from "next/image";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full max-w-96">
      <Button
        type="button"
        variant="ghost"
        onClick={() => router.push("/")}
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground sm:left-6 sm:top-6"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back
      </Button>

      <div className="flex justify-center mb-15">
        <Image
          src="/oneworks-avatar-dog-256 (3).svg"
          alt="Yuvi"
          width={60}
          height={60}
          priority
        />
      </div>

      <form className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
              className="shrink-0"
            >
              {showPassword ? <EyeClosed className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        <Button type="submit" className="h-10 w-full rounded-xl font-gp">
          Login
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        <span>or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button type="button" variant="secondary" className="h-10 w-full rounded-xl">
        <FcGoogle aria-hidden="true" />
        Sign in with Google
      </Button>

      <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
        By continuing, you agree to our{" "}
        <Button
          type="button"
          variant="link"
          onClick={() => router.push("/terms")}
          className="h-auto p-0 text-xs font-semibold text-neutral-300"
        >
          Terms
        </Button>{" "}
        and{" "}
        <Button
          type="button"
          variant="link"
          onClick={() => router.push("/privacy")}
          className="h-auto p-0 text-xs font-semibold text-neutral-300"
        >
          Privacy Policy
        </Button>
        .
      </p>
    </div>
  );
}
