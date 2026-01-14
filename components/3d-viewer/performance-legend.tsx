import { Card, CardContent } from '@/components/ui/card';

export function PerformanceLegend() {
  return (
    <Card className="absolute top-4 left-1/2 -translate-x-1/2 w-auto">
      <CardContent className="p-4">
        <h3 className="mb-3 text-sm font-semibold">Performance Legend</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-muted-foreground">High Thermal Gain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-muted-foreground">Moderate Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-muted-foreground">Optimal / Compliant</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
