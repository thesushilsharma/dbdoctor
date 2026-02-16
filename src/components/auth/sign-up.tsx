"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useOptimistic, startTransition, useMemo, useState } from "react";
import { Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpAction } from "@/app/actions/auth";
import { Field, FieldContent, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import { strongPasswordSchema, signUpSchema } from "@/lib/validations/auth";

export default function SignUp() {
	const [state, formAction, isPending] = useActionState(signUpAction, null);
	const [optimisticStatus, setOptimisticStatus] = useOptimistic<string | null, string | null>(
		null,
		(_, newMessage) => newMessage
	);
	const router = useRouter();
	const [givenName, setGivenName] = useState("");
	const [familyName, setFamilyName] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordFocused, setPasswordFocused] = useState(false);
	const [confirmFocused, setConfirmFocused] = useState(false);
	const [givenTouched, setGivenTouched] = useState(false);
	const [familyTouched, setFamilyTouched] = useState(false);
	const [emailTouched, setEmailTouched] = useState(false);
	const [confirmTouched, setConfirmTouched] = useState(false);
	const [attemptedSubmit, setAttemptedSubmit] = useState(false);
	const hasMin = password.length >= 8 && password.length <= 64;
	const hasUpper = /[A-Z]/.test(password);
	const hasLower = /[a-z]/.test(password);
	const hasNumber = /[0-9]/.test(password);
	const hasSpecial = /[!@#$%^&*()]/.test(password);
	const overallValid = useMemo(() => strongPasswordSchema.safeParse(password).success, [password]);
	const match = confirmPassword.length > 0 && confirmPassword === password;

	useEffect(() => {
		if (state?.success) {
			toast.success("Account created! Check your email for a verification code.");
			const target = state.email
				? `/verify-email?email=${encodeURIComponent(state.email)}`
				: "/verify-email";
			router.push(target);
		}
		if (state?.error) {
			toast.error(state.error);
		}
	}, [state, router]);

	const parsed = useMemo(() => signUpSchema.safeParse({
		givenName,
		familyName,
		email: emailValue,
		password,
		confirmPassword,
	}), [givenName, familyName, emailValue, password, confirmPassword]);

	const handleAction = (formData: FormData) => {
		if (!parsed.success) {
			setAttemptedSubmit(true);
			return;
		}
		startTransition(() => {
			setOptimisticStatus("Creating your account...");
			formAction(formData);
		});
	};

	return (
		<Card className="group relative border-border/50 bg-card/40 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:shadow-[0_32px_64px_-16px_rgba(var(--primary),0.1)] ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_48px_80px_-20px_rgba(var(--primary),0.15)]">
			<CardHeader className="relative z-10 space-y-2 pb-4 text-center">
				<CardTitle className="text-xl font-black tracking-tighter bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
					Create Account
				</CardTitle>
				<CardDescription className="text-muted-foreground font-medium text-xs">
					Join the database performance revolution
				</CardDescription>
			</CardHeader>
			<CardContent className="relative z-10 px-4 pb-6">
				<form action={handleAction} className="space-y-3">
					<div className="grid grid-cols-2 gap-2">
						<Field>
							<FieldContent className="space-y-2">
								<FieldLabel htmlFor="givenName" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">
									Given Name
								</FieldLabel>
								<Input
									id="givenName"
									name="givenName"
									placeholder="Jane"
									required
									disabled={isPending}
									className="h-10 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
									value={givenName}
									onChange={(e) => setGivenName(e.target.value)}
									onBlur={() => setGivenTouched(true)}
								/>
								{(givenTouched || attemptedSubmit) && !parsed.success && parsed.error.issues.some(i => i.path[0] === "givenName") && (
									<FieldError>{parsed.error.issues.find(i => i.path[0] === "givenName")?.message}</FieldError>
								)}
							</FieldContent>
						</Field>
						<Field>
							<FieldContent className="space-y-2">
								<FieldLabel htmlFor="familyName" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">
									Family Name
								</FieldLabel>
								<Input
									id="familyName"
									name="familyName"
									placeholder="Doe"
									required
									disabled={isPending}
									className="h-10 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
									value={familyName}
									onChange={(e) => setFamilyName(e.target.value)}
									onBlur={() => setFamilyTouched(true)}
								/>
								{(familyTouched || attemptedSubmit) && !parsed.success && parsed.error.issues.some(i => i.path[0] === "familyName") && (
									<FieldError>{parsed.error.issues.find(i => i.path[0] === "familyName")?.message}</FieldError>
								)}
							</FieldContent>
						</Field>
					</div>
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
								<FieldLabel htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">
									Password
								</FieldLabel>
								<Input
									id="password"
									name="password"
									type="password"
									autoComplete="new-password"
									placeholder="••••••••"
									required
									disabled={isPending}
									className={`h-10 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 rounded-2xl transition-all duration-300 font-medium focus:ring-4 ${passwordFocused && !overallValid ? "ring-destructive/30 border-destructive/60" : "focus:border-primary/50 focus:ring-primary/10"}`}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									onFocus={() => setPasswordFocused(true)}
									onBlur={() => setPasswordFocused(false)}
								/>
								{passwordFocused && (
									<div className="mt-2 flex flex-wrap gap-2">
										<div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${hasMin ? "border-border text-foreground" : "border-destructive/50 text-muted-foreground"}`}>
											{hasMin ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} 8–64 chars
										</div>
										<div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${hasUpper ? "border-border text-foreground" : "border-destructive/50 text-muted-foreground"}`}>
											{hasUpper ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Uppercase
										</div>
										<div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${hasLower ? "border-border text-foreground" : "border-destructive/50 text-muted-foreground"}`}>
											{hasLower ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Lowercase
										</div>
										<div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${hasNumber ? "border-border text-foreground" : "border-destructive/50 text-muted-foreground"}`}>
											{hasNumber ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Number
										</div>
										<div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${hasSpecial ? "border-border text-foreground" : "border-destructive/50 text-muted-foreground"}`}>
											{hasSpecial ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Special
										</div>
									</div>
								)}
							</FieldContent>
						</Field>
						<Field>
							<FieldContent className="space-y-2">
								<FieldLabel htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">
									Confirm Password
								</FieldLabel>
								<Input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									autoComplete="new-password"
									placeholder="••••••••"
									required
									disabled={isPending}
									className={`h-10 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 rounded-2xl transition-all duration-300 font-medium focus:ring-4 ${confirmFocused && !match ? "ring-destructive/30 border-destructive/60" : "focus:border-primary/50 focus:ring-primary/10"}`}
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									onFocus={() => setConfirmFocused(true)}
									onBlur={() => { setConfirmFocused(false); setConfirmTouched(true); }}
								/>
								{(confirmTouched || attemptedSubmit) && !match && (
									<FieldError className="text-destructive">Passwords need to match</FieldError>
								)}
							</FieldContent>
						</Field>
					<Button 
						type="submit" 
						disabled={isPending || !parsed.success} 
						className="group/btn relative w-full h-11 bg-primary text-primary-foreground font-black text-sm rounded-2xl overflow-hidden shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] border-0"
					>
						<span className="relative z-10 flex items-center justify-center gap-2">
							{isPending ? (
								<>
									<Loader2 className="h-5 w-5 animate-spin" />
									{optimisticStatus || "Creating account..."}
								</>
							) : (
								"Create Free Account"
							)}
						</span>
						<div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer" />
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
