import React, { useState } from 'react';
import { ROMANTIC_WISHES } from '../data/romanticData';
import { Sparkles, RefreshCw, Heart, Check } from 'lucide-react';

export const WishesGenerator: React.FC = () => {
  const [currentWishIdx, setCurrentWishIdx] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateNewWish = () => {
    setIsSpinning(true);
    let nextIdx = Math.floor(Math.random() * ROMANTIC_WISHES.length);
    while (nextIdx === currentWishIdx && ROMANTIC_WISHES.length > 1) {
      nextIdx = Math.floor(Math.random() * ROMANTIC_WISHES.length);
    }
    setTimeout(() => {
      setCurrentWishIdx(nextIdx);
      setIsSpinning(false);
      setCopied(false);
    }, 250);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ROMANTIC_WISHES[currentWishIdx].message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentWish = ROMANTIC_WISHES[currentWishIdx];

  return (
    <section id="wishes-generator" className="py-20 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 11 &bull; Daily Love</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 pink-glow-text">
          Romantic Wishes Generator ✨
        </h2>
        <p className="font-serif-luxury italic text-rose-200 text-lg max-w-xl mx-auto">
          Tap the button below to generate a new heartfelt message whenever you need a reminder of my love.
        </p>
      </div>

      {/* Main Generator Card */}
      <div className="glass-panel-pink rounded-3xl p-8 sm:p-14 md:p-16 border border-rose-400/40 shadow-2xl text-center relative overflow-hidden">
        {/* Top Decorative tag */}
        <span className="inline-block px-3 py-1 rounded-full bg-rose-500/30 border border-rose-300/40 text-rose-100 text-xs tracking-wider uppercase mb-6 font-semibold">
          {currentWish.tag}
        </span>

        {/* Heartfelt Wish Quote */}
        <div className="min-h-[140px] flex items-center justify-center mb-8">
          <p
            className={`font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-white font-medium italic leading-relaxed transition-all duration-300 ${
              isSpinning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            &ldquo;{currentWish.message}&rdquo;
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={generateNewWish}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-base sm:text-lg shadow-xl pink-glow hover:scale-105 active:scale-95 transition-all cursor-pointer border border-rose-300/40"
          >
            <RefreshCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>Generate Heartfelt Wish ✨</span>
          </button>

          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full glass-panel text-rose-200 hover:text-white border border-rose-400/30 hover:bg-rose-500/20 text-sm font-medium transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span>Copied to clipboard!</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4" />
                <span>Save this wish</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
