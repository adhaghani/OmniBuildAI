'use client';

import { useState } from 'react';
import { IFCViewer, type ElementData } from '@/components/3d-viewer/ifc-viewer';
import { LayerControls } from '@/components/3d-viewer/layer-controls';
import { PerformanceLegend } from '@/components/3d-viewer/performance-legend';
import { StandardSelector } from '@/components/3d-viewer/standard-selector';
import { ViewerControls } from '@/components/3d-viewer/viewer-controls';
import { ModelSelector } from '@/components/3d-viewer/model-selector';
import { MaterialDataPanel } from '@/components/3d-viewer/material-data-panel';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

  const handleModelSelect = (file: { path: string }) => {
    setSelectedModel(file.path);
    // Force re-render of viewer with new model
    setViewerKey(prev => prev + 1);
    // Clear selected element when changing model
    setSelectedElement(null);
  };

  const handleElementClick = (elementData: ElementData) => {
    setSelectedElement(elementData);
  };

  const handleClosePanel = () => {
    setSelectedElement(null);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <div className="border-b px-6 py-2">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
          <h1 className="text-3xl font-bold">3D Green Hotmap</h1>
          <p className="mt-1 text-muted-foreground">
            Visualize building performance data in 3D
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
      <div className="relative flex-1 bg-muted/30">
        {/* Performance Legend */}
        <PerformanceLegend />

        {/* Layer Controls Panel */}
        <div className="absolute right-6 top-4 bottom-4 z-10 w-85 max-h-screen flex flex-col">
          <ScrollArea className="flex-1 max-h-[83vh] bg-card/95 backdrop-blur-sm rounded-lg border shadow-lg p-2">
            <div className="space-y-4 pr-4">
              <LayerControls
                onLayerChange={setActiveLayers}
                onOpacityChange={setOverlayOpacity}
              />
              
              {/* Material Data Panel */}
              {selectedElement && (
                <MaterialDataPanel
                  elementName={selectedElement.elementName}
                  uValue={selectedElement.uValue}
                  materials={selectedElement.materials}
                  totalCarbon={selectedElement.totalCarbon}
                  performanceStatus={selectedElement.performanceStatus}
                  performanceReason={selectedElement.performanceReason}
                  standardZones={selectedElement.standardZones}
                  complianceStatus={selectedElement.complianceStatus}
                  currentStandard="China GBL"
                  onClose={handleClosePanel}
                />
              )}
            </div>
          </ScrollArea>
        </div>

        {/* 3D Viewer */}
        <IFCViewer
          key={viewerKey}
          className="h-full w-full"
          overlayOpacity={overlayOpacity}
          activeLayers={activeLayers}
          ifcUrl={selectedModel}
          onModelLoaded={() => console.log('Model loaded:', selectedModel)}
          onElementClick={handleElementClick}
        />

        {/* Click instruction tooltip */}
        {!selectedElement && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-popover/95 text-popover-foreground border px-4 py-2 rounded-lg text-sm backdrop-blur-sm pointer-events-none shadow-md">
            💡 Click on building elements to view material data
          </div>
        )}

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
