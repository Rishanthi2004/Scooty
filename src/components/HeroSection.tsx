import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

interface HeroSectionProps {
  onExploreRide: () => void;
  onDiscoverMore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreRide,
  onDiscoverMore,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 pointer-events-none"
    >
      {/* Top minimal spec bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-neutral-400"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="tracking-widest uppercase text-neutral-500">
            System Active • High Efficiency
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-neutral-400">
          <span>DRAG COEFFICIENT: 0.28 CD</span>
          <span>TORQUE: 72 NM</span>
        </div>
      </motion.div>

      {/* Main Center Headline */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center my-auto py-2">
        {/* Soft ambient diffusion for optimal readability against 3D scooter */}
        <div className="absolute inset-0 max-w-xl mx-auto rounded-full bg-radial from-white/75 via-white/25 to-transparent blur-xl pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-neutral-200/90 text-neutral-700 text-xs font-semibold mb-6 backdrop-blur-sm pointer-events-auto shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
          <span>The Next Frontier of Urban Electric Mobility</span>
        </motion.div>

        {/* Clean, Editorial Typography */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-neutral-900 tracking-tight leading-[1.05] drop-shadow-[0_2px_14px_rgba(255,255,255,0.85)]"
          >
            Move Beyond <br />
            <span className="text-neutral-500">
              Ordinary.
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 text-base sm:text-lg text-neutral-700 max-w-lg mx-auto font-medium leading-relaxed drop-shadow-[0_1px_8px_rgba(255,255,255,0.85)]"
        >
          Experience a smarter, cleaner way to ride.
        </motion.p>

        {/* Minimal Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 pointer-events-auto"
        >
          <AnimatedButton
            variant="primary"
            icon="chevron"
            onClick={onExploreRide}
            className="w-full sm:w-auto text-xs px-7 py-3.5"
          >
            Explore the Ride
          </AnimatedButton>

          <AnimatedButton
            variant="secondary"
            onClick={onDiscoverMore}
            className="w-full sm:w-auto text-xs px-7 py-3.5"
          >
            Discover More
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="max-w-7xl mx-auto w-full flex items-center justify-between text-neutral-400 text-xs"
      >
        <div className="hidden sm:block font-mono tracking-widest uppercase text-neutral-400">
          [ SCROLL TO TRANSFORM 3D VIEW ]
        </div>

        <div className="flex items-center gap-1.5 mx-auto sm:mx-0 text-neutral-500">
          <span className="text-[11px] font-medium uppercase tracking-widest">
            Scroll to Explore
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
        </div>

        <div className="hidden sm:block font-mono tracking-widest uppercase text-neutral-400">
          REAL-TIME 3D PERSPECTIVE
        </div>
      </motion.div>
    </section>
  );
};
