"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useActionState, useEffect, useOptimistic, startTransition, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signInAction } from "@/app/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Field, FieldContent, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import { loginSchema } from "@/lib/validations/auth";

export default function SignIn() {
	const [state, formAction, isPending] = useActionState(signInAction, null);
	const [optimisticStatus, setOptimisticStatus] = useOptimistic<string | null, string | null>(
		null,
		(_, newMessage) => newMessage
	);
	const router = useRouter();
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [emailTouched, setEmailTouched] = useState(false);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [attemptedSubmit, setAttemptedSubmit] = useState(false);

	useEffect(() => {
		if (state?.success) {
			toast.success("Signed in successfully!");
			router.push("/dashboard");
		}
		if (state?.error) {
			toast.error(state.error);
		}
	}, [state, router]);

	const parsed = useMemo(() => loginSchema.safeParse({
		email: emailValue,
		password: passwordValue,
	}), [emailValue, passwordValue]);

	const handleAction = (formData: FormData) => {
		if (!parsed.success) {
			setAttemptedSubmit(true);
			return;
		}
		startTransition(() => {
			setOptimisticStatus("Authenticating...");
			formAction(formData);
		});
	};

	return (
		<Card className="group relative border-border/50 bg-card/40 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:shadow-[0_32px_64px_-16px_rgba(var(--primary),0.1)] ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_48px_80px_-20px_rgba(var(--primary),0.15)]">
			
			<CardHeader className="relative z-10 space-y-2 pb-4 pt-8 text-center">
				<CardTitle className="text-xl font-black tracking-tighter bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
					Sign In
				</CardTitle>
				<CardDescription className="text-muted-foreground font-medium text-xs">
					Access your performance dashboard
				</CardDescription>
			</CardHeader>
			<CardContent className="relative z-10 px-4 pb-6">
				<form action={handleAction} className="space-y-3">
					<Field>
						<FieldContent className="space-y-2">
							<FieldLabel htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">
								Email
							</FieldLabel>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="jane@company.com"
								required
								disabled={isPending}
								className="h-10 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
								value={emailValue}
								onChange={(e) => setEmailValue(e.target.value)}
								onBlur={() => setEmailTouched(true)}
							/>
							{(emailTouched || attemptedSubmit) && !parsed.success && parsed.error.issues.some(i => i.path[0] === "email") && (
								<FieldError>{parsed.error.issues.find(i => i.path[0] === "email")?.message}</FieldError>
							)}
						</FieldContent>
					</Field>

					<Field>
						<FieldContent className="space-y-2">
							<div className="flex items-center justify-between px-1">
								<FieldLabel htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">
									Password
								</FieldLabel>
								<Link
									href="#"
									className="text-xs font-bold text-primary hover:text-accent transition-colors"
								>
									Forgot?
								</Link>
							</div>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="••••••••"
								autoComplete="current-password"
								required
								disabled={isPending}
								className="h-10 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
								value={passwordValue}
								onChange={(e) => setPasswordValue(e.target.value)}
								onBlur={() => setPasswordTouched(true)}
							/>
							{(passwordTouched || attemptedSubmit) && !parsed.success && parsed.error.issues.some(i => i.path[0] === "password") && (
								<FieldError>{parsed.error.issues.find(i => i.path[0] === "password")?.message}</FieldError>
							)}
						</FieldContent>
					</Field>

					<div className="flex items-center justify-between px-1">
						<div className="flex items-center space-x-3">
							<Checkbox
								id="remember"
								name="remember"
								disabled={isPending}
								className="h-5 w-5 border-border/50 bg-background/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-lg transition-all"
							/>
							<label htmlFor="remember" className="text-sm font-bold text-muted-foreground cursor-pointer select-none">
								Stay signed in
							</label>
						</div>
					</div>

					<Button 
						type="submit" 
						disabled={isPending || !parsed.success} 
						className="group/btn relative w-full h-11 bg-primary text-primary-foreground font-black text-sm rounded-2xl overflow-hidden shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] border-0"
					>
						<span className="relative z-10 flex items-center justify-center gap-2">
							{isPending ? (
								<>
									<Loader2 className="h-5 w-5 animate-spin" />
									{optimisticStatus || "Authenticating..."}
								</>
							) : (
								"Sign In to Dashboard"
							)}
						</span>
						<div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer" />
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
