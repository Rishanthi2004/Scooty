import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Shield, Sparkles } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

interface FinalSectionProps {
  onOpenBooking: () => void;
  onExploreScooter: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({
  onOpenBooking,
  onExploreScooter,
}) => {
  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 px-6 pointer-events-none"
    >
      {/* Top Center Horizon Callout */}
      <div className="max-w-4xl mx-auto text-center my-auto pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold mb-6 shadow-2xs backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
          <span>Deliveries Commencing Spring 2026</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-neutral-900 tracking-tight leading-[1.05]"
        >
          Your Next Journey <br />
          <span>Starts Here.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-neutral-600 max-w-xl mx-auto font-normal leading-relaxed"
        >
          Step into the evolution of electric motion. Zero emissions, zero compromise, pure aerodynamic precision.
        </motion.p>

        {/* Animated CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <AnimatedButton
            variant="primary"
            icon="up-right"
            onClick={onExploreScooter}
            className="w-full sm:w-auto text-sm px-8 py-4 shadow-sm"
          >
            Explore the Scooter
          </AnimatedButton>

          <AnimatedButton
            variant="secondary"
            onClick={onOpenBooking}
            className="w-full sm:w-auto text-sm px-8 py-4 backdrop-blur-md"
          >
            Reserve Aura X1
          </AnimatedButton>
        </motion.div>

        {/* 3-Year Warranty & Swappable Network Pledge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-600 font-medium"
        >
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-neutral-800" />
            <span>3-Year Comprehensive Warranty</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-neutral-800" />
            <span>Over 2,400 Swap Stations Nationwide</span>
          </div>
        </motion.div>
      </div>

      {/* Minimal Footer with Company Contact Details */}
      <footer className="max-w-7xl mx-auto w-full pt-16 border-t border-neutral-200 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs">
          <div>
            <div className="font-display font-bold text-sm text-neutral-900 tracking-wider">
              EV SCOOTY AUTOMOTIVE
            </div>
            <p className="mt-2 text-neutral-600 leading-relaxed">
              Pioneering intelligent clean electric mobility with high-performance lightweight engineering.
            </p>
          </div>

          <div>
            <div className="font-semibold text-neutral-900 uppercase tracking-wider mb-2">
              Headquarters
            </div>
            <div className="text-neutral-600 space-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span>400 Innovation Way, Suite 800</span>
              </div>
              <p>Silicon District, CA 94025</p>
            </div>
          </div>

          <div>
            <div className="font-semibold text-neutral-900 uppercase tracking-wider mb-2">
              Direct Contact
            </div>
            <div className="text-neutral-600 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>+1 (800) 555-SCOOT (7266)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                <span>concierge@evscooty.com</span>
              </div>
            </div>
          </div>

          <div>
            <div className="font-semibold text-neutral-900 uppercase tracking-wider mb-2">
              Customer Support
            </div>
            <p className="text-neutral-600 leading-relaxed">
              24/7 Roadside Electric Assistance & Remote Diagnostic Telemetry included with every vehicle purchase.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 py-4 border-t border-neutral-200">
          <p>© 2026 EV Scooty Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-900 transition-colors cursor-pointer">Compliance & Homologation</span>
          </div>
        </div>
      </footer>
    </section>
  );
};
