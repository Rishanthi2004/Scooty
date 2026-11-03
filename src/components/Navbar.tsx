import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Zap, ArrowUpRight, Sun, Moon, Sparkles, Menu, X } from 'lucide-react';
import { soundFX } from '../audio/soundFx';
import { ThemeMode } from '../types';

interface NavbarProps {
  scrollProgress: number;
  currentTheme: ThemeMode;
  activeSection: string;
  onSelectTheme: (theme: ThemeMode) => void;
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  scrollProgress,
  currentTheme,
  activeSection,
  onSelectTheme,
  onOpenBooking,
  onNavigateSection,
}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(!soundFX.getMuted());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const enabled = soundFX.toggleMute();
    setIsAudioEnabled(enabled);
  };

  const cycleTheme = () => {
    soundFX.playClick();
    if (currentTheme === 'studio') {
      onSelectTheme('midnight');
    } else if (currentTheme === 'midnight') {
      onSelectTheme('cyber');
    } else {
      onSelectTheme('studio');
    }
  };

  const navLinks = [
    { label: '3D Story', id: 'hero' },
    { label: 'Dynamics', id: 'transform' },
    { label: 'Battery', id: 'battery' },
    { label: 'Motion', id: 'performance' },
    { label: 'Design', id: 'design' },
    { label: 'Lineup', id: 'lineup' },
    { label: 'Tech & Network', id: 'technology' },
    { label: 'Finishes', id: 'colors' },
  ];

  const isDark = currentTheme === 'midnight' || currentTheme === 'cyber';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`backdrop-blur-xl rounded-2xl px-4 sm:px-5 py-3 shadow-2xl flex items-center justify-between border transition-colors duration-300 ${
            isDark
              ? 'bg-neutral-900/85 border-neutral-800 text-white'
              : 'bg-white/85 border-neutral-200/80 text-neutral-900'
          }`}
        >
          {/* Brand Logo */}
          <button
            onClick={() => {
              soundFX.playClick();
              onNavigateSection('hero');
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center border border-neutral-700 shadow-md"
            >
              <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
            </motion.div>
            <div>
              <span
                className={`font-display font-bold tracking-wider text-base ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}
              >
                EV SCOOTY
              </span>
              <span className="text-[10px] block -mt-1 font-medium text-neutral-400 tracking-widest uppercase">
                Studio Edition • 2026
              </span>
            </div>
          </button>

          {/* Navigation Links with Smooth Animated Pill Indicator */}
          <nav
            className={`hidden xl:flex items-center gap-1 p-1 rounded-xl relative ${
              isDark ? 'bg-neutral-800/80' : 'bg-neutral-100/80'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    soundFX.playClick();
                    onNavigateSection(link.id);
                  }}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer z-10 ${
                    isActive
                      ? isDark
                        ? 'text-white'
                        : 'text-neutral-900 font-bold'
                      : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute inset-0 rounded-lg -z-10 shadow-sm ${
                        isDark ? 'bg-neutral-700/80 border border-neutral-600/50' : 'bg-white border border-neutral-200/80'
                      }`}
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={cycleTheme}
              aria-label="Cycle 3D Studio Theme"
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-neutral-800 text-neutral-200 border-neutral-700 hover:bg-neutral-700'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {currentTheme === 'studio' && <Sun className="w-4 h-4 text-amber-500" />}
              {currentTheme === 'midnight' && <Moon className="w-4 h-4 text-indigo-400" />}
              {currentTheme === 'cyber' && <Sparkles className="w-4 h-4 text-cyan-400" />}
              <span className="hidden sm:inline text-[11px] capitalize tracking-wide font-semibold">
                {currentTheme === 'studio' ? 'Studio' : currentTheme === 'midnight' ? 'Midnight' : 'Cyber'}
              </span>
            </motion.button>

            {/* Audio Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleSound}
              aria-label="Toggle Sound Effects"
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isAudioEnabled
                  ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                  : isDark
                  ? 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:bg-neutral-700'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {isAudioEnabled ? (
                <Volume2 className="w-4 h-4 text-white" />
              ) : (
                <VolumeX className="w-4 h-4 text-neutral-400" />
              )}
            </motion.button>

            {/* Test Ride Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundFX.playClick();
                onOpenBooking();
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-500/25 border border-orange-400/30"
            >
              <span>Test Ride</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </motion.button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle Navigation Menu"
              className={`xl:hidden p-2 rounded-xl border text-neutral-300 hover:text-white cursor-pointer ${
                isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-100 border-neutral-300 text-neutral-800'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile 3D Reveal Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, rotateX: -15 }}
            animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
            exit={{ opacity: 0, height: 0, rotateX: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 800 }}
            className="xl:hidden max-w-7xl mx-auto px-4 mt-2 overflow-hidden"
          >
            <div
              className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl ${
                isDark ? 'bg-neutral-900/95 border-neutral-800' : 'bg-white/95 border-neutral-200'
              }`}
            >
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      soundFX.playClick();
                      onNavigateSection(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                      activeSection === link.id
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        : isDark
                        ? 'bg-neutral-800/80 text-neutral-300 border-neutral-700/60 hover:bg-neutral-800'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thin Animated Scroll Progress Indicator */}
      <div
        className={`h-[2px] w-full mt-2 transition-colors ${
          isDark ? 'bg-neutral-800/80' : 'bg-neutral-200/50'
        }`}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-400"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>
    </header>
  );
};
