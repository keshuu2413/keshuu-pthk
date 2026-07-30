import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';
import { RomanticPianoEngine } from '../utils/audioEngine';

interface MusicPlayerProps {
  autoStart?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStart = false }) => {
  const [engine] = useState(() => new RomanticPianoEngine());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [expanded, setExpanded] = useState(true);
  const hasUserInteracted = useRef(false);
  const userManuallyPaused = useRef(false);

  // Auto-start music on any first user interaction on the document
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasUserInteracted.current && !userManuallyPaused.current) {
        hasUserInteracted.current = true;
        engine.start();
        setIsPlaying(true);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    if (autoStart && !userManuallyPaused.current) {
      engine.start();
      setIsPlaying(true);
    }

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      engine.stop();
    };
  }, [autoStart, engine]);

  const togglePlay = () => {
    if (isPlaying) {
      userManuallyPaused.current = true;
      engine.stop();
      setIsPlaying(false);
    } else {
      userManuallyPaused.current = false;
      engine.start();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    engine.setMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    engine.setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
      engine.setMuted(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Expanded Control Box */}
      {expanded && (
        <div className="glass-panel-pink px-4 py-3 rounded-2xl flex items-center gap-4 animate-fadeIn shadow-2xl border border-rose-400/40">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-rose-100 tracking-wide">Aaj Se Teri &bull; Romantic Piano</span>
              {isPlaying && !isMuted && <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />}
            </div>
            <span className="text-[10px] text-rose-300/80">
              {isPlaying ? 'Playing for Monal ❤️' : 'Paused • Click play for music'}
            </span>
          </div>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg pink-glow'
                : 'bg-rose-500/30 hover:bg-rose-500/50 text-rose-100'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            className="text-rose-200 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Volume Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-rose-400 cursor-pointer"
            aria-label="Music volume"
          />
        </div>
      )}

      {/* Floating Luxury Music Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-label="Toggle music player"
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer border ${
          isPlaying && !isMuted
            ? 'bg-gradient-to-br from-rose-500 to-pink-600 border-rose-300/60 pink-glow animate-pulse'
            : 'glass-panel-pink border-rose-400/30 text-rose-200 hover:border-rose-300'
        }`}
      >
        <Music className={`w-6 h-6 text-white ${isPlaying && !isMuted ? 'animate-bounce' : ''}`} />
      </button>
    </div>
  );
};

