import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { FooterHighlight } from "@/components/landing/footer-highlight";
import { Hero } from "@/components/landing/hero";
import { HeroHighlight } from "@/components/landing/hero-highlight";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ModesToUse } from "@/components/landing/modes-to-use";
import { Topbar } from "@/components/landing/top-bar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-[#FCFCFD] text-neutral-950 w-full scrollbar-none">
      <Topbar />
      <Hero />
      <HeroHighlight />
      <HowItWorks />
      <ModesToUse />
      <FAQ />
      <FooterHighlight />
      <Footer />
    </div>
  );
}
