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
import { useActionState, useEffect, useOptimistic, startTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpAction } from "@/app/actions/auth";
import { Field, FieldContent, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";

export default function SignUp() {
	const [state, formAction, isPending] = useActionState(signUpAction, null);
	const [optimisticStatus, setOptimisticStatus] = useOptimistic<string | null, string | null>(
		null,
		(_, newMessage) => newMessage
	);
	const router = useRouter();

	useEffect(() => {
		if (state?.success) {
			toast.success("Account created successfully!");
			router.push("/dashboard");
		}
		if (state?.error) {
			toast.error(state.error);
		}
	}, [state, router]);

	const handleAction = (formData: FormData) => {
		startTransition(() => {
			setOptimisticStatus("Creating your account...");
			formAction(formData);
		});
	};

	return (
		<Card className="group relative border-border/50 bg-card/40 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:shadow-[0_32px_64px_-16px_rgba(var(--primary),0.1)] ring-1 ring-border/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_48px_80px_-20px_rgba(var(--primary),0.15)]">
			{/* Animated accent border */}
			<div className="absolute inset-0 p-px rounded-[2.5rem] bg-linear-to-b from-primary/30 via-transparent to-accent/30 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
			
			<CardHeader className="relative z-10 space-y-2 pb-6 pt-10 text-center">
				<CardTitle className="text-3xl font-black tracking-tighter bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
					Create Account
				</CardTitle>
				<CardDescription className="text-muted-foreground font-medium">
					Join the database performance revolution
				</CardDescription>
			</CardHeader>
			<CardContent className="relative z-10 px-10 pb-10">
				<form action={handleAction} className="space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<Field>
							<FieldContent className="space-y-2">
								<FieldLabel htmlFor="first-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">
									First Name
								</FieldLabel>
								<Input
									id="first-name"
									name="first-name"
									placeholder="Jane"
									required
									disabled={isPending}
									className="h-14 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
								/>
							</FieldContent>
						</Field>
						<Field>
							<FieldContent className="space-y-2">
								<FieldLabel htmlFor="last-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">
									Last Name
								</FieldLabel>
								<Input
									id="last-name"
									name="last-name"
									placeholder="Doe"
									required
									disabled={isPending}
									className="h-14 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
								/>
							</FieldContent>
						</Field>
					</div>
					<Field>
						<FieldContent className="space-y-2">
							<FieldLabel htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">
								Email Address
							</FieldLabel>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="jane@company.com"
								required
								disabled={isPending}
								className="h-14 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
							/>
						</FieldContent>
					</Field>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
									className="h-14 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
								/>
							</FieldContent>
						</Field>
						<Field>
							<FieldContent className="space-y-2">
								<FieldLabel htmlFor="password_confirmation" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80 ml-1">
									Confirm
								</FieldLabel>
								<Input
									id="password_confirmation"
									name="password_confirmation"
									type="password"
									autoComplete="new-password"
									placeholder="••••••••"
									required
									disabled={isPending}
									className="h-14 border-border/50 bg-background/30 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all duration-300 font-medium"
								/>
							</FieldContent>
						</Field>
					</div>

					<Button 
						type="submit" 
						disabled={isPending} 
						className="group/btn relative w-full h-14 bg-primary text-primary-foreground font-black text-lg rounded-2xl overflow-hidden shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] border-0"
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