import { cn } from "@/lib/utils";
import Image from "next/image";
import { FloatingMessageBubbles } from "./yuvly-notification";


export function HeroHighlight () {
    return <div className={cn("w-full h-150 aspect-video bg-neutral-950 mt-14 rounded-4xl mb-5 max-w-5xl mx-auto relative overflow-hidden")}>
        <Image 
            src={"/cloudd-2.png"}
            alt="hero"
            fill
        />
        <div className={cn("absolute inset-0 flex justify-center")}>
            <FloatingMessageBubbles />
        </div>
    </div>
}