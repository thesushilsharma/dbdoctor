'use client';

import { Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="container mx-auto px-6 pt-32 pb-24 relative">
            <div className="text-center space-y-10 max-w-5xl mx-auto">
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
                        v1.0 is now live
                    </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                    <h1 className={`text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                        <span className="bg-linear-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent inline-block">
                            Database Health,
                        </span>
                        <br />
                        <span className="bg-linear-to-r from-primary via-accent to-chart-1 bg-clip-text text-transparent inline-block">
                            Diagnosed Instantly
                        </span>
                    </h1>
                </div>

                {/* Subtitle */}
                <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                    The open-source diagnostic platform for high-performance databases. 
                    Identify bottlenecks in <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">PostgreSQL</span>, 
                    <span className="text-foreground font-bold underline decoration-chart-2/30 underline-offset-4"> MySQL</span>, and 
                    <span className="text-foreground font-bold underline decoration-accent/30 underline-offset-4"> MongoDB</span>.
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center pt-4 transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <Button
                        type="button"
                        size="lg"
                        className="group relative h-14 px-10 bg-primary text-primary-foreground rounded-2xl font-black text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px] hover:shadow-primary/50 border-0 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Start Diagnosis
                            <Zap className="w-5 h-5 group-hover:fill-current transition-all group-hover:rotate-12" />
                        </span>
                        <div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity bg-[length:200%_100%] animate-shimmer" />
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="h-14 px-10 bg-card/50 backdrop-blur-xl border-border/50 rounded-2xl font-bold text-lg hover:bg-muted hover:border-border transition-all hover:scale-105 active:scale-95"
                    >
                        View the Docs
                    </Button>
                </div>

                {/* Stats */}
                <div className={`grid grid-cols-2 md:grid-cols-3 gap-12 max-w-3xl mx-auto pt-20 transition-all duration-1000 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex flex-col items-center group">
                        <div className="text-4xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">5+</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">Engines Supported</div>
                    </div>
                    <div className="flex flex-col items-center group">
                        <div className="text-4xl font-black tracking-tighter text-foreground group-hover:text-accent transition-colors">Real-time</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">Active Analysis</div>
                    </div>
                    <div className="hidden md:flex flex-col items-center group">
                        <div className="text-4xl font-black tracking-tighter text-foreground group-hover:text-chart-4 transition-colors">99.9%</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">Uptime Monitor</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
