'use client';

interface HeatmapLegendProps {
  mode: 'energy' | 'carbon' | 'daylight' | 'thermal';
  min: number;
  max: number;
  unit: string;
}

const modeLabels = {
  energy: 'Energy Performance',
  carbon: 'Embodied Carbon',
  daylight: 'Natural Light',
  thermal: 'Thermal Gain',
};

const modeColors = {
  energy: ['#22c55e', '#eab308', '#ef4444'],
  carbon: ['#22c55e', '#f97316', '#dc2626'],
  daylight: ['#1e3a8a', '#3b82f6', '#fef08a'],
  thermal: ['#3b82f6', '#84cc16', '#ef4444'],
};

export function HeatmapLegend({ mode, min, max, unit }: HeatmapLegendProps) {
  const colors = modeColors[mode];

  return (
    <div className="bg-card border rounded-lg p-4 space-y-3 w-64">
      <h4 className="font-semibold text-sm">{modeLabels[mode]}</h4>

      <div className="space-y-2">
        <div
          className="h-4 rounded-full"
          style={{
            background: `linear-gradient(to right, ${colors.join(', ')})`,
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {min} {unit}
          </span>
          <span>
            {max} {unit}
          </span>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        {mode === 'energy' && 'Green = efficient, Red = high consumption'}
        {mode === 'carbon' && 'Green = low carbon, Red = high carbon'}
        {mode === 'daylight' && 'Dark = poor light, Yellow = optimal'}
        {mode === 'thermal' && 'Blue = cool, Red = hot'}
      </div>
    </div>
  );
}
