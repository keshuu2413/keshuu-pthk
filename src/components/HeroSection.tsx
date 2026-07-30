import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onBeginStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBeginStory }) => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-16 px-4">
      {/* Soft Luxury Clouds & Glowing Pink Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-rose-600/15 blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-pink-500/15 blur-[120px]" />
        <div className="absolute top-1/3 right-10 w-72 h-72 rounded-full bg-amber-400/10 blur-[100px]" />
      </div>

      {/* Animated Blossom Petals & White/Red Roses Falling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow opacity-80"
            style={{
              left: `${(i * 6 + 4) % 100}%`,
              top: `${(i * 11) % 90}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + (i % 4)}s`
            }}
          >
            {i % 4 === 0 ? '🌹' : i % 4 === 1 ? '🌸' : i % 4 === 2 ? '❤️' : '🤍'}
          </div>
        ))}
      </div>

      {/* Main Luxury Glassmorphism Card */}
      <div className="relative z-10 max-w-4xl w-full glass-panel-pink rounded-3xl p-8 md:p-14 lg:p-16 text-center shadow-2xl border border-rose-300/30">
        {/* Subtle Decorative Top Sparkles */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-rose-200 font-semibold">
            OCTOBER 2024 &bull; FOREVER
          </span>
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
        </div>

        {/* Large Heading */}
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight pink-glow-text">
          Happy Girlfriend&apos;s Day <span className="inline-block animate-pulse">❤️</span>
        </h1>

        {/* Subheading */}
        <p className="font-serif-luxury italic text-xl sm:text-2xl md:text-3xl text-rose-100 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
          To The Most Beautiful Girl In My World — <span className="text-rose-300 font-medium underline decoration-rose-400/50 underline-offset-8">Monal</span> 🌹
        </p>

        {/* Romantic Decorative Quote */}
        <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-rose-300/90 mb-10">
          &ldquo;You make ordinary days feel extraordinary.&rdquo;
        </p>

        {/* Begin Our Story Button */}
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            onClick={onBeginStory}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-lg sm:text-xl shadow-xl hover:shadow-rose-500/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer pink-glow border border-rose-300/40"
          >
            <span>Begin Our Story</span>
            <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
          </button>
          <span className="text-xs text-rose-300/70 tracking-wider">
            Click to start music &amp; explore our story ❤️
          </span>
        </div>

        {/* Keyboard shortcut hint for Easter Egg */}
        <div className="absolute bottom-4 right-6 text-[10px] text-rose-300/40 hidden md:block">
          Secret hint: Press <kbd className="px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-500/20 text-rose-200">K</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-500/20 text-rose-200">M</kbd>
        </div>
      </div>
    </section>
  );
};
