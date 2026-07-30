import React, { useState } from 'react';
import { TeddyAction } from '../types';
import { Heart, Sparkles, Send, Smile } from 'lucide-react';

export const InteractiveTeddy: React.FC = () => {
  const [action, setAction] = useState<TeddyAction>('idle');
  const [animationCount, setAnimationCount] = useState(0);

  const triggerAction = (newAction: TeddyAction) => {
    setAction(newAction);
    setAnimationCount((prev) => prev + 1);
  };

  return (
    <section id="interactive-teddy" className="py-20 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 7 &bull; Cute Companion</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 pink-glow-text">
          Interactive Teddy Bear 🧸
        </h2>
        <p className="font-serif-luxury italic text-rose-200 text-lg max-w-xl mx-auto">
          Whenever you miss me, ask my teddy bear for a hug, flowers, or flying hearts!
        </p>
      </div>

      {/* Main Luxury Teddy Display Card */}
      <div className="glass-panel-pink rounded-3xl p-8 sm:p-12 border border-rose-400/30 shadow-2xl text-center relative overflow-hidden">
        {/* Dynamic Flying Effects inside card when active */}
        {action === 'flowers' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`${animationCount}-${i}`}
                className="absolute animate-float-slow text-3xl"
                style={{
                  left: `${(i * 12 + 10) % 90}%`,
                  top: `${(i * 17) % 70}%`,
                  animationDuration: '3s'
                }}
              >
                {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🌹' : '💐'}
              </div>
            ))}
          </div>
        )}

        {action === 'hearts' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={`${animationCount}-h-${i}`}
                className="absolute animate-bounce text-3xl"
                style={{
                  left: `${(i * 9 + 5) % 95}%`,
                  top: `${(i * 13) % 80}%`,
                  animationDuration: '2.2s'
                }}
              >
                {i % 2 === 0 ? '❤️' : '💕'}
              </div>
            ))}
          </div>
        )}

        {/* Teddy Bear SVG & Visual Container */}
        <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8 flex items-center justify-center">
          {/* Glowing background halo */}
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-2xl animate-pulse" />

          {/* Teddy Bear Character */}
          <div
            className={`text-[110px] sm:text-[130px] select-none transition-transform duration-500 ${
              action === 'hug'
                ? 'scale-110 rotate-6'
                : action === 'flowers'
                ? '-rotate-6 scale-105'
                : action === 'hearts'
                ? 'animate-bounce'
                : 'hover:scale-105'
            }`}
          >
            🧸
          </div>

          {/* Overlay emoji based on action */}
          {action === 'hug' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl animate-pulse">
              ❤️
            </div>
          )}
          {action === 'flowers' && (
            <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
              🌸
            </div>
          )}
          {action === 'hearts' && (
            <div className="absolute -top-4 left-4 text-4xl animate-ping">
              💕
            </div>
          )}
        </div>

        {/* Display Message */}
        <div className="mb-10">
          <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 pink-glow-text">
            I Miss You, Monal ❤️
          </h3>
          <p className="font-handwriting text-2xl sm:text-3xl text-rose-300">
            {action === 'hug'
              ? 'Sending you the warmest, tightest bear hug right now!'
              : action === 'flowers'
              ? 'Showering your world with fresh blossoms and petals!'
              : action === 'hearts'
              ? 'Sending a sky full of flying hearts straight to you!'
              : 'Click any button below to play with your teddy!'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => triggerAction('hug')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm transition-all cursor-pointer border ${
              action === 'hug'
                ? 'bg-rose-500 text-white border-rose-300 shadow-lg pink-glow'
                : 'glass-panel text-rose-200 hover:text-white border-rose-400/30'
            }`}
          >
            <Heart className="w-4 h-4 fill-current text-rose-300" />
            <span>Hug a Heart ❤️</span>
          </button>

          <button
            onClick={() => triggerAction('flowers')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm transition-all cursor-pointer border ${
              action === 'flowers'
                ? 'bg-rose-500 text-white border-rose-300 shadow-lg pink-glow'
                : 'glass-panel text-rose-200 hover:text-white border-rose-400/30'
            }`}
          >
            <Smile className="w-4 h-4 text-rose-300" />
            <span>Throw Flowers 🌸</span>
          </button>

          <button
            onClick={() => triggerAction('hearts')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm transition-all cursor-pointer border ${
              action === 'hearts'
                ? 'bg-rose-500 text-white border-rose-300 shadow-lg pink-glow'
                : 'glass-panel text-rose-200 hover:text-white border-rose-400/30'
            }`}
          >
            <Send className="w-4 h-4 text-rose-300" />
            <span>Send Flying Hearts 💕</span>
          </button>
        </div>
      </div>
    </section>
  );
};
