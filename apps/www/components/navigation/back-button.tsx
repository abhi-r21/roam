"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => router.back()}
      className="text-muted-foreground absolute top-4 left-4 z-50 inline-flex items-center gap-2 text-sm font-semibold sm:top-6 sm:left-6"
    >
      <ChevronLeft className="size-4" aria-hidden="true" />
      Back
    </Button>
  );
}
