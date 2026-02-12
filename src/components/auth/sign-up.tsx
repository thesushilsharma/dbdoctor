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
		<Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl ring-1 ring-white/10 rounded-3xl overflow-hidden">
			<CardHeader className="space-y-2 pb-6 pt-8 text-center">
				<CardTitle className="text-2xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
					Create Account
				</CardTitle>
				<CardDescription className="text-slate-400">
					Join the database performance revolution
				</CardDescription>
			</CardHeader>
			<CardContent className="px-8 pb-8">
				<form action={handleAction} className="space-y-5">
					<div className="grid grid-cols-2 gap-4">
						<Field>
							<FieldContent className="space-y-1.5">
								<FieldLabel htmlFor="first-name" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
									First Name
								</FieldLabel>
								<Input
									id="first-name"
									name="first-name"
									placeholder="Jane"
									required
									disabled={isPending}
									className="h-12 border-white/5 bg-white/5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20 rounded-xl transition-all"
								/>
							</FieldContent>
						</Field>
						<Field>
							<FieldContent className="space-y-1.5">
								<FieldLabel htmlFor="last-name" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
									Last Name
								</FieldLabel>
								<Input
									id="last-name"
									name="last-name"
									placeholder="Doe"
									required
									disabled={isPending}
									className="h-12 border-white/5 bg-white/5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20 rounded-xl transition-all"
								/>
							</FieldContent>
						</Field>
					</div>
					<Field>
						<FieldContent className="space-y-1.5">
							<FieldLabel htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
								Email Address
							</FieldLabel>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="jane@company.com"
								required
								disabled={isPending}
								className="h-12 border-white/5 bg-white/5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20 rounded-xl transition-all"
							/>
						</FieldContent>
					</Field>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Field>
							<FieldContent className="space-y-1.5">
								<FieldLabel htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
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
									className="h-12 border-white/5 bg-white/5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20 rounded-xl transition-all"
								/>
							</FieldContent>
						</Field>
						<Field>
							<FieldContent className="space-y-1.5">
								<FieldLabel htmlFor="password_confirmation" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
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
									className="h-12 border-white/5 bg-white/5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20 rounded-xl transition-all"
								/>
							</FieldContent>
						</Field>
					</div>

					{optimisticStatus && !state?.error && (
						<div className="flex items-center justify-center gap-2 py-2">
							<Loader2 size={14} className="animate-spin text-emerald-400" />
							<span className="text-xs font-medium text-emerald-400 uppercase tracking-tighter">
								{optimisticStatus}
							</span>
						</div>
					)}

					{state?.error && (
						<div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 animate-in fade-in slide-in-from-top-2">
							<FieldError className="text-center text-xs font-medium text-red-400">
								{state.error}
							</FieldError>
						</div>
					)}

					<Button
						type="submit"
						className="relative h-12 w-full overflow-hidden bg-linaer-to-r from-emerald-600 to-teal-600 font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 rounded-xl shadow-xl shadow-emerald-500/20"
						disabled={isPending}
					>
						{isPending ? (
							<div className="flex items-center justify-center gap-2">
								<Loader2 size={20} className="animate-spin" />
								<span>Creating Account...</span>
							</div>
						) : (
							<span className="flex items-center justify-center gap-2">
								Get Started
							</span>
						)}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col gap-4 border-t border-white/5 bg-white/2 p-6">
				<p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
					Enterprise Grade Security
				</p>
			</CardFooter>
		</Card>
	);
}