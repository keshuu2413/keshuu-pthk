import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X } from 'lucide-react';

export const SecretSurpriseModal: React.FC = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [fadingToBlack, setFadingToBlack] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleSecretClick = () => {
    setFadingToBlack(true);
    setIsTriggered(true);

    // Launch Confetti & Fireworks bursts
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff80ab', '#f43f5e', '#ffc107', '#ffffff']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff80ab', '#f43f5e', '#ffc107', '#ffffff']
      });

      if (Date.now() < animationEnd && isTriggered) {
        requestAnimationFrame(frame);
      }
    };

    setTimeout(() => {
      setShowContent(true);
      frame();
    }, 1200);
  };

  const closeSurprise = () => {
    setIsTriggered(false);
    setFadingToBlack(false);
    setShowContent(false);
  };

  return (
    <section id="secret-surprise" className="py-20 px-4 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 12 &bull; Secret Button</span>
        </div>
        <p className="font-serif-luxury italic text-rose-200 text-lg max-w-md mx-auto">
          I left a secret surprise below... but whatever you do...
        </p>
      </div>

      {/* Glowing Temptation Button */}
      <button
        onClick={handleSecretClick}
        className="group relative inline-flex items-center gap-3 px-12 py-6 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold text-2xl tracking-wider shadow-[0_0_50px_rgba(244,63,94,0.7)] hover:shadow-[0_0_80px_rgba(255,105,180,0.9)] transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-rose-300 animate-pulse-soft"
      >
        <span>DON&apos;T CLICK</span>
        <Heart className="w-6 h-6 fill-white text-white group-hover:scale-125 transition-transform" />
      </button>

      {/* Fullscreen Fading Black & Celebration Modal */}
      {isTriggered && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 transition-colors duration-1000 ${
            fadingToBlack ? 'bg-black/95 backdrop-blur-2xl' : 'bg-transparent pointer-events-none'
          }`}
        >
          {/* Close / Return Button */}
          <button
            onClick={closeSurprise}
            aria-label="Close surprise celebration"
            className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full glass-panel-pink flex items-center justify-center text-white hover:bg-rose-500/40 transition-all cursor-pointer border border-rose-300/40"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Stars & Falling Flower Petals Background inside Modal */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 45 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-xl sm:text-2xl animate-float-slow"
                style={{
                  left: `${(i * 7 + 3) % 100}%`,
                  top: `${(i * 13) % 90}%`,
                  animationDuration: `${3 + (i % 3)}s`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                {i % 4 === 0 ? '✨' : i % 4 === 1 ? '🌹' : i % 4 === 2 ? '🌸' : '🎇'}
              </div>
            ))}
          </div>

          {/* Central Surprise Celebration Content */}
          {showContent && (
            <div className="relative z-20 max-w-3xl w-full text-center p-8 sm:p-14 rounded-3xl glass-panel-pink border-2 border-rose-400/60 shadow-[0_0_100px_rgba(244,63,94,0.6)] animate-fadeIn">
              {/* Glowing Heart Display */}
              <div className="relative w-36 h-36 mx-auto mb-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-3xl animate-ping" />
                <Heart className="w-32 h-32 fill-rose-500 text-rose-300 drop-shadow-[0_0_40px_rgba(244,63,94,0.9)] animate-pulse" />
              </div>

              <span className="inline-block px-4 py-1 rounded-full bg-rose-500/30 border border-rose-300/40 text-rose-200 text-xs tracking-widest uppercase mb-4 font-semibold">
                SURPRISE UNLOCKED &bull; FOR MONAL
              </span>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight pink-glow-text">
                You&apos;re The Best Thing That Ever Happened To Me ❤️
              </h2>

              <p className="font-handwriting text-3xl sm:text-4xl text-rose-300 mb-8">
                Every second with you is a dream come true, Monal.
              </p>

              <button
                onClick={closeSurprise}
                className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-base shadow-xl pink-glow transition-all cursor-pointer"
              >
                Return to Our Story &hearts;
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
