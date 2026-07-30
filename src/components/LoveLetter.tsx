import React, { useState } from 'react';
import { LOVE_LETTER_TEXT } from '../data/romanticData';
import { Mail, Heart, Sparkles, Lock, MailOpen } from 'lucide-react';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="love-letter" className="py-20 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 6 &bull; Heart To Heart</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 pink-glow-text">
          A Letter For Monal 💌
        </h2>
        <p className="font-serif-luxury italic text-rose-200 text-lg max-w-xl mx-auto">
          Tap the envelope to break the seal and unfold my love letter.
        </p>
      </div>

      {/* Envelope / Letter Interactive Card */}
      <div className="relative">
        {!isOpen ? (
          /* Closed Luxury Envelope State */
          <div
            onClick={() => setIsOpen(true)}
            className="group relative cursor-pointer glass-panel-pink rounded-3xl p-10 sm:p-14 md:p-16 border-2 border-rose-400/40 hover:border-rose-300 transition-all duration-500 hover:scale-[1.02] shadow-2xl overflow-hidden flex flex-col items-center justify-center text-center min-h-[380px]"
          >
            {/* Envelope Flap Accent Lines */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-rose-500/20 to-transparent border-b border-rose-400/20 pointer-events-none" />

            {/* Glowing Wax Seal Button */}
            <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 border-4 border-rose-300/60 shadow-[0_0_30px_rgba(244,63,94,0.6)] flex flex-col items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 fill-white mb-1" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-rose-100">K &bull; M</span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-bold mb-2">
              To: Monal &bull; From: Keshu
            </h3>
            <p className="text-rose-200 text-sm sm:text-base tracking-wider mb-6">
              Confidential &bull; Written with all my love
            </p>

            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500/40 hover:bg-rose-500/60 border border-rose-300/40 text-white font-medium text-sm transition-all">
              <MailOpen className="w-4 h-4" />
              <span>Tap to Open Letter</span>
            </button>
          </div>
        ) : (
          /* Opened Luxury Parchment Paper State */
          <div className="relative rounded-3xl p-8 sm:p-14 md:p-16 bg-gradient-to-br from-[#2a1322] via-[#3a182c] to-[#261020] border-2 border-rose-300/50 shadow-2xl animate-fadeIn text-rose-50">
            {/* Top Right Decorative Postage / Date */}
            <div className="flex justify-between items-start mb-8 border-b border-rose-400/20 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-rose-300/80 block">DATE OF STORY</span>
                <span className="font-serif-luxury text-lg text-rose-200 font-semibold">Since October 2024 ❤️</span>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-rose-500/25 border border-rose-300/30 text-rose-200 text-xs font-semibold uppercase">
                  Girlfriend&apos;s Day Special
                </span>
              </div>
            </div>

            {/* Salutation */}
            <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-rose-100 font-bold mb-6">
              {LOVE_LETTER_TEXT.salutation}
            </h3>

            {/* Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg md:text-xl text-rose-100/95 font-light leading-relaxed">
              {LOVE_LETTER_TEXT.paragraphs.map((p, i) => (
                <p key={i} className="border-l-2 border-rose-400/40 pl-4">
                  {i === 0 ? (
                    <span>
                      Since <strong className="text-rose-300 font-semibold">October 2024</strong>, my life has been filled with beautiful moments because of you.
                    </span>
                  ) : (
                    p
                  )}
                </p>
              ))}
            </div>

            {/* Signoff & Signature */}
            <div className="mt-10 pt-6 border-t border-rose-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif-luxury italic text-xl text-rose-200 mb-1">
                  {LOVE_LETTER_TEXT.signoff}
                </p>
                <p className="font-handwriting text-4xl sm:text-5xl text-rose-300 font-bold pink-glow-text">
                  {LOVE_LETTER_TEXT.signature}
                </p>
              </div>

              {/* Close / Fold Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="self-start sm:self-auto px-5 py-2.5 rounded-full glass-panel text-rose-200 hover:text-white text-xs uppercase tracking-widest border border-rose-400/30 hover:bg-rose-500/20 transition-all cursor-pointer"
              >
                Fold Letter Back 💌
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
