# 3D Visualization Components

Reusable components for rendering and interacting with BIM models using Three.js and @thatopen/components.

## Components

### IFCViewer
Main 3D viewer component that renders BIM models.

```tsx
import { IFCViewer } from '@/components/3d-viewer';

<IFCViewer
  className="h-screen w-full"
  overlayOpacity={0.8}
  activeLayers={{
    thermal: true,
    daylight: false,
    carbon: false,
    water: false
  }}
  onModelLoaded={() => console.log('Model loaded')}
/>
```

### LayerControls
Control panel for toggling performance overlays and adjusting opacity.

```tsx
import { LayerControls } from '@/components/3d-viewer';

<LayerControls
  onLayerChange={(layers) => setActiveLayers(layers)}
  onOpacityChange={(opacity) => setOpacity(opacity)}
/>
```

### StandardSelector
Switch between different building standards (GBL, GBI, LEED, etc.).

```tsx
import { StandardSelector } from '@/components/3d-viewer';

<StandardSelector
  onStandardChange={(standard) => console.log(standard)}
/>
```

### PerformanceLegend
Display legend for performance color coding.

```tsx
import { PerformanceLegend } from '@/components/3d-viewer';

<PerformanceLegend />
```

### ViewerControls
Zoom and navigation controls for the 3D viewer.

```tsx
import { ViewerControls } from '@/components/3d-viewer';

<ViewerControls
  onZoomIn={() => {}}
  onZoomOut={() => {}}
  onReset={() => {}}
/>
```

## Features

- ✅ Real-time 3D rendering with Three.js
- ✅ Performance overlay visualization (thermal, daylight, carbon, water)
- ✅ Interactive layer controls with opacity adjustment
- ✅ Multiple standard support (China GBL, Malaysia GBI)
- ✅ Zoom, pan, and rotate controls
- ✅ Material tagging and inspection
- ✅ Color-coded performance zones

## Usage in Dashboard

The complete 3D visualization page is available at `/dashboard/visualization` and combines all components for a full-featured BIM viewer experience.
