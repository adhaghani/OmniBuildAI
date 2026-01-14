// Green Heatmap Types

export type HeatmapMode = 'energy' | 'carbon' | 'daylight' | 'thermal';

export interface MaterialInfo {
  id: string;
  name: string;
  embodiedCarbon: number; // kgCO2e/kg
  thermalResistance: number; // R-value
  recycledContent?: number; // percentage
  certifications?: string[];
  supplier?: string;
  gwp?: number; // Global Warming Potential
}

export interface IFCElement {
  id: string;
  type: string;
  name: string;
  material?: MaterialInfo;
  area?: number; // m²
  volume?: number; // m³
  heatmapValue?: number;
}

export interface HeatmapConfig {
  mode: HeatmapMode;
  minValue: number;
  maxValue: number;
  unit: string;
  colorScale: string[];
}

export interface RoomAnalysis {
  id: string;
  name: string;
  area: number;
  volume: number;
  windowWallRatio: number;
  daylightFactor: number;
  thermalLoad: number;
  energyRating: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
}
