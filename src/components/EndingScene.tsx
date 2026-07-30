import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';

const ENDING_LINES = [
  'Every flower blooms because of love.',
  'And my world blooms because of you.',
  '',
  "Happy Girlfriend's Day, Monal ❤️",
  '',
  'With Endless Love,',
  'Keshu ❤️'
];

export const EndingScene: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);

  useEffect(() => {
    if (currentLineIdx >= ENDING_LINES.length) return;

    const currentTargetLine = ENDING_LINES[currentLineIdx];
    if (currentCharIdx < currentTargetLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLineIdx] = (updated[currentLineIdx] || '') + currentTargetLine[currentCharIdx];
          return updated;
        });
        setCurrentCharIdx((c) => c + 1);
      }, 35);
      return () => clearTimeout(timer);
    } else {
      // Line finished typing, move to next
      const nextLineTimer = setTimeout(() => {
        setCurrentLineIdx((l) => l + 1);
        setCurrentCharIdx(0);
      }, 400);
      return () => clearTimeout(nextLineTimer);
    }
  }, [currentLineIdx, currentCharIdx]);

  return (
    <section id="ending-scene" className="relative min-h-[85vh] py-24 px-4 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#180914] via-[#0d040a] to-[#0a0208] border-t border-rose-500/20">
      {/* Peaceful Night Sky with Glowing Moon */}
      <div className="absolute top-12 right-12 sm:right-24 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-100 to-rose-100 shadow-[0_0_80px_rgba(255,248,220,0.6)] opacity-90 pointer-events-none" />

      {/* Twinkling Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              left: `${(i * 13) % 100}%`,
              top: `${(i * 19) % 100}%`,
              opacity: (i % 5) * 0.2 + 0.2,
              animationDuration: `${2 + (i % 4)}s`
            }}
          />
        ))}
      </div>

      {/* Floating Lanterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow text-2xl sm:text-3xl opacity-75"
            style={{
              left: `${(i * 18 + 7) % 95}%`,
              top: `${(i * 23) % 90}%`,
              animationDuration: `${6 + (i % 5)}s`,
              animationDelay: `${i * 0.7}s`
            }}
          >
            {i % 3 === 0 ? '🏮' : i % 3 === 1 ? '✨' : '💖'}
          </div>
        ))}
      </div>

      {/* Central Romantic Typography Card */}
      <div className="relative z-10 max-w-3xl w-full text-center glass-panel-pink rounded-3xl p-8 sm:p-14 md:p-16 border border-rose-400/30 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 13 &bull; Final Dedication</span>
        </div>

        {/* Typing Animation Output */}
        <div className="min-h-[220px] sm:min-h-[260px] flex flex-col justify-center space-y-4 font-serif-luxury text-xl sm:text-2xl md:text-3xl text-rose-50 font-light">
          {ENDING_LINES.map((_, idx) => {
            const lineContent = displayedLines[idx] || '';
            const isCurrentlyTyping = idx === currentLineIdx;
            const isBoldLine = idx === 3 || idx === 5 || idx === 6;

            return (
              <div
                key={idx}
                className={`${
                  isBoldLine ? 'font-bold text-rose-300 pink-glow-text text-2xl sm:text-3xl md:text-4xl' : ''
                } ${idx === 6 ? 'font-handwriting text-4xl sm:text-5xl md:text-6xl pt-2' : ''}`}
              >
                <span>{lineContent}</span>
                {isCurrentlyTyping && (
                  <span className="inline-block w-0.5 h-6 ml-1 bg-rose-400 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Re-play Typing Button */}
        <div className="mt-10 pt-6 border-t border-rose-400/20 flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setDisplayedLines([]);
              setCurrentLineIdx(0);
              setCurrentCharIdx(0);
            }}
            className="text-xs text-rose-300/80 hover:text-white underline underline-offset-4 tracking-wider transition-colors cursor-pointer"
          >
            Replay typing animation &bull; Keshu &hearts; Monal
          </button>
        </div>
      </div>
    </section>
  );
};
