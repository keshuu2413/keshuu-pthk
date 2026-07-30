import React, { useState, useEffect } from 'react';
import { FLOWER_SLIDES } from '../data/romanticData';
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';

export const FlowerSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % FLOWER_SLIDES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + FLOWER_SLIDES.length) % FLOWER_SLIDES.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FLOWER_SLIDES.length);
  };

  const currentSlide = FLOWER_SLIDES[currentIndex];

  return (
    <section id="flower-slideshow" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 4 &bull; Luxury Flowers For You</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 pink-glow-text">
          Flowers For My Gussail Ladkiii 🌹
        </h2>
        <p className="font-serif-luxury italic text-rose-200 text-lg max-w-xl mx-auto">
          Every blossom is for my gussail ladkiii, Monal — even when you get angry, you look the cutest! ❤️
        </p>
      </div>

      {/* Main Luxury Slideshow Container */}
      <div
        className="relative rounded-3xl overflow-hidden glass-panel-pink border border-rose-400/30 shadow-2xl group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides Container */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-rose-950/40">
          {FLOWER_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Background Image with gentle scale animation */}
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-1000 scale-105"
                />

                {/* Romantic Pink Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#180914] via-[#180914]/40 to-transparent" />

                {/* Text Overlays */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 md:p-12 text-center flex flex-col items-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-500/30 border border-rose-300/40 text-rose-100 text-xs tracking-wider uppercase mb-3 backdrop-blur-md">
                    {slide.category}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    {slide.title}
                  </h3>
                  <p className="font-handwriting text-2xl sm:text-3xl text-rose-300 mb-4">
                    {slide.subtitle}
                  </p>

                  {/* Highlighted Romantic Quote Overlay */}
                  <div className="glass-panel-rose px-6 py-3 rounded-2xl border border-rose-300/50 shadow-xl max-w-lg">
                    <p className="font-serif-luxury text-lg sm:text-xl text-white font-medium italic">
                      &ldquo;{slide.overlayText}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          aria-label="Previous flower slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-panel-pink flex items-center justify-center text-white hover:bg-rose-500/40 transition-all cursor-pointer border border-rose-300/40"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          aria-label="Next flower slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-panel-pink flex items-center justify-center text-white hover:bg-rose-500/40 transition-all cursor-pointer border border-rose-300/40"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          {FLOWER_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.8)]'
                  : 'w-2 bg-rose-200/40 hover:bg-rose-200/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Category Pills below slideshow */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
        {FLOWER_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border ${
              idx === currentIndex
                ? 'bg-rose-500 text-white border-rose-300 shadow-lg pink-glow'
                : 'glass-panel text-rose-200/80 hover:text-white border-rose-500/20'
            }`}
          >
            {slide.category}
          </button>
        ))}
      </div>
    </section>
  );
};
