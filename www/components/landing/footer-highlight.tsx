import { cn } from "@/lib/utils";
import Image from "next/image";
import { AppStore, GooglePlay } from "@/components/icons";

export function FooterHighlight() {
    return <div className={cn("w-full aspect-video bg-neutral-950 mt-10 rounded-4xl mb-5 mx-auto relative overflow-hidden max-w-360")}>
        <Image src={"/download.png"} alt="footer-image" fill />
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 max-w-xl">
            <h1 className="text-black font-is text-7xl">Launching soon on</h1>
            <div className="flex items-center gap-4 justify-center mt-4">
                <button className={cn(
                    "flex items-center justify-center gap-2 bg-linear-to-b from-neutral-800 to-neutral-950 text-white w-fit",
                    "px-6 py-3 rounded-full tracking-tight "
                )}>
                    <AppStore width={30} />
                    <p className="font-sans text-xl font-medium tracking-tight">App Store</p>
                </button>

                <span className="text-5xl font-is  text-black">&</span>

                <button className={cn(
                    "flex items-center justify-center gap-2 bg-linear-to-b from-neutral-800 to-neutral-950 text-white w-fit",
                    "px-6 py-3 rounded-full tracking-tight "
                )}>
                    <GooglePlay width={30} />
                    <p className="font-sans text-xl font-medium tracking-tight">Google Play</p>
                </button>
            </div>
        </div>
    </div>
}
