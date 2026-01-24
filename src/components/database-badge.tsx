import { Badge } from '@/components/ui/badge';

interface DatabaseBadgeProps {
    name: string;
    colorClass: string;
}

export function DatabaseBadge({ name, colorClass }: DatabaseBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={`px-6 py-3 ${colorClass} border backdrop-blur-sm rounded-xl font-semibold text-base hover:scale-110 transition-transform cursor-pointer`}
        >
            {name}
        </Badge>
    );
}
