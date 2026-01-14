'use client';

import { X, Leaf, Flame, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MaterialInfo } from '../types';

interface MaterialInfoPanelProps {
  material: MaterialInfo | null;
  onClose: () => void;
}

export function MaterialInfoPanel({ material, onClose }: MaterialInfoPanelProps) {
  if (!material) return null;

  return (
    <div className="absolute bottom-4 left-4 w-80 bg-card border rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h4 className="font-semibold">{material.name}</h4>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-green-600" />
            <div>
              <div className="text-xs text-muted-foreground">Embodied Carbon</div>
              <div className="font-medium">{material.embodiedCarbon} kgCO₂e/kg</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-600" />
            <div>
              <div className="text-xs text-muted-foreground">Thermal (R-value)</div>
              <div className="font-medium">{material.thermalResistance}</div>
            </div>
          </div>
        </div>

        {material.recycledContent !== undefined && (
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">Recycled Content</div>
            <div className="font-medium">{material.recycledContent}%</div>
          </div>
        )}

        {material.certifications && material.certifications.length > 0 && (
          <div>
            <div className="text-xs text-muted-foreground mb-1">Certifications</div>
            <div className="flex flex-wrap gap-1">
              {material.certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {material.supplier && (
          <div>
            <div className="text-xs text-muted-foreground">Supplier</div>
            <div className="text-sm">{material.supplier}</div>
          </div>
        )}
      </div>
    </div>
  );
}
