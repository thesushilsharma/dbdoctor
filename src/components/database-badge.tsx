import { Badge } from '@/components/ui/badge';

interface DatabaseBadgeProps {
    name: string;
    colorClass: string;
}

export function DatabaseBadge({ name, colorClass }: DatabaseBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={`group relative px-8 py-4 ${colorClass} border-2 border-border/50 bg-card/40 backdrop-blur-xl rounded-2xl font-black text-lg tracking-tight transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_20px_50px_-12px_var(--primary)] hover:border-primary/50 cursor-pointer overflow-hidden active:scale-95`}
        >
            <span className="relative z-10 group-hover:scale-110 transition-transform duration-500 inline-block">
                {name}
            </span>
            
            {/* Animated accent gradient on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 transition-opacity duration-500 pointer-events-none" />
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-primary/20 blur-xl transition-opacity duration-500 pointer-events-none" />
        </Badge>
    );
}
