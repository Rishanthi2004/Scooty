import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { Cpu, Wifi, RefreshCw, ShieldCheck, Star, Quote, Zap } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

interface TechnologyEcoSectionProps {
  onOpenBooking: () => void;
}

export const TechnologyEcoSection: React.FC<TechnologyEcoSectionProps> = ({
  onOpenBooking,
}) => {
  const techCards = [
    {
      icon: RefreshCw,
      title: '10-Second Quick-Swap',
      tag: 'MODULAR POWER',
      desc: 'Roll into any automated swap kiosk, swap your modular battery pack in 10 seconds, and continue riding without downtime.',
    },
    {
      icon: Wifi,
      title: 'Smart Cloud OS 4.2',
      tag: 'CONNECTED APP',
      desc: 'Seamless proximity phone unlock, live GPS anti-theft tracking, remote battery diagnostics, and over-the-air firmware updates.',
    },
    {
      icon: Cpu,
      title: 'Synchronous Inverter',
      tag: 'EFFICIENCY',
      desc: 'Automotive silicon-carbide power controller delivering 98.4% electrical efficiency with instantaneous, linear throttle response.',
    },
    {
      icon: ShieldCheck,
      title: 'Hermetic IP67 Enclosure',
      tag: 'ALL-WEATHER',
      desc: 'Submersible battery and powertrain housing resistant to heavy torrential rain, dust, and inclement urban weather.',
    },
  ];

  const testimonials = [
    {
      name: 'Marcus Chen',
      role: 'Urban Architect, San Francisco',
      quote:
        'The circular halo headlight and minimalist white apron turn heads everywhere. The modular battery swap near my office transformed my daily commute.',
      rating: 5,
      miles: '4,200 km logged',
    },
    {
      name: 'Sarah Linwood',
      role: 'Product Designer, Austin',
      quote:
        'The center of gravity and weight balance are exceptional. It feels remarkably solid and stable with zero motor vibration.',
      rating: 5,
      miles: '6,850 km logged',
    },
    {
      name: 'Julian Vance',
      role: 'Clean Tech Founder, Seattle',
      quote:
        'Proximity phone unlock works reliably before I even pull my keys out. Charging costs pennies, and regenerative braking is smooth.',
      rating: 5,
      miles: '3,100 km logged',
    },
  ];

  return (
    <section id="technology" className="relative py-28 px-6 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold mb-4"
          >
            <Zap className="w-3.5 h-3.5 fill-neutral-700 text-neutral-700" />
            <span>Intelligent Ecosystem</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight"
          >
            Connected to the Future.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-neutral-600 font-normal"
          >
            Every ride is supported by intelligent telemetry, battery thermal optimization, and an extensive nationwide network.
          </motion.p>
        </div>

        {/* 4 Interactive 3D Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {techCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <TiltCard
                key={card.title}
                delay={index * 0.1}
                glowColor="rgba(0, 0, 0, 0.04)"
                tiltAmount={4.5}
                className="h-full"
              >
                <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-sm backdrop-blur-md h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-800 border border-neutral-200/60">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-neutral-900 mb-2">{card.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span>TELEMETRY</span>
                    <span className="text-neutral-900 font-semibold">ONLINE</span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Feature Comparison Matrix 3D Card */}
        <div className="mb-20">
          <TiltCard glowColor="rgba(0, 0, 0, 0.04)" tiltAmount={4.5}>
            <div className="p-7 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-sm backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                    BENCHMARK COMPARISON
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">
                    Why EV Scooty Outperforms the Rest
                  </h3>
                </div>

                <AnimatedButton
                  variant="primary"
                  icon="up-right"
                  onClick={onOpenBooking}
                  className="w-fit"
                >
                  Book Test Ride
                </AnimatedButton>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-600 font-mono uppercase tracking-wider">
                      <th className="pb-4 font-semibold">Specification</th>
                      <th className="pb-4 font-bold text-neutral-900">EV Scooty Aura X1</th>
                      <th className="pb-4 font-normal text-neutral-500">Traditional Gas Scooter</th>
                      <th className="pb-4 font-normal text-neutral-500">Generic EV Moped</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-neutral-600">
                    <tr>
                      <td className="py-4 font-medium text-neutral-900">Refuel / Swap Speed</td>
                      <td className="py-4 font-bold text-neutral-900">10 Seconds (Swappable)</td>
                      <td className="py-4 text-neutral-500">5-7 min at Gas Station</td>
                      <td className="py-4 text-neutral-500">4-6 Hours Cable Plug</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-neutral-900">Instant Acceleration (0-40)</td>
                      <td className="py-4 font-bold text-neutral-900">2.9 Seconds</td>
                      <td className="py-4 text-neutral-500">6.2 Seconds</td>
                      <td className="py-4 text-neutral-500">5.4 Seconds</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-neutral-900">Operating Cost per 100km</td>
                      <td className="py-4 font-bold text-neutral-900">$0.32 (Electricity)</td>
                      <td className="py-4 text-neutral-500">$4.80 (Gasoline)</td>
                      <td className="py-4 text-neutral-500">$0.55 (Electricity)</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-neutral-900">Frame Architecture</td>
                      <td className="py-4 font-bold text-neutral-900">Aircraft Monocoque 6061-T6</td>
                      <td className="py-4 text-neutral-500">Welded Tubular Steel</td>
                      <td className="py-4 text-neutral-500">Stamped Steel Plate</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-neutral-900">Smartphone Digital Key</td>
                      <td className="py-4 font-bold text-neutral-900">Included (Proximity BLE)</td>
                      <td className="py-4 text-neutral-500">Physical Key Only</td>
                      <td className="py-4 text-neutral-500">Basic Remote Fob</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Rider Testimonials */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              COMMUNITY VOICES
            </span>
            <h3 className="text-3xl font-bold font-display text-neutral-900 mt-1">
              Loved by Over 24,000 Riders
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <TiltCard key={item.name} delay={idx * 0.12} glowColor="rgba(0, 0, 0, 0.04)" tiltAmount={4.5}>
                <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-sm backdrop-blur-md h-full flex flex-col justify-between">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-500 mb-4">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>

                    <Quote className="w-5 h-5 text-neutral-300 mb-2" />
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900">{item.name}</h4>
                      <p className="text-[11px] text-neutral-500">{item.role}</p>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      {item.miles}
                    </span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
