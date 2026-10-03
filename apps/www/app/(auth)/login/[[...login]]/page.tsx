import { SignIn } from "@/components/auth/signin";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-neutral-950 px-4 py-10 sm:px-6">
      <div className="flex w-full max-w-lg flex-col items-center gap-4">
        <SignIn />
        <div id="clerk-captcha" />
      </div>
    </main>
  );
}
