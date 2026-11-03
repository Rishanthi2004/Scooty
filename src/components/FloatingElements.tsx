import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Disc, Zap, BatteryCharging, Shield, Cpu, Sparkles } from 'lucide-react';

export const FloatingElements: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Scroll-based parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rot1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rot2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {/* 1. Floating Circular Halo Ring Element (Top Right) */}
      <motion.div
        style={{ y: y1, rotate: rot1 }}
        animate={{
          y: [0, -14, 0],
          rotateZ: [0, 6, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[18%] right-[8%] hidden xl:flex items-center gap-3 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 shadow-2xl backdrop-blur-md"
      >
        <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
          <Disc className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }} />
        </div>
        <div className="text-left pr-2">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
            Aero Alloy
          </span>
          <span className="text-xs font-semibold text-white">Disc Rotor 220mm</span>
        </div>
      </motion.div>

      {/* 2. Floating Modular Battery Element (Mid Left) */}
      <motion.div
        style={{ y: y2, rotate: rot2 }}
        animate={{
          y: [0, 16, 0],
          rotateZ: [0, -5, 0],
        }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-[42%] left-[4%] hidden xl:flex items-center gap-3 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 shadow-2xl backdrop-blur-md"
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
          <BatteryCharging className="w-5 h-5" />
        </div>
        <div className="text-left pr-2">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
            Quick-Swap
          </span>
          <span className="text-xs font-semibold text-white">BMS 3.0 Matrix</span>
        </div>
      </motion.div>

      {/* 3. Floating Halo Projector Headlight Glyph (Mid Right) */}
      <motion.div
        style={{ y: y3 }}
        animate={{
          y: [0, -18, 0],
          rotateZ: [0, 8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-[68%] right-[6%] hidden xl:flex items-center gap-3 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 shadow-2xl backdrop-blur-md"
      >
        <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="text-left pr-2">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
            Optic Matrix
          </span>
          <span className="text-xs font-semibold text-white">360° Halo DRL</span>
        </div>
      </motion.div>

      {/* 4. Subtle Floating Geometric Nanoscale Glyphs */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[28%] left-[18%] w-2 h-2 rounded-full bg-orange-400/50 blur-[1px] hidden lg:block"
      />
      <motion.div
        animate={{
          y: [0, 12, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[55%] right-[22%] w-2.5 h-2.5 rounded-full bg-cyan-400/50 blur-[1px] hidden lg:block"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[82%] left-[12%] w-2 h-2 rounded-full bg-emerald-400/50 blur-[1px] hidden lg:block"
      />
    </div>
  );
};
