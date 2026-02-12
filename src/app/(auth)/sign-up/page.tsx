import SignUp from "@/components/auth/sign-up";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function SignUpPage() {
	return (
		<div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020617] py-12">
			{/* Modern Grid Background */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
			
			{/* Animated Blobs from globals.css */}
			<div className="absolute top-1/4 -right-20 w-125 h-125 bg-emerald-500/20 rounded-full blur-[120px] animate-blob" />
			<div className="absolute bottom-1/4 -left-20 w-125 h-125 bg-teal-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-cyan-500/10 rounded-full blur-[140px] animate-blob animation-delay-4000" />

			<div className="relative z-10 w-full max-w-md px-6">
				{/* Logo & Brand */}
				<div className="mb-10 flex flex-col items-center text-center">
					<Link 
						href="/"
						className="group mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all hover:scale-110 hover:border-white/20"
					>
						<Sparkles className="h-8 w-8 text-emerald-400 transition-transform group-hover:rotate-12" />
					</Link>
					<h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
						Join <span className="bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">DBDoctor</span>
					</h1>
					<p className="mt-3 text-slate-400 font-medium">
						Start optimizing your database today.
					</p>
				</div>

				{/* Sign Up Component */}
				<SignUp />

				{/* Footer Links */}
				<div className="mt-8 flex flex-col items-center gap-4">
					<p className="text-sm text-slate-500 font-medium">
						Already have an account?{" "}
						<Link
							href="/sign-in"
							className="font-bold text-emerald-400 transition-all hover:text-emerald-300 hover:underline underline-offset-4"
						>
							Sign in here
						</Link>
					</p>

					<Link 
						href="/"
						className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-colors flex items-center gap-2"
					>
						<span>←</span> Back to Home
					</Link>
				</div>
			</div>

			{/* Subtle Decorative Gradient Border */}
			<div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
		</div>
	);
}
