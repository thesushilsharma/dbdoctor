import SignUp from "@/components/auth/sign-up";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function SignUpPage() {
	return (
		<div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background py-8">
			{/* Modern Grid Background */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15" />
			
			{/* Animated Blobs from globals.css */}
			<div className="absolute top-1/4 -right-20 w-80 h-80 bg-chart-2/20 rounded-full blur-[100px] animate-blob" />
			<div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-chart-5/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />

			<div className="relative z-10 w-full max-w-md px-4">
				{/* Logo & Brand */}
				<div className="mb-8 flex flex-col items-center text-center">
					<Link 
						href="/"
						className="group mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-card/50 backdrop-blur-xl border border-border shadow-2xl transition-all hover:scale-105 hover:border-border/50"
					>
						<Sparkles className="h-6 w-6 text-chart-2 transition-transform group-hover:rotate-12" />
					</Link>
					<h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
						Join <span className="bg-linear-to-r from-chart-2 to-chart-5 bg-clip-text text-transparent">DBDoctor</span>
					</h1>
					<p className="mt-2 text-sm text-muted-foreground font-medium">
						Start optimizing your database today.
					</p>
				</div>

				{/* Sign Up Component */}
				<SignUp />

				{/* Footer Links */}
				<div className="mt-6 flex flex-col items-center gap-3">
					<p className="text-xs text-muted-foreground font-medium">
						Already have an account?{" "}
						<Link
							href="/sign-in"
							className="font-bold text-chart-2 transition-all hover:text-chart-2/80 hover:underline underline-offset-4"
						>
							Sign in here
						</Link>
					</p>

					<Link 
						href="/"
						className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-muted-foreground transition-colors flex items-center gap-2"
					>
						<span>←</span> Back to Home
					</Link>
				</div>
			</div>

			{/* Subtle Decorative Gradient Border */}
			<div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-chart-2/20 to-transparent" />
		</div>
	);
}
