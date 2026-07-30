import React, { useEffect, useState } from 'react';
import { ParticleEffect } from '../types';

export const FloatingEffects: React.FC = () => {
  const [particles, setParticles] = useState<ParticleEffect[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Subtle trailing heart after cursor
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Spawn a small heart occasionally on movement
      if (Math.random() < 0.12) {
        const id = Math.random().toString(36).substring(2, 9);
        const newParticle: ParticleEffect = {
          id,
          x: e.clientX + (Math.random() * 20 - 10),
          y: e.clientY + (Math.random() * 20 - 10),
          type: 'heart',
          size: Math.random() * 14 + 10,
          color: Math.random() > 0.5 ? '#f43f5e' : '#ff80ab'
        };

        setParticles((prev) => [...prev.slice(-25), newParticle]);
      }
    };

    // Spawn blossoms on click or tap
    const handleClick = (e: MouseEvent) => {
      const newParticles: ParticleEffect[] = Array.from({ length: 6 }).map((_, i) => ({
        id: `click-${Date.now()}-${i}`,
        x: e.clientX + (Math.random() * 60 - 30),
        y: e.clientY + (Math.random() * 60 - 30),
        type: i % 2 === 0 ? 'blossom' : 'heart',
        size: Math.random() * 18 + 14,
        color: i % 3 === 0 ? '#fbcfe8' : i % 3 === 1 ? '#f43f5e' : '#fda4af'
      }));

      setParticles((prev) => [...prev.slice(-30), ...newParticles]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Clean up particles
    const cleaner = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 900);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(cleaner);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Subtle cursor pink glow */}
      <div
        className="fixed w-36 h-36 rounded-full bg-pink-500/15 blur-3xl transition-all duration-150 ease-out pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* Butterflies flying across the screen */}
      <div className="absolute top-1/4 left-0 animate-float-butterfly pointer-events-none opacity-80">
        <span className="text-2xl md:text-3xl drop-shadow-[0_0_12px_rgba(255,182,193,0.8)]">🦋</span>
      </div>
      <div
        className="absolute top-2/3 left-0 animate-float-butterfly pointer-events-none opacity-70"
        style={{ animationDelay: '-11s', animationDuration: '28s' }}
      >
        <span className="text-xl md:text-2xl drop-shadow-[0_0_12px_rgba(255,105,180,0.8)]">🌸</span>
      </div>

      {/* Interactive spawn particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-slow transition-opacity duration-1000 pointer-events-none select-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            color: p.color,
            transform: 'translate(-50%, -50%)',
            textShadow: '0 0 10px rgba(255, 182, 193, 0.7)'
          }}
        >
          {p.type === 'heart' ? '❤️' : p.type === 'blossom' ? '🌸' : '✨'}
        </div>
      ))}
    </div>
  );
};
