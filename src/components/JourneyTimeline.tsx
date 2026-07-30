import React from 'react';
import { TIMELINE_EVENTS } from '../data/romanticData';
import { Sparkles } from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="journey-timeline" className="py-20 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 5 &bull; Our Story</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 pink-glow-text">
          Our Journey Timeline 📖
        </h2>
        <p className="font-serif-luxury italic text-rose-200 text-lg max-w-xl mx-auto">
          Every moment with you builds a chapter I never want to finish reading.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Glowing Pink Central Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-500 via-pink-400 to-amber-300 -translate-x-1/2" />

        <div className="space-y-12">
          {TIMELINE_EVENTS.map((event, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={event.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node Badge */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass-panel-pink border-2 border-rose-400 flex items-center justify-center text-xl shadow-lg z-10 pink-glow">
                  {event.emoji}
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-48px)] pl-16 md:pl-0 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <div
                    className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 ${
                      event.highlight
                        ? 'glass-panel-pink border border-rose-400/50 pink-glow scale-[1.02]'
                        : 'glass-panel hover:border-rose-400/30 hover:bg-rose-950/20'
                    }`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-rose-500/25 border border-rose-400/30 text-rose-200 text-xs font-semibold tracking-wider uppercase mb-2">
                      {event.date}
                    </span>
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-rose-100/90 text-base sm:text-lg font-light leading-relaxed">
                      {event.description}
                    </p>
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
