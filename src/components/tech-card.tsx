import { Card } from '@/components/ui/card';

interface TechCardProps {
    category: string;
    technologies: string[];
    color: 'indigo' | 'purple' | 'pink' | 'blue';
}

const colorMap: Record<string, string> = {
    indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
    pink: 'from-pink-500/20 to-pink-500/5 border-pink-500/30',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
};

export function TechCard({ category, technologies, color }: TechCardProps) {
    return (
        <Card className={`bg-gradient-to-br ${colorMap[color]} border backdrop-blur-sm rounded-2xl p-6 hover:scale-105 transition-transform`}>
            <h3 className="text-lg font-bold mb-4 text-white">{category}</h3>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium text-white">
                        {tech}
                    </span>
                ))}
            </div>
        </Card>
    );
}
