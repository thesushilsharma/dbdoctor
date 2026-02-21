import Link from "next/link";
import { Home, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-accent/30 blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 shadow-[0_0_50px_-12px] shadow-destructive/30 animate-in zoom-in duration-500">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>

        <h1 className="mb-4 text-8xl font-black tracking-tighter text-foreground sm:text-9xl">
          404
        </h1>

        <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Query Not Found
        </h2>

        <p className="mb-10 text-lg text-muted-foreground leading-relaxed">
          The record you're looking for seems to have been dropped from our
          database. Let's get you back to the dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 font-bold shadow-lg shadow-primary/25 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Return Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8 font-bold border-border bg-background/50 backdrop-blur-sm rounded-xl transition-all hover:bg-muted hover:scale-105 active:scale-95"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Subtle Footer Decorative Border */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
