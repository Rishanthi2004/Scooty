import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { ShieldCheck, Wind, Gauge } from 'lucide-react';

export const TransformSection: React.FC = () => {
  return (
    <section
      id="transform"
      className="relative min-h-screen flex items-center px-6 py-24 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side Content Container */}
        <div className="lg:col-span-5 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px] font-mono uppercase tracking-widest mb-4"
          >
            <span>Dynamic Geometry</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight leading-tight"
          >
            Designed to <br />
            <span className="text-neutral-500">Move You.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal"
          >
            Every curve and contour is sculpted for aerodynamic purity. By centering mass low within the extruded alloy chassis, the scooter delivers instant cornering responsiveness with effortless urban stability.
          </motion.p>

          {/* Clean Minimalist Cards */}
          <div className="mt-8 space-y-3.5">
            <TiltCard delay={0.1}>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-800 shrink-0">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">Aero-Channeled Fairing</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Reduces drag coefficient to 0.28 Cd, enhancing high-speed range and minimizing wind buffet.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard delay={0.2}>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-800 shrink-0">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">50:50 Mass Distribution</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Optimal center of gravity prevents nose-dive during emergency deceleration.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard delay={0.3}>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-800 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">Aviation Monocoque Rigidity</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Torsional stiffness exceeding 1,800 Nm/deg for razor-sharp handling and road comfort.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Right side is open for the 3D scooter to shine */}
        <div className="lg:col-span-7 hidden lg:block" />
      </div>
    </section>
  );
};
