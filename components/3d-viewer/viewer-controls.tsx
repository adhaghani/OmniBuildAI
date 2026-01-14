'use client';

import { ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ViewerControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
}

export function ViewerControls({ onZoomIn, onZoomOut, onReset }: ViewerControlsProps) {
  return (
    <>
      {/* Zoom Controls */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-10 w-10 bg-white shadow-md hover:bg-gray-50"
          onClick={onZoomIn}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-10 w-10 bg-white shadow-md hover:bg-gray-50"
          onClick={onZoomOut}
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-10 w-10 bg-white shadow-md hover:bg-gray-50"
          onClick={onReset}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      {/* Info Text */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-muted-foreground">
        <Info className="h-4 w-4" />
        <span>Click on building elements to view material data</span>
      </div>
    </>
  );
}
