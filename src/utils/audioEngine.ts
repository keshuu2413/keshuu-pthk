/**
 * A rich, multi-layered romantic piano synthesizer inspired by cinematic Indian love themes ("Aaj Se Teri" / "Tum Hi Ho").
 * Uses Web Audio API with dual-hand piano synthesis (bass chords + expressive melody + sustain pedal reverb).
 */

interface NoteEvent {
  freq: number;
  duration: number; // in seconds
  velocity: number; // 0 to 1 relative loudness
  delay?: number;   // slight offset for humanize feel
}

export class RomanticPianoEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private intervalId: number | null = null;
  private stepIndex: number = 0;
  private masterGain: GainNode | null = null;
  private reverbNode: ConvolverNode | null = null;

  // 16-step romantic chord & melody progression (each step is ~600ms = 100 BPM gentle ballad)
  // Left hand: warm bass + arpeggio notes
  // Right hand: expressive romantic melody notes
  private readonly sequence: { bass: number[]; melody: number[] }[] = [
    // Bar 1 - Am (A - C - E - A)
    { bass: [220.0, 329.63], melody: [659.25, 880.0] },       // E5, A5
    { bass: [261.63, 440.0], melody: [783.99] },              // G5
    { bass: [329.63, 523.25], melody: [659.25] },             // E5
    { bass: [261.63, 440.0], melody: [587.33, 659.25] },      // D5, E5

    // Bar 2 - F major (F - A - C - E)
    { bass: [174.61, 261.63], melody: [698.46] },             // F5
    { bass: [220.0, 349.23], melody: [659.25] },              // E5
    { bass: [261.63, 440.0], melody: [523.25] },              // C5
    { bass: [220.0, 349.23], melody: [587.33] },              // D5

    // Bar 3 - C major (C - E - G - C)
    { bass: [130.81, 261.63], melody: [659.25, 783.99] },     // E5, G5
    { bass: [196.00, 329.63], melody: [880.0] },              // A5
    { bass: [261.63, 392.00], melody: [783.99] },             // G5
    { bass: [196.00, 329.63], melody: [659.25, 587.33] },     // E5, D5

    // Bar 4 - G major / E7 tender resolution
    { bass: [146.83, 246.94], melody: [587.33] },             // D5
    { bass: [196.00, 293.66], melody: [523.25] },             // C5
    { bass: [246.94, 392.00], melody: [493.88] },             // B4
    { bass: [196.00, 329.63], melody: [523.25, 587.33] },     // C5, D5

    // Bar 5 - Dm romantic swell
    { bass: [146.83, 293.66], melody: [698.46, 880.0] },      // F5, A5
    { bass: [220.00, 349.23], melody: [987.77] },             // B5
    { bass: [293.66, 440.00], melody: [1046.50] },            // C6
    { bass: [220.00, 349.23], melody: [880.00] },             // A5

    // Bar 6 - Am heartfelt descent
    { bass: [220.00, 329.63], melody: [783.99] },             // G5
    { bass: [261.63, 440.00], melody: [659.25] },             // E5
    { bass: [329.63, 523.25], melody: [587.33] },             // D5
    { bass: [261.63, 440.00], melody: [523.25] },             // C5

    // Bar 7 - F major sweet romance
    { bass: [174.61, 261.63], melody: [587.33, 698.46] },     // D5, F5
    { bass: [220.00, 349.23], melody: [659.25] },             // E5
    { bass: [261.63, 440.00], melody: [523.25] },             // C5
    { bass: [220.00, 349.23], melody: [493.88] },             // B4

    // Bar 8 - G to C resolution
    { bass: [196.00, 293.66], melody: [523.25] },             // C5 (held sweet note)
    { bass: [246.94, 392.00], melody: [659.25] },             // E5
    { bass: [261.63, 392.00], melody: [783.99] },             // G5
    { bass: [196.00, 329.63], melody: [523.25, 659.25] },     // C5, E5 harmonic
  ];

  constructor() {
    // Lazy init AudioContext on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master gain for smooth volume control
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.ctx.destination);

      // Create synthetic impulse response for warm piano hall reverb (sustain pedal effect)
      this.reverbNode = this.createReverb(this.ctx);
      if (this.reverbNode) {
        this.reverbNode.connect(this.masterGain);
      }
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private createReverb(ctx: AudioContext): ConvolverNode | null {
    try {
      const convolver = ctx.createConvolver();
      const sampleRate = ctx.sampleRate;
      const length = sampleRate * 2.5; // 2.5 seconds lush decay
      const impulse = ctx.createBuffer(2, length, sampleRate);
      const left = impulse.getChannelData(0);
      const right = impulse.getChannelData(1);

      for (let i = 0; i < length; i++) {
        const decay = Math.exp(-i / (sampleRate * 0.8));
        left[i] = (Math.random() * 2 - 1) * decay * 0.35;
        right[i] = (Math.random() * 2 - 1) * decay * 0.35;
      }

      convolver.buffer = impulse;
      return convolver;
    } catch {
      return null;
    }
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.stepIndex = 0;

    // Play initial step immediately
    this.playStep();

    // Loop steps every 480ms for a gentle, romantic tempo
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying && !this.isMuted) {
        this.playStep();
      }
    }, 480);
  }

  private playStep() {
    if (!this.ctx || !this.isPlaying || this.isMuted || !this.masterGain) return;

    const currentStep = this.sequence[this.stepIndex % this.sequence.length];
    this.stepIndex++;

    try {
      // Play left hand bass / arpeggios (warm, lower velocity)
      currentStep.bass.forEach((freq, idx) => {
        this.playPianoNote(freq, 2.4, 0.45 - idx * 0.08, idx * 0.03);
      });

      // Play right hand melody (bright, expressive, higher velocity)
      currentStep.melody.forEach((freq, idx) => {
        this.playPianoNote(freq, 2.8, 0.75, idx * 0.18);
      });
    } catch (e) {
      console.warn('Audio play warning:', e);
    }
  }

  private playPianoNote(freq: number, duration: number, velocity: number, delaySec: number = 0) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime + delaySec;

    // Piano Sound Synthesis:
    // 1. Triangle wave for warm body
    // 2. Sine wave for pure fundamental resonance
    // 3. Subtle harmonic overtone for string shimmer
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc2.type = 'sine';
    osc3.type = 'sine';

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq, now);
    osc3.frequency.setValueAtTime(freq * 2.001, now); // slight chorus/detune for rich acoustic string realism

    // Dynamic low-pass filter: brighter on attack, softer on decay
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.5, now);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 1.2);
    filter.Q.setValueAtTime(0.8, now);

    // Realistic piano ADSR Envelope (percussive hammer strike + long sustain pedal decay)
    const peakVolume = velocity * 0.22;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(peakVolume, now + 0.018); // Hammer strike
    noteGain.gain.exponentialRampToValueAtTime(peakVolume * 0.4, now + 0.35); // Initial string decay
    noteGain.gain.exponentialRampToValueAtTime(peakVolume * 0.15, now + 1.2); // Sustain pedal hold
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Natural release

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(noteGain);

    // Dry signal to master
    noteGain.connect(this.masterGain);
    // Wet signal to reverb hall for sustain pedal atmosphere
    if (this.reverbNode) {
      noteGain.connect(this.reverbNode);
    }

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
    osc3.stop(now + duration + 0.1);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}
