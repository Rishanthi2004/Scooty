import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Box, RotateCcw, Sparkles, Sun, Moon } from 'lucide-react';
import { VEHICLE_COLORS } from '../data/scooterData';
import { VehicleColor, ThemeMode } from '../types';
import { soundFX } from '../audio/soundFx';

interface ControlsDockProps {
  currentColor: VehicleColor;
  currentTheme: ThemeMode;
  onSelectColor: (color: VehicleColor) => void;
  onSelectTheme: (theme: ThemeMode) => void;
  onToggleHeadlights: () => boolean;
  onNavigateSection: (sectionId: string) => void;
}

export const ControlsDock: React.FC<ControlsDockProps> = ({
  currentColor,
  currentTheme,
  onSelectColor,
  onSelectTheme,
  onToggleHeadlights,
  onNavigateSection,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [headlightsActive, setHeadlightsActive] = useState(true);

  const handleHeadlightsToggle = () => {
    soundFX.playClick();
    const state = onToggleHeadlights();
    setHeadlightsActive(state);
  };

  const isDark = currentTheme === 'midnight' || currentTheme === 'cyber';

  return (
    <aside
      aria-label="3D Studio Controls"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-2xl transition-all duration-300 pointer-events-auto"
    >
      {/* Collapse / Expand Toggle Tab */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => {
            soundFX.playClick();
            setIsCollapsed(!isCollapsed);
          }}
          className={`text-[11px] font-semibold px-3.5 py-1 rounded-t-xl border border-b-0 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md ${
            isDark
              ? 'bg-neutral-900/90 hover:bg-neutral-900 text-neutral-300 border-neutral-700'
              : 'bg-white/90 hover:bg-white text-neutral-700 border-neutral-200/90'
          }`}
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
              <span>Show 3D Studio Dock</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              <span>Hide Controls (Zen Mode)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Control Panel Bar */}
      {!isCollapsed && (
        <div
          className={`backdrop-blur-md rounded-2xl p-3 sm:px-5 sm:py-3.5 shadow-xl flex flex-wrap items-center justify-between gap-3 border transition-colors duration-300 ${
            isDark
              ? 'bg-neutral-900/90 border-neutral-700 text-white'
              : 'bg-white/90 border-neutral-200/90 text-neutral-900'
          }`}
        >
          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Headlights Toggle */}
            <button
              onClick={handleHeadlightsToggle}
              className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
                headlightsActive
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-xs'
                  : isDark
                  ? 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:bg-neutral-700'
                  : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
              }`}
            >
              <Lightbulb
                className={`w-4 h-4 ${headlightsActive ? 'text-amber-400 fill-amber-400' : 'text-neutral-400'}`}
              />
              <span className="hidden sm:inline text-[11px]">
                {headlightsActive ? 'Lights ON' : 'Lights OFF'}
              </span>
            </button>

            {/* Battery Mode */}
            <button
              onClick={() => {
                soundFX.playClick();
                onNavigateSection('battery');
              }}
              className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                  : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
              }`}
            >
              <Box className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline text-[11px]">Battery</span>
            </button>

            {/* Motion Mode */}
            <button
              onClick={() => {
                soundFX.playClick();
                onNavigateSection('performance');
              }}
              className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                  : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline text-[11px]">Motion</span>
            </button>
          </div>

          {/* Theme Quick Switcher in Dock */}
          <div
            className={`flex items-center gap-1 p-1 rounded-xl border ${
              isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-100 border-neutral-200'
            }`}
          >
            <button
              onClick={() => {
                soundFX.playClick();
                onSelectTheme('studio');
              }}
              title="Studio Light Theme (Photo Match)"
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                currentTheme === 'studio'
                  ? 'bg-white text-neutral-900 shadow-xs font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                onSelectTheme('midnight');
              }}
              title="Midnight Dark Theme"
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                currentTheme === 'midnight'
                  ? 'bg-neutral-950 text-white shadow-xs font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                onSelectTheme('cyber');
              }}
              title="Cyber Neon Theme"
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                currentTheme === 'cyber'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 shadow-xs font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>

          {/* Color Swatch Dots */}
          <div
            className={`flex items-center gap-1.5 p-1.5 rounded-xl border ${
              isDark ? 'bg-neutral-800/90 border-neutral-700' : 'bg-neutral-100/90 border-neutral-200/80'
            }`}
          >
            {VEHICLE_COLORS.map((col) => {
              const active = currentColor.id === col.id;
              return (
                <button
                  key={col.id}
                  onClick={() => {
                    soundFX.playClick();
                    onSelectColor(col);
                  }}
                  title={col.name}
                  className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                    active
                      ? 'border-orange-500 scale-125 shadow-xs ring-2 ring-orange-500/50'
                      : 'border-neutral-400 hover:scale-110 opacity-75 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: col.hex }}
                />
              );
            })}
          </div>

          {/* Reset Camera View */}
          <button
            onClick={() => {
              soundFX.playClick();
              onNavigateSection('hero');
            }}
            title="Reset to Top Hero Perspective"
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}
    </aside>
  );
};
