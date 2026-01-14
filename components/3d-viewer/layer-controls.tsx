'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Layers } from 'lucide-react';

export interface LayerControlsProps {
  onLayerChange?: (layers: {
    thermal: boolean;
    daylight: boolean;
    carbon: boolean;
    water: boolean;
  }) => void;
  onOpacityChange?: (opacity: number) => void;
}

export function LayerControls({ onLayerChange, onOpacityChange }: LayerControlsProps) {
  const [layers, setLayers] = useState({
    thermal: true,
    daylight: false,
    carbon: false,
    water: false,
  });
  const [opacity, setOpacity] = useState(80);

  const handleLayerToggle = (layer: keyof typeof layers) => {
    const newLayers = { ...layers, [layer]: !layers[layer] };
    setLayers(newLayers);
    onLayerChange?.(newLayers);
  };

  const handleOpacityChange = (value: number[]) => {
    setOpacity(value[0]);
    onOpacityChange?.(value[0] / 100);
  };

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Layers className="h-4 w-4 text-emerald-600" />
          Layer Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Layer Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="thermal" className="flex items-center gap-2 cursor-pointer">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span>Thermal Performance</span>
            </Label>
            <button
              id="thermal"
              onClick={() => handleLayerToggle('thermal')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${layers.thermal ? 'bg-emerald-600' : 'bg-gray-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${layers.thermal ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="daylight" className="flex items-center gap-2 cursor-pointer">
              <div className="h-3 w-3 rounded-full bg-orange-500"></div>
              <span>Daylight Access</span>
            </Label>
            <button
              id="daylight"
              onClick={() => handleLayerToggle('daylight')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${layers.daylight ? 'bg-emerald-600' : 'bg-gray-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${layers.daylight ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="carbon" className="flex items-center gap-2 cursor-pointer">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span>Embodied Carbon</span>
            </Label>
            <button
              id="carbon"
              onClick={() => handleLayerToggle('carbon')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${layers.carbon ? 'bg-emerald-600' : 'bg-gray-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${layers.carbon ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="water" className="flex items-center gap-2 cursor-pointer">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span>Water Systems</span>
            </Label>
            <button
              id="water"
              onClick={() => handleLayerToggle('water')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${layers.water ? 'bg-emerald-600' : 'bg-gray-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${layers.water ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>

        {/* Overlay Opacity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Overlay Opacity</Label>
            <span className="text-sm font-medium text-muted-foreground">{opacity}%</span>
          </div>
          <Slider
            value={[opacity]}
            onValueChange={handleOpacityChange}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        {/* Current Standard Info */}
        <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
          <p className="text-sm font-semibold">Current Standard: China GBL</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Red Zones</span>
              <span className="font-mono font-semibold text-red-600">12 areas</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Yellow Zones</span>
              <span className="font-mono font-semibold text-orange-600">8 areas</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Green Zones</span>
              <span className="font-mono font-semibold text-emerald-600">45 areas</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
