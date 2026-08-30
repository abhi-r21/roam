"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export function FooterHighlight() {
  return (
    <div
      className={cn(
        "w-full aspect-video bg-neutral-950 mb-5 mx-auto relative overflow-hidden max-w-full max-h-140",
      )}
    >
      <Image src={"/blue-clouds.jpg"} alt="footer-image" fill sizes="100vw" className="object-cover" loading="eager" />
      {/* <div className="absolute left-1/2 top-1/3 -translate-x-1/2 max-w-xl pointer-events-none">
        <motion.h1
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          className="text-[#6C572E] font-gp text-7xl"
        >
          Launching soon on
        </motion.h1>

        <motion.div
          initial={{
            y: 20,
          }}
          whileInView={{
            y: 0,
          }}
          className="flex items-center gap-4 justify-center mt-4"
        >
          <button
            className={cn(
              "flex items-center justify-center gap-2 bg-[#34270f] text-white w-fit",
              "px-6 py-3 rounded-full tracking-tight ",
            )}
          >
            <AppStore width={30} />
            <p className="font-sans text-xl font-medium tracking-tight">
              App Store
            </p>
          </button>

          <span className="text-5xl font-gp  text-[#6C572E]">&</span>

          <button
            className={cn(
              "flex items-center justify-center gap-2 bg-[#34270f] text-white w-fit",
              "px-6 py-3 rounded-full tracking-tight ",
            )}
          >
            <GooglePlay width={30} />
            <p className="font-sans text-xl font-medium tracking-tight">
              Google Play
            </p>
          </button>
        </motion.div>
      </div> */}

    </div>
  );
}
