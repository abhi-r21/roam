import { Container } from "@/components/landing/container";
import { FAQs } from "@/components/landing/faqs";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/howitworks";
import { AnimatedText } from "@/components/landing/text";
import { UpComing } from "@/components/landing/Upcoming";

export default function Home() {
  return (
    <div className="relaticve flex w-full scrollbar-none items-center justify-center bg-white text-black dark:bg-neutral-950">
      <Container>
        <Hero />
        <AnimatedText />
        <HowItWorks />
        <UpComing />
        <FAQs />
        <Footer />
      </Container>
    </div>
  );
}
