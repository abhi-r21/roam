import { cn } from "@/lib/utils";
import { IoChatbubbles } from "react-icons/io5";
import { MessageCircleDashed } from "lucide-react";

export function Hero() {
  return (
    <div className="max-w-3xl w-full mx-auto pt-28">
      <h1 className="font-medium text-5xl max-w-md text-center mx-auto font-is leading-13">
        From “where should I go?” to “you’re all booked.”
      </h1>

      <h3 className="text-center text-neutral-500 mt-9 max-w-md mx-auto tracking-tight font-medium">
        Your travel buddy for every unsure moment, from planning the trip to
        finding your way when plans change.
      </h3>

      <div className="flex justify-center">
        <button
          className={cn(
            "flex items-center gap-2",
            "rounded-full mt-8 px-6 py-3 text-[17px] font-medium",
            "bg-neutral-950 text-white cursor-pointer",
            "hover:scale-102 transition-all"
          )}
        >
          <IoChatbubbles size={20} />
          Tap on Yuvly
        </button>
      </div>
    </div>
  );
}
