import React, { useEffect, useRef } from 'react';
import { ScooterScene } from '../three/ScooterScene';
import { VehicleColor, ThemeMode } from '../types';

interface ScooterCanvasProps {
  scrollProgress: number;
  currentColor: VehicleColor;
  currentTheme: ThemeMode;
  activeHotspot: string | null;
  onSceneReady?: (scene: ScooterScene) => void;
}

export const ScooterCanvas: React.FC<ScooterCanvasProps> = ({
  scrollProgress,
  currentColor,
  currentTheme,
  activeHotspot,
  onSceneReady,
}) => {

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ScooterScene | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new ScooterScene({
      container: mountRef.current,
    });
    sceneRef.current = scene;

    if (onSceneReady) {
      onSceneReady(scene);
    }

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  // Sync scroll progress
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setScrollProgress(scrollProgress);
    }
  }, [scrollProgress]);

  // Sync color
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setVehicleColor(
        currentColor.hex,
        currentColor.accentHex,
        currentColor.metalness,
        currentColor.roughness
      );
    }
  }, [currentColor]);

  // Sync theme
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setTheme(currentTheme);
    }
  }, [currentTheme]);

  // Sync active hotspot

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setActiveHotspot(activeHotspot);
    }
  }, [activeHotspot]);

  // Mouse interaction for 360 drag inspection
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!sceneRef.current) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    sceneRef.current.isUserInteracting = true;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!sceneRef.current) return;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
    sceneRef.current.isUserInteracting = false;
  };

  return (
    <div
      ref={mountRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="fixed inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing z-0 touch-none"
      style={{ touchAction: 'pan-y' }}
    />
  );
};
