import { BackButton } from "@/components/navigation/back-button";
import { DotmTriangle2 } from "@/components/ui/dotm-triangle-2";
import { SignIn } from "@clerk/nextjs"

export default function LoginPage() {
    return (
        <main className="flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6">
            <BackButton />
            <SignIn
                fallback={<DotmTriangle2 />}
                appearance={{
                    options: {
                        elevation: "flush",
                        socialButtonsPlacement: "bottom",
                        logoImageUrl: "/roam.png",
                        logoPlacement: "inside",
                        unsafe_disableDevelopmentModeWarnings: true,

                    },
                }}
            />
        </main>
    );
}
