import { Metadata } from "next";
import { Container } from "@/components/landing/container";
import SeeHowItWorks from "./HowIT-Works";

export const metadata: Metadata = {
  title: "How it works",
  description: "Get started in four steps.",
};

export default function Page() {
  return (
    <Container>
      <SeeHowItWorks />
    </Container>
  );
}
