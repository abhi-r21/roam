'use client'

import 'lenis/dist/lenis.css'
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { FooterHighlight } from "@/components/landing/footer-highlight";
import { Hero } from "@/components/landing/hero";
import { HeroHighlight } from "@/components/landing/hero-highlight";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ModesToUse } from "@/components/landing/modes-to-use";
import { Topbar } from "@/components/landing/top-bar";
import { ReactLenis } from 'lenis/react'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-[#FCFCFD] text-neutral-950 w-full scrollbar-none relative">
      {/* <img src={"/blue-clouds.jpg"} className='absolute w-full'/> */}
      <ReactLenis root />
      <Topbar />
      <Hero />
      {/* <HeroHighlight /> */}
      <div className='h-screen'></div>
      <ModesToUse />
      <HowItWorks />
      <FAQ />
      <FooterHighlight />
      <Footer />
    </div>
  );
}
