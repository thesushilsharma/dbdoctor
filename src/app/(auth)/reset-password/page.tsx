"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { resetPasswordAction } from "@/lib/actions/auth.actions";
import { updatePasswordSchema } from "@/lib/validations/auth";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    null,
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Reset link is invalid or expired");
      router.replace("/forgot-password");
    }
  }, [token, router]);

  useEffect(() => {
    if (state?.success) {
      toast.success("Password updated. You can sign in with your new password.");
      router.push("/sign-in");
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  const parsed = useMemo(
    () =>
      updatePasswordSchema.safeParse({
        password,
        confirmPassword,
      }),
    [password, confirmPassword],
  );

  const handleAction = (formData: FormData) => {
    if (!token) return;

    if (!parsed.success) {
      setAttemptedSubmit(true);
      return;
    }

    formData.set("token", token);

    startTransition(() => {
      formAction(formData);
    });
  };

  const passwordIssue =
    !parsed.success &&
    parsed.error.issues.find((i) => i.path[0] === "password");
  const confirmIssue =
    !parsed.success &&
    parsed.error.issues.find((i) => i.path[0] === "confirmPassword");

  const showPasswordError = (passwordTouched || attemptedSubmit) && !!passwordIssue;
  const showConfirmError = (confirmTouched || attemptedSubmit) && !!confirmIssue;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background py-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15" />

      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/25 rounded-full blur-[100px] animate-blob" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/25 rounded-full blur-[100px] animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="group relative border-border/50 bg-card/40 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] rounded-[2.5rem] overflow-hidden">
          <CardHeader className="relative z-10 space-y-2 pb-4 text-center">
            <CardTitle className="text-xl font-black tracking-tighter bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Choose a new password
            </CardTitle>
            <CardDescription className="text-muted-foreground font-medium text-xs">
              Your new password must meet the security requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 px-4 pb-6">
            <form action={handleAction} className="space-y-4">
              <Field>
                <FieldContent className="space-y-2">
                  <FieldLabel
                    htmlFor="password"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1"
                  >
                    New password
                  </FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                    disabled={isPending}
                    className="h-10 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                  />
                  {showPasswordError && (
                    <FieldError>{passwordIssue?.message}</FieldError>
                  )}
                </FieldContent>
              </Field>

              <Field>
                <FieldContent className="space-y-2">
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1"
                  >
                    Confirm new password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                    disabled={isPending}
                    className="h-10 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => setConfirmTouched(true)}
                  />
                  {showConfirmError && (
                    <FieldError>{confirmIssue?.message}</FieldError>
                  )}
                </FieldContent>
              </Field>

              <Button
                type="submit"
                disabled={isPending || !parsed.success || !token}
                className="group/btn relative w-full h-11 bg-primary text-primary-foreground font-black text-sm rounded-2xl overflow-hidden shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] border-0"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Updating password...
                    </>
                  ) : (
                    "Update password"
                  )}
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

