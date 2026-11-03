import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { BatteryCharging, Cpu, Zap, Droplets } from 'lucide-react';

export const BatterySection: React.FC = () => {
  return (
    <section
      id="battery"
      className="relative min-h-screen flex flex-col justify-between px-6 py-24 pointer-events-none"
    >
      {/* Top Section Header */}
      <div className="max-w-4xl mx-auto text-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold mb-4"
        >
          <Zap className="w-3.5 h-3.5 text-neutral-800" />
          <span>Modular High-Density Energy Architecture</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight"
        >
          Power Every <span className="text-neutral-500">Journey.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-neutral-600 max-w-xl mx-auto font-normal"
        >
          Engineered for instantaneous swap capability. Remove, recharge, or dock in under ten seconds.
        </motion.p>
      </div>

      {/* Center is left completely open for the floating 3D battery */}
      <div className="h-44 sm:h-64 my-auto" />

      {/* Bottom Clean Spec Cards - Dark Titanium Obsidian */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
        <TiltCard delay={0.1} glowColor="rgba(56, 189, 248, 0.12)">
          <div className="p-5 rounded-2xl bg-[#111622] border border-slate-800/90 shadow-xl h-full flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="p-2.5 w-fit rounded-xl bg-slate-800/80 text-cyan-400 border border-slate-700/60 mb-3 shadow-2xs">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">145 KM</div>
              <div className="text-xs font-medium text-slate-400 mt-1">Certified Range per Swap</div>
            </div>
          </div>
        </TiltCard>

        <TiltCard delay={0.15} glowColor="rgba(251, 191, 36, 0.12)">
          <div className="p-5 rounded-2xl bg-[#111622] border border-slate-800/90 shadow-xl h-full flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="p-2.5 w-fit rounded-xl bg-slate-800/80 text-amber-400 border border-slate-700/60 mb-3 shadow-2xs">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">45 MIN</div>
              <div className="text-xs font-medium text-slate-400 mt-1">0 to 80% Fast Charge</div>
            </div>
          </div>
        </TiltCard>

        <TiltCard delay={0.2} glowColor="rgba(168, 85, 247, 0.12)">
          <div className="p-5 rounded-2xl bg-[#111622] border border-slate-800/90 shadow-xl h-full flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="p-2.5 w-fit rounded-xl bg-slate-800/80 text-indigo-400 border border-slate-700/60 mb-3 shadow-2xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">BMS 3.0</div>
              <div className="text-xs font-medium text-slate-400 mt-1">Continuous Thermal Monitoring</div>
            </div>
          </div>
        </TiltCard>

        <TiltCard delay={0.25} glowColor="rgba(52, 211, 153, 0.12)">
          <div className="p-5 rounded-2xl bg-[#111622] border border-slate-800/90 shadow-xl h-full flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="p-2.5 w-fit rounded-xl bg-slate-800/80 text-emerald-400 border border-slate-700/60 mb-3 shadow-2xs">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">IP67</div>
              <div className="text-xs font-medium text-slate-400 mt-1">Submersible Water Seal</div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};
