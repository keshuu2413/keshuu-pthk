import React, { useState } from 'react';
import { CARTOON_COUPLE_QUOTES } from '../data/romanticData';
import { Sparkles, MessageCircleHeart, Heart } from 'lucide-react';

export const CartoonCoupleSection: React.FC = () => {
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  return (
    <section id="cartoon-couple" className="py-20 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 8 &bull; Side By Side</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 pink-glow-text">
          Our Cartoon Couple 👫❤️
        </h2>
        <p className="font-serif-luxury italic text-rose-200 text-lg max-w-xl mx-auto">
          Little moments, inside jokes, and the feeling of home whenever we talk.
        </p>
      </div>

      {/* Main Luxury Couple Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Romantic Cartoon Couple Illustration */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden glass-panel-pink border border-rose-400/40 p-6 shadow-2xl aspect-square flex items-center justify-center">
            {/* Background glowing aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/20 via-pink-500/10 to-amber-300/10" />

            <img
              src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80"
              alt="Cartoon couple holding hands"
              className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-700 hover:scale-105"
            />

            {/* Decorative Heart Badge */}
            <div className="absolute bottom-10 right-10 glass-panel-rose px-4 py-2 rounded-full border border-rose-300/60 shadow-lg flex items-center gap-2">
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white">Keshu &amp; Monal</span>
            </div>
          </div>
        </div>

        {/* Right: Speech Bubbles / Quotes */}
        <div className="lg:col-span-6 space-y-6">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold block mb-2">
              THOUGHTS OF KESHU ❤️
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              Things I Think Every Single Day:
            </h3>
          </div>

          {CARTOON_COUPLE_QUOTES.map((quote, idx) => {
            const isSelected = idx === activeQuoteIdx;
            return (
              <div
                key={quote.id}
                onClick={() => setActiveQuoteIdx(idx)}
                className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer border relative ${
                  isSelected
                    ? 'glass-panel-pink border-rose-400 pink-glow scale-[1.02]'
                    : 'glass-panel hover:border-rose-400/30'
                }`}
              >
                {/* Speech Bubble Icon */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-rose-500 text-white shadow-lg' : 'bg-rose-950/60 text-rose-300'
                    }`}
                  >
                    {quote.emoji}
                  </div>

                  <div className="flex-1">
                    <p className="font-serif-luxury text-xl sm:text-2xl text-white font-medium italic mb-2">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                    <span className="text-xs uppercase tracking-widest text-rose-300/80 font-semibold">
                      &mdash; {quote.author}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
