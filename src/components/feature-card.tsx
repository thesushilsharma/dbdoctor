import { Card } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
}

export function FeatureCard({ icon: Icon, title, description, gradient }: FeatureCardProps) {
    return (
        <Card className="group relative bg-card/40 backdrop-blur-3xl border border-border/50 rounded-[2rem] p-8 hover:bg-card/60 hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_40px_80px_-20px_var(--primary)] overflow-hidden">
            {/* Animated background glow */}
            <div className={`absolute -right-12 -top-12 w-48 h-48 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-30 blur-[100px] transition-all duration-700 group-hover:scale-150`} />
            
            <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${gradient} mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl shadow-black/20`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tighter text-card-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
                
                {/* Bottom accent bar with shimmer */}
                <div className="mt-10 relative h-1.5 w-full bg-border/20 rounded-full overflow-hidden">
                    <div className={`absolute inset-0 w-0 group-hover:w-full bg-linear-to-r ${gradient} transition-all duration-700 ease-out rounded-full`} />
                </div>
            </div>
        </Card>
    );
}
