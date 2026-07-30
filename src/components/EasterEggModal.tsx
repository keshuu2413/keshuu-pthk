import React, { useState, useEffect } from 'react';
import { EASTER_EGG_MESSAGE } from '../data/romanticData';
import { Heart, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EasterEggModal: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setPressedKeys((prev) => {
        const updated = new Set(prev);
        updated.add(key);

        if (updated.has('k') && updated.has('m')) {
          setIsOpen(true);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#ff80ab', '#ffc107', '#ffffff']
          });
        }
        return updated;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setPressedKeys((prev) => {
        const updated = new Set(prev);
        updated.delete(key);
        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative max-w-2xl w-full glass-panel-pink rounded-3xl p-8 sm:p-12 border-2 border-rose-400 shadow-[0_0_80px_rgba(244,63,94,0.7)] text-center">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close Easter egg message"
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:bg-rose-500/40 transition-all cursor-pointer border border-rose-300/40"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/30 border border-rose-300 text-rose-200 text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>HIDDEN EASTER EGG (K + M) UNLOCKED</span>
        </div>

        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg pink-glow">
          <Heart className="w-12 h-12 fill-white animate-pulse" />
        </div>

        <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 leading-relaxed pink-glow-text">
          {EASTER_EGG_MESSAGE}
        </h3>

        <p className="font-handwriting text-3xl text-rose-300 mb-8">
          From Keshu to Monal &bull; Always &amp; Forever &hearts;
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="px-8 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm shadow-xl pink-glow transition-all cursor-pointer"
        >
          Close Secret Message ❤️
        </button>
      </div>
    </div>
  );
};
