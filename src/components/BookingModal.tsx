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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 sm:p-8 overflow-hidden text-neutral-900">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-neutral-900">
              {activeTab === 'test-ride' ? 'Test Ride Scheduled!' : 'Reservation Confirmed!'}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 max-w-sm mx-auto">
              We have sent a confirmation to <span className="font-semibold text-neutral-900">{email || 'your email'}</span>. A mobility specialist will prepare your Aura X1 in <span className="font-semibold text-neutral-900">{color.name}</span>.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-left text-xs text-neutral-700 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-500">BOOKING CODE:</span>
                <span className="font-mono font-bold text-neutral-900">EV-2026-X884</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">SELECTED HUB:</span>
                <span className="font-medium text-neutral-900">{city} Experience Center</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">FINISH SPEC:</span>
                <span className="font-medium text-neutral-900">{color.name} ({color.badge})</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="mt-6 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm py-3.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Back to Experience
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 fill-white text-white" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Aura X1 EV Scooty
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-neutral-900">
              Experience the Ride
            </h3>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-neutral-100 rounded-xl my-5 border border-neutral-200/80">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('test-ride');
                }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'test-ride'
                    ? 'bg-white text-neutral-900 shadow-2xs border border-neutral-200'
                    : 'text-neutral-500 hover:text-neutral-900'
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
                    ? 'bg-white text-neutral-900 shadow-2xs border border-neutral-200'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Reserve Vehicle ($99)
              </button>
            </div>

            {/* Selected Color Pill */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
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
                        ? 'border-neutral-900 scale-105 ring-2 ring-neutral-900/15'
                        : 'border-neutral-300'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  />
                ))}
                <span className="text-xs text-neutral-700 font-medium ml-2">
                  {color.name}
                </span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Elena Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Preferred Experience Center
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:border-neutral-900"
                >
                  <option value="San Francisco, CA">San Francisco, CA — Design Studio Hub</option>
                  <option value="New York, NY">New York, NY — SoHo Experience Center</option>
                  <option value="Austin, TX">Austin, TX — South Congress Studio</option>
                  <option value="Los Angeles, CA">Los Angeles, CA — Venice Beach Lab</option>
                  <option value="Seattle, WA">Seattle, WA — Westlake Flagship</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <span>
                  {activeTab === 'test-ride' ? 'Confirm VIP Test Ride' : 'Authorize $99 Refundable Deposit'}
                </span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-600" /> Same-day scheduling
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-600" /> Helmet & gear provided
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
