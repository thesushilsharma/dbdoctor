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
        <section className="container mx-auto px-6 pt-32 pb-24">
            <div className="text-center space-y-8 max-w-5xl mx-auto">
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-medium text-indigo-300">Open Source Database Performance Platform</span>
                </div>

                {/* Main Heading */}
                <h1 className={`text-6xl md:text-8xl font-bold tracking-tight transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                        Database Health,
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Diagnosed Instantly
                    </span>
                </h1>

                {/* Subtitle */}
                <p className={`text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Identify slow queries, missing indexes, and optimization opportunities across{' '}
                    <span className="text-indigo-400 font-semibold">PostgreSQL</span>,{' '}
                    <span className="text-blue-400 font-semibold">MySQL</span>,{' '}
                    <span className="text-red-400 font-semibold">Oracle</span>,{' '}
                    <span className="text-green-400 font-semibold">MongoDB</span>, and more.
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <Button
                        type="button"
                        size="lg"
                        className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 border-0"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Started Free
                            <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
                    >
                        View Documentation
                    </Button>
                </div>

                {/* Stats */}
                <div className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-400">5+</div>
                        <div className="text-sm text-slate-400 mt-1">Databases</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">Real-time</div>
                        <div className="text-sm text-slate-400 mt-1">Monitoring</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-pink-400">AI-Powered</div>
                        <div className="text-sm text-slate-400 mt-1">Insights</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
