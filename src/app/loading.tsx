import { Database } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="relative">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                
                {/* Main loading container */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-card border border-border shadow-2xl">
                    <Database className="h-10 w-10 animate-bounce text-primary" />
                </div>

                {/* Decorative particles */}
                <div className="absolute -top-4 -right-4 h-3 w-3 animate-pulse rounded-full bg-accent" />
                <div className="absolute -bottom-2 -left-4 h-2 w-2 animate-pulse rounded-full bg-chart-1 delay-300" />
            </div>
            
            <div className="mt-8 flex flex-col items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-foreground">DBDoctor is diagnosing...</h2>
                <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-1/3 animate-loading-bar rounded-full bg-linear-to-r from-primary to-accent" />
                </div>
            </div>
        </div>
    );
}
