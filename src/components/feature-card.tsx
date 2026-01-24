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
        <Card className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </Card>
    );
}
