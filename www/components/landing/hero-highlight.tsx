import { cn } from "@/lib/utils";
import Image from "next/image";



export function HeroHighlight () {
    return <div className={cn("w-full h-120 aspect-video bg-neutral-950 mt-14 mx-auto relative overflow-hidden")}>
        <Image
            src={"/ditther-300826-143900-dither-blend.jpg"}
            alt="hero"
            fill
            priority
            loading="eager"
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, 100vw"
        />
    </div>
}
