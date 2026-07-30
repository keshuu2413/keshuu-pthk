import React, { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface LuxuryLoaderProps {
  onComplete: () => void;
}

export const LuxuryLoader: React.FC<LuxuryLoaderProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFading(true);
            setTimeout(onComplete, 800);
          }, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0814] via-[#2c0c22] to-[#1a0815] transition-opacity duration-1000 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Soft Golden Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200/40 animate-pulse-soft"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Blooming Pink Rose Animation Container */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer glowing halo */}
        <div className="absolute w-48 h-48 rounded-full bg-rose-500/20 blur-3xl animate-pulse" />
        <div className="absolute w-36 h-36 rounded-full bg-pink-400/25 blur-2xl animate-pulse" />

        {/* Blooming Pink Rose Vector Illustration */}
        <div className="relative z-10 w-40 h-40 flex items-center justify-center animate-bloom">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(255,105,180,0.6)]">
            {/* Outer pink petals */}
            <path
              d="M100 25 C140 25 175 60 170 100 C165 140 130 170 100 175 C70 170 35 140 30 100 C25 60 60 25 100 25 Z"
              fill="url(#pinkRoseGrad1)"
              className="origin-center transition-transform duration-1000"
            />
            {/* Mid layered pink petals */}
            <path
              d="M100 45 C125 45 150 70 145 100 C140 130 115 150 100 155 C85 150 60 130 55 100 C50 70 75 45 100 45 Z"
              fill="url(#pinkRoseGrad2)"
              className="origin-center rotate-45"
            />
            {/* Inner layered rose petals */}
            <path
              d="M100 65 C115 65 130 80 125 100 C120 120 108 135 100 138 C92 135 80 120 75 100 C70 80 85 65 100 65 Z"
              fill="url(#pinkRoseGrad3)"
              className="origin-center -rotate-12"
            />
            {/* Core bud */}
            <circle cx="100" cy="100" r="18" fill="#ff80ab" />
            <circle cx="95" cy="95" r="6" fill="#ffe4e1" />

            <defs>
              <linearGradient id="pinkRoseGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
              <linearGradient id="pinkRoseGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="pinkRoseGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating sparkles around rose */}
        <Sparkles className="absolute -top-2 right-4 w-6 h-6 text-amber-300 animate-bounce" />
        <Sparkles className="absolute -bottom-2 left-4 w-5 h-5 text-pink-300 animate-pulse" />
      </div>

      {/* Luxury Heading for Monal */}
      <h1 className="font-serif-luxury text-2xl md:text-3xl lg:text-4xl text-rose-100 font-medium tracking-wide text-center px-4 mb-3 pink-glow-text">
        Preparing a surprise for you, Monal... <span className="inline-block animate-pulse">❤️</span>
      </h1>
      <p className="font-handwriting text-2xl md:text-3xl text-rose-300/90 mb-8 tracking-wider">
        Every flower blooms because of love
      </p>

      {/* Elegant Rose Gold Progress Bar */}
      <div className="w-64 md:w-80 h-1.5 rounded-full bg-rose-950/80 border border-rose-500/20 overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs tracking-widest uppercase text-rose-400/80 font-medium">
        {progress}% • Luxury Experience Loading
      </p>

      {/* Skip button for impatience */}
      <button
        onClick={() => {
          setFading(true);
          setTimeout(onComplete, 500);
        }}
        className="mt-8 text-xs text-rose-300/60 hover:text-rose-200 transition-colors underline underline-offset-4 cursor-pointer"
      >
        Skip to surprise &rarr;
      </button>
    </div>
  );
};
