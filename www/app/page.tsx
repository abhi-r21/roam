import { Hero } from "@/components/landing/hero";
import { Topbar } from "@/components/landing/top-bar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-[#FCFCFD] text-neutral-950 max-w-7xl mx-auto w-full">
      <Topbar />
      <Hero />
    </div>
  );
}
