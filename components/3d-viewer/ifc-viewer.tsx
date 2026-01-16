'use client';

import { useEffect, useRef, useState } from 'react';
import * as OBC from '@thatopen/components';
import * as THREE from 'three';

export interface ElementData {
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
}

export interface IFCViewerProps {
  className?: string;
  onModelLoaded?: () => void;
  overlayOpacity?: number;
  activeLayers?: {
    thermal: boolean;
    daylight: boolean;
    carbon: boolean;
    water: boolean;
  };
  ifcUrl?: string;
  onElementClick?: (elementData: ElementData) => void;
}

export function IFCViewer({ 
  className, 
  onModelLoaded,
  overlayOpacity = 0.8,
  activeLayers = { thermal: true, daylight: false, carbon: false, water: false },
  ifcUrl = '/demo/Ifc2x3_SampleCastle.ifc',
  onElementClick
}: IFCViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const componentsRef = useRef<OBC.Components | null>(null);
  const modelsRef = useRef<any[]>([]);
  const worldRef = useRef<any>(null);
  const clickCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let components: OBC.Components | null = null;
    let isComponentsInitialized = false;

    const initViewer = async () => {
      try {
        if (!containerRef.current) return;
        
        // Initialize components
        components = new OBC.Components();
        componentsRef.current = components;

        // Set up the scene
        const worlds = components.get(OBC.Worlds);
        const world = worlds.create<
          OBC.SimpleScene,
          OBC.SimpleCamera,
          OBC.SimpleRenderer
        >();

        world.scene = new OBC.SimpleScene(components);
        world.renderer = new OBC.SimpleRenderer(components, containerRef.current);
        world.camera = new OBC.SimpleCamera(components);

        components.init();
        isComponentsInitialized = true;
        worldRef.current = world;

        // Set up scene
        world.scene.setup();
        const scene = world.scene.three;
        scene.background = new THREE.Color(0xf5f5f5);

        // Add grid
        components.get(OBC.Grids).create(world);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Create demo building
        try {
          console.log('Creating demo building for:', ifcUrl);
          
          // Create different buildings based on the selected model
          const createDemoBuilding = (modelPath: string) => {
            const building = new THREE.Group();
            
            // Determine building type from model name
            const isCastle = modelPath.includes('Castle');
            const isDuplex = modelPath.includes('Duplex');
            const isRevit = modelPath.includes('Revit');
            const isCube = modelPath.includes('Cube');
            
            if (isCastle) {
              // Create a castle-like structure
              const towerMaterial = new THREE.MeshStandardMaterial({ color: 0x9ca3af });
              
              // Main tower
              const tower = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 15, 8), towerMaterial);
              tower.position.set(0, 7.5, 0);
              building.add(tower);
              
              // Tower top
              const towerTop = new THREE.Mesh(new THREE.ConeGeometry(4, 3, 8), new THREE.MeshStandardMaterial({ color: 0x7c3aed }));
              towerTop.position.set(0, 16, 0);
              building.add(towerTop);
              
              // Side towers
              [-8, 8].forEach(x => {
                [-8, 8].forEach(z => {
                  const sideTower = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 10, 6), towerMaterial);
                  sideTower.position.set(x, 5, z);
                  building.add(sideTower);
                  
                  const sideTowerTop = new THREE.Mesh(new THREE.ConeGeometry(2.5, 2, 6), new THREE.MeshStandardMaterial({ color: 0x7c3aed }));
                  sideTowerTop.position.set(x, 11, z);
                  building.add(sideTowerTop);
                });
              });
              
              // Castle walls
              const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xa8a29e });
              const wall1 = new THREE.Mesh(new THREE.BoxGeometry(16, 8, 0.5), wallMaterial);
              wall1.position.set(0, 4, -8);
              building.add(wall1);
              
              const wall2 = new THREE.Mesh(new THREE.BoxGeometry(16, 8, 0.5), wallMaterial);
              wall2.position.set(0, 4, 8);
              building.add(wall2);
              
              const wall3 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8, 16), wallMaterial);
              wall3.position.set(-8, 4, 0);
              building.add(wall3);
              
              const wall4 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8, 16), wallMaterial);
              wall4.position.set(8, 4, 0);
              building.add(wall4);
              
            } else if (isDuplex) {
              // Create a duplex structure (2 units side by side)
              const colors = [0xfbbf24, 0xf59e0b];
              
              [-6, 6].forEach((x, idx) => {
                // Floor
                const floor = new THREE.Mesh(
                  new THREE.BoxGeometry(10, 0.3, 12),
                  new THREE.MeshStandardMaterial({ color: 0xe5e7eb })
                );
                floor.position.set(x, 0, 0);
                building.add(floor);
                
                // Walls
                const wallMaterial = new THREE.MeshStandardMaterial({ color: colors[idx] });
                const frontWall = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 0.3), wallMaterial);
                frontWall.position.set(x, 3, -6);
                building.add(frontWall);
                
                const backWall = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 0.3), wallMaterial);
                backWall.position.set(x, 3, 6);
                building.add(backWall);
                
                const sideWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6, 12), wallMaterial);
                sideWall.position.set(x + (idx === 0 ? -5 : 5), 3, 0);
                building.add(sideWall);
                
                // Roof
                const roof = new THREE.Mesh(
                  new THREE.BoxGeometry(11, 0.5, 13),
                  new THREE.MeshStandardMaterial({ color: 0x991b1b })
                );
                roof.position.set(x, 6.25, 0);
                building.add(roof);
                
                // Windows
                const windowMaterial = new THREE.MeshStandardMaterial({ 
                  color: 0x3b82f6,
                  transparent: true,
                  opacity: 0.6
                });
                [-3, 0, 3].forEach(z => {
                  const window1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 0.1), windowMaterial);
                  window1.position.set(x, 3, z - 5.9);
                  building.add(window1);
                });
              });
              
              // Shared middle wall
              const sharedWall = new THREE.Mesh(
                new THREE.BoxGeometry(0.3, 6, 12),
                new THREE.MeshStandardMaterial({ color: 0x6b7280 })
              );
              sharedWall.position.set(0, 3, 0);
              building.add(sharedWall);
              
            } else if (isCube) {
              // Simple cube
              const cube = new THREE.Mesh(
                new THREE.BoxGeometry(8, 8, 8),
                new THREE.MeshStandardMaterial({ color: 0x10b981 })
              );
              cube.position.set(0, 4, 0);
              building.add(cube);
              
            } else {
              // Default house (Sample House or Revit models)
              // Create floor
              const floorGeometry = new THREE.BoxGeometry(20, 0.5, 15);
              const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xe5e7eb });
              const floor = new THREE.Mesh(floorGeometry, floorMaterial);
              floor.position.set(0, 0, 0);
              building.add(floor);
              
              // Create walls
              const wallMaterial = new THREE.MeshStandardMaterial({ 
                color: isRevit ? 0xdbeafe : 0xf3f4f6 
              });
              
              // Front wall
              const frontWall = new THREE.Mesh(new THREE.BoxGeometry(20, 5, 0.3), wallMaterial);
              frontWall.position.set(0, 2.5, -7.5);
              building.add(frontWall);
              
              // Back wall
              const backWall = new THREE.Mesh(new THREE.BoxGeometry(20, 5, 0.3), wallMaterial);
              backWall.position.set(0, 2.5, 7.5);
              building.add(backWall);
              
              // Left wall
              const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 5, 15), wallMaterial);
              leftWall.position.set(-10, 2.5, 0);
              building.add(leftWall);
              
              // Right wall
              const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 5, 15), wallMaterial);
              rightWall.position.set(10, 2.5, 0);
              building.add(rightWall);
              
              // Create roof
              const roofGeometry = new THREE.BoxGeometry(21, 0.5, 16);
              const roofMaterial = new THREE.MeshStandardMaterial({ 
                color: isRevit ? 0x3b82f6 : 0xef4444 
              });
              const roof = new THREE.Mesh(roofGeometry, roofMaterial);
              roof.position.set(0, 5.25, 0);
              building.add(roof);
              
              // Create windows
              const windowMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x60a5fa,
                transparent: true,
                opacity: 0.6
              });
              
              for (let i = -8; i <= 8; i += 4) {
                const window1 = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 0.1), windowMaterial);
                window1.position.set(i, 2.5, -7.45);
                building.add(window1);
                
                const window2 = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 0.1), windowMaterial);
                window2.position.set(i, 2.5, 7.45);
                building.add(window2);
              }
              
              // Create door
              const doorGeometry = new THREE.BoxGeometry(1.5, 3, 0.2);
              const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x92400e });
              const door = new THREE.Mesh(doorGeometry, doorMaterial);
              door.position.set(0, 1.5, -7.4);
              building.add(door);
            }
            
            return building;
          };
          
          const building = createDemoBuilding(ifcUrl);
          scene.add(building);
          
          modelsRef.current = [building];
          console.log('Demo building created successfully for:', ifcUrl);
          
          // Fit camera to building
          const bbox = new THREE.Box3().setFromObject(building);
          const center = bbox.getCenter(new THREE.Vector3());
          const size = bbox.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          
          const camera = world.camera.three;
          let distance = maxDim * 2;
          
          if (camera instanceof THREE.PerspectiveCamera) {
            const fov = camera.fov * (Math.PI / 180);
            distance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5;
          }

          world.camera.controls.setLookAt(
            center.x + distance,
            center.y + distance / 2,
            center.z + distance,
            center.x,
            center.y,
            center.z
          );

          // Apply performance overlays
          applyPerformanceOverlays([building], activeLayers, overlayOpacity);

          // Add click handling
          if (onElementClick && containerRef.current) {
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();

            const handleClick = (event: MouseEvent) => {
              if (!containerRef.current || !world) return;

              const rect = containerRef.current.getBoundingClientRect();
              mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
              mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

              raycaster.setFromCamera(mouse, world.camera.three);
              const intersects = raycaster.intersectObjects(scene.children, true);

              if (intersects.length > 0) {
                const object = intersects[0].object as THREE.Mesh;
                
                // Generate element data based on the clicked object
                const elementData = generateElementData(object, activeLayers);
                onElementClick(elementData);
              }
            };

            const container = containerRef.current;
            container.addEventListener('click', handleClick);
            
            // Store cleanup function in ref
            clickCleanupRef.current = () => {
              container.removeEventListener('click', handleClick);
            };
          }

          setIsLoading(false);
          onModelLoaded?.();
        } catch (loadError) {
          console.error('Error creating 3D scene:', loadError);
          const errorMessage = loadError instanceof Error ? loadError.message : 'Unknown error';
          setError(`Failed to initialize 3D scene: ${errorMessage}`);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error initializing viewer:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize viewer');
        setIsLoading(false);
      }
    };

    initViewer();

    // Cleanup
    return () => {
      // Clean up click handler if it exists
      if (clickCleanupRef.current) {
        clickCleanupRef.current();
        clickCleanupRef.current = null;
      }
      
      // Clean up components
      if (components && isComponentsInitialized) {
        try {
          components.dispose();
        } catch (e) {
          console.error('Error disposing components:', e);
        }
      }
    };
    // Only re-run when ifcUrl changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ifcUrl]);

  // Update overlays when layers or opacity change
  useEffect(() => {
    if (modelsRef.current.length > 0) {
      applyPerformanceOverlays(modelsRef.current, activeLayers, overlayOpacity);
    }
  }, [activeLayers, overlayOpacity]);

  if (error) {
    return (
      <div className={className}>
        <div className="flex h-full items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mb-4 text-red-500">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">{error}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please check the console for details
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-sm font-medium text-gray-700">Loading 3D Visualization...</p>
            <p className="mt-1 text-xs text-muted-foreground">Building demo scene</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Apply performance color overlays to models
function applyPerformanceOverlays(
  models: any[],
  activeLayers: IFCViewerProps['activeLayers'],
  opacity: number
) {
  if (!models || models.length === 0) return;
  
  models.forEach((model) => {
    if (!model || !model.traverse) return;
    
    model.traverse((child: any) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        // Generate pseudo-random performance based on object ID
        const idHash = parseInt(child.id.toString().slice(-2)) % 3;
        
        let color: THREE.Color;
        
        if (activeLayers?.thermal) {
          if (idHash === 0) color = new THREE.Color(0xef4444); // Red
          else if (idHash === 1) color = new THREE.Color(0xf97316); // Orange
          else color = new THREE.Color(0x10b981); // Green
        } else if (activeLayers?.daylight) {
          if (idHash === 0) color = new THREE.Color(0xfbbf24); // Yellow
          else if (idHash === 1) color = new THREE.Color(0xf59e0b); // Orange
          else color = new THREE.Color(0x10b981); // Green
        } else if (activeLayers?.carbon) {
          if (idHash === 0) color = new THREE.Color(0x3b82f6); // Blue
          else if (idHash === 1) color = new THREE.Color(0x60a5fa); // Light blue
          else color = new THREE.Color(0x10b981); // Green
        } else if (activeLayers?.water) {
          if (idHash === 0) color = new THREE.Color(0x06b6d4); // Cyan
          else color = new THREE.Color(0x10b981); // Green
        } else {
          color = new THREE.Color(0xe5e7eb); // Gray
        }

        // Update material
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshBasicMaterial) {
                mat.color.copy(color);
                mat.transparent = true;
                mat.opacity = opacity;
                mat.needsUpdate = true;
              }
            });
          } else {
            const mat = mesh.material;
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshBasicMaterial) {
              mat.color.copy(color);
              mat.transparent = true;
              mat.opacity = opacity;
              mat.needsUpdate = true;
            }
          }
        }
      }
    });
  });
}

// Generate element data based on clicked object
function generateElementData(
  object: THREE.Mesh,
  activeLayers: IFCViewerProps['activeLayers']
): ElementData {
  // Determine element type based on object geometry
  const geometry = object.geometry;
  const bbox = new THREE.Box3().setFromObject(object);
  const size = bbox.getSize(new THREE.Vector3());
  
  let elementType = 'Unknown Element';
  let materials: ElementData['materials'] = [];
  let uValue: number | undefined;
  
  // Detect element type based on dimensions
  if (size.y < 1 && size.x > 3) {
    elementType = 'Floor Assembly';
    materials = [
      { name: 'Concrete Slab', thickness: '150mm', carbonValue: 180 },
      { name: 'Insulation Layer', thickness: '50mm', carbonValue: 8 },
      { name: 'Screed', thickness: '50mm', carbonValue: 35 },
    ];
    uValue = 0.35;
  } else if (size.z < 1 && size.y > 3) {
    elementType = 'External Wall Assembly';
    materials = [
      { name: 'Cement Render', thickness: '20mm', carbonValue: 45 },
      { name: 'Rockwool Insulation', thickness: '100mm', carbonValue: 12 },
      { name: 'Concrete Block', thickness: '200mm', carbonValue: 280 },
      { name: 'Gypsum Board', thickness: '12.5mm', carbonValue: 8 },
    ];
    uValue = 0.28;
  } else if (size.y < 1 && size.x > 10) {
    elementType = 'Roof Assembly';
    materials = [
      { name: 'Membrane Roofing', thickness: '5mm', carbonValue: 15 },
      { name: 'Rigid Insulation', thickness: '150mm', carbonValue: 25 },
      { name: 'Concrete Deck', thickness: '200mm', carbonValue: 240 },
    ];
    uValue = 0.22;
  } else if (size.z < 0.5 && size.x < 3 && size.y < 3) {
    elementType = 'Window Assembly';
    materials = [
      { name: 'Double Glazing', thickness: '24mm', carbonValue: 35 },
      { name: 'Aluminum Frame', thickness: '50mm', carbonValue: 180 },
    ];
    uValue = 1.8;
  } else {
    elementType = 'Structural Element';
    materials = [
      { name: 'Reinforced Concrete', thickness: '300mm', carbonValue: 320 },
      { name: 'Steel Reinforcement', thickness: '16mm', carbonValue: 95 },
    ];
    uValue = 0.45;
  }
  
  // Calculate total carbon
  const totalCarbon = materials.reduce((sum, mat) => sum + mat.carbonValue, 0);
  
  // Determine performance based on active layer and object's material color
  const idHash = parseInt(object.id.toString().slice(-2)) % 3;
  let performanceStatus: 'optimal' | 'moderate' | 'poor';
  let performanceReason: string;
  let complianceStatus: string;
  
  if (activeLayers?.thermal) {
    if (idHash === 0) {
      performanceStatus = 'poor';
      performanceReason = 'High thermal gain detected. U-value exceeds recommended standards. Consider adding insulation or upgrading to low-E glazing.';
      complianceStatus = 'Requires Improvement - GBL Energy Credit 3.2';
    } else if (idHash === 1) {
      performanceStatus = 'moderate';
      performanceReason = 'Moderate thermal performance. U-value meets minimum standards but could be improved for better energy efficiency.';
      complianceStatus = 'Meets Minimum - GBL Energy Credit 3.1';
    } else {
      performanceStatus = 'optimal';
      performanceReason = 'Excellent thermal performance. U-value is well below maximum standards, contributing to energy efficiency goals.';
      complianceStatus = 'Compliant with GBL Energy Credit 2.1';
    }
  } else if (activeLayers?.daylight) {
    if (idHash === 0) {
      performanceStatus = 'poor';
      performanceReason = 'Insufficient daylight access. Area receives less than 2% daylight factor. Consider adding skylights or enlarging windows.';
      complianceStatus = 'Non-compliant - GBL Daylight Credit 4.1';
    } else if (idHash === 1) {
      performanceStatus = 'moderate';
      performanceReason = 'Adequate daylight access with 2-4% daylight factor. Meets basic requirements but could be optimized.';
      complianceStatus = 'Meets Minimum - GBL Daylight Credit 4.1';
    } else {
      performanceStatus = 'optimal';
      performanceReason = 'Excellent daylight access with >5% daylight factor. Supports occupant wellbeing and reduces artificial lighting needs.';
      complianceStatus = 'Compliant with GBL Daylight Credit 4.2';
    }
  } else if (activeLayers?.carbon) {
    if (idHash === 0) {
      performanceStatus = 'poor';
      performanceReason = `High embodied carbon of ${totalCarbon} kgCO2e/m². Consider low-carbon alternatives like recycled materials or timber.`;
      complianceStatus = 'Exceeds Limit - GBL Materials Credit 5.1';
    } else if (idHash === 1) {
      performanceStatus = 'moderate';
      performanceReason = `Moderate embodied carbon of ${totalCarbon} kgCO2e/m². Within acceptable range but optimization possible.`;
      complianceStatus = 'Meets Standard - GBL Materials Credit 5.1';
    } else {
      performanceStatus = 'optimal';
      performanceReason = `Low embodied carbon of ${totalCarbon} kgCO2e/m². Excellent material selection supporting sustainability goals.`;
      complianceStatus = 'Compliant with GBL Materials Credit 5.3';
    }
  } else if (activeLayers?.water) {
    if (idHash === 0) {
      performanceStatus = 'poor';
      performanceReason = 'Poor water efficiency. Fixtures exceed maximum flow rates. Upgrade to low-flow alternatives.';
      complianceStatus = 'Non-compliant - GBL Water Credit 6.1';
    } else {
      performanceStatus = 'optimal';
      performanceReason = 'Excellent water efficiency. Low-flow fixtures installed, meeting all water conservation requirements.';
      complianceStatus = 'Compliant with GBL Water Credit 6.2';
    }
  } else {
    performanceStatus = 'optimal';
    performanceReason = 'Select a performance layer to view detailed analysis.';
    complianceStatus = 'Analysis Pending';
  }
  
  return {
    elementName: elementType,
    uValue,
    materials,
    totalCarbon,
    performanceStatus,
    performanceReason,
    complianceStatus,
    standardZones: {
      red: 12,
      yellow: 8,
      green: 45,
    },
  };
}

