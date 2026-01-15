'use client';

import { useState } from 'react';
import { IFCViewer } from '@/components/3d-viewer/ifc-viewer';
import { LayerControls } from '@/components/3d-viewer/layer-controls';
import { PerformanceLegend } from '@/components/3d-viewer/performance-legend';
import { StandardSelector } from '@/components/3d-viewer/standard-selector';
import { ViewerControls } from '@/components/3d-viewer/viewer-controls';
import { ModelSelector } from '@/components/3d-viewer/model-selector';

export default function ThreeDVisualizationPage() {
  const [overlayOpacity, setOverlayOpacity] = useState(0.8);
  const [activeLayers, setActiveLayers] = useState({
    thermal: true,
    daylight: false,
    carbon: false,
    water: false,
  });
  const [selectedModel, setSelectedModel] = useState('/demo/Ifc2x3_SampleCastle.ifc');
  const [viewerKey, setViewerKey] = useState(0);

  const handleModelSelect = (file: { path: string }) => {
    setSelectedModel(file.path);
    // Force re-render of viewer with new model
    setViewerKey(prev => prev + 1);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <div className="border-b px-6 py-2">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-xl font-bold">3D Green Heatmap</h1>
              <p className="text-sm text-muted-foreground">
                Interactive visualization with material tagging and performance overlays
              </p>
            </div>
            
          </div>
          <div className='flex items-center gap-2'>
        <ModelSelector onModelSelect={handleModelSelect} />
          <StandardSelector />
          </div>
        </div>
      </div>

      {/* 3D Viewer Area */}
      <div className="relative flex-1 bg-gray-50">
        {/* Performance Legend */}
        <PerformanceLegend />

        {/* Layer Controls Panel */}
        <div className="absolute right-6 top-4 z-10">
          <LayerControls
            onLayerChange={setActiveLayers}
            onOpacityChange={setOverlayOpacity}
          />
        </div>

        {/* 3D Viewer */}
        <IFCViewer
          key={viewerKey}
          className="h-full w-full"
          overlayOpacity={overlayOpacity}
          activeLayers={activeLayers}
          ifcUrl={selectedModel}
          onModelLoaded={() => console.log('Model loaded:', selectedModel)}
        />

        {/* Viewer Controls */}
        <ViewerControls
          onZoomIn={() => console.log('Zoom in')}
          onZoomOut={() => console.log('Zoom out')}
          onReset={() => console.log('Reset view')}
        />
      </div>
    </div>
  );
}
