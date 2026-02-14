import SignIn from "@/components/auth/sign-in";
import Link from "next/link";
import { Database } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background py-8">
      {/* Modern Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15" />

      {/* Animated Blobs from globals.css */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-[100px] animate-blob" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/30 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-1/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo & Brand */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link
            href="/"
            className="group mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-card/50 backdrop-blur-xl border border-border shadow-2xl transition-all hover:scale-105 hover:border-border/50"
          >
            <Database className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Welcome{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Back
            </span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-medium">
            Optimizing performance, one query at a time.
          </p>
        </div>

        {/* Sign In Component */}
        <SignIn />

        {/* Footer Links */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground font-medium">
            New to DBDoctor?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-primary transition-all hover:text-primary/80 hover:underline underline-offset-4"
            >
              Create an account
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
      <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
