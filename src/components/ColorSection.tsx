import React from 'react';
import { motion } from 'motion/react';
import { VEHICLE_COLORS } from '../data/scooterData';
import { VehicleColor } from '../types';
import { soundFX } from '../audio/soundFx';
import { TiltCard } from './TiltCard';
import { Palette, RotateCcw, Check } from 'lucide-react';

interface ColorSectionProps {
  currentColor: VehicleColor;
  onSelectColor: (color: VehicleColor) => void;
}

export const ColorSection: React.FC<ColorSectionProps> = ({
  currentColor,
  onSelectColor,
}) => {
  return (
    <section
      id="colors"
      className="relative min-h-screen flex flex-col justify-between px-6 py-24 pointer-events-none"
    >
      {/* Top Header */}
      <div className="max-w-4xl mx-auto text-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold mb-4 shadow-2xs backdrop-blur-md"
        >
          <Palette className="w-3.5 h-3.5 text-neutral-700" />
          <span>Automotive Clearcoat Studio</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight"
        >
          Crafted in Five <br className="hidden sm:inline" />
          <span>Signature Finishes.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-neutral-600 max-w-xl mx-auto font-normal"
        >
          Multi-layer clearcoat finish applied through electrostatic nanocoating for enduring weather resistance and deep luster.
        </motion.p>

        {/* 360 Drag Interaction Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.3 }}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-neutral-500 font-mono"
        >
          <RotateCcw className="w-3.5 h-3.5 text-neutral-700" />
          <span>DRAG ON SCREEN TO ROTATE 360°</span>
        </motion.div>
      </div>

      {/* Center 3D Turntable Space */}
      <div className="h-32 sm:h-52 my-auto" />

      {/* Bottom 3D Tilt Swatch Selector Dock - Dark Titanium */}
      <div className="max-w-xl mx-auto w-full pointer-events-auto">
        <TiltCard glowColor="rgba(56, 189, 248, 0.15)" tiltAmount={4.5}>
          <div className="p-6 sm:p-7 rounded-3xl bg-[#111622]/95 border border-slate-800 shadow-2xl backdrop-blur-xl">
            {/* Active Color Info Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  {currentColor.badge}
                </span>
                <h3 className="text-xl font-bold font-display text-white">{currentColor.name}</h3>
              </div>
              <motion.div
                key={currentColor.id}
                initial={{ scale: 0.7, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="w-8 h-8 rounded-full border border-slate-600 shadow-sm ring-2 ring-cyan-400/30"
                style={{ backgroundColor: currentColor.hex }}
              />
            </div>

            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              {currentColor.description}
            </p>

            {/* Color Swatches Grid */}
            <div className="grid grid-cols-5 gap-3">
              {VEHICLE_COLORS.map((color) => {
                const isSelected = currentColor.id === color.id;
                return (
                  <motion.button
                    key={color.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      soundFX.playClick();
                      onSelectColor(color);
                    }}
                    className={`group relative flex flex-col items-center p-2 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400 bg-[#1e2638] shadow-md ring-1 ring-cyan-400/40'
                        : 'border-slate-800 hover:border-slate-700 bg-[#151a26]'
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-full border border-slate-600 shadow-2xs flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 ${
                            color.id === 'stealth-carbon' || color.id === 'apex-orange' ? 'text-white' : 'text-neutral-950'
                          }`}
                        />
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-slate-300 mt-2 text-center truncate max-w-full">
                      {color.name.split(' ')[0]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};
