import { Container } from "@/components/landing/container";
import { Hero } from "@/components/landing/hero";
import { Topbar } from "@/components/landing/top-bar";

export default function Home() {

  return (
    <div className="flex flex-col flex-1 bg-background dark:bg-black text-white w-full scrollbar-none relative">
      <Container>
        <Topbar />
        <Hero />
      </Container>
    </div>
  );
}
