import { useState, useEffect, useRef } from 'react';
import { ScooterCanvas } from './components/ScooterCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TransformSection } from './components/TransformSection';
import { BatterySection } from './components/BatterySection';
import { PerformanceSection } from './components/PerformanceSection';
import { DesignSection } from './components/DesignSection';
import { ProductLineupSection } from './components/ProductLineupSection';
import { TechnologyEcoSection } from './components/TechnologyEcoSection';
import { ColorSection } from './components/ColorSection';
import { FinalSection } from './components/FinalSection';
import { ControlsDock } from './components/ControlsDock';
import { BookingModal } from './components/BookingModal';
import { VEHICLE_COLORS } from './data/scooterData';
import { VehicleColor, ThemeMode } from './types';
import { ScooterScene } from './three/ScooterScene';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentColor, setCurrentColor] = useState<VehicleColor>(VEHICLE_COLORS[0]);
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('studio');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const sceneInstanceRef = useRef<ScooterScene | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.max(0, Math.min(1, window.scrollY / totalScroll));
        setScrollProgress(progress);
      }

      // Detect active section for navbar
      const sections = ['hero', 'transform', 'battery', 'performance', 'design', 'lineup', 'technology', 'colors', 'final'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleHeadlights = (): boolean => {
    if (sceneInstanceRef.current) {
      return sceneInstanceRef.current.toggleHeadlights();
    }
    return true;
  };

  return (
    <div
      data-theme={currentTheme}
      className="relative min-h-screen selection:bg-orange-500 selection:text-white font-sans transition-colors duration-500 overflow-x-hidden"
    >
      {/* Fixed 3D Scooter Background Scene (Matched to uploaded photo) */}
      <ScooterCanvas
        scrollProgress={scrollProgress}
        currentColor={currentColor}
        currentTheme={currentTheme}
        activeHotspot={activeHotspot}
        onSceneReady={(scene) => {
          sceneInstanceRef.current = scene;
        }}
      />

      {/* Floating Top Header Navigation with Theme Switcher & Animated Pill Indicator */}
      <Navbar
        scrollProgress={scrollProgress}
        currentTheme={currentTheme}
        activeSection={activeSection}
        onSelectTheme={(theme) => setCurrentTheme(theme)}
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Foreground Scrollable Narrative Sections */}
      <main className="relative z-10">
        <HeroSection
          onExploreRide={() => scrollToSection('transform')}
          onDiscoverMore={() => scrollToSection('battery')}
        />

        <TransformSection />

        <BatterySection />

        <PerformanceSection />

        <DesignSection
          activeHotspot={activeHotspot}
          onSelectHotspot={(hotspotId) => setActiveHotspot(hotspotId)}
        />

        {/* 3D Product Lineup Showcase with 3D Tilt Cards */}
        <ProductLineupSection
          onOpenBooking={() => setIsBookingOpen(true)}
          onSelectProduct={(product) => {
            const matchedColor = VEHICLE_COLORS.find((c) =>
              c.name.toLowerCase().includes(product.colorName.toLowerCase().split(' ')[0])
            );
            if (matchedColor) {
              setCurrentColor(matchedColor);
            }
          }}
        />

        {/* Intelligent Ecosystem & Comparison Matrix 3D Cards */}
        <TechnologyEcoSection
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <ColorSection
          currentColor={currentColor}
          onSelectColor={(color) => setCurrentColor(color)}
        />

        <FinalSection
          onOpenBooking={() => setIsBookingOpen(true)}
          onExploreScooter={() => scrollToSection('design')}
        />
      </main>

      {/* Ergonomic Collapsible Bottom 3D Controls Dock */}
      <ControlsDock
        currentColor={currentColor}
        currentTheme={currentTheme}
        onSelectColor={(color) => setCurrentColor(color)}
        onSelectTheme={(theme) => setCurrentTheme(theme)}
        onToggleHeadlights={handleToggleHeadlights}
        onNavigateSection={scrollToSection}
      />

      {/* Test Ride & Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedColor={currentColor}
      />
    </div>
  );
}
