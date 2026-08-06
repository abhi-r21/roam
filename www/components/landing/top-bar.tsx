import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const links = [
    {
        name: "Enterprise",
        href: "#"
    },
    {
        name: "How it works",
        href: "#"
    },
    {
        name: "FAQ",
        href: "#"
    }
]

export function Topbar() {
  return (
    <div className={cn("flex items-center justify-between w-full")}>
      <div className={cn("flex items-center relative")}>
        <Image src={"/yuvly_new.svg"} alt="logo" width={50} height={50} />
        <p className="font-sans text-2xl tracking-tighter font-medium absolute -right-12">
          Yuvly
        </p>
      </div>

      <div
        className={cn(
          "flex items-center gap-7",
          "text-sm tracking-normal font-normal",
        )}
      >
        {links.map(link => <a key={link.name} className="cursor-pointer">{link.name}</a>)}
        <Button
            size={"sm"}
            className={cn("rounded-full")}
        >
            Join waitlist
        </Button>
      </div>
    </div>
  );
}
