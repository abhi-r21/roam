"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

import { InputOTP } from "@heroui/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { FcGoogle } from "react-icons/fc";
import { PiArrowBendDownLeftBold } from "react-icons/pi";
import { TbMailFilled, TbSquareRoundedChevronLeftFilled } from "react-icons/tb";

import { useRouter } from "next/navigation";
import { useAuth, useSignIn, useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";


export function SignIn() {
    const router = useRouter();
    const { isSignedIn } = useAuth();
    const [showEmail, setShowEmail] = useState(false);
    const [showDefault, setSetShowDefault] = useState(true);


    if (isSignedIn) {
        router.push("/ask")
        return
    }

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
                    <div
                    className="flex flex-col gap-0.5 tracking-tight">
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
    const router = useRouter();
    const {
        signIn,
        errors: signInErrors,
        fetchStatus: signInFetchStatus,
    } = useSignIn();
    const {
        signUp,
        errors: signUpErrors,
        fetchStatus: signUpFetchStatus,
    } = useSignUp();

    const [showVerifyCode, setShowVerifyCode] = useState<boolean>(false);
    const [emailCode, setEmailCode] = useState<string>("");
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [isNewUser, setIsNewUser] = useState<boolean>(false);

    const busy =
        signInFetchStatus === "fetching" || signUpFetchStatus === "fetching";
    const activeErrors = isNewUser ? signUpErrors : signInErrors;

    const goToApp = ({ session, decorateUrl }: any) => {
        if (session?.currentTask) return; // route to a task screen here if you use session tasks
        const url = decorateUrl("/");
        url.startsWith("http") ? (window.location.href = url) : router.push(url);
    };

    const handleSendCode = async () => {
        if (!emailAddress) {
            return;
        }

        const { error } = await signIn.create({
            identifier: emailAddress,
        });

        if (!error) {
            await signIn.emailCode.sendCode();
            setIsNewUser(false);
            setShowVerifyCode(true);
            return;
        }

        const noAccount =
            isClerkAPIResponseError(error) &&
            error.errors.some(({ code }) => code === "form_identifier_not_found");

        if (!noAccount) {
            console.error(error);
            return;
        }

        const { error: signUpError } = await signUp.create({ emailAddress });
        if (signUpError) {
            console.error(signUpError);
            return;
        }

        await signUp.verifications.sendEmailCode();
        setIsNewUser(true);
        setShowVerifyCode(true);
    };

    const handleVerifyCode = async () => {
        if (!emailCode) {
            return;
        }

        if (isNewUser) {
            const { error } = await signUp.verifications.verifyEmailCode({
                code: emailCode,
            });
            if (error) return console.error(error);
            if (signUp.status === "complete")
                await signUp.finalize({ navigate: goToApp });
        } else {
            const { error } = await signIn.emailCode.verifyCode({ code: emailCode });
            if (error) return console.error(error);
            if (signIn.status === "complete")
                await signIn.finalize({ navigate: goToApp });
        }
    };

    const handleResend = () =>
        isNewUser
            ? signUp.verifications.sendEmailCode()
            : signIn.emailCode.sendCode();

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
                        <InputOTP
                            maxLength={6}
                            className="font-mono"
                            variant="primary"
                            onChange={setEmailCode}
                        >
                            <InputOTP.Group>
                                <InputOTP.Slot index={0} />
                                <InputOTP.Slot index={1} />
                                <InputOTP.Slot index={2} />
                                <InputOTP.Slot index={3} />
                                <InputOTP.Slot index={4} />
                                <InputOTP.Slot index={5} />
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
                            <Button size={"sm"} variant={"outline"} onClick={handleResend}>
                                Resend
                            </Button>

                            <Button size={"sm"} onClick={handleVerifyCode} disabled={busy}>
                                {busy ? <Spinner /> : "Verify Code"}
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
                            className={cn(
                                "flex-1",
                                busy && "justify-start!"
                            )}
                            disabled={busy}
                        >
                            {busy ? <Spinner /> : "Send code"}
                        </Button>
                    </div>
                </>
            )}
            <div id="clerk-captcha" />
        </div>
    );
}

/**
 * TODOS:
 * 1. Display active errors
 * 2. Handle other edge cases as well
 * 3. Show proper loading states
 * 4. Implement resend timer
 */
