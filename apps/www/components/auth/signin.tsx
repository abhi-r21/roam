"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { PiArrowBendDownLeftBold } from "react-icons/pi";
import { TbMailFilled, TbSquareRoundedChevronLeftFilled } from "react-icons/tb";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { InputOTP } from '@heroui/react';
import Link from "next/link";
import { ClerkError } from "@clerk/shared/errors/clerkError";

export function SignIn() {
    const router = useRouter();

    const [showEmail, setShowEmail] = useState(false);
    const [showDefault, setSetShowDefault] = useState(true);

    const onBack = (cb: (v: boolean) => void) => {
        cb(false);
        setSetShowDefault(true);
    };

    return (
        <div
            className={cn(
                "max-w-lg h-120 w-full rounded-xl relative flex flex-col  p-0.5 overflow-hidden",
            )}
        >
            <img
                src={"/train-people-1024.jpg"}
                className="absolute inset-0 z-0 object-cover"
            />
            <div className="z-1 flex flex-1 items-center justify-center w-full mb-4">
                <p className=" text-6xl font-gp text-white">Roam</p>
            </div>

            <main
                className={cn(
                    "max-w-lg w-full rounded-xl border dark:border-neutral-900 dark:bg-[#121212] p-4 z-1",
                )}
            >
                {showDefault && (
                    <div className="flex flex-col gap-0.5 tracking-tight">
                        <h1 className="text-sm font-medium">Welcome to Roam!</h1>
                        <h2 className="text-sm text-muted-foreground font-normal">
                            Roam is a 24/7 travel executive that works for your company.
                        </h2>

                        <div className="flex flex-col gap-2.5 ml-auto w-fit mt-6">
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                onClick={() => {
                                    setSetShowDefault(false);
                                    setShowEmail(true);
                                }}
                                className={cn("justify-start!")}
                            >
                                <TbMailFilled />
                                Continue with Email
                                <div className="rounded-sm px-1 py-px border bg-neutral-600 -mr-1.5">
                                    <PiArrowBendDownLeftBold className="text-neutral-400" />
                                </div>
                            </Button>
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                className={cn("justify-start!")}
                            >
                                <FcGoogle />
                                Continue with Google
                            </Button>

                            <Button
                                size={"sm"}
                                variant={"outline"}
                                onClick={() => router.push("/")}
                                className={cn("justify-start!")}
                            >
                                <TbSquareRoundedChevronLeftFilled />
                                Back to Home
                            </Button>
                        </div>
                    </div>
                )}
                {showEmail && <EmailForm onBack={() => onBack(setShowEmail)} />}
            </main>
        </div>
    );
}

function EmailForm({ onBack }: { onBack: () => void }) {
    const { signIn, errors, fetchStatus } = useSignIn();


    const [showVerifyCode, setShowVerifyCode] = useState<boolean>(false);
    const [emailAddress, setEmailAddress] = useState<string>("");


    const handleSendCode = async () => {
        if(!emailAddress) {
            return
        }

        const { error } = await signIn.create({ identifier: emailAddress })
        if (error) {
            // @ts-ignore
            if (error?.errors?.[0].code === "form_identifier_not_found") {
                signIn.create({
                   
                })
            }
        }
    };

    return (
        <div
            className={cn(
                "flex flex-col gap-0.5 tracking-tight w-full relative max-h-42 min-h-43",
            )}
        >
            {showVerifyCode ? (
                // Verification block
                <>
                    <h1 className="text-sm font-medium">Verify code</h1>
                    <h2 className="text-sm text-muted-foreground font-normal">
                        Enter the code sent to your email.
                    </h2>

                    <div className="mt-6 ml-3 flex-1 w-full">
                        <InputOTP maxLength={4} className="font-mono" variant="secondary">
                            <InputOTP.Group>
                                <InputOTP.Slot index={0} />
                                <InputOTP.Slot index={1} />
                                <InputOTP.Slot index={2} />
                                <InputOTP.Slot index={3} />
                            </InputOTP.Group>
                        </InputOTP>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={() => setShowVerifyCode(false)}
                            className={cn("bg-blue-800! border border-blue-700!")}
                        >
                            Back
                        </Button>
                        <div className="flex items-center gap-2">
                        <Button
                            size={"sm"}
                            variant={"outline"}

                        >
                            Resend
                        </Button>

                        <Button
                            size={"sm"}
                        >
                            Verify Code
                        </Button>
                        </div>
                    </div>
                </>
            ) : (
                //Email Entering Block
                <>
                    <h1 className="text-sm font-medium">Enter your email</h1>
                    <h2 className="text-sm text-muted-foreground font-normal">
                        We'll send a verification code to your email.
                    </h2>

                    <div className="mt-6 ml-3 flex-1">
                        <Input
                            required
                            type="email"
                            placeholder="yuvan@roam.com"
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className={cn("bg-transparent! border-none focus:ring-0!")}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={onBack}
                            className={cn("bg-blue-800! border border-blue-700!")}
                        >
                            Back
                        </Button>
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={handleSendCode}
                            className={cn("justify-start! flex-1")}
                        >
                            Send code
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

function VerifyEmailVerificationCode({ onBack }: { onBack: () => void }) {
    return (
        <div
            className={cn(
                "flex flex-col gap-0.5 tracking-tight w-full relative max-h-42 min-h-43",
            )}
        >
            <h1 className="text-sm font-medium">Enter your email</h1>
            <h2 className="text-sm text-muted-foreground font-normal">
                We'll send a verification code to your email.
            </h2>

            <div className="mt-6 ml-3 flex-1">
                <Input
                    type="email"
                    placeholder="yuvan@roam.com"
                    className={cn("bg-transparent! border-none focus:ring-0!")}
                />
            </div>

            <div className="flex items-center gap-2">
                <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={onBack}
                    className={cn("bg-blue-800! border border-blue-700!")}
                >
                    Back
                </Button>
                <Button
                    size={"sm"}
                    variant={"outline"}
                    className={cn("justify-start! flex-1")}
                >
                    Verfiy Code
                </Button>
            </div>
        </div>
    );
}
