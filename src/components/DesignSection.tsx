import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DESIGN_HOTSPOTS } from '../data/scooterData';
import { soundFX } from '../audio/soundFx';
import { TiltCard } from './TiltCard';
import { Eye, CheckCircle2 } from 'lucide-react';

interface DesignSectionProps {
  activeHotspot: string | null;
  onSelectHotspot: (hotspotId: string | null) => void;
}

export const DesignSection: React.FC<DesignSectionProps> = ({
  activeHotspot,
  onSelectHotspot,
}) => {
  const currentItem = DESIGN_HOTSPOTS.find((h) => h.id === activeHotspot) || DESIGN_HOTSPOTS[0];

  return (
    <section
      id="design"
      className="relative min-h-screen flex flex-col justify-between px-6 py-24 pointer-events-none"
    >
      {/* Top Header */}
      <div className="max-w-4xl mx-auto text-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold mb-4 backdrop-blur-md"
        >
          <Eye className="w-3.5 h-3.5 text-neutral-600" />
          <span>Macro Component Inspection</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight"
        >
          Every Detail, <br className="hidden sm:inline" />
          <span>Thoughtfully Designed.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-neutral-600 max-w-xl mx-auto font-normal"
        >
          Select any component to inspect precision-machined elements and automotive-grade tolerances.
        </motion.p>

        {/* Hotspot Selector Chips with animated states */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto"
        >
          {DESIGN_HOTSPOTS.map((hotspot) => {
            const isSelected = activeHotspot === hotspot.id;
            return (
              <motion.button
                key={hotspot.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  soundFX.playClick();
                  onSelectHotspot(isSelected ? null : hotspot.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border shadow-sm ${
                  isSelected
                    ? 'bg-white text-neutral-950 border-white shadow-md'
                    : 'bg-[#111622] hover:bg-[#161c2b] text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {hotspot.name}
              </motion.button>
            );
          })}

          {activeHotspot && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundFX.playClick();
                onSelectHotspot(null);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white underline cursor-pointer"
            >
              Reset Overview
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Middle open space for 3D camera zoom */}
      <div className="h-28 sm:h-40 my-auto" />

      {/* Floating 3D Tilt Card for active component callout - Dark Titanium */}
      <div className="max-w-xl mx-auto w-full pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <TiltCard glowColor="rgba(56, 189, 248, 0.15)" tiltAmount={4.5}>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#111622]/95 border border-slate-800 shadow-2xl backdrop-blur-xl transition-all">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="uppercase tracking-widest text-cyan-400 font-semibold">COMPONENT SPEC</span>
                  <span className="text-white font-semibold uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    {currentItem.name}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">{currentItem.title}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed font-normal">
                  {currentItem.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>AEROSPACE GRADE SPEC</span>
                  <span className="text-cyan-400 font-semibold">TOLERANCE ±0.05 MM</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
