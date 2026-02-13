import { Card } from '@/components/ui/card';

interface TechCardProps {
    category: string;
    technologies: string[];
    color: 'indigo' | 'purple' | 'pink' | 'blue';
}

const colorMap: Record<string, string> = {
    indigo: 'from-primary/20 to-primary/5 border-primary/30 text-primary',
    purple: 'from-accent/20 to-accent/5 border-accent/30 text-accent',
    pink: 'from-chart-5/20 to-chart-5/5 border-chart-5/30 text-chart-5',
    blue: 'from-chart-2/20 to-chart-2/5 border-chart-2/30 text-chart-2',
};

export function TechCard({ category, technologies, color }: TechCardProps) {
    return (
        <Card className={`group relative bg-linear-to-br ${colorMap[color]} border-2 border-transparent hover:border-current transition-all duration-700 rounded-[2.5rem] p-10 backdrop-blur-3xl hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] overflow-hidden`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,currentColor_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-all duration-700 group-hover:rotate-12 group-hover:scale-125">
                <div className="w-16 h-16 rounded-full border-[6px] border-current" />
            </div>

            <h3 className="text-2xl font-black mb-8 tracking-tighter text-foreground group-hover:translate-x-2 transition-transform duration-500">{category}</h3>
            <div className="flex flex-wrap gap-4 relative z-10">
                {technologies.map((tech) => (
                    <span 
                        key={tech} 
                        className="px-6 py-2.5 bg-background/40 hover:bg-background/90 border border-border/50 rounded-2xl text-base font-bold text-foreground transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-current cursor-default"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </Card>
    );
}
