"use client";

import {
  useActionState,
  useEffect,
  startTransition,
  useState,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  resendVerificationOtpAction,
  verifyEmailOtpAction,
} from "@/lib/actions/auth.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [state, formAction, isPending] = useActionState(
    verifyEmailOtpAction,
    null,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [isResending, startResend] = useTransition();

  useEffect(() => {
    if (state?.success) {
      toast.success("Email verified. You're all set!");
      router.push("/dashboard");
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  const handleAction = (formData: FormData) => {
    setAttemptedSubmit(true);
    startTransition(() => {
      formAction(formData);
    });
  };

  const isOtpInvalid = attemptedSubmit && otp.trim().length !== 6;

  const handleResend = () => {
    if (!email) {
      toast.error("Enter your email to resend the code");
      return;
    }

    startResend(async () => {
      const formData = new FormData();
      formData.set("email", email);

      const res = await resendVerificationOtpAction(null, formData);

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Verification code resent");
      }
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background py-8">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(148,163,184,0.35)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(148,163,184,0.22)_1px,_transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="group relative border-border/50 bg-card/60 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.35)] rounded-[2.5rem] overflow-hidden">
          <CardHeader className="relative z-10 space-y-2 pb-4 text-center">
            <CardTitle className="text-xl font-black tracking-tighter bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Verify your email
            </CardTitle>
            <CardDescription className="text-muted-foreground font-medium text-xs">
              Enter the 6-digit code we sent to your inbox
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 px-4 pb-6">
            <form action={handleAction} className="space-y-4">
              <Field>
                <FieldContent className="space-y-2">
                  <FieldLabel
                    htmlFor="email"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isPending}
                    className="h-10 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldContent className="space-y-2">
                  <FieldLabel
                    htmlFor="otp"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1"
                  >
                    Verification Code
                  </FieldLabel>
                  <Input
                    id="otp"
                    name="otp"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    required
                    disabled={isPending}
                    className="h-10 tracking-[0.35em] text-center text-base border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-semibold"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  />
                  {isOtpInvalid && (
                    <FieldError>
                      Enter the 6-digit code from your email
                    </FieldError>
                  )}
                </FieldContent>
              </Field>

              <Button
                type="submit"
                disabled={isPending}
                className="group/btn relative w-full h-11 bg-primary text-primary-foreground font-black text-sm rounded-2xl overflow-hidden shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] border-0"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer" />
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={isPending || isResending}
                onClick={handleResend}
                className="w-full h-10 border-border/60 bg-background/40 text-xs font-medium"
              >
                {isResending ? "Resending..." : "Resend code"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
