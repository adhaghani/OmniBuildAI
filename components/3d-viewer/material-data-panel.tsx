'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { X, CheckCircle2 } from 'lucide-react';

export interface MaterialDataProps {
  elementName: string;
  uValue?: number;
  materials: Array<{
    name: string;
    thickness: string;
    carbonValue: number;
  }>;
  totalCarbon: number;
  performanceStatus: 'optimal' | 'moderate' | 'poor';
  performanceReason: string;
  standardZones?: {
    red: number;
    yellow: number;
    green: number;
  };
  complianceStatus?: string;
  currentStandard?: string;
  onClose?: () => void;
}

export function MaterialDataPanel({
  elementName,
  uValue,
  materials,
  totalCarbon,
  performanceStatus,
  performanceReason,
  standardZones,
  complianceStatus,
  currentStandard = 'China GBL',
  onClose,
}: MaterialDataProps) {
  const statusColors = {
    optimal: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    moderate: 'bg-orange-100 text-orange-700 border-orange-300',
    poor: 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-600"></div>
            <CardTitle className="text-sm font-medium">Material Data</CardTitle>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Element Name */}
        <div>
          <h3 className="font-semibold text-base">{elementName}</h3>
          {uValue && (
            <p className="text-xs text-muted-foreground mt-1">
              U-Value: {uValue.toFixed(2)} W/m²K
            </p>
          )}
        </div>

        {/* Performance Status */}
        <div
          className={`rounded-lg border p-3 ${statusColors[performanceStatus]}`}
        >
          <div className="flex items-start gap-2">
            <div className="mt-0.5">
              {performanceStatus === 'optimal' ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-current flex items-center justify-center">
                  <span className="text-xs font-bold">!</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs uppercase tracking-wide">
                {performanceStatus === 'optimal' && 'Optimal Performance'}
                {performanceStatus === 'moderate' && 'Moderate Performance'}
                {performanceStatus === 'poor' && 'Poor Performance'}
              </p>
              <p className="text-xs mt-1 leading-relaxed">{performanceReason}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Materials List */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Material Composition
          </h4>
          <div className="space-y-2">
            {materials.map((material, idx) => (
              <div key={idx} className="flex items-start justify-between text-xs">
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{material.name}</p>
                  <p className="text-muted-foreground text-[10px]">
                    {material.thickness}
                  </p>
                </div>
                <p className="font-mono text-emerald-600 whitespace-nowrap ml-2">
                  {material.carbonValue} kg CO2e
                </p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Total Carbon */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Total Embodied Carbon</p>
          <p className="font-semibold text-base">
            {totalCarbon} kg CO2e/m²
          </p>
        </div>

        {/* Compliance Badge */}
        {complianceStatus && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
            <p className="text-emerald-700 text-xs font-medium text-center">
              {complianceStatus}
            </p>
          </div>
        )}

        {/* Standard Zones */}
        {standardZones && (
          <>
            <Separator />
            <div>
              <h4 className="text-xs font-medium mb-3">
                Current Standard: {currentStandard}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Red Zones</span>
                  <span className="font-semibold text-red-600">
                    {standardZones.red} areas
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Yellow Zones</span>
                  <span className="font-semibold text-orange-600">
                    {standardZones.yellow} areas
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Green Zones</span>
                  <span className="font-semibold text-emerald-600">
                    {standardZones.green} areas
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
