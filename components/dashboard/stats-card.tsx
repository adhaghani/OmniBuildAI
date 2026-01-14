import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBgColor: string;
  subtitleColor?: string;
}

export function StatsCard({ title, value, subtitle, icon, iconBgColor, subtitleColor }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-3xl font-bold">{value}</h3>
            {subtitle && (
              <p className={cn('mt-1 text-sm font-medium', subtitleColor || 'text-muted-foreground')}>
                {subtitle}
              </p>
            )}
          </div>
          <div className={cn('rounded-full p-2', iconBgColor)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
