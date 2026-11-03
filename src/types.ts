export interface VehicleColor {
  id: string;
  name: string;
  hex: string;
  badge: string;
  accentHex: string;
  metalness: number;
  roughness: number;
  description: string;
}

export interface DesignHotspot {
  id: string;
  name: string;
  title: string;
  description: string;
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
  componentKey: 'headlight' | 'cockpit' | 'wheel' | 'frame' | 'saddle' | 'taillight';
}

export interface VehicleSpec {
  label: string;
  value: string;
  unit?: string;
  subtext: string;
}

export type ThemeMode = 'midnight' | 'cyber' | 'studio';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  description: string;
  bgHex: number;
  floorHex: number;
  floorRoughness: number;
  floorMetalness: number;
  keyLightHex: number;
  keyIntensity: number;
  rimLightHex: number;
  rimIntensity: number;
  hemiSkyHex: number;
  hemiGroundHex: number;
}

