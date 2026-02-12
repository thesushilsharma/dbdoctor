"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useActionState, useEffect, useOptimistic, startTransition } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signInAction } from "@/app/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Field, FieldContent, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";

export default function SignIn() {
	const [state, formAction, isPending] = useActionState(signInAction, null);
	const [optimisticStatus, setOptimisticStatus] = useOptimistic<string | null, string | null>(
		null,
		(_, newMessage) => newMessage
	);
	const router = useRouter();

	useEffect(() => {
		if (state?.success) {
			toast.success("Signed in successfully!");
			router.push("/dashboard");
		}
		if (state?.error) {
			toast.error(state.error);
		}
	}, [state, router]);

	const handleAction = (formData: FormData) => {
		startTransition(() => {
			setOptimisticStatus("Authenticating...");
			formAction(formData);
		});
	};

	return (
		<Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl ring-1 ring-white/10 rounded-3xl overflow-hidden">
			<CardHeader className="space-y-2 pb-6 pt-8 text-center">
				<CardTitle className="text-2xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
					Sign In
				</CardTitle>
				<CardDescription className="text-slate-400">
					Access your performance dashboard
				</CardDescription>
			</CardHeader>
			<CardContent className="px-8 pb-8">
				<form action={handleAction} className="space-y-5">
					<Field>
						<FieldContent className="space-y-1.5">
							<FieldLabel htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
								Email Address
							</FieldLabel>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="name@company.com"
								required
								disabled={isPending}
								className="h-12 border-white/5 bg-white/5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all"
							/>
						</FieldContent>
					</Field>

					<Field>
						<FieldContent className="space-y-1.5">
							<div className="flex items-center justify-between px-1">
								<FieldLabel htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-500">
									Password
								</FieldLabel>
								<Link
									href="#"
									className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
								>
									Forgot password?
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
								className="h-12 border-white/5 bg-white/5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all"
							/>
						</FieldContent>
					</Field>

					<div className="flex items-center space-x-3 px-1">
						<Checkbox
							id="remember"
							name="remember"
							disabled={isPending}
							className="h-5 w-5 border-white/10 bg-white/5 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 rounded-md transition-all"
						/>
						<FieldLabel htmlFor="remember" className="text-sm font-medium text-slate-400 cursor-pointer select-none">
							Remember this device
						</FieldLabel>
					</div>

					{optimisticStatus && !state?.error && (
						<div className="flex items-center justify-center gap-2 py-2">
							<Loader2 size={14} className="animate-spin text-indigo-400" />
							<span className="text-xs font-medium text-indigo-400 uppercase tracking-tighter">
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
						className="relative h-12 w-full overflow-hidden bg-linear-to-r from-indigo-600 to-purple-600 font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 rounded-xl shadow-xl shadow-indigo-500/20"
						disabled={isPending}
					>
						{isPending ? (
							<div className="flex items-center justify-center gap-2">
								<Loader2 size={20} className="animate-spin" />
								<span>Authenticating...</span>
							</div>
						) : (
							<span className="flex items-center justify-center gap-2">
								Sign In
							</span>
						)}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col gap-4 border-t border-white/5 bg-white/2 p-6">
				<p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
					Engineered with <span className="text-slate-300">Better-Auth</span>
				</p>
			</CardFooter>
		</Card>
	);
}