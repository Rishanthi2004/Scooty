import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, MapPin, Zap, ArrowRight } from 'lucide-react';
import { VehicleColor } from '../types';
import { VEHICLE_COLORS } from '../data/scooterData';
import { soundFX } from '../audio/soundFx';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: VehicleColor;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedColor,
}) => {
  const [activeTab, setActiveTab] = useState<'test-ride' | 'reserve'>('test-ride');
  const [color, setColor] = useState<VehicleColor>(selectedColor);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('San Francisco, CA');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playStartupChime();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    soundFX.playClick();
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111622] rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden text-white">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-5 shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              {activeTab === 'test-ride' ? 'Test Ride Scheduled!' : 'Reservation Confirmed!'}
            </h3>
            <p className="mt-2 text-sm text-slate-300 max-w-sm mx-auto">
              We have sent a confirmation to <span className="font-semibold text-white">{email || 'your email'}</span>. A mobility specialist will prepare your Aura X1 in <span className="font-semibold text-cyan-400">{color.name}</span>.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-[#161c2b] border border-slate-700/80 text-left text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">BOOKING CODE:</span>
                <span className="font-mono font-bold text-cyan-400">EV-2026-X884</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SELECTED HUB:</span>
                <span className="font-medium text-white">{city} Experience Center</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">FINISH SPEC:</span>
                <span className="font-medium text-white">{color.name} ({color.badge})</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="mt-6 w-full bg-white hover:bg-slate-100 text-neutral-950 font-bold text-sm py-3.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Back to Experience
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Aura X1 EV Scooty
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-white">
              Experience the Ride
            </h3>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#0d121c] rounded-xl my-5 border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('test-ride');
                }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'test-ride'
                    ? 'bg-[#1e2638] text-white shadow-2xs border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                VIP Test Ride
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('reserve');
                }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'reserve'
                    ? 'bg-[#1e2638] text-white shadow-2xs border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Reserve Vehicle ($99)
              </button>
            </div>

            {/* Selected Color Pill */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Preferred Color Finish:
              </label>
              <div className="flex items-center gap-2">
                {VEHICLE_COLORS.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setColor(col);
                    }}
                    title={col.name}
                    className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                      color.id === col.id
                        ? 'border-cyan-400 scale-105 ring-2 ring-cyan-400/30'
                        : 'border-slate-600'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  />
                ))}
                <span className="text-xs text-slate-300 font-medium ml-2">
                  {color.name}
                </span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Elena Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#161c2b] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#161c2b] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#161c2b] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Preferred Experience Center
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#161c2b] text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="San Francisco, CA" className="bg-[#161c2b] text-white">San Francisco, CA — Design Studio Hub</option>
                  <option value="New York, NY" className="bg-[#161c2b] text-white">New York, NY — SoHo Experience Center</option>
                  <option value="Austin, TX" className="bg-[#161c2b] text-white">Austin, TX — South Congress Studio</option>
                  <option value="Los Angeles, CA" className="bg-[#161c2b] text-white">Los Angeles, CA — Venice Beach Lab</option>
                  <option value="Seattle, WA" className="bg-[#161c2b] text-white">Seattle, WA — Westlake Flagship</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-slate-100 text-neutral-950 font-bold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <span>
                  {activeTab === 'test-ride' ? 'Confirm VIP Test Ride' : 'Authorize $99 Refundable Deposit'}
                </span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" /> Same-day scheduling
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" /> Helmet & gear provided
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
