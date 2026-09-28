"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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
import { isValidEmail } from "@/utils/validate-email";

export function SignIn() {
    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { signIn } = useSignIn()
    const [showEmail, setShowEmail] = useState(false);
    const [showDefault, setSetShowDefault] = useState(true);

    if (isSignedIn) {
        router.push("/ask");
        return;
    }

    const goToEmail = () => {
        setSetShowDefault(false);
        setShowEmail(true);
    };

    const onBack = (cb: (v: boolean) => void) => {
        cb(false);
        setSetShowDefault(true);
    };

    const handleSignInWithGoogle = async () => {
        try {
            await signIn.sso({
                strategy: "oauth_google",
                redirectCallbackUrl: "/sso-callback",
                redirectUrl: "/ask",
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!showDefault) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();
                goToEmail();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showDefault]);

    return (
        <div
            className={cn(
                "max-w-lg min-h-120 w-full rounded-xl relative flex flex-col  p-0.5 overflow-hidden",
            )}
        >
            <img
                src={"/train-people-1024.jpg"}
                className="absolute inset-0 z-0 w-full h-full object-cover"
            />
            <div className="z-1 flex flex-1 items-center justify-center w-full mb-9 sm:mb-12">
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
                                onClick={goToEmail}
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
                                onClick={handleSignInWithGoogle}
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
    const [customError, setCustomError] = useState<string | null>(null);
    const [resend, setResend] = useState<number>(0);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);

    const busy =
        signInFetchStatus === "fetching" || signUpFetchStatus === "fetching";

    const goToApp = ({ session, decorateUrl }: any) => {
        // if (session?.currentTask) return; // route to a task screen here if you use session tasks
        const url = decorateUrl("/");
        url.startsWith("http") ? (window.location.href = url) : router.push(url);
    };

    const handleSendCode = async () => {
        if (!emailAddress.trim()) {
            setEmailAddress("");
            setCustomError("Please enter your email.");
            return;
        }

        // validate the email
        if (!isValidEmail(emailAddress.trim())) {
            setCustomError("Please enter a valid email address.");
            setEmailAddress("");
            return;
        }

        const { error } = await signIn.create({
            identifier: emailAddress,
        });

        if (!error) {
            // handle sending code errors
            const { error: signInCodeError } = await signIn.emailCode.sendCode();
            if (signInCodeError) {
                setCustomError(signInCodeError.message);
                return;
            }

            setIsNewUser(false);
            setShowVerifyCode(true);
            return;
        }

        const noAccount =
            isClerkAPIResponseError(error) &&
            error.errors.some(({ code }) => code === "form_identifier_not_found");

        if (!noAccount) {
            // handle the other error edge cases here.
            console.error(error);
            setCustomError(error.message);
            return;
        }

        const { error: signUpError } = await signUp.create({ emailAddress });

        // handle signup errors
        if (signUpError) {
            console.error(signUpError);
            setCustomError(signUpError.message);
            return;
        }

        // handle sending code errors
        const { error: signUpCodeError } =
            await signUp.verifications.sendEmailCode();
        if (signUpCodeError) {
            setCustomError(signUpCodeError.message);
            return;
        }

        setIsNewUser(true);
        setShowVerifyCode(true);
    };

    const handleVerifyCode = async () => {
        if (!emailCode) {
            setCustomError("Please enter the code.");
            return;
        }

        setVerifying(true);
        try {
            if (isNewUser) {
                const { error } = await signUp.verifications.verifyEmailCode({
                    code: emailCode,
                });

                if (error) {
                    if (isClerkAPIResponseError(error)) {
                        const errCode = error.errors[0].code;

                        if (errCode === "form_code_incorrect") {
                            setCustomError("Incorrect code.");
                            return;
                        } else if (errCode === "verification_code_expired") {
                            setCustomError("Verification code expired.");
                            return;
                        }
                    } else {
                        console.error(error);
                        return;
                    }
                }

                if (signUp.status === "complete")
                    await signUp.finalize({ navigate: goToApp });
            } else {
                const { error } = await signIn.emailCode.verifyCode({ code: emailCode });
                if (error) {
                    if (isClerkAPIResponseError(error)) {
                        const errCode = error.errors[0].code;

                        if (errCode === "form_code_incorrect") {
                            setCustomError("Incorrect verification code.");
                            return;
                        } else if (errCode === "verification_code_expired") {
                            setCustomError("Verification code expired.");
                            return;
                        }
                    } else {
                        console.error(error);
                        return;
                    }
                }

                if (signIn.status === "complete")
                    await signIn.finalize({ navigate: goToApp });
            }
        } finally {
            setVerifying(false);
        }
    };

    const handleResend = () => {
        if (resend > 0) return;

        isNewUser
            ? signUp.verifications.sendEmailCode()
            : signIn.emailCode.sendCode();

        setSuccess("Verfication code sent.")
        setResend(30);
    };

    useEffect(() => {
        if (resend <= 0) return;

        const interval = setInterval(() => {
            setResend((c) => {
                if (c <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return c - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [resend > 0]);

    useEffect(() => {
        if (!customError) return;

        const t = setTimeout(() => {
            setCustomError(null);
        }, 3000);

        return () => clearTimeout(t);
    }, [customError]);

    useEffect(() => {
        if (!success) return;

        const t = setTimeout(() => {
            setSuccess(null);
        }, 3000);

        return () => clearTimeout(t);
    }, [success]);

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

                    <div className="mt-6 ml-3 flex-1 w-full flex flex-col">
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

                        <AnimatePresence mode="wait">
                            {customError && (
                                <motion.p
                                    key={customError}
                                    initial={{ y: 5, opacity: 0, filter: "blur(10px)" }}
                                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: 5, opacity: 0, filter: "blur(10px)" }}
                                    transition={{ duration: 0.2, ease: "easeIn" }}
                                    className="text-[0.8rem] text-red-500 ml-auto pr-5"
                                >
                                    {customError}
                                </motion.p>
                            )}
                            {success && (
                                <motion.p
                                    key={success}
                                    initial={{ y: 5, opacity: 0, filter: "blur(10px)" }}
                                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: 5, opacity: 0, filter: "blur(10px)" }}
                                    transition={{ duration: 0.2, ease: "easeIn" }}
                                    className="text-[0.8rem] text-green-500 ml-auto pr-5"
                                >
                                    {success}
                                </motion.p>
                            )}
                        </AnimatePresence>
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
                                onClick={handleResend}
                                disabled={resend > 0}
                                className="relative"
                            >
                                {resend > 0 && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        {resend}
                                    </span>
                                )}
                                <span className={cn(resend > 0 && "invisible")}>Resend</span>
                            </Button>

                            <Button
                                size={"sm"}
                                onClick={handleVerifyCode}
                                disabled={verifying}
                                className="relative"
                            >
                                {verifying && (
                                    <Spinner className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
                                )}
                                <span className={cn(verifying && "invisible")}>Verify Code</span>
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

                    <div className="mt-6 ml-3 flex-1 flex flex-col gap-1">
                        <Input
                            required
                            type="email"
                            placeholder="yuvan@roam.com"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className={cn("bg-transparent! border-none focus:ring-0! p-0")}
                        />
                        <AnimatePresence mode="wait">
                            {customError && (
                                <motion.p
                                    key={customError}
                                    initial={{ y: 5, opacity: 0, filter: "blur(10px)" }}
                                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: 5, opacity: 0, filter: "blur(10px)" }}
                                    transition={{ duration: 0.2, ease: "easeIn" }}
                                    className="text-[0.8rem] text-red-500 ml-auto"
                                >
                                    {customError}
                                </motion.p>
                            )}
                        </AnimatePresence>
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
                            className={cn("flex-1 justify-start! relative")}
                            disabled={busy}
                        >
                            {busy && (
                                <Spinner className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
                            )}
                            <span className={cn(busy && "invisible")}>Send code</span>
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
