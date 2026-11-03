import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { Gauge, Zap, Flame, Compass } from 'lucide-react';

export const PerformanceSection: React.FC = () => {
  return (
    <section
      id="performance"
      className="relative min-h-screen flex flex-col justify-between px-6 py-24 pointer-events-none"
    >
      {/* Top Header */}
      <div className="max-w-4xl pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold mb-4"
        >
          <Flame className="w-3.5 h-3.5 text-neutral-800" />
          <span>Powertrain Telemetry</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight"
        >
          Every Ride. <br />
          <span className="text-neutral-500">A New Feeling.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-neutral-600 max-w-lg font-normal"
        >
          Instantaneous electromagnetic torque delivers seamless launch velocity without vibration or gear shift lag.
        </motion.p>
      </div>

      {/* Middle viewport remains clear for the motion */}
      <div className="h-32 sm:h-48 my-auto" />

      {/* Bottom Clean Telemetry Cards */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
        <TiltCard delay={0.1}>
          <div className="p-5 rounded-2xl bg-white text-neutral-900 border border-neutral-200/80 shadow-2xs h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-2 font-mono">
              <span>ACCELERATION</span>
              <Gauge className="w-4 h-4 text-neutral-700" />
            </div>
            <div className="text-3xl font-black font-display tracking-tight text-neutral-900">
              2.9 <span className="text-sm font-semibold text-neutral-400">SEC</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">0 to 40 km/h sprint</div>
          </div>
        </TiltCard>

        <TiltCard delay={0.15}>
          <div className="p-5 rounded-2xl bg-white text-neutral-900 border border-neutral-200/80 shadow-2xs h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-2 font-mono">
              <span>PEAK POWER</span>
              <Zap className="w-4 h-4 text-neutral-700" />
            </div>
            <div className="text-3xl font-black font-display tracking-tight text-neutral-900">
              6.8 <span className="text-sm font-semibold text-neutral-400">KW</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">HyperDrive motor</div>
          </div>
        </TiltCard>

        <TiltCard delay={0.2}>
          <div className="p-5 rounded-2xl bg-white text-neutral-900 border border-neutral-200/80 shadow-2xs h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-2 font-mono">
              <span>MAX VELOCITY</span>
              <Compass className="w-4 h-4 text-neutral-700" />
            </div>
            <div className="text-3xl font-black font-display tracking-tight text-neutral-900">
              85 <span className="text-sm font-semibold text-neutral-400">KM/H</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">Regulated highway speed</div>
          </div>
        </TiltCard>

        <TiltCard delay={0.25}>
          <div className="p-5 rounded-2xl bg-white text-neutral-900 border border-neutral-200/80 shadow-2xs h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-2 font-mono">
              <span>KINETIC RECOVERY</span>
              <span className="text-neutral-700 font-bold text-xs">REGEN</span>
            </div>
            <div className="text-3xl font-black font-display tracking-tight text-neutral-900">
              +15% <span className="text-sm font-semibold text-neutral-400">RANGE</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">Dual-mode brake regeneration</div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};
