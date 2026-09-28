import { SignIn } from "@/components/auth/signin";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6 bg-neutral-950">
      <div className="flex flex-col items-center gap-4 w-full max-w-lg">
        <SignIn />
        <div id="clerk-captcha" />
      </div>
    </main>
  );
}
