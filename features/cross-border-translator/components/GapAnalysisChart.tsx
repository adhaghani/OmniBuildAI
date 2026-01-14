'use client';

interface GapAnalysisChartProps {
  // TODO: Add chart props when ready for visualization
  data?: any;
}

export function GapAnalysisChart({ data }: GapAnalysisChartProps) {
  return (
    <div className="h-[300px] w-full flex items-center justify-center border rounded-lg bg-muted/10">
      <p className="text-muted-foreground">Compliance Comparison Chart Placeholder</p>
    </div>
  );
}
