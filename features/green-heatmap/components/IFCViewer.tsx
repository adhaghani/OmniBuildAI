/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Upload, ZoomIn, ZoomOut, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

interface IFCViewerProps {
  onElementSelect?: (elementId: string, data: Record<string, unknown>) => void;
  heatmapData?: Map<string, number>;
  heatmapMode?: 'energy' | 'carbon' | 'daylight' | 'thermal';
}

export function IFCViewer({
  onElementSelect,
  heatmapData,
  heatmapMode = 'energy',
}: IFCViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentsRef = useRef<any>(null);
  const worldRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initViewer = async () => {
      if (!containerRef.current || componentsRef.current) return;

      try {
        // Dynamically import @thatopen/components to avoid SSR issues
        const OBC = await import('@thatopen/components');
        const OBCF = await import('@thatopen/components-front');

        // Create the components instance
        const components = new OBC.Components();
        componentsRef.current = components;

        // Create a world
        const worlds = components.get(OBC.Worlds);
        const world = worlds.create();
        worldRef.current = world;

        world.scene = new OBC.SimpleScene(components);
        world.renderer = new OBCF.PostproductionRenderer(components, containerRef.current);
        world.camera = new OBC.OrthoPerspectiveCamera(components);

        components.init();

        // Setup scene
        if (world.scene && typeof (world.scene as any).setup === 'function') {
          (world.scene as any).setup();
        }
        world.camera.controls?.setLookAt(10, 10, 10, 0, 0, 0);
        
        // Add grid
        const grids = components.get(OBC.Grids);
        grids.create(world);
        
        // Setup raycaster for element selection
        const caster = components.get(OBC.Raycasters);
        caster.get(world);

        console.log('IFC Viewer initialized with @thatopen/components, mode:', heatmapMode);
      } catch (err) {
        setError('Failed to initialize 3D viewer');
        console.error(err);
      }
    };

    initViewer();

    return () => {
      // Cleanup
      if (componentsRef.current) {
        componentsRef.current.dispose();
        componentsRef.current = null;
      }
    };
  }, [heatmapMode, onElementSelect]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.ifc')) {
      setError('Please upload an IFC file');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (!componentsRef.current || !worldRef.current) {
        throw new Error('Viewer not initialized');
      }

      // Use @thatopen/components to load IFC
      const OBC = await import('@thatopen/components');
      const ifcLoader = componentsRef.current.get(OBC.IfcLoader);
      
      await ifcLoader.setup();

      // Read file as buffer
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Load the IFC model
      const model = await ifcLoader.load(uint8Array);
      worldRef.current.scene.three.add(model);

      // Fit camera to model
      const bbox = new THREE.Box3().setFromObject(model);
      const center = bbox.getCenter(new THREE.Vector3());
      const size = bbox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const distance = maxDim * 1.5;

      worldRef.current.camera.controls.setLookAt(
        center.x + distance,
        center.y + distance,
        center.z + distance,
        center.x,
        center.y,
        center.z
      );

      console.log('IFC Model loaded successfully');

      // Apply heatmap coloring if data is provided
      if (heatmapData && heatmapData.size > 0) {
        applyHeatmapColors(model);
      }

      setIsModelLoaded(true);
    } catch (err) {
      setError('Failed to load IFC model');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyHeatmapColors = (model: THREE.Object3D) => {
    if (!heatmapData) return;

    // Define color gradient based on heatmap mode
    const getColorForValue = (value: number): THREE.Color => {
      // Normalize value between 0 and 1
      const normalized = Math.max(0, Math.min(1, value));
      
      // Green to red gradient for carbon/energy
      if (heatmapMode === 'carbon' || heatmapMode === 'energy') {
        return new THREE.Color().setHSL(0.33 * (1 - normalized), 1, 0.5);
      }
      // Blue to yellow for daylight
      else if (heatmapMode === 'daylight') {
        return new THREE.Color().setHSL(0.6 - 0.16 * normalized, 1, 0.5);
      }
      // Default gradient
      return new THREE.Color().setHSL(0.66 * (1 - normalized), 0.8, 0.5);
    };

    // Apply colors to model elements
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const elementId = mesh.userData.expressID?.toString();
        
        if (elementId && heatmapData.has(elementId)) {
          const value = heatmapData.get(elementId)!;
          const color = getColorForValue(value);
          
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.color = color;
              }
            });
          } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.color = color;
          }
        }
      }
    });
  };

  const handleZoomIn = () => {
    if (worldRef.current) {
      const camera = worldRef.current.camera;
      camera.controls.dolly(-0.5, true);
    }
  };

  const handleZoomOut = () => {
    if (worldRef.current) {
      const camera = worldRef.current.camera;
      camera.controls.dolly(0.5, true);
    }
  };

  const handleReset = () => {
    if (worldRef.current) {
      worldRef.current.camera.controls.setLookAt(10, 10, 10, 0, 0, 0, true);
    }
  };

  const handleFitToView = () => {
    if (worldRef.current && worldRef.current.scene.three.children.length > 0) {
      const bbox = new THREE.Box3();
      
      worldRef.current.scene.three.traverse((obj: THREE.Object3D) => {
        if ((obj as THREE.Mesh).isMesh) {
          bbox.expandByObject(obj);
        }
      });

      if (!bbox.isEmpty()) {
        const center = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const distance = maxDim * 1.5;

        worldRef.current.camera.controls.setLookAt(
          center.x + distance,
          center.y + distance,
          center.z + distance,
          center.x,
          center.y,
          center.z,
          true
        );
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-muted/30 rounded-lg overflow-hidden">
      {/* 3D Viewer Container */}
      <div ref={containerRef} className="absolute inset-0">
        {!isModelLoaded && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Upload IFC Model</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to upload a .ifc file
                </p>
              </div>
              <label>
                <input
                  type="file"
                  className="hidden"
                  accept=".ifc"
                  onChange={handleFileUpload}
                />
                <Button asChild>
                  <span>Select IFC File</span>
                </Button>
              </label>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
              <p className="text-sm text-muted-foreground">Loading model...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      {isModelLoaded && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button variant="secondary" size="icon" onClick={handleZoomIn} title="Zoom In">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleZoomOut} title="Zoom Out">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleFitToView} title="Fit to View">
            <Home className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleReset} title="Reset Camera">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Heatmap Mode Indicator */}
      {isModelLoaded && (
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 border shadow-sm">
          <div className="text-sm">
            <span className="font-semibold">Heatmap Mode:</span>{' '}
            <span className="capitalize">{heatmapMode}</span>
          </div>
        </div>
      )}
    </div>
  );
}
