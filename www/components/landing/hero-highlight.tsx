import { cn } from "@/lib/utils";
import Image from "next/image";
import { FloatingMessageBubbles } from "./yuvly-notification";


export function HeroHighlight () {
    return <div className={cn("w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-full h-96 sm:h-150 aspect-video bg-neutral-950 mt-14 rounded-4xl mb-5 max-w-5xl mx-auto relative overflow-hidden")}>
        <Image 
            src={"/hero-highlight.png"}
            alt="hero"
            fill
            priority
            loading="eager"
            sizes="(min-width: 1024px) 1024px, 100vw"
        />
        <div className={cn("absolute inset-0 flex justify-center")}>
            <FloatingMessageBubbles />
        </div>
    </div>
}