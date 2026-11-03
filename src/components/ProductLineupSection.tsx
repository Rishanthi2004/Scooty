import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { AnimatedButton } from './AnimatedButton';
import { Zap, Check } from 'lucide-react';
import { soundFX } from '../audio/soundFx';

export interface ScooterProduct {
  id: string;
  name: string;
  edition: string;
  tagline: string;
  priceNote: string;
  accel: string;
  topSpeed: string;
  range: string;
  motorPower: string;
  colorName: string;
  colorHex: string;
  badge: string;
  highlightSpecs: string[];
}

const PRODUCTS: ScooterProduct[] = [
  {
    id: 'aura-x1-pure',
    name: 'Aura X1',
    edition: 'Studio Edition',
    tagline: 'The pure essence of modern electric urban mobility.',
    priceNote: 'Eligible for Federal Clean Energy Rebates',
    accel: '2.9s',
    topSpeed: '85 km/h',
    range: '145 km',
    motorPower: '6.8 kW',
    colorName: 'Pure Pearl White',
    colorHex: '#FCFCFD',
    badge: 'Flagship Edition',
    highlightSpecs: [
      'Circular Halo Matrix LED Headlight',
      'Dual Lithium-Ion Modular Pack (IP67)',
      '10-Second Quick-Swap Architecture',
      'Smart OLED Cockpit OS 4.2',
    ],
  },
  {
    id: 'aura-x1-pro',
    name: 'Aura X1 Pro',
    edition: 'Performance Spec',
    tagline: 'High-torque dual inverter with track-tuned handling.',
    priceNote: 'Includes HyperCharge Rapid Dock & Helmet',
    accel: '2.7s',
    topSpeed: '90 km/h',
    range: '155 km',
    motorPower: '7.6 kW',
    colorName: 'Stealth Noir',
    colorHex: '#1D2127',
    badge: 'Track Spec',
    highlightSpecs: [
      'High-Output Synchronous Inverter',
      'Dual Channel Hydraulic ABS Discs',
      'Michelin Pilot City Grip Compound',
      'Telemetry Lap & Lean Angle Tracking',
    ],
  },
  {
    id: 'aura-s-urban',
    name: 'Aura S',
    edition: 'Urban Commuter',
    tagline: 'Ultra-nimble lightweight monocoque for daily city commute.',
    priceNote: 'Zero Down Financing Available',
    accel: '3.2s',
    topSpeed: '78 km/h',
    range: '135 km',
    motorPower: '5.4 kW',
    colorName: 'Liquid Billet Silver',
    colorHex: '#C8CFD8',
    badge: 'City Light',
    highlightSpecs: [
      'High-Tensile Extruded Alloy Frame',
      'Ultra-Lightweight 78kg Curb Mass',
      'Regenerative Kinetic Brake System',
      'Anti-Theft GPS Satellite Tether',
    ],
  },
];

interface ProductLineupSectionProps {
  onSelectProduct?: (product: ScooterProduct) => void;
  onOpenBooking: () => void;
}

export const ProductLineupSection: React.FC<ProductLineupSectionProps> = ({
  onSelectProduct,
  onOpenBooking,
}) => {
  const [selectedId, setSelectedId] = useState<string>('aura-x1-pure');

  const handleCardClick = (product: ScooterProduct) => {
    soundFX.playClick();
    setSelectedId(product.id);
    if (onSelectProduct) onSelectProduct(product);
  };

  return (
    <section id="lineup" className="relative py-28 px-6 z-20">
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
            <span>The Electric Lineup</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight"
          >
            Engineered for Velocity.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-neutral-600 font-normal"
          >
            Explore our precision-crafted electric scooters. Hover and tilt any model to inspect specifications.
          </motion.p>
        </div>

        {/* 3D Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => {
            const isSelected = selectedId === product.id;

            return (
              <TiltCard
                key={product.id}
                delay={index * 0.12}
                glowColor="rgba(0, 0, 0, 0.04)"
                tiltAmount={4.5}
                onClick={() => handleCardClick(product)}
                className={`transition-transform duration-300 ${
                  isSelected ? 'scale-[1.01]' : 'opacity-95 hover:opacity-100'
                }`}
              >
                <div
                  className={`p-7 rounded-2xl flex flex-col justify-between h-full border transition-all duration-300 relative overflow-hidden backdrop-blur-xl ${
                    isSelected
                      ? 'bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900/10'
                      : 'bg-white border-neutral-200/90 shadow-2xs hover:border-neutral-300 hover:shadow-sm'
                  }`}
                >
                  {/* Top Badge & Finish Swatch */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                        isSelected
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                      }`}
                    >
                      {product.badge}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-neutral-500">
                        {product.colorName}
                      </span>
                      <div
                        className="w-4 h-4 rounded-full border border-neutral-300 shadow-2xs"
                        style={{ backgroundColor: product.colorHex }}
                      />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-display text-2xl font-bold text-neutral-900">
                      {product.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider mt-0.5">
                      {product.edition} • {product.motorPower}
                    </p>
                    <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* High-Precision Technical Profile Schematic */}
                  <div className="my-6 py-4 flex items-center justify-center relative">
                    <div className="relative z-10 w-full max-w-[260px] flex flex-col items-center">
                      <svg
                        viewBox="0 0 240 130"
                        className="w-full h-auto"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Ground reference line */}
                        <line x1="20" y1="112" x2="220" y2="112" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                        
                        {/* Wheelbase Dimension Marker */}
                        <line x1="50" y1="122" x2="190" y2="122" stroke="#94a3b8" strokeWidth="1" />
                        <line x1="50" y1="118" x2="50" y2="126" stroke="#94a3b8" strokeWidth="1" />
                        <line x1="190" y1="118" x2="190" y2="126" stroke="#94a3b8" strokeWidth="1" />
                        <text x="120" y="126" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace">1,280 mm</text>

                        {/* Wheels & Disc Brake */}
                        <circle cx="50" cy="94" r="18" stroke="#1e293b" strokeWidth="4" />
                        <circle cx="50" cy="94" r="11" stroke="#cbd5e1" strokeWidth="1.5" />
                        <circle cx="50" cy="94" r="3.5" fill="#0f172a" />

                        <circle cx="190" cy="94" r="18" stroke="#1e293b" strokeWidth="4" />
                        <circle cx="190" cy="94" r="11" stroke="#cbd5e1" strokeWidth="1.5" />
                        <circle cx="190" cy="94" r="3.5" fill="#0f172a" />

                        {/* Chassis Step-through Deck */}
                        <path
                          d="M50 94 L80 92 L148 92 L172 94"
                          stroke="#334155"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        <rect x="90" y="85" width="55" height="7" rx="2" fill="#0f172a" />

                        {/* Monocoque Body Pod & Seat */}
                        <path
                          d="M62 88 Q78 62 108 62 L132 62 Q128 88 112 88 Z"
                          fill="#f1f5f9"
                          stroke="#64748b"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M72 62 Q92 56 116 57 Q132 57 134 62 Z"
                          fill="#18181b"
                        />

                        {/* Passenger Handle Rail */}
                        <path d="M68 59 L84 59" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />

                        {/* Front Apron & Steering Column */}
                        <path
                          d="M148 92 L168 46 L174 24 L164 24 L154 52 Z"
                          fill="#f8fafc"
                          stroke="#64748b"
                          strokeWidth="1.5"
                        />

                        {/* Circular Halo Headlight Ring */}
                        <circle cx="170" cy="46" r="6" stroke="#0f172a" strokeWidth="1.5" fill="#e2e8f0" />
                        <circle cx="170" cy="46" r="3.5" fill="#38bdf8" />

                        {/* Minimalist Flyscreen Visor & Handlebar */}
                        <path d="M164 24 L175 14" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                        <path d="M172 24 L180 24" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="163" cy="12" r="3" stroke="#64748b" strokeWidth="1" fill="#f8fafc" />
                      </svg>
                    </div>
                  </div>

                  {/* Core Performance Metric Grid */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-100 my-2 text-center">
                    <div>
                      <div className="text-neutral-500 text-[10px] font-mono uppercase">
                        0–40 KM/H
                      </div>
                      <div className="text-lg font-bold font-display text-neutral-900 mt-0.5">
                        {product.accel}
                      </div>
                    </div>

                    <div className="border-x border-neutral-100">
                      <div className="text-neutral-500 text-[10px] font-mono uppercase">
                        TOP SPEED
                      </div>
                      <div className="text-lg font-bold font-display text-neutral-900 mt-0.5">
                        {product.topSpeed}
                      </div>
                    </div>

                    <div>
                      <div className="text-neutral-500 text-[10px] font-mono uppercase">
                        RANGE
                      </div>
                      <div className="text-lg font-bold font-display text-neutral-900 mt-0.5">
                        {product.range}
                      </div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 my-4 text-xs text-neutral-600">
                    {product.highlightSpecs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <div className="mt-5 pt-3 border-t border-neutral-100">
                    <AnimatedButton
                      variant={isSelected ? 'primary' : 'secondary'}
                      icon="arrow"
                      onClick={() => {
                        soundFX.playClick();
                        onOpenBooking();
                      }}
                      className="w-full text-xs py-3"
                    >
                      {isSelected ? 'Reserve This Spec' : 'Select Spec'}
                    </AnimatedButton>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
