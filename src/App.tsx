/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LuxuryLoader } from './components/LuxuryLoader';
import { HeroSection } from './components/HeroSection';
import { MusicPlayer } from './components/MusicPlayer';
import { FlowerSlideshow } from './components/FlowerSlideshow';
import { JourneyTimeline } from './components/JourneyTimeline';
import { LoveLetter } from './components/LoveLetter';
import { InteractiveTeddy } from './components/InteractiveTeddy';
import { CartoonCoupleSection } from './components/CartoonCoupleSection';
import { FloatingEffects } from './components/FloatingEffects';
import { WishesGenerator } from './components/WishesGenerator';
import { SecretSurpriseModal } from './components/SecretSurpriseModal';
import { EndingScene } from './components/EndingScene';
import { EasterEggModal } from './components/EasterEggModal';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleBeginStory = () => {
    setMusicStarted(true);
    const firstSection = document.getElementById('flower-slideshow');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f050c] text-rose-50 selection:bg-rose-500 selection:text-white">
      {/* 1. Luxury Loading Screen */}
      {isLoading && <LuxuryLoader onComplete={() => setIsLoading(false)} />}

      {/* 10. Floating Effects (Cursor hearts, Click blossoms, Butterflies, Sparkles) */}
      <FloatingEffects />

      {/* 3. Background Music inspired by "Aaj Se Teri" */}
      <MusicPlayer autoStart={true} />

      {/* Easter Egg Listener for K + M */}
      <EasterEggModal />

      {/* Top Luxury Navigation Header */}
      <header className="fixed top-0 inset-x-0 z-30 px-4 py-3 bg-gradient-to-b from-[#180914]/90 to-transparent backdrop-blur-md border-b border-rose-500/15">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-400 animate-pulse" />
            <span className="font-serif-luxury text-lg font-bold text-white tracking-wider">
              Monal <span className="text-rose-300 font-light">&amp;</span> Keshu
            </span>
          </div>

          <nav className="hidden sm:flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-rose-200/80">
            <a href="#flower-slideshow" className="hover:text-white transition-colors">Flowers</a>
            <a href="#journey-timeline" className="hover:text-white transition-colors">Journey</a>
            <a href="#love-letter" className="hover:text-white transition-colors">Letter</a>
            <a href="#interactive-teddy" className="hover:text-white transition-colors">Teddy</a>
            <a href="#secret-surprise" className="hover:text-white transition-colors text-rose-300">Surprise ❤️</a>
          </nav>
        </div>
      </header>

      {/* Main Sections */}
      <main className="relative z-10 pt-8">
        {/* 2. Hero Section */}
        <HeroSection onBeginStory={handleBeginStory} />

        {/* 4. Luxury Flower Slideshow */}
        <FlowerSlideshow />

        {/* 5. Our Journey Timeline */}
        <JourneyTimeline />

        {/* 6. Love Letter */}
        <LoveLetter />

        {/* 7. Interactive Teddy Bear */}
        <InteractiveTeddy />

        {/* 8. Cartoon Couple Section */}
        <CartoonCoupleSection />

        {/* 11. Romantic Wishes Generator */}
        <WishesGenerator />

        {/* 12. Secret Surprise Button */}
        <SecretSurpriseModal />

        {/* 13. Ending Scene */}
        <EndingScene />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-rose-400/60 tracking-wider uppercase border-t border-rose-500/10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span>Crafted with infinite love for Monal</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>
        <div>Happy Girlfriend&apos;s Day &bull; Keshu ❤️ Monal</div>
      </footer>
    </div>
  );
}

